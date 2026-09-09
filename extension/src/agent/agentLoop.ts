import { extractPageModel } from '../content/domExtractor';
import { executePerceptionPipeline, PerceptionResultSet } from '../perception/perceptionManager';
import { buildUnifiedPageModel, UnifiedPageModel } from '../perception/unifiedPageModel';
import { detectSensitiveEntities, SensitiveEntity } from '../privacy/piiDetector';
import { evaluatePrivacyPolicy, PrivacyDecision } from '../privacy/policyEngine';
import { createSanitizedContext, SanitizedContext } from '../privacy/redactor';
import { captureViewportScreenshot } from '../perception/screenshotCapturer';
import { redactViewportScreenshot } from '../perception/imageRedactor';
import { fuseViewportDetections } from '../perception/detectionFusion';
import { validateAction, FirewallResult, PageSnapshotContext } from './actionFirewall';
import { executeAction, ExecutionResult } from '../content/actionExecutor';

export interface StepRecord {
  step: number;
  action: string;
  element_id?: string | null;
  value?: string | null;
  result_summary?: string;
}

export interface StepProgress {
  stepNumber: number;
  task: string;
  intent: string;
  elementsCount: number;
  sensitiveItemsCount: number;
  pageModelSummary: {
    title: string;
    elementCount: number;
    interactiveCount: number;
    sensitiveCount: number;
    sensitiveTypes: string[];
    intent: string;
    decisionsSummary: any;
    sourcesRun: string[];
  };
  pageModel: UnifiedPageModel;
  sensitiveEntities: SensitiveEntity[];
  privacyDecisions: PrivacyDecision[];
  sanitizedContext: SanitizedContext;
  sanitizedImages: Record<string, any>;
  ocrResult?: PerceptionResultSet['ocr'];
  agentPlanResponse: any;
  firewallResult: FirewallResult;
  executionResult?: ExecutionResult | null;
  timestamp: number;
}

export interface AgentLoopOptions {
  maxSteps?: number;
  settlingDelayMs?: number;
  fastApiEndpoint?: string;
  onStepProgress?: (step: StepProgress) => void;
}

export interface AgentLoopResult {
  status: 'SUCCESS' | 'BLOCKED_BY_FIREWALL' | 'MAX_STEPS_REACHED' | 'SERVER_ERROR';
  task: string;
  totalSteps: number;
  finalAnswer?: string;
  steps: StepProgress[];
  lastStep: StepProgress | null;
  metrics: {
    totalLatencyMs: number;
    stepsCount: number;
    apiLatencyMs: number;
  };
  error?: string;
}

const DEFAULT_FASTAPI_ENDPOINT = 'http://127.0.0.1:8000/agent/plan';

/**
 * Runs the autonomous multi-step perception-reasoning-action agent loop.
 */
