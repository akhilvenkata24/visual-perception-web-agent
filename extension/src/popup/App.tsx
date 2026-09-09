import { useState } from 'react';
import { PrivacyDebugPanel, PageModelSummaryProps, PipelineMetrics } from './components/PrivacyDebugPanel';
import { PrivacyDecision } from '../privacy/policyEngine';
import { SanitizedContext } from '../privacy/redactor';
import { FirewallResult } from '../agent/actionFirewall';
import { ExecutionResult } from '../content/actionExecutor';

function App() {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('Ready');
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

  const handleRunTask = async () => {
    if (!task.trim()) return;
    
    setStatus('Evaluating Privacy Policy & Contacting Backend...');
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
        return;
      }

      let response: any;
      try {
        response = await chrome.tabs.sendMessage(tab.id, {
          type: 'RUN_TASK',
          task: task
        });
      } catch (sendErr: any) {
        console.warn('Initial message send failed, attempting dynamic content script injection...', sendErr);
        try {
          const manifest = chrome.runtime.getManifest();
          const contentScripts = manifest.content_scripts?.[0]?.js;
          if (contentScripts && contentScripts.length > 0 && tab.id) {
            setStatus('Connecting agent to active web page...');
            await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: contentScripts,
            });
            await new Promise((resolve) => setTimeout(resolve, 300));
            response = await chrome.tabs.sendMessage(tab.id, {
              type: 'RUN_TASK',
              task: task
            });
          }
        } catch (injectErr: any) {
          console.error('Dynamic script injection failed:', injectErr);
        }
      }

      if (!response) {
        setStatus('Unable to connect to page. Please refresh this tab (F5 / Ctrl+R) to connect the agent.');
        return;
      }

      if (response && response.status === 'SUCCESS') {
        const actionStatus = response.executionResult?.success
          ? 'Action Executed Successfully'
          : response.firewallResult?.allowed
          ? 'Firewall Approved'
          : 'Firewall Denied';
          
        setStatus(`Task Completed: ${actionStatus}`);
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
      } else if (response && response.status === 'SERVER_ERROR') {
        setStatus(`Server Error: ${response.error}`);
        setSummary(response.pageModelSummary);
        setDecisions(response.privacyDecisions || []);
        setSanitizedContext(response.sanitizedContext);
        setSanitizedImages(response.sanitizedImages);
        setOcrResult(response.ocrResult);
      } else {
        setStatus('Failed to communicate with page. Please refresh tab (F5) and try again.');
      }
    } catch (error: any) {
      console.error(error);
      setStatus('Unable to access page. Please refresh this tab (F5) and try again.');
    }
  };

  return (
    <div className="popup-container">
      <h2>Privacy Browser Agent</h2>
      
      <div className="input-group">
        <label htmlFor="task-input">What should I do?</label>
        <textarea
          id="task-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Open Rahul's profile and tell me his bio"
          rows={3}
        />
      </div>

      <button onClick={handleRunTask} disabled={!task.trim()}>
        Run Task
      </button>

      {summary && decisions ? (
        <PrivacyDebugPanel
          task={task}
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
        />
      ) : (
        <div className="empty-state">
          <div className="empty-title">Ready</div>
          <div className="empty-sub">No perception data available yet. Run a task above.</div>
        </div>
      )}

      <div className="status-bar">
        Status: <span className="status-text">{status}</span>
      </div>
    </div>
  );
}

export default App;
