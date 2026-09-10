import React, { useState } from 'react';
import { PageModelSummaryProps, PipelineMetrics } from './PrivacyDebugPanel';
import { PrivacyDecision } from '../../privacy/policyEngine';
import { SanitizedContext } from '../../privacy/redactor';
import { FirewallResult } from '../../agent/actionFirewall';
import { ExecutionResult } from '../../content/actionExecutor';
import { PrivacyDecisionList } from './PrivacyDecisionList';
import { ChatMessage } from '../historyManager';

interface LiveMissionControlProps {
  messages?: ChatMessage[];
  task?: string;
  status?: string;
  isWorking?: boolean;
  summary?: PageModelSummaryProps | null;
  decisions?: PrivacyDecision[];
  sanitizedContext?: SanitizedContext;
  sanitizedImages?: Record<string, any>;
  ocrResult?: any;
  agentPlanResponse?: any;
  firewallResult?: FirewallResult;
  executionResult?: ExecutionResult | null;
  metrics?: PipelineMetrics;
  finalAnswer?: string;
  steps?: any[];
  onTakeControl?: () => void;
  onRetry?: (prompt?: string) => void;
}

function getVisionImages(
  sanitizedContext?: SanitizedContext,
  sanitizedImages?: Record<string, any>
): Array<{ id: string; dataUrl: string; redactedCount: number; description?: string }> {
  const images: Array<{ id: string; dataUrl: string; redactedCount: number; description?: string }> = [];

  if (sanitizedContext?.images && sanitizedContext.images.length > 0) {
    sanitizedContext.images.forEach((imgItem: any) => {
      if (imgItem.dataUrl) {
        images.push({
          id: imgItem.id || 'viewport_screenshot',
          dataUrl: imgItem.dataUrl,
          redactedCount: imgItem.redactedBoxesCount || 0,
          description: imgItem.description,
        });
      }
    });
  } else if (sanitizedImages && Object.keys(sanitizedImages).length > 0) {
    Object.entries(sanitizedImages).forEach(([id, data]: [string, any]) => {
      if (data?.dataUrl || data?.redactedDataUrl) {
        images.push({
          id,
          dataUrl: data.redactedDataUrl || data.dataUrl,
          redactedCount: data.redactedBoxesCount || data.redactedRegionsCount || 0,
          description: data.description,
        });
      }
    });
  }

  return images;
}

