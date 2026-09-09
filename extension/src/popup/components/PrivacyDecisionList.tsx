// Phase 5: Privacy Decision List Component
// Renders the list of privacy decisions and reasons produced by policyEngine.ts.
// Strictly DISPLAY ONLY. No privacy logic in React.

import React from 'react';
import { PrivacyDecision } from '../../privacy/policyEngine';

interface PrivacyDecisionListProps {
  decisions: PrivacyDecision[];
}

export const PrivacyDecisionList: React.FC<PrivacyDecisionListProps> = ({ decisions }) => {
  if (!decisions || decisions.length === 0) {
    return <div className="no-decisions">No sensitive entities detected on this page.</div>;
  }

  function getBadgeClass(decision: string): string {
    switch (decision) {
      case 'ALLOW':
        return 'badge-allow';
      case 'MASK':
        return 'badge-mask';
      case 'LOCAL_ONLY':
        return 'badge-local';
      case 'TOKENIZE':
        return 'badge-tokenize';
      case 'BLOCK':
        return 'badge-block';
      default:
        return 'badge-default';
    }
  }

  return (
    <div className="decision-list">
      {decisions.map((d, index) => (
        <div key={d.entityId || index} className="decision-item">
          <div className="decision-header">
            <span className="entity-type">{d.entityType.toUpperCase()}</span>
            <span className={`decision-badge ${getBadgeClass(d.decision)}`}>
              {d.decision}
            </span>
          </div>
          <div className="entity-context">
            <strong>Target ID:</strong> <code>{d.elementId}</code>
            {d.source && (
              <> | <strong>Sources:</strong> <span className="source-tag">{d.source.toUpperCase()}</span></>
            )}
            {d.confidence !== undefined && (
              <> | <strong>Conf:</strong> {(d.confidence * 100).toFixed(0)}%</>
            )}
          </div>

          <div className="decision-reason">
            <strong>Reason:</strong> {d.reason}
          </div>
        </div>
      ))}
    </div>
  );
};
