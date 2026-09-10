import { useState, useEffect, useRef } from 'react';
import { PopupHeader } from './components/PopupHeader';
import { EmptyStateView } from './components/EmptyStateView';
import { LiveMissionControl } from './components/LiveMissionControl';
import { FloatingInputBox } from './components/FloatingInputBox';
import { TaskHistoryDrawer } from './components/TaskHistoryDrawer';
import { OrbState } from './components/ThreeOrbCanvas';
import {
  saveActiveState,
  loadActiveState,
  clearActiveState,
  loadTaskHistory,
  addTaskHistoryItem,
  deleteTaskHistoryItem,
  clearTaskHistory,
  TaskHistoryItem,
  ChatMessage,
} from './historyManager';

function getTabStorageKey(tab?: chrome.tabs.Tab): string {
  if (!tab) return 'default_session';
  if (tab.id) {
    return `tab_${tab.id}`;
  }
  if (tab.url) {
    try {
      const u = new URL(tab.url);
      return `url_${u.hostname}_${u.pathname}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    } catch {}
  }
  return 'default_session';
}

function isConversationalQuery(query: string): boolean {
  if (!query) return true;
  const q = query.trim().toLowerCase();

  const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
  if (greetings.includes(q) || greetings.some((g) => q.startsWith(g + ' ') || q.startsWith(g + '!') || q.startsWith(g + ','))) {
    return true;
  }

  const conversationalPhrases = [
    'how are you',
    'who are you',
    'what can you do',
    'what are your capabilities',
    'help',
    'explain machine learning',
    'tell me a joke',
  ];
  if (conversationalPhrases.some((p) => q.includes(p))) {
    return true;
  }

  const generalKnowledgeStarters = ['explain ', 'what is ', 'who is ', 'why does ', 'how does ', 'tell me about '];
  const pageKeywords = [
    'page',
    'screen',
    'button',
    'link',
    'element',
    'profile',
    'click',
    'scroll',
    'type',
    'fill',
    'submit',
    'form',
    'find',
    'rahul',
    'input',
    'open',
    'image',
    'ocr',
    'badge',
    'card',
    'canvas',
    'text',
    'photo',
    'screenshot',
    'email',
    'phone',
    'number',
    'address',
    'shown',
  ];

  if (generalKnowledgeStarters.some((s) => q.startsWith(s)) && !pageKeywords.some((kw) => q.includes(kw))) {
    return true;
  }

  return false;
}

function App() {
  const activeTabIdRef = useRef<number | null>(null);
  const activeKeyRef = useRef<string>('default_session');

  const [task, setTask] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState('Ready');
  const [isWorking, setIsWorking] = useState(false);
  const [history, setHistory] = useState<TaskHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Determine current AI Orb State
  const getOrbState = (): OrbState => {
    if (isWorking) {
      const activePrompt = task || (messages.length > 0 ? messages[messages.length - 1].text : '');
      if (
        activePrompt.toLowerCase().includes('screen') ||
        activePrompt.toLowerCase().includes('image') ||
        activePrompt.toLowerCase().includes('form')
      ) {
        return 'analyzing';
      }
      return 'working';
    }
    if (status.includes('Completed') || status.includes('Successfully')) {
      return 'complete';
    }
    if (status.includes('Stopped') || status.includes('Paused')) {
      return 'paused';
    }
    return 'ready';
  };

  // Sync active tab state
  useEffect(() => {
    let isMounted = true;

    async function syncActiveTabState(tabId?: number) {
      try {
        let targetTab: chrome.tabs.Tab | undefined;
        if (tabId && typeof chrome !== 'undefined' && chrome.tabs?.get) {
          try {
            targetTab = await chrome.tabs.get(tabId);
          } catch {}
        }
        if (!targetTab && typeof chrome !== 'undefined' && chrome.tabs?.query) {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          targetTab = tab;
        }

        if (!targetTab || !isMounted) return;

        // Cleanup overlays on previously active tab if switching away (only if not working)
        if (activeTabIdRef.current && activeTabIdRef.current !== targetTab.id && !isWorking) {
          try {
            chrome.tabs.sendMessage(activeTabIdRef.current, { type: 'CLEANUP_OVERLAYS' }).catch(() => {});
          } catch (e) {}
        }

        activeTabIdRef.current = targetTab.id || null;
        const key = getTabStorageKey(targetTab);
        activeKeyRef.current = key;

        const activeState = await loadActiveState(key);
        if (activeState && isMounted) {
          if (activeState.messages && activeState.messages.length > 0) {
            setMessages(activeState.messages);
          } else if (activeState.task) {
            setMessages([
              { id: 'user_init', role: 'user', text: activeState.task, timestamp: activeState.timestamp },
              {
                id: 'asst_init',
                role: 'assistant',
                text: activeState.finalAnswer || activeState.executionResult?.message || '',
                status: activeState.status,
                timestamp: activeState.timestamp,
                summary: activeState.summary,
                decisions: activeState.decisions,
                sanitizedContext: activeState.sanitizedContext,
                sanitizedImages: activeState.sanitizedImages,
                ocrResult: activeState.ocrResult,
                firewallResult: activeState.firewallResult,
                executionResult: activeState.executionResult,
                metrics: activeState.metrics,
              },
            ]);
          } else {
            setMessages([]);
          }
          setStatus(activeState.status || 'Ready');
          setIsWorking(activeState.isWorking || false);
        } else if (isMounted) {
          setMessages([]);
          setStatus('Ready');
          setIsWorking(false);
        }

        const savedHistory = await loadTaskHistory();
        if (isMounted) setHistory(savedHistory);
      } catch (e) {
        console.warn('Sync active tab state error:', e);
      }
    }

    syncActiveTabState();

    const handleTabActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
      syncActiveTabState(activeInfo.tabId);
    };

    const handleTabUpdated = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
      if (changeInfo.status === 'complete' || changeInfo.url) {
        syncActiveTabState(tabId);
      }
    };

    const handleRuntimeMessage = (message: any) => {
      if (message.type === 'AGENT_STEP_PROGRESS' && message.stepProgress) {
        const step = message.stepProgress;
        const stepStatus = `Step ${step.stepNumber}: ${step.firewallResult?.reason || 'Evaluating...'}`;

        setIsWorking(true);
        setStatus(stepStatus);
        setMessages((prev) =>
          prev.map((m, index) => {
            if (index === prev.length - 1 && m.role === 'assistant') {
              return {
                ...m,
                status: stepStatus,
                summary: step.pageModelSummary,
                decisions: step.privacyDecisions || [],
                sanitizedContext: step.sanitizedContext,
                sanitizedImages: step.sanitizedImages,
                ocrResult: step.ocrResult,
                agentPlanResponse: step.agentPlanResponse,
                firewallResult: step.firewallResult,
                executionResult: step.executionResult,
              };
            }
            return m;
          })
        );
      } else if (message.type === 'AGENT_TASK_COMPLETE' && message.loopResult) {
        const res = message.loopResult;
        setIsWorking(false);

        if (res.status === 'SUCCESS' || res.status === 'MAX_STEPS_REACHED' || res.status === 'BLOCKED_BY_FIREWALL') {
          const actionStatus = res.lastStep?.executionResult?.success
            ? 'Action Executed Successfully'
            : res.lastStep?.firewallResult?.allowed
            ? 'Firewall Approved'
            : res.status === 'BLOCKED_BY_FIREWALL'
            ? 'Firewall Blocked'
            : 'Task Satisfied';

          const finalStatusStr = `Task Completed: ${actionStatus}`;
          const finalText =
            res.finalAnswer ||
            res.lastStep?.executionResult?.message ||
            (res.status === 'BLOCKED_BY_FIREWALL' ? res.error : 'Task completed.');

          setMessages((prev) => {
            const updated = prev.map((m, index) => {
              if (index === prev.length - 1 && m.role === 'assistant') {
                return {
                  ...m,
                  role: 'assistant' as const,
                  text: finalText,
                  status: finalStatusStr,
                  timestamp: Date.now(),
                  summary: res.pageModelSummary,
                  decisions: res.privacyDecisions || [],
                  sanitizedContext: res.sanitizedContext,
                  sanitizedImages: res.sanitizedImages,
                  ocrResult: res.ocrResult,
                  agentPlanResponse: res.agentPlanResponse,
                  firewallResult: res.firewallResult,
                  executionResult: res.executionResult,
                  metrics: res.metrics,
                  steps: res.steps,
                };
              }
              return m;
            });

            if (activeKeyRef.current) {
              const sessionData = {
                task: res.task,
                status: finalStatusStr,
                isWorking: false,
                messages: updated,
                summary: res.pageModelSummary,
                decisions: res.privacyDecisions || [],
                sanitizedContext: res.sanitizedContext,
                sanitizedImages: res.sanitizedImages,
                ocrResult: res.ocrResult,
                agentPlanResponse: res.agentPlanResponse,
                firewallResult: res.firewallResult,
                executionResult: res.executionResult,
                metrics: res.metrics,
                finalAnswer: finalText,
                steps: res.steps,
                timestamp: Date.now(),
              };
              saveActiveState(sessionData, activeKeyRef.current);
              addTaskHistoryItem(sessionData).then((h) => setHistory(h));
            }

            return updated;
          });

          setStatus(finalStatusStr);
        } else if (res.status === 'SERVER_ERROR' || res.status === 'ERROR') {
          const errStatus = `Error: ${res.error || 'Failed to complete task'}`;
          setStatus(errStatus);
          setMessages((prev) =>
            prev.map((m, index) =>
              index === prev.length - 1 && m.role === 'assistant'
                ? { ...m, text: '', status: errStatus, timestamp: Date.now() }
                : m
            )
          );
        }
      }
    };

    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener(handleRuntimeMessage);
    }

    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.onActivated.addListener(handleTabActivated);
      chrome.tabs.onUpdated.addListener(handleTabUpdated);
    }

    if (typeof chrome !== 'undefined' && chrome.runtime?.connect) {
      const port = chrome.runtime.connect({ name: 'sidepanel-port' });
      return () => {
        isMounted = false;
        if (typeof chrome !== 'undefined' && chrome.tabs) {
          chrome.tabs.onActivated.removeListener(handleTabActivated);
          chrome.tabs.onUpdated.removeListener(handleTabUpdated);
        }
        if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
          chrome.runtime.onMessage.removeListener(handleRuntimeMessage);
        }
        try {
          port.disconnect();
        } catch (e) {}
      };
    }

    return () => {
      isMounted = false;
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.onActivated.removeListener(handleTabActivated);
        chrome.tabs.onUpdated.removeListener(handleTabUpdated);
      }
      if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
        chrome.runtime.onMessage.removeListener(handleRuntimeMessage);
      }
    };
  }, []);

  const handleRunTaskWithPrompt = async (promptToRun?: string) => {
    const taskQuery = (promptToRun || task).trim();
    if (!taskQuery || isWorking) return;

    setTask(''); // Clear input box

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      setStatus('Unable to access active browser tab.');
      return;
    }

    const targetTabId = tab.id;
    const targetKey = getTabStorageKey(tab);

    const timestamp = Date.now();
    const userMsgId = `user_${timestamp}`;
    const assistantMsgId = `asst_${timestamp}`;

    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: taskQuery,
      timestamp,
    };

    const pendingAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      text: '',
      status: 'Evaluating Privacy Policy & Synthesizing Webpage...',
      timestamp,
    };

    // Load current existing state for this target tab/page to append prompt
    const existingState = await loadActiveState(targetKey);
    const baseMessages = existingState?.messages || (activeTabIdRef.current === targetTabId ? messages : []);
    const updatedMessages = [...baseMessages, userMsg, pendingAssistantMsg];

    if (activeTabIdRef.current === targetTabId) {
      setMessages(updatedMessages);
      setIsWorking(true);
      setStatus('Evaluating Privacy Policy & Synthesizing Webpage...');
    }

    await saveActiveState(
      {
        task: taskQuery,
        status: 'Evaluating Privacy Policy & Synthesizing Webpage...',
        isWorking: true,
        messages: updatedMessages,
        timestamp,
      },
      targetKey
    );

    try {
      const tabUrl = tab.url || '';
      const isRestrictedUrl =
        tabUrl.startsWith('chrome://') ||
        tabUrl.startsWith('chrome-extension://') ||
        tabUrl.startsWith('edge://') ||
        tabUrl.startsWith('devtools://') ||
        tabUrl.startsWith('about:') ||
        tabUrl.startsWith('view-source:') ||
        tabUrl.includes('chromewebstore.google.com') ||
        tabUrl.includes('chrome.google.com/webstore');

      if (isRestrictedUrl) {
        if (isConversationalQuery(taskQuery)) {
          try {
            const payload = {
              task: taskQuery,
              context: {
                task: taskQuery,
                intent: 'chat',
                page: { title: 'Chat', url: tabUrl },
                elements: [],
                text_regions: [],
                decisionsSummary: { total: 0, allowed: 0, masked: 0, tokenized: 0, abstract: 0, localOnly: 0 }
              },
              previous_steps: []
            };
            const resp = await fetch('http://127.0.0.1:8000/agent/plan', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (resp.ok) {
              const data = await resp.json();
              const answerText = data.action?.answer || data.action?.reasoning || 'Hello! How can I help you today?';
              if (activeTabIdRef.current === targetTabId) {
                setStatus('Task Completed: Chat Response');
                setIsWorking(false);
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMsgId ? { ...m, text: answerText, status: 'Task Completed: Chat Response' } : m))
                );
              }
              return;
            }
          } catch (err) {
            console.warn('Direct chat fetch error:', err);
          }
        }

        const errStatus = `Cannot run page tasks on internal browser pages (${tabUrl.split('/')[2] || 'chrome://'}). Please navigate to any web page.`;
        if (activeTabIdRef.current === targetTabId) {
          setStatus(errStatus);
          setIsWorking(false);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, status: errStatus, text: errStatus } : m))
          );
        }
        return;
      }

      let response: any;
      try {
        response = await chrome.tabs.sendMessage(targetTabId, {
          type: 'RUN_TASK',
          task: taskQuery,
        });
      } catch (sendErr: any) {
        console.warn('Initial message send failed, attempting dynamic content script injection...', sendErr);
        try {
          const manifest = chrome.runtime.getManifest();
          const contentScripts = manifest.content_scripts?.[0]?.js;
          if (contentScripts && contentScripts.length > 0 && targetTabId) {
            if (activeTabIdRef.current === targetTabId) {
              setStatus('Connecting WebPilot to active web page...');
            }
            await chrome.scripting.executeScript({
              target: { tabId: targetTabId },
              files: contentScripts,
            });
            await new Promise((resolve) => setTimeout(resolve, 300));
            response = await chrome.tabs.sendMessage(targetTabId, {
              type: 'RUN_TASK',
              task: taskQuery,
            });
          }
        } catch (injectErr: any) {
          console.error('Dynamic script injection failed:', injectErr);
        }
      }

      if (!response) {
        const errStatus = 'Unable to connect to page. Please refresh this tab (F5 / Ctrl+R) to connect WebPilot.';
        if (activeTabIdRef.current === targetTabId) {
          setStatus(errStatus);
          setIsWorking(false);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, status: errStatus } : m))
          );
        }
        return;
      }

      if (response && (response.status === 'ACKNOWLEDGED' || response.status === 'SUCCESS')) {
        // Multi-step task successfully dispatched to content script. Live progress updates will stream via runtime messages.
        if (activeTabIdRef.current === targetTabId) {
          setStatus('Step 1: Perception & Reasoning in progress...');
          setIsWorking(true);
        }
      } else if (response && response.status === 'SERVER_ERROR') {
        const errStatus = `Server Error: ${response.error}`;

        if (activeTabIdRef.current === targetTabId) {
          setStatus(errStatus);
          setIsWorking(false);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, status: errStatus } : m))
          );
        }
      } else {
        const errStatus = 'Failed to communicate with page. Please refresh tab (F5) and try again.';
        if (activeTabIdRef.current === targetTabId) {
          setStatus(errStatus);
          setIsWorking(false);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, status: errStatus } : m))
          );
        }
      }
    } catch (error: any) {
      console.error(error);
      const errStatus = 'Unable to access page. Please refresh this tab (F5) and try again.';
      if (activeTabIdRef.current === targetTabId) {
        setStatus(errStatus);
        setIsWorking(false);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, status: errStatus } : m))
        );
      }
    }
  };

  const handleTakeControl = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, { type: 'STOP_TASK' });
        await chrome.tabs.sendMessage(tab.id, { type: 'CLEANUP_OVERLAYS' });
      }
    } catch (e) {
      console.warn('Stop task error:', e);
    }
    const stoppedStatus = 'Agent Stopped. You are in control.';
    setStatus(stoppedStatus);
    setIsWorking(false);

    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const lastMsg = prev[prev.length - 1];
      if (lastMsg.role === 'assistant' && !lastMsg.text) {
        return prev.map((m) =>
          m.id === lastMsg.id ? { ...m, text: stoppedStatus, status: stoppedStatus } : m
        );
      }
      return prev;
    });
  };

  const handleSelectHistoryItem = async (item: TaskHistoryItem) => {
    setTask(item.task);
    setStatus(item.status);
    if (item.task) {
      setMessages([
        { id: `hist_user_${item.id}`, role: 'user', text: item.task, timestamp: item.timestamp },
        {
          id: `hist_asst_${item.id}`,
          role: 'assistant',
          text: item.finalAnswer || item.executionResult?.message || '',
          status: item.status,
          timestamp: item.timestamp,
          summary: item.summary,
          decisions: item.decisions,
          sanitizedContext: item.sanitizedContext,
          sanitizedImages: item.sanitizedImages,
          ocrResult: item.ocrResult,
          firewallResult: item.firewallResult,
          executionResult: item.executionResult,
          metrics: item.metrics,
        },
      ]);
    }
    setShowHistory(false);
  };

  const handleNewTask = async () => {
    setTask('');
    setMessages([]);
    setStatus('Ready');
    setIsWorking(false);
    setShowHistory(false);
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const key = getTabStorageKey(tab);
      await clearActiveState(key);
      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, { type: 'CLEANUP_OVERLAYS' });
        await chrome.tabs.sendMessage(tab.id, { type: 'STOP_TASK' });
      }
    } catch (e) {
      console.warn('Failed to clear active state:', e);
    }
  };

  const hasActiveContent = messages.length > 0 || isWorking || (status !== 'Ready' && !!task);

  return (
    <div className={`webpilot-spatial-app theme-${theme}`}>
      <div className="spatial-noise-bg"></div>

      <PopupHeader
        orbState={getOrbState()}
        onOpenHistory={() => setShowHistory(!showHistory)}
        historyCount={history.length}
        onNewTask={handleNewTask}
        hasActiveTask={hasActiveContent}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      <main className="webpilot-main-scroll">
        {showHistory ? (
          <TaskHistoryDrawer
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onDeleteHistoryItem={async (id) => {
              const updated = await deleteTaskHistoryItem(id);
              setHistory(updated);
            }}
            onClearHistory={async () => {
              await clearTaskHistory();
              setHistory([]);
            }}
            onClose={() => setShowHistory(false)}
          />
        ) : hasActiveContent ? (
          <LiveMissionControl
            messages={messages}
            status={status}
            isWorking={isWorking}
            onTakeControl={handleTakeControl}
            onRetry={(retryPrompt) => handleRunTaskWithPrompt(retryPrompt || task)}
          />
        ) : (
          <EmptyStateView onSelectSuggestion={(sugPrompt) => handleRunTaskWithPrompt(sugPrompt)} />
        )}
      </main>

      <footer className="webpilot-footer-dock">
        <FloatingInputBox
          value={task}
          onChange={setTask}
          onSubmit={() => handleRunTaskWithPrompt()}
          onStop={handleTakeControl}
          isWorking={isWorking}
          onCaptureScreenshot={() => handleRunTaskWithPrompt('what can you see on the screen')}
        />
      </footer>
    </div>
  );
}

export default App;


