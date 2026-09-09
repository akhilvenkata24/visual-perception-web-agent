import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveActiveState,
  loadActiveState,
  loadTaskHistory,
  addTaskHistoryItem,
  deleteTaskHistoryItem,
  clearTaskHistory,
} from '../historyManager';

describe('Popup History & Session State Persistence Manager', () => {
  beforeEach(async () => {
    await clearTaskHistory();
  });

  it('saves and loads active session state accurately', async () => {
    const mockState = {
      task: 'Who is this person?',
      status: 'Task Completed: Action Executed Successfully',
      summary: {
        title: 'Test Page',
        url: 'http://localhost:8080',
        elementCount: 15,
        interactiveCount: 5,
        sensitiveDetectedCount: 2,
        detectedTypes: ['person_name', 'face'],
      },
      decisions: [],
      finalAnswer: 'The person in the image is Albert Einstein.',
      timestamp: 1788980000000,
    };

    await saveActiveState(mockState);
    const loaded = await loadActiveState();

    expect(loaded).toBeDefined();
    expect(loaded?.task).toBe('Who is this person?');
    expect(loaded?.finalAnswer).toBe('The person in the image is Albert Einstein.');
    expect(loaded?.summary?.elementCount).toBe(15);
  });

  it('adds and retrieves tasks in chronological history with trimming', async () => {
    await clearTaskHistory();

    await addTaskHistoryItem({
      task: 'Task 1: What is the email?',
      status: 'Task Completed: Success',
      finalAnswer: 'rahul@example.com',
      timestamp: 1788980000001,
    });

    await addTaskHistoryItem({
      task: 'Task 2: Who is this person?',
      status: 'Task Completed: Success',
      finalAnswer: 'Albert Einstein',
      timestamp: 1788980000002,
    });

    const history = await loadTaskHistory();
    expect(history.length).toBe(2);
    // Most recent task should be first
    expect(history[0].task).toBe('Task 2: Who is this person?');
    expect(history[1].task).toBe('Task 1: What is the email?');
  });

  it('deletes single task item and clears history', async () => {
    await addTaskHistoryItem({
      task: 'Task to keep',
      status: 'Task Completed: Success',
      timestamp: 1788980000003,
    });

    const item2 = await addTaskHistoryItem({
      task: 'Task to delete',
      status: 'Task Completed: Success',
      timestamp: 1788980000004,
    });

    const targetId = item2[0].id;
    const remaining = await deleteTaskHistoryItem(targetId);
    expect(remaining.some((item) => item.id === targetId)).toBe(false);

    await clearTaskHistory();
    const finalHistory = await loadTaskHistory();
    expect(finalHistory.length).toBe(0);
  });
});
