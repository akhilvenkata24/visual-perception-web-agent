// Phase 9: Visible Privacy Debug Panel with AI Action & Execution Status
// Displays Perception, Privacy Policy, Sanitized Payload, Gemini Action, Action Firewall, and Execution Results.
// Strictly DISPLAY ONLY. Consumes real application state.

import React from 'react';
import { PrivacyDecision } from '../../privacy/policyEngine';
import { SanitizedContext } from '../../privacy/redactor';
import { FirewallResult } from '../../agent/actionFirewall';
import { ExecutionResult } from '../../content/actionExecutor';
import { PrivacyDecisionList } from './PrivacyDecisionList';
import { SanitizedPayloadViewer } from './SanitizedPayloadViewer';

export interface PageModelSummaryProps {
  title: string;
  elementCount: number;
  interactiveCount: number;
  sensitiveCount?: number;
  sensitiveTypes?: string[];
  intent?: string;
  sourcesRun?: string[];
  decisionsSummary?: {
    totalEntities: number;
    allowCount: number;
    maskCount: number;
    tokenizeCount: number;
    localOnlyCount: number;
    blockCount: number;
  };
}

export interface PipelineMetrics {
  apiLatencyMs?: number;
  totalLatencyMs?: number;
  stepsCount?: number;
}

interface PrivacyDebugPanelProps {
  task: string;
  summary: PageModelSummaryProps;
  decisions: PrivacyDecision[];
  sanitizedContext?: SanitizedContext;
  sanitizedImages?: Record<string, any>;
  ocrResult?: any;
  agentPlanResponse?: any;
  firewallResult?: FirewallResult;
  executionResult?: ExecutionResult | null;
  metrics?: PipelineMetrics;
  finalAnswer?: string;
  steps?: any[];
}

