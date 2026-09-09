// Phase 9, 16 & 30: Autonomous Multi-Step Content Script Integration
// Orchestrates the complete end-to-end agent loop + Holographic In-Page Webpage Visualizer:
// Local Perception (DOM + OCR + Vision) -> PII Detector -> Privacy Policy -> Redactor -> FastAPI/Gemini -> Action Firewall -> Safe Executor -> Re-Perception -> Final Answer

import { runAutonomousAgentLoop } from '../agent/agentLoop';
import { visualizer } from './webpageVisualizer';
import { resolveDOMElement } from './actionExecutor';
import './webpageVisualizer.css';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'RUN_TASK') {
    console.log('🚀 [WebPilot AI] Multi-Step Task received:', message.task);

    // 1. Activate in-page futuristic glow & floating badge
    visualizer.setActive(true, 'OBSERVING');
    if (message.task.toLowerCase().includes('screen') || message.task.toLowerCase().includes('image') || message.task.toLowerCase().includes('form')) {
      visualizer.startScan('ANALYZING', 1400);
    }

    (async () => {
      try {
        const loopResult = await runAutonomousAgentLoop(message.task, {
          maxSteps: 5,
          settlingDelayMs: 400,
        });

        const lastStep = loopResult.lastStep;

        // If an element was interacted with, highlight it in-situ with holographic brackets
        if (lastStep?.firewallResult?.action?.element_id && lastStep?.pageModel) {
          visualizer.updateBadge('ACTING');
          const targetEl = resolveDOMElement(lastStep.firewallResult.action.element_id, lastStep.pageModel);
          if (targetEl && targetEl instanceof HTMLElement) {
            visualizer.highlightTarget(targetEl, lastStep.firewallResult.action.element_id);
          }
        }

        // Complete state
        visualizer.updateBadge('COMPLETE');
        setTimeout(() => {
          visualizer.setActive(false);
        }, 4000);

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
        visualizer.setActive(false);
        sendResponse({
          status: 'ERROR',
          task: message.task,
          error: err.message || 'Unknown error occurred during agent execution loop.',
        });
      }
    })();

    return true; // Keep message channel open for async response
  } else if (message.type === 'TAKE_CONTROL') {
    visualizer.updateBadge('PAUSED');
    sendResponse({ status: 'PAUSED' });
  }
});
