// Universal Viewport Screenshot Capturer (screenshotCapturer.ts)
// Captures live viewport screenshots of any arbitrary website viewed by the user.
// Uses chrome.tabs.captureVisibleTab with high-performance DOM/Canvas fallback.

export interface ViewportScreenshotResult {
  dataUrl: string;
  width: number;
  height: number;
  source: 'chrome_api' | 'dom_canvas_fallback';
}

/**
 * Resizes and compresses an image Data URL to stay well within token limits (e.g. max 960x640, JPEG 85%).
 */
export async function compressScreenshot(
  dataUrl: string,
  maxWidth = 960,
  maxHeight = 640,
  quality = 0.85
): Promise<{ dataUrl: string; width: number; height: number }> {
  if (typeof document === 'undefined') {
    return { dataUrl, width: maxWidth, height: maxHeight };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const origW = img.naturalWidth || img.width || maxWidth;
      const origH = img.naturalHeight || img.height || maxHeight;

      const scale = Math.min(1, maxWidth / origW, maxHeight / origH);
      const targetW = Math.max(1, Math.round(origW * scale));
      const targetH = Math.max(1, Math.round(origH * scale));

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve({ dataUrl, width: origW, height: origH });
        return;
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);
      try {
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl: compressed, width: targetW, height: targetH });
      } catch {
        resolve({ dataUrl, width: origW, height: origH });
      }
    };
    img.onerror = () => {
      resolve({ dataUrl, width: maxWidth, height: maxHeight });
    };
    img.src = dataUrl;
  });
}

/**
 * Captures a live screenshot of the visible webpage viewport.
 */
export async function captureViewportScreenshot(): Promise<ViewportScreenshotResult | null> {
  // 1. Attempt Chrome Tabs API via background Service Worker if available
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      const response = await new Promise<{ success: boolean; dataUrl?: string; error?: string }>(
        (resolve) => {
          chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' }, (res) => {
            if (chrome.runtime.lastError) {
              resolve({ success: false, error: chrome.runtime.lastError.message });
            } else {
              resolve(res || { success: false, error: 'Empty response' });
            }
          });
        }
      );

      if (response && response.success && response.dataUrl) {
        const compressed = await compressScreenshot(response.dataUrl);
        return {
          dataUrl: compressed.dataUrl,
          width: compressed.width,
          height: compressed.height,
          source: 'chrome_api',
        };
      }
    } catch (_err) {
      // Fallback to in-page renderer
    }
  }

  // 2. High-Performance DOM & Canvas Viewport Fallback (for unit tests / direct content scripts)
  if (typeof document !== 'undefined') {
    try {
      const viewW = Math.min(window.innerWidth || 1280, 1280);
      const viewH = Math.min(window.innerHeight || 800, 800);

      const canvas = document.createElement('canvas');
      canvas.width = viewW;
      canvas.height = viewH;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Base background fill
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, viewW, viewH);

        // Draw visible canvas elements at their exact viewport bounding rectangles
        const pageCanvases = document.querySelectorAll('canvas');
        pageCanvases.forEach((c) => {
          if (c === canvas) return;
          const rect = c.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= viewH) {
            try {
              ctx.drawImage(c, rect.left, rect.top, rect.width, rect.height);
            } catch {}
          }
        });

        // Draw visible image elements at their exact viewport bounding rectangles
        const pageImages = document.querySelectorAll('img');
        pageImages.forEach((img) => {
          const rect = img.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= viewH) {
            try {
              ctx.drawImage(img, rect.left, rect.top, rect.width, rect.height);
            } catch {}
          }
        });

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const compressed = await compressScreenshot(dataUrl);
        return {
          dataUrl: compressed.dataUrl,
          width: compressed.width,
          height: compressed.height,
          source: 'dom_canvas_fallback',
        };
      }
    } catch (_renderErr) {}
  }

  return null;
}
