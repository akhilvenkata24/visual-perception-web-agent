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
    if (
      message.task.toLowerCase().includes('screen') ||
      message.task.toLowerCase().includes('image') ||
      message.task.toLowerCase().includes('form')
    ) {
      visualizer.startScan('ANALYZING', 1400);
    }

    // Acknowledge receipt immediately so chrome.tabs.sendMessage never times out
    sendResponse({ status: 'ACKNOWLEDGED' });

    (async () => {
      try {
        const loopResult = await runAutonomousAgentLoop(message.task, {
          maxSteps: 5,
          settlingDelayMs: 800,
          onStepProgress: (stepProgress) => {
            // Send live progress update for each step to popup UI
            if (stepProgress.firewallResult?.action?.element_id && stepProgress.pageModel) {
              visualizer.updateBadge('ACTING');
              const targetEl = resolveDOMElement(
                stepProgress.firewallResult.action.element_id,
                stepProgress.pageModel
              );
              if (targetEl && targetEl instanceof HTMLElement) {
                visualizer.highlightTarget(targetEl, stepProgress.firewallResult.action.element_id);
              }
            }

            chrome.runtime.sendMessage({
              type: 'AGENT_STEP_PROGRESS',
              task: message.task,
              stepProgress,
            }).catch(() => {});
          },
        });

        // Complete state
        visualizer.updateBadge('COMPLETE');
        setTimeout(() => {
          visualizer.clearAll();
        }, 2000);

        const lastStep = loopResult.lastStep;
        chrome.runtime.sendMessage({
          type: 'AGENT_TASK_COMPLETE',
          task: message.task,
          loopResult: {
            status: loopResult.status,
            task: loopResult.task,
            totalSteps: loopResult.totalSteps,
            finalAnswer: loopResult.finalAnswer,
            steps: loopResult.steps,
            error: loopResult.error,
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
          },
        }).catch(() => {});
      } catch (err: any) {
        console.error('🚨 [Agent Loop Error]', err);
        visualizer.clearAll();
        chrome.runtime.sendMessage({
          type: 'AGENT_TASK_COMPLETE',
          task: message.task,
          loopResult: {
            status: 'ERROR',
            task: message.task,
            error: err.message || 'Unknown error occurred during agent execution loop.',
          },
        }).catch(() => {});
      }
    })();

    return false; // Instant response sent synchronously
  } else if (message.type === 'TAKE_CONTROL' || message.type === 'STOP_TASK' || message.type === 'CLEANUP_OVERLAYS') {
    visualizer.clearAll();
    sendResponse({ status: 'CLEARED' });
  }
});
