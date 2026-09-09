// Phase 9 & 16: Autonomous Multi-Step Content Script Integration
// Orchestrates the complete end-to-end agent loop:
// Local Perception (DOM + OCR + Vision) -> PII Detector -> Privacy Policy -> Redactor -> FastAPI/Gemini -> Action Firewall -> Safe Executor -> Re-Perception -> Final Answer

import { runAutonomousAgentLoop } from '../agent/agentLoop';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'RUN_TASK') {
    console.log('🚀 [E2E Pipeline] Multi-Step Task received:', message.task);

    (async () => {
      try {
        const loopResult = await runAutonomousAgentLoop(message.task, {
          maxSteps: 5,
          settlingDelayMs: 400,
        });

        const lastStep = loopResult.lastStep;

        sendResponse({
          status: loopResult.status,
          task: loopResult.task,
          totalSteps: loopResult.totalSteps,
          finalAnswer: loopResult.finalAnswer,
          steps: loopResult.steps,
          error: loopResult.error,
          // Backwards-compatible properties from the final step for existing UI panels
          pageModelSummary: lastStep?.pageModelSummary || {
            title: document.title,
            elementCount: 0,
            interactiveCount: 0,
            sensitiveCount: 0,
            sensitiveTypes: [],
            intent: 'UNKNOWN',
            decisionsSummary: { totalEntities: 0, allowCount: 0, maskCount: 0, tokenizeCount: 0, localOnlyCount: 0, blockCount: 0 },
            sourcesRun: ['dom'],
          },
          pageModel: lastStep?.pageModel,
          sensitiveEntities: lastStep?.sensitiveEntities || [],
          privacyDecisions: lastStep?.privacyDecisions || [],
          sanitizedContext: lastStep?.sanitizedContext,
          sanitizedImages: lastStep?.sanitizedImages || {},
          ocrResult: lastStep?.ocrResult,
          agentPlanResponse: lastStep?.agentPlanResponse,
          firewallResult: lastStep?.firewallResult,
          executionResult: lastStep?.executionResult,
          metrics: {
            apiLatencyMs: loopResult.metrics.apiLatencyMs,
            totalLatencyMs: loopResult.metrics.totalLatencyMs,
            stepsCount: loopResult.metrics.stepsCount,
          },
        });
      } catch (err: any) {
        console.error('🚨 [Agent Loop Error]', err);
        sendResponse({
          status: 'ERROR',
          task: message.task,
          error: err.message || 'Unknown error occurred during agent execution loop.',
        });
      }
    })();

    return true; // Keep message channel open for async response
  }
});
