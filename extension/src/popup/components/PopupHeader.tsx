import React from 'react';
import { ThreeOrbCanvas, OrbState } from './ThreeOrbCanvas';

interface PopupHeaderProps {
  orbState: OrbState;
  onOpenHistory: () => void;
  historyCount: number;
  onNewTask: () => void;
  hasActiveTask: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({
  orbState,
  onOpenHistory,
  historyCount,
  onNewTask,
  hasActiveTask,
  theme,
  onToggleTheme,
}) => {
  const getStatusLabel = () => {
    switch (orbState) {
      case 'working':
        return '✦ Working...';
      case 'analyzing':
        return '◌ Analyzing';
      case 'complete':
        return '✓ Complete';
      case 'paused':
        return '⏸ Paused';
      case 'ready':
      default:
        return '● Ready';
    }
  };

  return (
    <header className="webpilot-header">
      <div className="header-branding">
        <div className="mini-orb-container">
          <ThreeOrbCanvas state={orbState} size={28} interactive={false} />
        </div>
        <div className="brand-text-group">
          <span className="brand-title">WebPilot AI</span>
          <span className={`brand-status status-${orbState}`}>{getStatusLabel()}</span>
        </div>
      </div>

      <div className="header-controls">
        <button
          className="btn-header-icon"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark Cosmic' : 'Light Glass'} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <button
          className="btn-header-icon btn-history-icon"
          onClick={onOpenHistory}
          title="Task History"
        >
          🕒
          {historyCount > 0 && <span className="header-badge">{historyCount}</span>}
        </button>

        {hasActiveTask && (
          <button className="btn-header-new" onClick={onNewTask} title="Start new task">
            ✨ New
          </button>
        )}
      </div>
    </header>
  );
};
