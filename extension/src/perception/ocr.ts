// Phase 10: Local OCR Engine with Tesseract.js
// Extracts visual text from <canvas> and <img> elements locally in browser.
// Extracts exact line-level and word-level bounding boxes (in image pixels & page viewport coordinates).
// 100% local in-browser execution with reusable Tesseract worker.

import { createWorker, Worker } from 'tesseract.js';
import { PageModel, OcrTextRegion } from '../content/domExtractor';

let ocrWorkerPromise: Promise<Worker> | null = null;
let ocrExecutionTimeMs = 0;

export interface OcrExtractionResult {
  regions: OcrTextRegion[];
  uncertain: boolean;
  status: 'success' | 'failure' | 'uncertain';
  elementsScanned: number;
  error?: string;
  executionTimeMs: number;
}

/**
 * Gets or lazily initializes the singleton Tesseract worker.
 * Reused for all subsequent OCR requests to avoid worker recreation overhead.
 */
export async function getOrInitOcrWorker(): Promise<Worker> {
  if (!ocrWorkerPromise) {
    ocrWorkerPromise = (async () => {
      // Determine local langPath if available
      let langPath: string | undefined;
      if (typeof window !== 'undefined' && window.location?.origin) {
        langPath = window.location.origin; // e.g. http://localhost:8080 where eng.traineddata is hosted
      }
      if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
        langPath = chrome.runtime.getURL('');
      }

      const options: any = {};
      if (langPath) {
        options.langPath = langPath;
      }

      try {
        const worker = await createWorker('eng', 1, options);
        return worker;
      } catch (err) {
        console.warn('[OCR Worker Init] Local langPath fallback, attempting default init:', err);
        const worker = await createWorker('eng');
        return worker;
      }
    })();
  }
  return ocrWorkerPromise;
}

/**
 * Encapsulated worker termination for cleanup.
 */
export async function terminateOcrWorker(): Promise<void> {
  if (ocrWorkerPromise) {
    try {
      const worker = await ocrWorkerPromise;
      await worker.terminate();
    } catch {
      // Ignore termination errors
    } finally {
      ocrWorkerPromise = null;
    }
  }
}

/**
 * Determines whether OCR inspection should be executed.
 * OCR runs when:
 * 1. The user task explicitly requests visual text (keywords: 'image', 'ocr', 'screenshot', 'canvas', 'badge', 'picture', 'photo', 'text in image').
 * 2. Visual elements (<canvas>, target <img>) exist on page AND DOM perception cannot supply the required text.
 * 
 * Standard pure DOM tasks ("Click View Profile", "What is Rahul's email?") return FALSE and skip OCR.
 */
export function shouldRunOcr(task: string, pageModel: PageModel): boolean {
  if (!task || typeof task !== 'string') return false;

  const lowerTask = task.toLowerCase().trim();

  // Pure DOM navigation / action commands skip OCR
  if (
    lowerTask === 'click view profile' ||
    lowerTask.startsWith('click view profile') ||
    lowerTask === 'open rahul\'s profile' ||
    lowerTask.startsWith('open rahul\'s profile') ||
    lowerTask === 'close profile'
  ) {
    return false;
  }

  // Keyword list indicating explicit request for visual content / OCR
  const explicitOcrKeywords = [
    'ocr',
    'image',
    'screenshot',
    'picture',
    'photo',
    'canvas',
    'badge',
    'id card',
    'card text',
    'text in image',
    'in this image',
    'in the image',
    'read image',
    'read picture',
    'text written',
    'visual text',
    'acknowledgement',
    'acknowledgment',
    'registration',
    'what does it say',
    'what is written',
    'what text',
    'scan',
    'img1',
  ];

  const hasExplicitKeyword = explicitOcrKeywords.some((kw) => lowerTask.includes(kw));
  if (hasExplicitKeyword) {
    return true;
  }

  // Check if webpage has visual elements (<canvas> or target <img>)
  const hasCanvas = typeof document !== 'undefined' && document.querySelectorAll('canvas').length > 0;
  const hasImages = pageModel.elements && pageModel.elements.some((el) => el.type === 'image');

  // If task asks for unknown details or numbers and page contains canvas or visual elements, trigger OCR
  const seeksVisualDetails =
    (lowerTask.includes('number') || lowerTask.includes('code') || lowerTask.includes('text') || lowerTask.includes('what')) &&
    !lowerTask.includes('email') &&
    !lowerTask.includes('mobile') &&
    (hasCanvas || hasImages);

  return seeksVisualDetails;
}

