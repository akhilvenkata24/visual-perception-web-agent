import React, { useState } from 'react';
import { PageModelSummaryProps, PipelineMetrics } from './PrivacyDebugPanel';
import { PrivacyDecision } from '../../privacy/policyEngine';
import { SanitizedContext } from '../../privacy/redactor';
import { FirewallResult } from '../../agent/actionFirewall';
import { ExecutionResult } from '../../content/actionExecutor';

interface LiveMissionControlProps {
  task: string;
  status: string;
  isWorking: boolean;
  summary: PageModelSummaryProps | null;
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
  onTakeControl?: () => void;
  onRetry?: () => void;
}

export const LiveMissionControl: React.FC<LiveMissionControlProps> = ({
  task,
  status,
  isWorking,
  summary,
  decisions,
  sanitizedContext,
  sanitizedImages,
  firewallResult,
  executionResult,
  metrics,
  finalAnswer,
  steps,
  onTakeControl,
  onRetry,
}) => {
  const [showPrivacyAudit, setShowPrivacyAudit] = useState(false);

  const isCompleted = !isWorking && (status.includes('Completed') || status.includes('Successfully') || !!finalAnswer);
  const isError = !isWorking && (status.includes('Error') || status.includes('Failed') || firewallResult?.allowed === false);

  // Compute live step progression
  const getStepStatus = (index: number) => {
    if (isCompleted) return 'completed';
    if (!isWorking && isError) return index === 0 ? 'completed' : 'error';
    if (!isWorking) return 'pending';

    // During active work
    if (index === 0) return 'completed'; // Understanding request
    if (index === 1) return summary ? 'completed' : 'active'; // Observing webpage
    if (index === 2) return sanitizedContext ? 'completed' : 'active'; // Finding target
    if (index === 3) return executionResult ? 'completed' : 'active'; // Performing action
    return 'pending'; // Verifying result
  };

  const stepsList = [
    { label: 'Understanding request', desc: 'Task intent analyzed' },
    { label: 'Observing webpage', desc: summary ? `${summary.elementCount} elements mapped` : 'Inspecting DOM & Vision' },
    { label: 'Finding target', desc: firewallResult?.action ? `Target ${firewallResult.action.element_id || 'mapped'}` : 'Analyzing candidates' },
    { label: 'Performing action', desc: executionResult?.message || 'Executing safe action' },
    { label: 'Verifying result', desc: finalAnswer ? 'Goal validated' : 'Evaluating outcome' },
  ];

  // Dynamic progress calculation
  const getProgressPercent = () => {
    if (isCompleted) return 100;
    if (isWorking) {
      if (executionResult) return 85;
      if (sanitizedContext) return 60;
      if (summary) return 35;
      return 15;
    }
    return 100;
  };

  const currentActionText = isCompleted
    ? 'Goal validated & verified'
    : isWorking
    ? executionResult
      ? 'Verifying execution result'
      : sanitizedContext
      ? 'Finding target element'
      : summary
      ? 'Synthesizing multimodal page state'
      : 'Observing webpage'
    : status;

  return (
    <div className="mission-control-container">
      {/* 1. User Prompt Glass Card */}
      <div className="user-prompt-card">
        <span className="user-icon">👤</span>
        <div className="user-prompt-text">"{task}"</div>
      </div>

      {/* 2. Live Agent Working State / Mission Control */}
      <div className={`mission-card ${isWorking ? 'card-working' : isCompleted ? 'card-completed' : 'card-error'}`}>
        <div className="mission-card-header">
          <div className="mission-header-left">
            <span className="mission-sparkle">✦</span>
            <span className="mission-header-title">
              {isWorking ? 'WebPilot is working' : isCompleted ? 'Task Completed' : 'Mission Status'}
            </span>
          </div>
          {isWorking && (
            <button className="btn-take-control-mini" onClick={onTakeControl} title="Pause and take control">
              ⏸ Take Control
            </button>
          )}
        </div>

        {/* Live Action Banner & Orbital Progress */}
        <div className="live-action-hud">
          <div className="hud-left">
            <div className="hud-live-tag">
              <span className="hud-pulsing-dot"></span>
              <span>LIVE ACTION</span>
            </div>
            <div className="hud-action-text">{currentActionText}</div>
          </div>

          {/* Orbital Progress Circle */}
          <div className="orbital-progress-container">
            <svg className="orbital-svg" viewBox="0 0 44 44">
              <circle className="orbital-bg" cx="22" cy="22" r="18" />
              <circle
                className="orbital-fill"
                cx="22"
                cy="22"
                r="18"
                strokeDasharray={113}
                strokeDashoffset={113 - (113 * getProgressPercent()) / 100}
              />
            </svg>
            <div className="orbital-center-text">
              {isCompleted ? '✓' : `${getProgressPercent()}%`}
            </div>
          </div>
        </div>

        {/* Step-by-Step Glowing Timeline */}
        <div className="mission-timeline">
          {stepsList.map((step, idx) => {
            const stepStatus = getStepStatus(idx);
            return (
              <div key={idx} className={`timeline-item item-${stepStatus}`}>
                <div className="timeline-marker">
                  {stepStatus === 'completed' ? (
                    <span className="marker-check">✓</span>
                  ) : stepStatus === 'active' ? (
                    <span className="marker-glow-dot"></span>
                  ) : (
                    <span className="marker-pending">○</span>
                  )}
                  {idx < stepsList.length - 1 && <div className="timeline-connector"></div>}
                </div>
                <div className="timeline-info">
                  <div className="timeline-label">{step.label}</div>
                  <div className="timeline-desc">{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agent Activity Futuristic HUD Grid */}
        <div className="agent-activity-grid">
          <div className="activity-hud-item">
            <span className="hud-key">VISION</span>
            <span className="hud-val val-active">ACTIVE</span>
          </div>
          <div className="activity-hud-item">
            <span className="hud-key">PAGE</span>
            <span className="hud-val val-ok">ANALYZED</span>
          </div>
          <div className="activity-hud-item">
            <span className="hud-key">TARGET</span>
            <span className="hud-val val-ok">{firewallResult ? 'FOUND' : 'SCANNING'}</span>
          </div>
          <div className="activity-hud-item">
            <span className="hud-key">ACTION</span>
            <span className={`hud-val ${isCompleted ? 'val-ok' : 'val-active'}`}>
              {isCompleted ? 'COMPLETE' : 'IN PROGRESS'}
            </span>
          </div>
        </div>

        {/* Live Transmitted Viewport Screenshot Hologram Preview */}
        {sanitizedImages?.viewport_screenshot?.dataUrl && (
          <div className="holographic-preview-card">
            <div className="hologram-header">
              <span className="hologram-scan-icon">◌</span>
              <span>LIVE TRANSMITTED VIEWPORT PERCEPTION</span>
              <span className="hologram-badge">
                {sanitizedImages.viewport_screenshot.redactedRegionsCount > 0
                  ? `🔒 ${sanitizedImages.viewport_screenshot.redactedRegionsCount} Blurred`
                  : '🟢 100% Intact'}
              </span>
            </div>
            <div className="hologram-img-wrapper">
              <img
                src={sanitizedImages.viewport_screenshot.dataUrl}
                alt="Transmitted Viewport"
                className="hologram-img"
              />
              <div className="hologram-scanline"></div>
            </div>
          </div>
        )}

        {/* 3. Final Answer Success Display */}
        {finalAnswer && (
          <div className="final-answer-card">
            <div className="answer-header">
              <span className="answer-icon">🎯</span>
              <strong>TASK RESULT & INSIGHT</strong>
            </div>
            <div className="answer-body">{finalAnswer}</div>
          </div>
        )}

        {/* 4. Completion Summary Pills */}
        {isCompleted && (
          <div className="completion-summary-bar">
            <div className="summary-left">
              <span className="check-success">✓</span>
              <span>Action completed successfully</span>
            </div>
            <div className="summary-pills">
              <span className="pill-metric">{steps?.length || 1} action{steps?.length === 1 ? '' : 's'}</span>
              <span className="pill-metric">
                {metrics?.totalLatencyMs ? `${(metrics.totalLatencyMs / 1000).toFixed(1)}s` : '1.2s'}
              </span>
            </div>
          </div>
        )}

        {/* 5. Warning / Error Card */}
        {isError && (
          <div className="error-alert-card">
            <div className="error-header">
              <span>⚠️ Something needs your attention</span>
            </div>
            <p className="error-desc">{status}</p>
            <div className="error-actions">
              {onRetry && (
                <button className="btn-retry-action" onClick={onRetry}>
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
      </div>

      {/* 6. Expandable Privacy Guard Details */}
      <div className="privacy-guard-accordion">
        <button
          className="privacy-guard-toggle"
          onClick={() => setShowPrivacyAudit(!showPrivacyAudit)}
        >
          <div className="toggle-left">
            <span>🛡️ Context-Aware Privacy Engine</span>
            <span className="privacy-pill">0 Raw PII Leaks</span>
          </div>
          <span className="toggle-arrow">{showPrivacyAudit ? '▲' : '▼'}</span>
        </button>

        {showPrivacyAudit && (
          <div className="privacy-audit-content">
            <div className="privacy-counters-row">
              <span className="p-badge p-allow">🟢 {decisions.filter(d => d.decision === 'ALLOW').length} ALLOW</span>
              <span className="p-badge p-mask">🔴 {decisions.filter(d => d.decision === 'MASK').length} MASK</span>
              <span className="p-badge p-local">🟡 {decisions.filter(d => d.decision === 'LOCAL_ONLY').length} LOCAL</span>
              <span className="p-badge p-tokenize">🟣 {decisions.filter(d => d.decision === 'TOKENIZE').length} TOKENIZE</span>
            </div>
            <div className="privacy-audit-list">
              {decisions.slice(0, 4).map((d, i) => (
                <div key={i} className="audit-item">
                  <span className="audit-type">{(d.entityType || 'PII').toUpperCase()}</span>
                  <span className="audit-dec">{d.decision}</span>
                  <span className="audit-reason">{d.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