export async function runAutonomousAgentLoop(
  task: string,
  options: AgentLoopOptions = {}
): Promise<AgentLoopResult> {
  const loopStartTime = performance.now();
  const maxSteps = options.maxSteps ?? 5;
  const settlingDelayMs = options.settlingDelayMs ?? 400;
  const endpoint = options.fastApiEndpoint || DEFAULT_FASTAPI_ENDPOINT;

  const steps: StepProgress[] = [];
  const previousStepRecords: StepRecord[] = [];
  let totalApiLatencyMs = 0;
  let finalAnswer: string | undefined = undefined;

  for (let currentStep = 1; currentStep <= maxSteps; currentStep++) {
    console.log(`\n🔄 [Agent Loop] Starting Step ${currentStep}/${maxSteps} for task: "${task}"`);

    // 1. Capture live page state & execute multi-modal perception
    const liveDomModel = extractPageModel();
    const perceptionResults = await executePerceptionPipeline(task, liveDomModel);

    // 2. Build normalized Unified Page Model
    const pageModel = buildUnifiedPageModel(perceptionResults);

    // 3. Detect sensitive entities across all modalities
    const sensitiveEntities = detectSensitiveEntities(pageModel);

    // 4. Evaluate task-aware privacy policy
    const { classification, decisions } = evaluatePrivacyPolicy(
      task,
      pageModel,
      sensitiveEntities
    );

    // 5. Selectively redact images locally in-browser & capture live sanitized viewport screenshot
    let sanitizedImages: Record<string, any> = {};

    try {
      // Capture live viewport screenshot (runs across any arbitrary page)
      const viewportScreenshot = await captureViewportScreenshot();
      if (viewportScreenshot && viewportScreenshot.dataUrl) {
        const viewportBoxes = fuseViewportDetections(sensitiveEntities, decisions, pageModel);
        const redactedViewport = await redactViewportScreenshot(
          viewportScreenshot.dataUrl,
          viewportBoxes,
          { mode: 'blur' }
        );
        sanitizedImages['viewport_screenshot'] = redactedViewport;
      }
    } catch (vpErr) {
      console.warn('⚠️ [Agent Loop Warning] Could not capture/redact viewport screenshot:', vpErr);
    }

    // 6. Generate sanitized context (attaching permitted or selectively redacted visual images)
    const sanitizedContext = createSanitizedContext(
      task,
      classification,
      pageModel,
      sensitiveEntities,
      decisions,
      sanitizedImages
    );

    // 6. Send sanitized payload & previous steps history to FastAPI / Gemini backend
    let agentPlanResponse: any = null;
    let serverError: string | null = null;
    const apiStart = performance.now();

    try {
      const payload = {
        task,
        context: sanitizedContext,
        previous_steps: previousStepRecords,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        serverError = `Server HTTP ${res.status}: ${res.statusText}`;
      } else {
        agentPlanResponse = await res.json();
      }
    } catch (err: any) {
      serverError = `Connection Error to ${endpoint}: ${err.message}`;
    }

    const stepApiLatency = Math.round(performance.now() - apiStart);
    totalApiLatencyMs += stepApiLatency;

    if (serverError || !agentPlanResponse || !agentPlanResponse.action) {
      const totalLatencyMs = Math.round(performance.now() - loopStartTime);
      return {
        status: 'SERVER_ERROR',
        task,
        totalSteps: currentStep,
        steps,
        lastStep: steps[steps.length - 1] || null,
        metrics: {
          totalLatencyMs,
          stepsCount: currentStep,
          apiLatencyMs: totalApiLatencyMs,
        },
        error: serverError || 'Invalid response from AI planning backend.',
      };
    }

    const untrustedAction = agentPlanResponse.action;

    // 7. Action Firewall Validation
    const actionCtx: PageSnapshotContext = {
      pageUrl: pageModel.page.url,
      timestamp: Date.now(),
    };
    const firewallResult = validateAction(untrustedAction, pageModel, actionCtx);

    console.log(`🛡️ [Step ${currentStep} Firewall Decision] ${firewallResult.decision}: ${firewallResult.reason}`);

    // If Firewall blocked the action, safely abort loop
    if (!firewallResult.allowed) {
      const stepProg: StepProgress = {
        stepNumber: currentStep,
        task,
        intent: classification.intent,
        elementsCount: pageModel.elements.length,
        sensitiveItemsCount: sensitiveEntities.length,
        pageModelSummary: {
          title: pageModel.page.title,
          elementCount: pageModel.elements.length,
          interactiveCount: pageModel.elements.filter((e) =>
            ['button', 'link', 'input', 'textarea', 'select'].includes(e.type)
          ).length,
          sensitiveCount: sensitiveEntities.length,
          sensitiveTypes: Array.from(new Set(sensitiveEntities.map((e) => e.type))),
          intent: classification.intent,
          decisionsSummary: sanitizedContext.decisionsSummary,
          sourcesRun: pageModel.metadata?.sourcesRun || ['dom'],
        },
        pageModel,
        sensitiveEntities,
        privacyDecisions: decisions,
        sanitizedContext,
        sanitizedImages,
        ocrResult: perceptionResults.ocr,
        agentPlanResponse,
        firewallResult,
        executionResult: null,
        timestamp: Date.now(),
      };
      steps.push(stepProg);
      options.onStepProgress?.(stepProg);

      const totalLatencyMs = Math.round(performance.now() - loopStartTime);
      return {
        status: 'BLOCKED_BY_FIREWALL',
        task,
        totalSteps: currentStep,
        steps,
        lastStep: stepProg,
        metrics: {
          totalLatencyMs,
          stepsCount: currentStep,
          apiLatencyMs: totalApiLatencyMs,
        },
        error: `Action blocked by Local Action Firewall: ${firewallResult.reason}`,
      };
    }

    // 8. Safe Browser Action Execution
    const executionResult = executeAction(firewallResult, pageModel);

    const stepProgress: StepProgress = {
      stepNumber: currentStep,
      task,
      intent: classification.intent,
      elementsCount: pageModel.elements.length,
      sensitiveItemsCount: sensitiveEntities.length,
      pageModelSummary: {
        title: pageModel.page.title,
        elementCount: pageModel.elements.length,
        interactiveCount: pageModel.elements.filter((e) =>
          ['button', 'link', 'input', 'textarea', 'select'].includes(e.type)
        ).length,
        sensitiveCount: sensitiveEntities.length,
        sensitiveTypes: Array.from(new Set(sensitiveEntities.map((e) => e.type))),
        intent: classification.intent,
        decisionsSummary: sanitizedContext.decisionsSummary,
        sourcesRun: pageModel.metadata?.sourcesRun || ['dom'],
      },
      pageModel,
      sensitiveEntities,
      privacyDecisions: decisions,
      sanitizedContext,
      sanitizedImages,
      ocrResult: perceptionResults.ocr,
      agentPlanResponse,
      firewallResult,
      executionResult,
      timestamp: Date.now(),
    };

    steps.push(stepProgress);
    options.onStepProgress?.(stepProgress);

    const actionTypeStr = (untrustedAction.action || '').toLowerCase().trim();

    // Check if task is completed (Action 'none' or direct answer delivered)
    if (actionTypeStr === 'none') {
      finalAnswer = untrustedAction.answer || untrustedAction.reasoning || executionResult.message;
      console.log(`✅ [Agent Loop] Task goal satisfied at Step ${currentStep}. Final Answer: "${finalAnswer}"`);

      const totalLatencyMs = Math.round(performance.now() - loopStartTime);
      return {
        status: 'SUCCESS',
        task,
        totalSteps: currentStep,
        finalAnswer,
        steps,
        lastStep: stepProgress,
        metrics: {
          totalLatencyMs,
          stepsCount: currentStep,
          apiLatencyMs: totalApiLatencyMs,
        },
      };
    }

    // Record interactive action in history
    previousStepRecords.push({
      step: currentStep,
      action: untrustedAction.action,
      element_id: untrustedAction.element_id,
      value: untrustedAction.value,
      result_summary: executionResult.message,
    });

    // Brief settling wait for DOM mutations / transitions before re-perceiving
    if (settlingDelayMs > 0 && currentStep < maxSteps) {
      await new Promise((resolve) => setTimeout(resolve, settlingDelayMs));
    }
  }

  // Max steps reached
  const totalLatencyMs = Math.round(performance.now() - loopStartTime);
  const lastStep = steps[steps.length - 1] || null;
  if (lastStep?.agentPlanResponse?.action) {
    finalAnswer =
      lastStep.agentPlanResponse.action.answer ||
      lastStep.agentPlanResponse.action.reasoning;
  }

  return {
    status: 'MAX_STEPS_REACHED',
    task,
    totalSteps: maxSteps,
    finalAnswer,
    steps,
    lastStep,
    metrics: {
      totalLatencyMs,
      stepsCount: maxSteps,
      apiLatencyMs: totalApiLatencyMs,
    },
  };
}
