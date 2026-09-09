// Phase 10: Local OCR Engine Unit Tests
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { shouldRunOcr, extractOcrTextRegions, getOrInitOcrWorker, terminateOcrWorker } from '../ocr';
import { PageModel } from '../../content/domExtractor';
import { detectSensitiveEntities } from '../../privacy/piiDetector';

describe('Phase 10 — Local OCR Engine (Tesseract.js)', () => {
  const mockPageModel: PageModel = {
    page: {
      url: 'http://localhost:8080/index.html',
      title: 'Employee Directory',
    },
    elements: [
      {
        id: 'name_rahul',
        type: 'heading',
        tagName: 'h2',
        label: 'Rahul Sharma',
        role: 'heading',
        visible: true,
        position: { x: 10, y: 10, width: 100, height: 20 },
      },
      {
        id: 'img_badge',
        type: 'image',
        tagName: 'img',
        label: '',
        role: 'img',
        visible: true,
        position: { x: 50, y: 50, width: 200, height: 100 },
      },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(async () => {
    await terminateOcrWorker();
  });

  describe('Selective & Task-Aware Trigger Logic (shouldRunOcr)', () => {
    it('TEST 4: Returns FALSE for standard DOM tasks (skips OCR)', () => {
      expect(shouldRunOcr("Click View Profile", mockPageModel)).toBe(false);
      expect(shouldRunOcr("What is Rahul's email?", mockPageModel)).toBe(false);
      expect(shouldRunOcr("Open Rahul's profile", mockPageModel)).toBe(false);
    });

    it('Returns TRUE when task explicitly requests image/visual text analysis', () => {
      expect(shouldRunOcr("What text is written in this image?", mockPageModel)).toBe(true);
      expect(shouldRunOcr("Read the security badge canvas", mockPageModel)).toBe(true);
      expect(shouldRunOcr("Run OCR on photo", mockPageModel)).toBe(true);
      expect(shouldRunOcr("What is the code written in screenshot?", mockPageModel)).toBe(true);
    });
  });

  describe('Tesseract Worker Lifecycle', () => {
    it('TEST 5: Lazily initializes and reuses worker singleton', async () => {
      const worker1 = await getOrInitOcrWorker();
      const worker2 = await getOrInitOcrWorker();

      expect(worker1).toBeDefined();
      expect(worker1).toBe(worker2); // Reference equality proves reuse
    });
  });

  describe('OCR + PII Detector Integration', () => {
    it('TEST 1 & 2 & 3: Integrates OCR text regions into PageModel and PII detector', () => {
      const pageModelWithOcr: PageModel = {
        ...mockPageModel,
        text_regions: [
          {
            id: 'ocr_01',
            text: 'Name: Rahul Sharma',
            confidence: 0.96,
            bbox: { x: 20, y: 60, width: 150, height: 20 },
            source: 'ocr',
            elementId: 'badge_canvas',
          },
          {
            id: 'ocr_02',
            text: 'rahul_ocr@example.com',
            confidence: 0.95,
            bbox: { x: 20, y: 90, width: 180, height: 20 },
            source: 'ocr',
            elementId: 'badge_canvas',
          },
          {
            id: 'ocr_03',
            text: '+91 9876543210',
            confidence: 0.92,
            bbox: { x: 20, y: 120, width: 120, height: 20 },
            source: 'ocr',
            elementId: 'badge_canvas',
          },
        ],
      };

      const sensitiveEntities = detectSensitiveEntities(pageModelWithOcr);

      // Verify PII entities detected from OCR text
      const ocrEmail = sensitiveEntities.find((e) => e.value === 'rahul_ocr@example.com');
      expect(ocrEmail).toBeDefined();
      expect(ocrEmail?.type).toBe('email');
      expect(ocrEmail?.source).toContain('ocr');

      const ocrPhone = sensitiveEntities.find((e) => e.value === '+91 9876543210');
      expect(ocrPhone).toBeDefined();
      expect(ocrPhone?.type).toBe('phone');
      expect(ocrPhone?.source).toContain('ocr');
    });
  });

  describe('Error Handling & Resilience', () => {
    it('TEST 6: Handles missing DOM gracefully without throwing', async () => {
      // In JSDOM without canvas context, extractOcrTextRegions returns [] safely
      const regions = await extractOcrTextRegions(mockPageModel);
      expect(Array.isArray(regions)).toBe(true);
    });
  });
});