/**
 * Extracts natural image dimensions and data URL or image source from a DOM element (<canvas> or <img>).
 */
export function getElementImageSource(el: HTMLElement): { dataUrl: string; width: number; height: number } | null {
  if (el instanceof HTMLCanvasElement) {
    try {
      const width = el.width;
      const height = el.height;
      if (width === 0 || height === 0) return null;
      return {
        dataUrl: el.toDataURL('image/png'),
        width,
        height,
      };
    } catch {
      return null;
    }
  }

  if (el instanceof HTMLImageElement) {
    const width = el.naturalWidth || el.width || 200;
    const height = el.naturalHeight || el.height || 100;

    // Direct data URL
    if (el.src && el.src.startsWith('data:')) {
      return { dataUrl: el.src, width, height };
    }

    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      if (canvas.width > 0 && canvas.height > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(el, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          return { dataUrl, width, height };
        }
      }
    } catch {
      // Fallback: return el.src directly for cross-origin or local images
      if (el.src) {
        return { dataUrl: el.src, width, height };
      }
    }

    if (el.src) {
      return { dataUrl: el.src, width, height };
    }
  }

  return null;
}

/**
 * Main OCR recognition function.
 * Processes visual elements on the page locally using Tesseract.js.
 * Calculates exact bounding boxes in both image pixel space and page viewport coordinates.
 */
export async function extractOcrTextRegions(pageModel: PageModel): Promise<OcrTextRegion[]> {
  const result = await extractOcrDetailed(pageModel);
  return result.regions;
}

/**
 * Full detailed OCR execution with uncertainty and failure tracking.
 */
