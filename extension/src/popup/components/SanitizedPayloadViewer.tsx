// Phase 5: Sanitized Payload Viewer Component
// Collapsible JSON viewer showing real SanitizedContext payload ready for network boundary.
// Strictly DISPLAY ONLY. No fake static payloads.

import React, { useState } from 'react';
import { SanitizedContext } from '../../privacy/redactor';

interface SanitizedPayloadViewerProps {
  sanitizedContext: SanitizedContext;
}

export const SanitizedPayloadViewer: React.FC<SanitizedPayloadViewerProps> = ({ sanitizedContext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="payload-viewer-container">
      <button
        type="button"
        className="toggle-payload-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '🔽 Hide Sanitized Network Payload' : '▶️ View Sanitized Network Payload'}
      </button>

      {isOpen && (
        <div className="payload-code-block">
          <div className="payload-header">
            <span>Payload Elements: {sanitizedContext.elements.length}</span>
            <span>Task: "{sanitizedContext.task}"</span>
          </div>
          <pre>
            <code>{JSON.stringify(sanitizedContext, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