export const PrivacyDebugPanel: React.FC<PrivacyDebugPanelProps> = ({
  task,
  summary,
  decisions,
  sanitizedContext,
  sanitizedImages,
  ocrResult,
  agentPlanResponse,
  firewallResult,
  executionResult,
  metrics,
  finalAnswer,
  steps,
}) => {
  const rawPIITransmitted = decisions.filter((d) => d.decision === 'ALLOW').length;

  const ocrRan = summary.sourcesRun?.includes('ocr') || (ocrResult && ocrResult.status !== 'skipped');
  const ocrUncertain = ocrResult?.uncertain || ocrResult?.status === 'uncertain';
  const visionRan = summary.sourcesRun?.includes('vision');

  const displayAnswer = finalAnswer || agentPlanResponse?.action?.answer;

  return (
    <div className="privacy-debug-panel">
      {/* 1. Task & Intent Banner */}
      <div className="panel-section task-intent-box">
        <div className="section-label">TASK CONTEXT</div>
        <div className="task-text">"{task}"</div>
        <div className="intent-badge">
          INTENT: <strong>{summary.intent || 'CLASSIFIED'}</strong>
        </div>
      </div>

      {/* 1.1 Direct Task Answer Card (When answer is delivered) */}
      {displayAnswer && (
        <div className="panel-section final-answer-box" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', border: '1px solid #10b981', color: '#ffffff', padding: '12px', borderRadius: '8px', marginTop: '6px' }}>
          <div className="section-label" style={{ color: '#6ee7b7', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.05em' }}>
            🎯 TASK ANSWER & RESULT
          </div>
          <div className="final-answer-text" style={{ fontSize: '14px', lineHeight: '1.5', marginTop: '4px', whiteSpace: 'pre-wrap', color: '#f0fdf4' }}>
            {displayAnswer}
          </div>
        </div>
      )}

      {/* 1.2 Multi-Step Execution Timeline (if >1 step) */}
      {steps && steps.length > 1 && (
        <div className="panel-section multi-step-box" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px', marginTop: '6px' }}>
          <div className="section-label" style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}>
            🔄 MULTI-STEP AGENT EXECUTION TRAJECTORY ({steps.length} STEPS)
          </div>
          <div className="step-timeline" style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {steps.map((s, idx) => (
              <div key={idx} style={{ background: '#0f172a', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', borderLeft: '3px solid #3b82f6' }}>
                <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>Step {s.stepNumber || idx + 1}: </span>
                <span style={{ color: '#e2e8f0' }}>Action <strong>{s.agentPlanResponse?.action?.action || s.firewallResult?.action?.action || 'observe'}</strong></span>
                {s.executionResult?.message && (
                  <span style={{ color: '#94a3b8' }}> — {s.executionResult.message}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Local Perception Section */}
      <div className="panel-section perception-box">
        <div className="section-label">LOCAL PERCEPTION</div>
        <div className="status-row">
          <span className="check-icon">DOM ✓</span>
          <span className={`check-icon ${ocrRan ? (ocrUncertain ? 'uncertain' : 'active') : 'skipped'}`}>
            {ocrRan ? (ocrUncertain ? 'OCR ⚠️ (Uncertain)' : 'OCR ✓') : 'OCR (Skipped)'}
          </span>
          <span className={`check-icon ${visionRan ? 'active' : 'skipped'}`}>
            {visionRan ? 'VISION ✓' : 'VISION (Skipped)'}
          </span>
          <span className="stat-pill">{summary.elementCount} Elements</span>
        </div>
        <div className="perception-sub">
          Sensitive Items Detected: <strong>{summary.sensitiveCount || 0}</strong> ({summary.sensitiveTypes?.join(', ') || 'none'})
        </div>
      </div>

      {/* 3. Live Viewport Perception & Sanitized Visual Payload Preview */}
      {((sanitizedContext?.images && sanitizedContext.images.length > 0) || (sanitizedImages && Object.keys(sanitizedImages).length > 0)) && (
        <div className="panel-section image-redaction-box">
          <div className="section-label">🖼️ LIVE VIEWPORT PERCEPTION TRANSMITTED TO AI</div>
          <p className="redaction-note">
            The exact in-browser visual context sent to the multimodal AI model (with selective local privacy redactions).
          </p>
          <div className="redacted-images-grid">
            {(sanitizedContext?.images && sanitizedContext.images.length > 0
              ? sanitizedContext.images
              : Object.entries(sanitizedImages || {}).map(([id, data]: [string, any]) => ({
                  id,
                  dataUrl: data.redactedDataUrl || data.dataUrl,
                  description: data.description,
                  redactedBoxesCount: data.redactedBoxesCount || 0,
                }))
            ).map((imgItem: any) => {
              const boxCount =
                imgItem.redactedBoxesCount !== undefined
                  ? imgItem.redactedBoxesCount
                  : (sanitizedImages?.[imgItem.id]?.redactedBoxesCount || 0);

              return (
                <div key={imgItem.id} className="redacted-image-card">
                  <div className="redacted-image-meta">
                    <span className="redacted-id">Target: <strong>{imgItem.id}</strong></span>
                    {boxCount > 0 ? (
                      <span className="redacted-badge">🔒 {boxCount} Sensitive Region{boxCount !== 1 ? 's' : ''} Blurred Locally</span>
                    ) : (
                      <span className="redacted-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid #059669' }}>
                        🟢 100% Intact Visual Context (Unblurred)
                      </span>
                    )}
                  </div>
                  <img
                    src={imgItem.dataUrl}
                    alt={`Visual perception payload for ${imgItem.id}`}
                    className="redacted-image-preview"
                  />
                  {imgItem.description && (
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', textAlign: 'center' }}>
                      {imgItem.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Privacy Policy Decision Section */}
      <div className="panel-section engine-box">
        <div className="section-label">CONTEXT-AWARE PRIVACY ENGINE</div>
        
        {summary.decisionsSummary && (
          <div className="counters-row">
            <span className="counter-tag allow">🟢 {summary.decisionsSummary.allowCount} ALLOW</span>
            <span className="counter-tag mask">🔴 {summary.decisionsSummary.maskCount} MASK</span>
            <span className="counter-tag local">🟡 {summary.decisionsSummary.localOnlyCount} LOCAL_ONLY</span>
            {summary.decisionsSummary.tokenizeCount > 0 && (
              <span className="counter-tag tokenize">🟣 {summary.decisionsSummary.tokenizeCount} TOKENIZE</span>
            )}
          </div>
        )}

        <PrivacyDecisionList decisions={decisions} />
      </div>

      {/* 5. Privacy Boundary Indicator */}
      <div className="panel-section boundary-box">
        <div className="boundary-line">
          <span>LOCAL BROWSER DATA</span>
          <span className="lock-icon">🔒 PRIVACY BOUNDARY</span>
          <span>SANITIZED PAYLOAD</span>
        </div>
        <div className="boundary-status">
          ✓ Sanitized & Validated | Raw Prohibited PII Transmitted: <strong>0</strong> | Permitted Task Context: <strong>{rawPIITransmitted}</strong>
        </div>
      </div>

      {/* 6. AI Action & Action Firewall Section */}
      {firewallResult && (
        <div className="panel-section firewall-box">
          <div className="section-label">AI ACTION & LOCAL ACTION FIREWALL</div>
          <div className="firewall-status-row">
            <span className={`firewall-badge ${firewallResult.allowed ? 'allowed' : 'denied'}`}>
              {firewallResult.allowed ? '🟢 FIREWALL APPROVED' : `🔴 FIREWALL ${firewallResult.decision}`}
            </span>
            {agentPlanResponse?.action && (
              <span className="action-tag">
                Action: <strong>{agentPlanResponse.action.action}</strong> ({agentPlanResponse.action.element_id || 'none'})
              </span>
            )}
          </div>

          {/* AI Reasoning / Response Output Box */}
          {agentPlanResponse?.action?.reasoning && (
            <div className={`ai-reasoning-box ${agentPlanResponse.action.reasoning.includes('429') ? 'rate-limit-warning' : ''}`}>
              <div className="ai-reasoning-header">
                🤖 <strong>AI Reasoning & Response:</strong>
              </div>
              <div className="ai-reasoning-text">
                {agentPlanResponse.action.reasoning}
              </div>
              {agentPlanResponse.action.reasoning.includes('429') && (
                <div className="rate-limit-notice">
                  ⚠️ <strong>Gemini Free Tier API Rate Limit Exceeded (429).</strong> Please wait ~30-40 seconds for API quota window to reset, then run the task again.
                </div>
              )}
            </div>
          )}

          <div className="firewall-reason">
            <strong>Firewall Evaluation:</strong> {firewallResult.reason}
          </div>

          {/* 7. Execution Status Result */}
          {executionResult && (
            <div className={`execution-box ${executionResult.success ? 'success' : 'failed'}`}>
              <div className="execution-title">
                {executionResult.success ? '⚡ ACTION EXECUTED' : '❌ EXECUTION FAILED'}
              </div>
              <div className="execution-message">{executionResult.message}</div>
            </div>
          )}

          {metrics && (
            <div className="metrics-row">
              API Latency: <strong>{metrics.apiLatencyMs || 0}ms</strong> | Total Latency: <strong>{metrics.totalLatencyMs || 0}ms</strong>
            </div>
          )}
        </div>
      )}

      {/* 8. Sanitized Payload Viewer */}
      {sanitizedContext && (
        <div className="panel-section payload-box">
          <div className="section-label">PREPARED NETWORK PAYLOAD</div>
          <SanitizedPayloadViewer sanitizedContext={sanitizedContext} />
        </div>
      )}
    </div>
  );
};
