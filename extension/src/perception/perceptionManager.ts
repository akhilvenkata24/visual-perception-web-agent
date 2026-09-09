// Step: Complementary Perception Orchestrator (perceptionManager.ts)
// Orchestrates independent, non-blocking perception sources: DOM / ARIA and Tesseract OCR.
// Computer vision is cleanly separated and deferred to future fallback phase.
// Failure in one source does NOT fail the others. 100% local execution.

import { extractPageModel, PageModel, OcrTextRegion } from '../content/domExtractor';
import { shouldRunOcr, extractOcrDetailed } from './ocr';
import { shouldRunVision, extractVisualRegions, VisualRegion } from './vision';

export interface DOMPerceptionResult {
  source: 'dom';
  status: 'success' | 'failure';
  data: PageModel;
  error?: string;
}

export interface OCRPerceptionResult {
  source: 'ocr';
  status: 'success' | 'failure' | 'skipped' | 'uncertain';
  data: OcrTextRegion[];
  elementsScanned?: number;
  uncertain?: boolean;
  executionTimeMs?: number;
  error?: string;
}

export interface VisionPerceptionResult {
  source: 'vision';
  status: 'success' | 'failure' | 'skipped';
  data: VisualRegion[];
  error?: string;
}

export interface PerceptionResultSet {
  dom: DOMPerceptionResult;
  ocr: OCRPerceptionResult;
  vision: VisionPerceptionResult;
  activeSources: ('dom' | 'ocr' | 'vision')[];
}

/**
 * Determines which perception sources are required for a given user task and page context.
 * Automatically falls back to OCR and Vision on sparse or zero-metadata DOM pages (e.g. Canvas apps, SPAs)
 * when visual candidates exist and DOM labels are missing.
 */
export function selectRequiredModalities(
  task: string,
  pageModel: PageModel
): { needOcr: boolean; needVision: boolean } {
  const lower = task.toLowerCase().trim();
  const isPureActionTask = lower.startsWith('click') || lower.startsWith('open') || lower.startsWith('navigate');
  const hasVisualCandidates = pageModel.elements && pageModel.elements.some((e) => e.type === 'image' || e.tagName === 'canvas' || e.tagName === 'img');
  const isSparseDOM = !isPureActionTask && hasVisualCandidates && pageModel.elements.filter((e) => e.label && e.label.trim().length > 0).length === 0;

  return {
    needOcr: shouldRunOcr(task, pageModel) || isSparseDOM,
    needVision: shouldRunVision(task, pageModel) || isSparseDOM,
  };
}

/**
 * Executes independent perception sources concurrently with complete failure isolation.
 */
export async function executePerceptionPipeline(
  task: string,
  livePageModel?: PageModel
): Promise<PerceptionResultSet> {
  // 1. Primary DOM Perception
  let domData: PageModel;
  let domStatus: 'success' | 'failure' = 'success';
  let domError: string | undefined;

  try {
    domData = livePageModel || extractPageModel();
  } catch (err: any) {
    domStatus = 'failure';
    domError = err.message;
    domData = livePageModel || {
      page: { url: '', title: '' },
      elements: [],
    };
  }

  const domResult: DOMPerceptionResult = {
    source: 'dom',
    status: domStatus,
    data: domData,
    error: domError,
  };

  // 2. Select Modalities
  const { needOcr, needVision } = selectRequiredModalities(task, domData);
  const activeSources: ('dom' | 'ocr' | 'vision')[] = ['dom'];

  // Prepare independent OCR promise
  const ocrPromise: Promise<OCRPerceptionResult> = needOcr
    ? (async () => {
        activeSources.push('ocr');
        try {
          const ocrDetail = await extractOcrDetailed(domData);
          return {
            source: 'ocr',
            status: ocrDetail.status,
            data: ocrDetail.regions,
            elementsScanned: ocrDetail.elementsScanned,
            uncertain: ocrDetail.uncertain,
            executionTimeMs: ocrDetail.executionTimeMs,
            error: ocrDetail.error,
          };
        } catch (err: any) {
          return {
            source: 'ocr',
            status: 'failure',
            data: [],
            uncertain: true,
            error: err.message,
          };
        }
      })()
    : Promise.resolve({ source: 'ocr', status: 'skipped', data: [] });

  // Vision Promise
  const visionPromise: Promise<VisionPerceptionResult> = needVision
    ? (async () => {
        activeSources.push('vision');
        try {
          const regions = await extractVisualRegions(domData);
          return { source: 'vision', status: 'success', data: regions };
        } catch (err: any) {
          return { source: 'vision', status: 'failure', data: [], error: err.message };
        }
      })()
    : Promise.resolve({ source: 'vision', status: 'skipped', data: [] });

  // Concurrent non-blocking execution via Promise.allSettled
  const [ocrSettled, visionSettled] = await Promise.allSettled([ocrPromise, visionPromise]);

  const ocrResult: OCRPerceptionResult =
    ocrSettled.status === 'fulfilled'
      ? ocrSettled.value
      : { source: 'ocr', status: 'failure', data: [], uncertain: true, error: String(ocrSettled.reason) };

  const visionResult: VisionPerceptionResult =
    visionSettled.status === 'fulfilled'
      ? visionSettled.value
      : { source: 'vision', status: 'failure', data: [], error: String(visionSettled.reason) };

  return {
    dom: domResult,
    ocr: ocrResult,
    vision: visionResult,
    activeSources,
  };
}
