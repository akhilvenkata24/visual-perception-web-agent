import React, { useState, KeyboardEvent } from 'react';
import { ThreeOrbCanvas } from './ThreeOrbCanvas';

interface FloatingInputBoxProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isWorking: boolean;
  onCaptureScreenshot?: () => void;
}

export const FloatingInputBox: React.FC<FloatingInputBoxProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  isWorking,
  onCaptureScreenshot,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isWorking) {
        onSubmit();
      }
    }
  };

  return (
    <div className={`floating-input-spatial ${isFocused ? 'focused' : ''} ${isWorking ? 'working' : ''}`}>
      <div className="input-glow-border"></div>
      
      <div className="input-field-wrapper">
        <textarea
          className="spatial-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Tell me what to do on this page..."
          rows={2}
          disabled={isWorking}
        />
      </div>

      <div className="input-toolbar-row">
        <div className="toolbar-left-icons">
          <button
            type="button"
            className="btn-tool-icon"
            onClick={onCaptureScreenshot}
            title="Inspect Current Page"
            disabled={isWorking}
          >
            📸 Inspect Page
          </button>
        </div>

        {isWorking ? (
          <button
            type="button"
            className="btn-spatial-stop"
            onClick={onStop}
            title="Stop agent action"
          >
            <span className="stop-icon">⏹</span>
            <span className="stop-text">Stop</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn-spatial-send"
            onClick={onSubmit}
            disabled={!value.trim()}
            title="Run task with WebPilot AI"
          >
            <div className="send-orb-container">
              <ThreeOrbCanvas state="ready" size={24} interactive={false} />
            </div>
            <span className="send-arrow">➤</span>
          </button>
        )}
      </div>
    </div>
  );
};
