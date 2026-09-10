// Phase 1: Basic service worker foundation & Universal Screenshot Capture Provider
console.log('Privacy Browser Agent Service Worker initialized.');

// Helper storage functions for tracking which tab IDs have explicitly opened the side panel
async function getOpenTabIds(): Promise<number[]> {
  try {
    const data = await chrome.storage.local.get('open_sidepanel_tab_ids');
    return Array.isArray(data.open_sidepanel_tab_ids) ? data.open_sidepanel_tab_ids : [];
  } catch {
    return [];
  }
}

async function isTabSidePanelOpen(tabId: number): Promise<boolean> {
  const ids = await getOpenTabIds();
  return ids.includes(tabId);
}

async function markTabSidePanelOpen(tabId: number) {
  const ids = await getOpenTabIds();
  if (!ids.includes(tabId)) {
    ids.push(tabId);
    await chrome.storage.local.set({ open_sidepanel_tab_ids: ids });
  }
}

async function unmarkTabSidePanel(tabId: number) {
  const ids = await getOpenTabIds();
  const filtered = ids.filter((id) => id !== tabId);
  await chrome.storage.local.set({ open_sidepanel_tab_ids: filtered });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Privacy Browser Agent installed successfully.');
  if (chrome.sidePanel && typeof chrome.sidePanel.setPanelBehavior === 'function') {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((err) => console.warn('SidePanel setPanelBehavior error:', err));
  }
});

if (typeof chrome !== 'undefined' && chrome.runtime?.onStartup) {
  chrome.runtime.onStartup.addListener(() => {
    if (chrome.sidePanel && typeof chrome.sidePanel.setPanelBehavior === 'function') {
      chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: true })
        .catch((err) => console.warn('SidePanel setPanelBehavior error:', err));
    }
  });
}

// Fallback action click handler
if (typeof chrome !== 'undefined' && chrome.action?.onClicked) {
  chrome.action.onClicked.addListener((tab) => {
    if (tab.id && chrome.sidePanel && typeof chrome.sidePanel.open === 'function') {
      chrome.sidePanel.open({ tabId: tab.id }).catch((err) => console.warn('sidePanel open error:', err));
    }
  });
}

// Side panel lifecycle port: automatically removes DOM overlays & borders when sidebar is closed
if (typeof chrome !== 'undefined' && chrome.runtime?.onConnect) {
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'sidepanel-port') {
      port.onDisconnect.addListener(() => {
        console.log('Sidebar closed. Cleaning up webpage overlays...');
        chrome.tabs.query({ active: true }, (tabs) => {
          tabs.forEach((tab) => {
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, { type: 'CLEANUP_OVERLAYS' }).catch(() => {});
            }
          });
        });
      });
    }
  });
}

// Universal Live Viewport Screenshot Capture via Chrome Tabs API
// + Agent API Proxy: Content scripts in MV3 cannot fetch to localhost directly;
//   they must delegate through the service worker which has unrestricted network access.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CAPTURE_SCREENSHOT') {
    try {
      // If the requesting tab is in the background (user switched tabs), fallback to in-page capture
      // to avoid capturing the newly active tab's screen by mistake.
      if (sender.tab && sender.tab.active === false) {
        sendResponse({
          success: false,
          error: 'Requesting tab is currently inactive due to tab switch. Falling back to in-page DOM capture.',
        });
        return true;
      }

      const targetWindowId = sender.tab?.windowId ?? (null as any);
      chrome.tabs.captureVisibleTab(targetWindowId, { format: 'jpeg', quality: 80 }, (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError?.message || 'Failed to capture visible tab.',
          });
        } else {
          sendResponse({
            success: true,
            dataUrl,
          });
        }
      });
    } catch (err: any) {
      sendResponse({
        success: false,
        error: err.message || 'Error executing captureVisibleTab',
      });
    }
    return true; // Keep message port open for async response
  }

  // Proxy fetch to FastAPI backend on behalf of content script.
  // Content scripts cannot directly fetch to http://127.0.0.1 in Chrome MV3.
  if (message.type === 'CALL_AGENT_API') {
    const { endpoint, payload } = message;
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          sendResponse({ success: false, error: `HTTP ${res.status}: ${res.statusText}` });
        } else {
          const data = await res.json();
          sendResponse({ success: true, data });
        }
      })
      .catch((err: any) => {
        sendResponse({ success: false, error: err.message || 'Fetch failed in service worker' });
      });
    return true; // Keep message port open for async response
  }
});

