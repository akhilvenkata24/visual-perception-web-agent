// @vitest-environment jsdom
// Unit Tests for Image Redactor & Selective Blurring Engine
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { redactImageRegions, BoundingBox } from '../imageRedactor';
import { createSanitizedImages } from '../../privacy/redactor';
import { PageModel } from '../../content/domExtractor';
import { SensitiveEntity } from '../../privacy/piiDetector';
import { PrivacyDecision } from '../../privacy/policyEngine';

describe('Local Image Redactor Engine (imageRedactor.ts)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock HTMLCanvasElement 2D context and toDataURL for jsdom environment
    const mockContext = {
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      fillText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
      filter: 'none',
      fillStyle: '#000000',
      font: '10px sans-serif',
      textAlign: 'left',
      textBaseline: 'top',
      getImageData: vi.fn((_x, _y, w, h) => ({
        data: new Uint8ClampedArray(w * h * 4),
        width: w,
        height: h,
      })),
      putImageData: vi.fn(),
    };

    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => mockContext as any);
    HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mockImageDataUrl');
  });

  // Helper to create mock canvas
  function createMockCanvas(width = 300, height = 200, id = 'img_test'): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = id;
    return canvas;
  }

  it('TEST 1: Selectively redacts bounding boxes and returns isRedacted: true', async () => {
    const canvas = createMockCanvas(400, 300, 'target_badge');
    const sensitiveBoxes: BoundingBox[] = [
      { x: 50, y: 50, width: 120, height: 25 },
      { x: 50, y: 100, width: 150, height: 25 },
    ];

    const result = await redactImageRegions(canvas, sensitiveBoxes, { mode: 'blur' });

    expect(result.elementId).toBe('target_badge');
    expect(result.originalWidth).toBe(400);
    expect(result.originalHeight).toBe(300);
    expect(result.redactedBoxesCount).toBe(2);
    expect(result.isRedacted).toBe(true);
    expect(result.redactedDataUrl).toContain('data:image/png;base64');
  });

  it('TEST 2: Leaves image unchanged when no sensitive bounding boxes are provided', async () => {
    const canvas = createMockCanvas(300, 200, 'safe_img');
    const result = await redactImageRegions(canvas, []);

    expect(result.elementId).toBe('safe_img');
    expect(result.redactedBoxesCount).toBe(0);
    expect(result.isRedacted).toBe(false);
  });

  it('TEST 3: Supports solid redaction mode with custom fill color', async () => {
    const canvas = createMockCanvas(400, 200, 'redact_img');
    const boxes: BoundingBox[] = [{ x: 10, y: 10, width: 80, height: 20 }];

    const result = await redactImageRegions(canvas, boxes, {
      mode: 'redact',
      fillColor: '#000000',
    });

    expect(result.isRedacted).toBe(true);
    expect(result.redactedBoxesCount).toBe(1);
  });

  it('TEST 4: Supports pixelate mode', async () => {
    const canvas = createMockCanvas(400, 200, 'pixelate_img');
    const boxes: BoundingBox[] = [{ x: 20, y: 20, width: 60, height: 30 }];

    const result = await redactImageRegions(canvas, boxes, { mode: 'pixelate' });

    expect(result.isRedacted).toBe(true);
    expect(result.redactedBoxesCount).toBe(1);
  });

  it('TEST 5: createSanitizedImages only blurs masked PII on images and preserves allowed PII', async () => {
    // Setup DOM with an image element
    document.body.innerHTML = `
      <img id="img1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" width="200" height="100" />
    `;

    const mockPageModel: PageModel = {
      page: { url: 'http://test.com', title: 'Test' },
      elements: [
        {
          id: 'img1',
          type: 'image',
          tagName: 'img',
          label: 'Test image',
          role: 'img',
          visible: true,
          position: { x: 0, y: 0, width: 200, height: 100 },
        },
      ],
      text_regions: [
        {
          id: 'ocr_1',
          text: 'Rahul Sharma',
          confidence: 0.95,
          imageBbox: { x: 10, y: 10, width: 80, height: 20 },
          bbox: { x: 10, y: 10, width: 80, height: 20 },
          source: 'ocr',
          elementId: 'img1',
        },
        {
          id: 'ocr_2',
          text: 'rahul@example.com',
          confidence: 0.95,
          imageBbox: { x: 10, y: 40, width: 120, height: 20 },
          bbox: { x: 10, y: 40, width: 120, height: 20 },
          source: 'ocr',
          elementId: 'img1',
        },
      ],
    };

    const sensitiveEntities: SensitiveEntity[] = [
      {
        id: 'entity_1',
        type: 'person_name',
        value: 'Rahul Sharma',
        sources: ['ocr', 'semantic'],
        source: 'ocr+semantic',
        confidence: 0.95,
        elementId: 'img1',
        textRegionId: 'ocr_1',
        imageBbox: { x: 10, y: 10, width: 80, height: 20 },
      },
      {
        id: 'entity_2',
        type: 'email',
        value: 'rahul@example.com',
        sources: ['ocr', 'regex'],
        source: 'ocr+regex',
        confidence: 0.95,
        elementId: 'img1',
        textRegionId: 'ocr_2',
        imageBbox: { x: 10, y: 40, width: 120, height: 20 },
      },
    ];

    // Privacy Decisions: Name is ALLOWED, Email is MASKED
    const decisions: PrivacyDecision[] = [
      {
        entityId: 'entity_1',
        entityType: 'person_name',
        value: 'Rahul Sharma',
        sensitivity: 'medium',
        taskRelevance: 'high',
        taskRequired: true,
        remoteNecessity: 'high',
        decision: 'ALLOW',
        reason: 'Requested identity',
        elementId: 'img1',
      },
      {
        entityId: 'entity_2',
        entityType: 'email',
        value: 'rahul@example.com',
        sensitivity: 'high',
        taskRelevance: 'none',
        taskRequired: false,
        remoteNecessity: 'none',
        decision: 'MASK',
        reason: 'Unrequested PII',
        elementId: 'img1',
      },
    ];

    const sanitizedImages = await createSanitizedImages(mockPageModel, sensitiveEntities, decisions);

    expect(sanitizedImages['img1']).toBeDefined();
    expect(sanitizedImages['img1'].isRedacted).toBe(true);
    // Only 1 region (the email) was redacted; the allowed name was NOT redacted
    expect(sanitizedImages['img1'].redactedBoxesCount).toBe(1);
  });
});
