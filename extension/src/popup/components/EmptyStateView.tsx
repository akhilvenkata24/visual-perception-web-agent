import React from 'react';
import { ThreeOrbCanvas } from './ThreeOrbCanvas';

interface EmptyStateViewProps {
  onSelectSuggestion: (prompt: string) => void;
}

const SUGGESTIONS = [
  {
    icon: '🔍',
    title: 'Find something',
    prompt: 'Find key details on this page',
    tag: 'Inspection',
  },
  {
    icon: '📝',
    title: 'Fill a form',
    prompt: 'What are all the fields present in the form?',
    tag: 'Form Perception',
  },
  {
    icon: '📑',
    title: 'Summarize page',
    prompt: 'Summarize what can be seen on this screen',
    tag: 'Vision & DOM',
  },
  {
    icon: '⚖️',
    title: 'Compare info',
    prompt: 'Compare the profiles and options visible here',
    tag: 'Multimodal',
  },
  {
    icon: '🧭',
    title: 'Navigate & Click',
    prompt: 'Open the first active profile card',
    tag: 'Autonomous Act',
  },
];

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({ onSelectSuggestion }) => {
  return (
    <div className="empty-state-spatial">
      {/* Central 3D AI Orb */}
      <div className="central-orb-wrapper">
        <ThreeOrbCanvas state="ready" size={130} interactive={true} />
        <div className="orb-ambient-ring"></div>
      </div>

      <div className="empty-title-group">
        <h1 className="empty-main-title">What should I do for you?</h1>
        <p className="empty-sub-title">Your intelligent companion for the web.</p>
      </div>

      {/* Floating 3D Suggestion Cards */}
      <div className="suggestions-grid">
        {SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            className="spatial-suggestion-card"
            onClick={() => onSelectSuggestion(sug.prompt)}
          >
            <div className="card-glass-glow"></div>
            <div className="card-content">
              <span className="card-icon">{sug.icon}</span>
              <div className="card-text">
                <span className="card-title">{sug.title}</span>
                <span className="card-tag">{sug.tag}</span>
              </div>
            </div>
            <span className="card-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};
