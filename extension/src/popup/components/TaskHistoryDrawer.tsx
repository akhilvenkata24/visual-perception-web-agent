import React from 'react';
import { TaskHistoryItem } from '../historyManager';

interface TaskHistoryDrawerProps {
  history: TaskHistoryItem[];
  onSelectHistoryItem: (item: TaskHistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onClose: () => void;
}

export const TaskHistoryDrawer: React.FC<TaskHistoryDrawerProps> = ({
  history,
  onSelectHistoryItem,
  onDeleteHistoryItem,
  onClearHistory,
  onClose,
}) => {
  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="history-drawer">
      <div className="history-header">
        <div className="history-title">
          <span>🕒 Task History</span>
          <span className="history-count">({history.length})</span>
        </div>
        <div className="history-actions">
          {history.length > 0 && (
            <button className="btn-clear-history" onClick={onClearHistory} title="Clear all history">
              Clear All
            </button>
          )}
          <button className="btn-close-history" onClick={onClose} title="Close history">
            ✕
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>No past tasks found.</p>
          <span>Tasks you run will appear here automatically and persist across sessions.</span>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => {
            const isSuccess = item.status.includes('Completed') || item.status.includes('Successfully');
            const isDenied = item.status.includes('Denied') || item.status.includes('Blocked');
            
            return (
              <div key={item.id} className="history-card" onClick={() => onSelectHistoryItem(item)}>
                <div className="history-card-top">
                  <span className="history-card-time">
                    {formatDate(item.timestamp)} • {formatTime(item.timestamp)}
                  </span>
                  <div className="history-card-badges">
                    <span className={`history-status-badge ${isSuccess ? 'badge-success' : isDenied ? 'badge-denied' : 'badge-neutral'}`}>
                      {isSuccess ? '✓ Completed' : isDenied ? '🛡️ Denied' : 'Status'}
                    </span>
                    <button
                      className="btn-delete-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteHistoryItem(item.id);
                      }}
                      title="Delete this task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="history-card-task">"{item.task}"</div>

                {item.finalAnswer && (
                  <div className="history-card-answer">
                    <strong>Answer:</strong> {item.finalAnswer}
                  </div>
                )}

                <div className="history-card-footer">
                  <span>{item.decisions ? `${item.decisions.length} Decisions` : ''}</span>
                  <span className="history-load-hint">Click to load details →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
