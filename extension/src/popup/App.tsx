import { useState, useEffect } from 'react';
import { PopupHeader } from './components/PopupHeader';
import { EmptyStateView } from './components/EmptyStateView';
import { LiveMissionControl } from './components/LiveMissionControl';
import { FloatingInputBox } from './components/FloatingInputBox';
import { TaskHistoryDrawer } from './components/TaskHistoryDrawer';
import { PageModelSummaryProps, PipelineMetrics } from './components/PrivacyDebugPanel';
import { PrivacyDecision } from '../privacy/policyEngine';
import { SanitizedContext } from '../privacy/redactor';
import { FirewallResult } from '../agent/actionFirewall';
import { ExecutionResult } from '../content/actionExecutor';
import { OrbState } from './components/ThreeOrbCanvas';
import {
  saveActiveState,
  loadActiveState,
  loadTaskHistory,
  addTaskHistoryItem,
  deleteTaskHistoryItem,
  clearTaskHistory,
  TaskHistoryItem,
} from './historyManager';

function App() {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('Ready');
  const [isWorking, setIsWorking] = useState(false);
  const [summary, setSummary] = useState<PageModelSummaryProps | null>(null);
  const [decisions, setDecisions] = useState<PrivacyDecision[]>([]);
  const [sanitizedContext, setSanitizedContext] = useState<SanitizedContext | undefined>(undefined);
  const [sanitizedImages, setSanitizedImages] = useState<Record<string, any> | undefined>(undefined);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [agentPlanResponse, setAgentPlanResponse] = useState<any>(null);
  const [firewallResult, setFirewallResult] = useState<FirewallResult | undefined>(undefined);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [metrics, setMetrics] = useState<PipelineMetrics | undefined>(undefined);
  const [finalAnswer, setFinalAnswer] = useState<string | undefined>(undefined);
  const [steps, setSteps] = useState<any[] | undefined>(undefined);
  const [history, setHistory] = useState<TaskHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Determine current AI Orb State
  const getOrbState = (): OrbState => {
    if (isWorking) {
      if (task.toLowerCase().includes('screen') || task.toLowerCase().includes('image') || task.toLowerCase().includes('form')) {
        return 'analyzing';
      }
      return 'working';
    }
    if (status.includes('Completed') || status.includes('Successfully') || !!finalAnswer) {
      return 'complete';
    }
    if (status.includes('Paused')) {
      return 'paused';
    }
    return 'ready';
  };

  // Restore session state on mount
  useEffect(() => {
    async function restoreSession() {
      try {
        const active = await loadActiveState();
        if (active) {
          setTask(active.task || '');
          setStatus(active.status || 'Ready');
          setSummary(active.summary || null);
          setDecisions(active.decisions || []);
          setSanitizedContext(active.sanitizedContext);
          setSanitizedImages(active.sanitizedImages);
          setOcrResult(active.ocrResult);
          setAgentPlanResponse(active.agentPlanResponse);
          setFirewallResult(active.firewallResult);
          setExecutionResult(active.executionResult || null);
          setMetrics(active.metrics);
          setFinalAnswer(active.finalAnswer);
          setSteps(active.steps);
        }
        const savedHistory = await loadTaskHistory();
        setHistory(savedHistory);
      } catch (e) {
        console.warn('Failed to restore session state:', e);
      }
    }
    restoreSession();
  }, []);

  const handleRunTaskWithPrompt = async (promptToRun?: string) => {
    const taskQuery = promptToRun || task;
    if (!taskQuery.trim() || isWorking) return;

    if (promptToRun) {
      setTask(promptToRun);
    }

    setIsWorking(true);
    setStatus('Evaluating Privacy Policy & Synthesizing Webpage...');
    setSummary(null);
    setDecisions([]);
    setSanitizedContext(undefined);
    setSanitizedImages(undefined);
    setOcrResult(null);
    setAgentPlanResponse(null);
    setFirewallResult(undefined);
    setExecutionResult(null);
    setMetrics(undefined);
    setFinalAnswer(undefined);
    setSteps(undefined);

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab?.id) {
        setStatus('Unable to access active browser tab.');
        setIsWorking(false);
        return;
      }

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
        setStatus(`Cannot run on internal browser pages (${tabUrl.split('/')[2] || 'chrome://'}). Please navigate to any web page (e.g. http://localhost:8080/cv_test.html or any website).`);
        setIsWorking(false);
        return;
      }

      let response: any;
      try {
        response = await chrome.tabs.sendMessage(tab.id, {
          type: 'RUN_TASK',
          task: taskQuery,
        });
      } catch (sendErr: any) {
        console.warn('Initial message send failed, attempting dynamic content script injection...', sendErr);
        try {
          const manifest = chrome.runtime.getManifest();
          const contentScripts = manifest.content_scripts?.[0]?.js;
          if (contentScripts && contentScripts.length > 0 && tab.id) {
            setStatus('Connecting WebPilot to active web page...');
            await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: contentScripts,
            });
            await new Promise((resolve) => setTimeout(resolve, 300));
            response = await chrome.tabs.sendMessage(tab.id, {
              type: 'RUN_TASK',
              task: taskQuery,
            });
          }
        } catch (injectErr: any) {
          console.error('Dynamic script injection failed:', injectErr);
        }
      }

      if (!response) {
        setStatus('Unable to connect to page. Please refresh this tab (F5 / Ctrl+R) to connect WebPilot.');
        setIsWorking(false);
        return;
      }

      if (response && response.status === 'SUCCESS') {
        const actionStatus = response.executionResult?.success
          ? 'Action Executed Successfully'
          : response.firewallResult?.allowed
          ? 'Firewall Approved'
          : 'Firewall Denied';

        const finalStatusStr = `Task Completed: ${actionStatus}`;
        setStatus(finalStatusStr);
        setSummary(response.pageModelSummary);
        setDecisions(response.privacyDecisions || []);
        setSanitizedContext(response.sanitizedContext);
        setSanitizedImages(response.sanitizedImages);
        setOcrResult(response.ocrResult);
        setAgentPlanResponse(response.agentPlanResponse);
        setFirewallResult(response.firewallResult);
        setExecutionResult(response.executionResult);
        setMetrics(response.metrics);
        setFinalAnswer(response.finalAnswer);
        setSteps(response.steps);

        const sessionData = {
          task: taskQuery,
          status: finalStatusStr,
          summary: response.pageModelSummary,
          decisions: response.privacyDecisions || [],
          sanitizedContext: response.sanitizedContext,
          sanitizedImages: response.sanitizedImages,
          ocrResult: response.ocrResult,
          agentPlanResponse: response.agentPlanResponse,
          firewallResult: response.firewallResult,
          executionResult: response.executionResult,
          metrics: response.metrics,
          finalAnswer: response.finalAnswer,
          steps: response.steps,
          timestamp: Date.now(),
        };
        await saveActiveState(sessionData);
        const updatedHistory = await addTaskHistoryItem(sessionData);
        setHistory(updatedHistory);
      } else if (response && response.status === 'SERVER_ERROR') {
        const errStatus = `Server Error: ${response.error}`;
        setStatus(errStatus);
        setSummary(response.pageModelSummary);
        setDecisions(response.privacyDecisions || []);
        setSanitizedContext(response.sanitizedContext);
        setSanitizedImages(response.sanitizedImages);
        setOcrResult(response.ocrResult);

        const sessionData = {
          task: taskQuery,
          status: errStatus,
          summary: response.pageModelSummary,
          decisions: response.privacyDecisions || [],
          sanitizedContext: response.sanitizedContext,
          sanitizedImages: response.sanitizedImages,
          ocrResult: response.ocrResult,
          timestamp: Date.now(),
        };
        await saveActiveState(sessionData);
        const updatedHistory = await addTaskHistoryItem(sessionData);
        setHistory(updatedHistory);
      } else {
        setStatus('Failed to communicate with page. Please refresh tab (F5) and try again.');
      }
    } catch (error: any) {
      console.error(error);
      setStatus('Unable to access page. Please refresh this tab (F5) and try again.');
    } finally {
      setIsWorking(false);
    }
  };

  const handleTakeControl = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, { type: 'TAKE_CONTROL' });
      }
      setStatus('Agent Paused. You are in control.');
      setIsWorking(false);
    } catch (e) {
      console.warn('Take control error:', e);
    }
  };

  const handleSelectHistoryItem = async (item: TaskHistoryItem) => {
    setTask(item.task);
    setStatus(item.status);
    setSummary(item.summary || null);
    setDecisions(item.decisions || []);
    setSanitizedContext(item.sanitizedContext);
    setSanitizedImages(item.sanitizedImages);
    setOcrResult(item.ocrResult);
    setAgentPlanResponse(item.agentPlanResponse);
    setFirewallResult(item.firewallResult);
    setExecutionResult(item.executionResult || null);
    setMetrics(item.metrics);
    setFinalAnswer(item.finalAnswer);
    setSteps(item.steps);
    setShowHistory(false);
  };

  const handleNewTask = () => {
    setTask('');
    setStatus('Ready');
    setIsWorking(false);
    setSummary(null);
    setDecisions([]);
    setSanitizedContext(undefined);
    setSanitizedImages(undefined);
    setOcrResult(null);
    setAgentPlanResponse(null);
    setFirewallResult(undefined);
    setExecutionResult(null);
    setMetrics(undefined);
    setFinalAnswer(undefined);
    setSteps(undefined);
    setShowHistory(false);
  };

  const hasActiveContent = !!(summary || finalAnswer || isWorking || (status !== 'Ready' && task));

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
            task={task}
            status={status}
            isWorking={isWorking}
            summary={summary}
            decisions={decisions}
            sanitizedContext={sanitizedContext}
            sanitizedImages={sanitizedImages}
            ocrResult={ocrResult}
            agentPlanResponse={agentPlanResponse}
            firewallResult={firewallResult}
            executionResult={executionResult}
            metrics={metrics}
            finalAnswer={finalAnswer}
            steps={steps}
            onTakeControl={handleTakeControl}
            onRetry={() => handleRunTaskWithPrompt(task)}
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
          isWorking={isWorking}
          onCaptureScreenshot={() => handleRunTaskWithPrompt('what can you see on the screen')}
        />
      </footer>
    </div>
  );
}

export default App;
