import { PageModelSummaryProps, PipelineMetrics } from './components/PrivacyDebugPanel';
import { PrivacyDecision } from '../privacy/policyEngine';
import { SanitizedContext } from '../privacy/redactor';
import { FirewallResult } from '../agent/actionFirewall';
import { ExecutionResult } from '../content/actionExecutor';

export interface ActivePopupState {
  task: string;
  status: string;
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
  timestamp: number;
}

export interface TaskHistoryItem {
  id: string;
  timestamp: number;
  task: string;
  status: string;
  finalAnswer?: string;
  summary?: PageModelSummaryProps | null;
  decisions?: PrivacyDecision[];
  sanitizedContext?: SanitizedContext;
  sanitizedImages?: Record<string, any>;
  ocrResult?: any;
  agentPlanResponse?: any;
  firewallResult?: FirewallResult;
  executionResult?: ExecutionResult | null;
  metrics?: PipelineMetrics;
  steps?: any[];
}

const STORAGE_KEY_ACTIVE = 'privacy_agent_active_state';
const STORAGE_KEY_HISTORY = 'privacy_agent_task_history';
const MAX_HISTORY_ITEMS = 30;

const memoryFallback = new Map<string, string>();

/**
 * Storage adapter supporting chrome.storage.local with localStorage and memory fallback
 */
async function storageGet<T>(key: string): Promise<T | null> {
  try {
    if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result[key] || null);
        });
      });
    } else if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      const item = memoryFallback.get(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (err) {
    console.warn(`Storage get error for key "${key}":`, err);
  }
  return null;
}

async function storageSet<T>(key: string, value: T): Promise<void> {
  try {
    if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => {
          resolve();
        });
      });
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      memoryFallback.set(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`Storage set error for key "${key}":`, err);
  }
}

/**
 * Saves the current active task and debug panel state
 */
export async function saveActiveState(state: ActivePopupState): Promise<void> {
  await storageSet(STORAGE_KEY_ACTIVE, state);
}

/**
 * Loads the last active task and debug panel state
 */
export async function loadActiveState(): Promise<ActivePopupState | null> {
  return await storageGet<ActivePopupState>(STORAGE_KEY_ACTIVE);
}

/**
 * Loads all saved task history sessions
 */
export async function loadTaskHistory(): Promise<TaskHistoryItem[]> {
  const items = await storageGet<TaskHistoryItem[]>(STORAGE_KEY_HISTORY);
  return items || [];
}

/**
 * Appends a completed task session to task history and trims to MAX_HISTORY_ITEMS
 */
export async function addTaskHistoryItem(item: Omit<TaskHistoryItem, 'id'>): Promise<TaskHistoryItem[]> {
  const history = await loadTaskHistory();
  const newItem: TaskHistoryItem = {
    ...item,
    id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };

  const updated = [newItem, ...history.filter((h) => h.id !== newItem.id)].slice(0, MAX_HISTORY_ITEMS);
  await storageSet(STORAGE_KEY_HISTORY, updated);
  return updated;
}

/**
 * Deletes a single task history item by ID
 */
export async function deleteTaskHistoryItem(id: string): Promise<TaskHistoryItem[]> {
  const history = await loadTaskHistory();
  const updated = history.filter((item) => item.id !== id);
  await storageSet(STORAGE_KEY_HISTORY, updated);
  return updated;
}

/**
 * Clears all task history items
 */
export async function clearTaskHistory(): Promise<void> {
  await storageSet(STORAGE_KEY_HISTORY, []);
}