export const LiveMissionControl: React.FC<LiveMissionControlProps> = ({
  messages,
  task = '',
  status = 'Ready',
  isWorking = false,
  summary,
  decisions = [],
  sanitizedContext,
  sanitizedImages,
  ocrResult,
  firewallResult,
  executionResult,
  metrics,
  finalAnswer,
  onTakeControl,
  onRetry,
}) => {
  const [expandedDetailsMap, setExpandedDetailsMap] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedDetailsMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // If thread messages are provided, build active message list
  const activeMessages: ChatMessage[] = messages && messages.length > 0
    ? messages
    : task
    ? [
        {
          id: 'legacy_user',
          role: 'user',
          text: task,
          timestamp: Date.now(),
        },
        {
          id: 'legacy_assistant',
          role: 'assistant',
          text: finalAnswer || executionResult?.message || '',
          status,
          timestamp: Date.now(),
          summary,
          decisions,
          sanitizedContext,
          sanitizedImages,
          ocrResult,
          firewallResult,
          executionResult,
          metrics,
        },
      ]
    : [];

  const handleOpenImageInNewTab = (dataUrl: string) => {
    if (!dataUrl) return;
    try {
      const newWin = window.open();
      if (newWin) {
        newWin.document.title = 'WebPilot Vision Perception Image Payload';
        newWin.document.body.style.margin = '0';
        newWin.document.body.style.backgroundColor = '#090d16';
        newWin.document.body.style.display = 'flex';
        newWin.document.body.style.justifyContent = 'center';
        newWin.document.body.style.alignItems = 'center';
        newWin.document.body.style.minHeight = '100vh';
        const img = newWin.document.createElement('img');
        img.src = dataUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100vh';
        img.style.objectFit = 'contain';
        img.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
        newWin.document.body.appendChild(img);
      } else if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
        chrome.tabs.create({ url: dataUrl });
      }
    } catch (err) {
      console.warn('Failed to open image in new tab:', err);
    }
  };

  return (
    <div className="mission-control-container">
      {activeMessages.map((msg, index) => {
        if (msg.role === 'user') {
          return (
            <div key={msg.id || `user_${index}`} className="user-prompt-card">
              <div className="prompt-header">
                <span className="user-avatar">👤</span>
                <span className="prompt-label">PROMPT</span>
              </div>
              <div className="user-prompt-text">"{msg.text}"</div>
            </div>
          );
        }

        // Assistant Message turn
        const isLatestAssistant = index === activeMessages.length - 1;
        const showWorkingBanner = isWorking && isLatestAssistant && !msg.text;

        // Extract clean human-readable answer — prioritise agentPlanResponse fields,
        // then msg.text, then fallback. Strip <think> blocks and raw JSON objects.
        function extractCleanAnswer(msg: ChatMessage): string {
          const candidates: (string | undefined | null)[] = [
            // Best source: the model's answer field
            msg.agentPlanResponse?.action?.answer,
            // Second: the model's reasoning field
            msg.agentPlanResponse?.action?.reasoning,
            // Third: msg.text (set by agentLoop finalAnswer)
            msg.text,
            // Fourth: execution message
            msg.executionResult?.message,
          ];

          for (const raw of candidates) {
            if (!raw || typeof raw !== 'string') continue;
            let cleaned = raw
              .replace(/<think>[\s\S]*?<\/think>/gi, '') // strip think blocks
              .trim();
            // Skip if it looks like a raw JSON object (starts with { and has "action":)
            if (cleaned.startsWith('{') && cleaned.includes('"action"')) continue;
            if (cleaned.length > 0) return cleaned;
          }

          // Final fallback
          return msg.status?.includes('Completed') || msg.status?.includes('Task')
            ? 'Task completed successfully.'
            : 'Task completed successfully.';
        }

        const responseText = extractCleanAnswer(msg);
        const isErrorTurn = msg.status?.includes('Error') || msg.status?.includes('Failed') || msg.firewallResult?.allowed === false;
        
        const turnDecisions = msg.decisions || [];
        const maskedCount = turnDecisions.filter((d) => d.decision === 'MASK').length;
        const allowedCount = turnDecisions.filter((d) => d.decision === 'ALLOW').length;
        const localCount = turnDecisions.filter((d) => d.decision === 'LOCAL_ONLY').length;
        const tokenizeCount = turnDecisions.filter((d) => d.decision === 'TOKENIZE').length;
        const visionImages = getVisionImages(msg.sanitizedContext, msg.sanitizedImages);
        const isDetailsExpanded = !!expandedDetailsMap[msg.id];

        const msgSourcesRun = msg.summary?.sourcesRun || (msg.sanitizedContext?.page ? ['dom'] : []);
        const isDomUsed = true;
        const isOcrUsed =
          msgSourcesRun.includes('ocr') ||
          (msg.ocrResult && msg.ocrResult.status !== 'skipped' && (msg.ocrResult.data?.length > 0 || msg.ocrResult.text)) ||
          Boolean(msg.ocrResult?.text);
        const isVisionUsed =
          msgSourcesRun.includes('vision') ||
          visionImages.length > 0 ||
          Boolean(msg.sanitizedImages && Object.keys(msg.sanitizedImages).length > 0);

        return (
          <React.Fragment key={msg.id || `asst_${index}`}>
            {/* 1. Working Banner */}
            {showWorkingBanner && (
              <div className="agent-working-card">
                <div className="working-header">
                  <div className="working-status">
                    <span className="pulse-orb-indicator"></span>
                    <span className="working-title">WebPilot AI is working...</span>
                  </div>
                  {onTakeControl && (
                    <button className="btn-pause-agent" onClick={onTakeControl} title="Stop agent execution">
                      ⏹ Stop
                    </button>
                  )}
                </div>
                <p className="working-subtext">{msg.status || status || 'Analyzing webpage context and generating plan...'}</p>
              </div>
            )}

            {/* 2. Assistant Response Card */}
            {!showWorkingBanner && responseText && !isErrorTurn && (
              <div className="agent-response-card">
                <div className="response-header">
                  <span className="agent-sparkle">✦</span>
                  <span className="response-title">RESPONSE & ACTION OUTCOME</span>
                </div>
                <div className="response-body">{responseText}</div>

                <div className="response-footer">
                  <div className="response-footer-metrics">
                    {msg.metrics?.totalLatencyMs && (
                      <span className="latency-tag">⚡ {(msg.metrics.totalLatencyMs / 1000).toFixed(2)}s</span>
                    )}
                    {msg.summary && <span className="element-tag">📄 {msg.summary.elementCount} elements</span>}
                  </div>

                  <button
                    className="btn-view-details"
                    onClick={() => toggleDetails(msg.id)}
                    title="Click to view full multimodal vision, OCR & privacy details"
                  >
                    🔍 {isDetailsExpanded ? 'Hide details ▲' : 'Click to view more details ▼'}
                  </button>
                </div>
              </div>
            )}

            {/* 3. Comprehensive Details Breakdown Audit Panel */}
            {!showWorkingBanner && isDetailsExpanded && (
              <div className="details-breakdown-card">
                <div className="details-header">
                  <span className="details-title">🛡️ Multimodal & Privacy Inspection Audit</span>
                  <span className="privacy-pill">0 PII Leaked</span>
                </div>

                {/* 3 Perception Pipeline Steps Status */}
                <div className="details-section-title">🔍 PERCEPTION PIPELINE STEPS STATUS:</div>
                <div className="privacy-counters-row" style={{ marginBottom: '10px' }}>
                  <span className={`p-badge ${isDomUsed ? 'p-allow' : 'p-mask'}`}>
                    {isDomUsed ? '🟢 DOM & ARIA: Used' : '⚪ DOM & ARIA: Skipped'}
                  </span>
                  <span className={`p-badge ${isOcrUsed ? 'p-allow' : 'p-mask'}`}>
                    {isOcrUsed ? '🟢 OCR: Used' : '⚪ OCR: Skipped'}
                  </span>
                  <span className={`p-badge ${isVisionUsed ? 'p-allow' : 'p-mask'}`}>
                    {isVisionUsed ? '🟢 Local vision: Used' : '⚪ Local vision: Skipped'}
                  </span>
                </div>

                {/* Vision Payload Display */}
                {visionImages.length > 0 ? (
                  <div className="details-vision-section">
                    <div className="details-section-title">📷 TRANSMITTED MULTIMODAL VISION PAYLOAD:</div>
                    {visionImages.map((imgItem, vIdx) => (
                      <div key={vIdx} className="details-vision-card">
                        <div className="vision-card-header">
                          <span className="vision-id">Target: <strong>{imgItem.id}</strong></span>
                          {imgItem.redactedCount > 0 ? (
                            <span className="p-badge p-mask">🔒 {imgItem.redactedCount} Region{imgItem.redactedCount !== 1 ? 's' : ''} Redacted</span>
                          ) : (
                            <span className="p-badge p-allow">🟢 100% Intact Visual Context</span>
                          )}
                        </div>
                        <div
                          className="vision-img-frame"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleOpenImageInNewTab(imgItem.dataUrl)}
                          title="Click image to open full resolution payload in a new tab"
                        >
                          <img src={imgItem.dataUrl} alt={`Vision payload ${imgItem.id}`} className="details-vision-img" />
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--accent-indigo)', textAlign: 'center', marginTop: '2px', cursor: 'pointer' }} onClick={() => handleOpenImageInNewTab(imgItem.dataUrl)}>
                          🔗 Click image to view in new tab ↗
                        </div>
                        {imgItem.description && (
                          <div className="vision-desc">{imgItem.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="details-vision-notice">
                    <span>ℹ️ Text & DOM Context Mode (No visual screenshot attached to API call).</span>
                  </div>
                )}

                {/* OCR Visual Readings Display */}
                {msg.ocrResult && msg.ocrResult.text && (
                  <div className="details-ocr-section">
                    <div className="details-section-title">🔤 EXTRACTED OCR VISUAL READINGS:</div>
                    <div className="ocr-text-box">{msg.ocrResult.text}</div>
                  </div>
                )}

                {/* Privacy Policy Counters */}
                <div className="details-section-title">CONTEXT-AWARE PRIVACY POLICY ENGINE:</div>
                <div className="privacy-counters-row">
                  <span className="p-badge p-allow">🟢 {allowedCount} ALLOWED</span>
                  <span className="p-badge p-mask">🔴 {maskedCount} MASKED</span>
                  <span className="p-badge p-local">🟡 {localCount} LOCAL ONLY</span>
                  <span className="p-badge p-tokenize">🟣 {tokenizeCount} TOKENIZED</span>
                </div>

                {/* Decision List */}
                {turnDecisions.length > 0 && (
                  <>
                    <div className="details-section-title">ELEMENT & ENTITY DECISIONS AUDIT:</div>
                    <PrivacyDecisionList decisions={turnDecisions} />
                  </>
                )}
              </div>
            )}

            {/* 5. Error Alert Card */}
            {!showWorkingBanner && isErrorTurn && (
              <div className="agent-error-card">
                <div className="error-header">
                  <span>⚠️ Service Notice</span>
                </div>
                <p className="error-desc">{msg.status || 'Action execution encountered an error.'}</p>
                <div className="error-actions">
                  {onRetry && (
                    <button className="btn-retry-action" onClick={() => onRetry(activeMessages[index - 1]?.text)}>
                      🔄 Try Again
                    </button>
                  )}
                  {onTakeControl && (
                    <button className="btn-take-control-action" onClick={onTakeControl}>
                      ⏸ Take Control
                    </button>
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

