// Phase 1: Basic service worker foundation & Universal Screenshot Capture Provider
console.log('Privacy Browser Agent Service Worker initialized.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Privacy Browser Agent installed successfully.');
});

// Universal Live Viewport Screenshot Capture via Chrome Tabs API
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'CAPTURE_SCREENSHOT') {
    try {
      chrome.tabs.captureVisibleTab(null as any, { format: 'jpeg', quality: 80 }, (dataUrl) => {
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
});