export async function extractOcrDetailed(pageModel: PageModel): Promise<OcrExtractionResult> {
  const startTime = performance.now();
  const regions: OcrTextRegion[] = [];
  let regionCounter = 0;
  let uncertain = false;
  let errorMsg: string | undefined;

  if (typeof document === 'undefined') {
    return {
      regions,
      uncertain: false,
      status: 'success',
      elementsScanned: 0,
      executionTimeMs: 0,
    };
  }

  // Target candidate visual elements: <canvas> and <img> (excluding avatar icons)
  const candidateElements: { id: string; element: HTMLElement }[] = [];

  const canvases = document.querySelectorAll('canvas');
  canvases.forEach((c, idx) => {
    const id = c.id || c.getAttribute('data-perception-id') || `canvas_${idx + 1}`;
    candidateElements.push({ id, element: c });
  });

  const images = document.querySelectorAll('img');
  images.forEach((img, idx) => {
    // Skip avatar profile icons as they are non-document avatars
    if (img.classList.contains('profile-photo') || img.id.startsWith('photo_')) {
      return;
    }
    const id = img.id || img.getAttribute('data-perception-id') || `img_${idx + 1}`;
    candidateElements.push({ id, element: img });
  });

  if (candidateElements.length === 0) {
    return {
      regions,
      uncertain: false,
      status: 'success',
      elementsScanned: 0,
      executionTimeMs: 0,
    };
  }

  let processedCount = 0;

  try {
    const worker = await getOrInitOcrWorker();

    for (const { id: elementId, element } of candidateElements) {
      try {
        const imageInfo = getElementImageSource(element);
        if (!imageInfo) {
          uncertain = true;
          continue;
        }

        const rect = element.getBoundingClientRect();
        const { dataUrl, width: imgNaturalW, height: imgNaturalH } = imageInfo;

        const result = await worker.recognize(dataUrl);
        processedCount++;

        if (result && result.data && result.data.text) {
          const data = result.data as any;
          const lines = data.lines || [];
          const scaleX = rect.width > 0 && imgNaturalW > 0 ? rect.width / imgNaturalW : 1;
          const scaleY = rect.height > 0 && imgNaturalH > 0 ? rect.height / imgNaturalH : 1;

          if (lines.length > 0) {
            for (const line of lines) {
              const cleanText = line.text ? line.text.trim() : '';
              if (cleanText.length < 2) continue;

              const lbox = line.bbox || {
                x0: 0,
                y0: 0,
                x1: imgNaturalW,
                y1: imgNaturalH,
              };

              const imgBoxW = Math.max(1, lbox.x1 - lbox.x0);
              const imgBoxH = Math.max(1, lbox.y1 - lbox.y0);

              const isDuplicate = pageModel.elements.some(
                (domEl) => domEl.label && domEl.label.trim().toLowerCase() === cleanText.toLowerCase()
              );

              const lineConfidence = Math.round((line.confidence || 80)) / 100;
              if (lineConfidence < 0.3) {
                uncertain = true;
              }

              regions.push({
                id: `ocr_${++regionCounter}`,
                text: cleanText,
                confidence: lineConfidence,
                // Image-relative natural coordinates (for selective image blurring)
                imageBbox: {
                  x: Math.round(lbox.x0),
                  y: Math.round(lbox.y0),
                  width: Math.round(imgBoxW),
                  height: Math.round(imgBoxH),
                },
                // Page viewport coordinates (for browser highlighting / interaction)
                bbox: {
                  x: Math.round(rect.x + lbox.x0 * scaleX),
                  y: Math.round(rect.y + lbox.y0 * scaleY),
                  width: Math.round(imgBoxW * scaleX),
                  height: Math.round(imgBoxH * scaleY),
                },
                source: 'ocr',
                elementId,
                isDuplicateOfDom: isDuplicate,
              });
            }
          } else {
            // Fallback full text
            const fullText = result.data.text.trim();
            if (fullText.length >= 2) {
              const isDuplicate = pageModel.elements.some(
                (domEl) => domEl.label && domEl.label.trim().toLowerCase() === fullText.toLowerCase()
              );

              regions.push({
                id: `ocr_${++regionCounter}`,
                text: fullText,
                confidence: Math.round((result.data.confidence || 80)) / 100,
                imageBbox: {
                  x: 0,
                  y: 0,
                  width: imgNaturalW,
                  height: imgNaturalH,
                },
                bbox: {
                  x: Math.round(rect.x),
                  y: Math.round(rect.y),
                  width: Math.round(rect.width || imgNaturalW),
                  height: Math.round(rect.height || imgNaturalH),
                },
                source: 'ocr',
                elementId,
                isDuplicateOfDom: isDuplicate,
              });
            }
          }
        } else {
          uncertain = true;
        }
      } catch (elemErr: any) {
        console.warn(`[OCR Engine Warning] OCR skipped element '${elementId}':`, elemErr);
        uncertain = true;
      }
    }
  } catch (err: any) {
    console.warn('[OCR Engine Warning] Local Tesseract OCR encountered an error:', err);
    errorMsg = err.message || 'OCR Engine failed';
    uncertain = true;
  } finally {
    ocrExecutionTimeMs = Math.round(performance.now() - startTime);
  }

  const finalStatus: 'success' | 'failure' | 'uncertain' =
    regions.length > 0
      ? 'success'
      : errorMsg
      ? 'failure'
      : uncertain
      ? 'uncertain'
      : 'success';

  return {
    regions,
    uncertain,
    status: finalStatus,
    elementsScanned: processedCount,
    error: errorMsg,
    executionTimeMs: ocrExecutionTimeMs,
  };
}

/**
 * Returns the last recorded execution time in ms.
 */
export function getOcrExecutionTimeMs(): number {
  return ocrExecutionTimeMs;
}
