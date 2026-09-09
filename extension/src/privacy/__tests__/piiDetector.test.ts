import { describe, it, expect } from 'vitest';
import { detectSensitiveEntities } from '../piiDetector';
import { UnifiedPageModel } from '../../perception/unifiedPageModel';


describe('Phase 13 — Hybrid PII Detector Engine', () => {
  const mockUnifiedModel: UnifiedPageModel = {
    page: {
      url: 'http://localhost:8080/index.html',
      title: 'Employee Directory',
    },
    elements: [
      {
        id: 'email_rahul',
        type: 'input',
        tagName: 'input',
        label: 'rahul.sharma@example.com',
        role: 'textbox',
        inputType: 'email',
        visible: true,
        position: { x: 10, y: 10, width: 200, height: 30 },
      },
      {
        id: 'random_text',
        type: 'text',
        tagName: 'span',
        label: '123456789', // Uncontextualized number
        role: 'generic',
        visible: true,
        position: { x: 10, y: 50, width: 100, height: 20 },
      },
      {
        id: 'btn_profile',
        type: 'button',
        tagName: 'button',
        label: 'View Profile',
        role: 'button',
        visible: true,
        position: { x: 10, y: 80, width: 100, height: 30 },
      },
    ],
    text_regions: [
      {
        id: 'ocr_01',
        text: '+91 9876543210',
        confidence: 0.92,
        bbox: { x: 20, y: 120, width: 120, height: 20 },
        source: 'ocr',
        elementId: 'badge_canvas',
      },
      {
        id: 'ocr_dup',
        text: 'rahul.sharma@example.com', // Duplicate text matching DOM element
        confidence: 0.95,
        bbox: { x: 10, y: 10, width: 200, height: 30 },
        source: 'ocr',
        elementId: 'email_rahul',
      },
    ],
    visual_regions: [
      {
        id: 'face_1',
        type: 'face',
        bbox: { x: 50, y: 50, width: 128, height: 128 },
        confidence: 0.94,
        source: 'vision',
        elementId: 'photo_rahul',
        executionProvider: 'wasm',
      },
    ],
    entities: [],
    metadata: {
      sourcesRun: ['dom', 'ocr', 'vision'],
      timestamp: Date.now(),
    },
  };

  it('TEST 1: DOM + REGEX multi-source evidence combination', () => {
    const sensitiveEntities = detectSensitiveEntities(mockUnifiedModel);
    const emailEntity = sensitiveEntities.find((e) => e.value === 'rahul.sharma@example.com');

    expect(emailEntity).toBeDefined();
    expect(emailEntity?.type).toBe('email');
    expect(emailEntity?.sources).toContain('dom');
    expect(emailEntity?.sources).toContain('regex');
    expect(emailEntity?.confidence).toBeGreaterThanOrEqual(0.99);
  });

  it('TEST 2: OCR + REGEX phone number detection', () => {
    const sensitiveEntities = detectSensitiveEntities(mockUnifiedModel);
    const ocrPhone = sensitiveEntities.find((e) => e.value === '+91 9876543210');

    expect(ocrPhone).toBeDefined();
    expect(ocrPhone?.type).toBe('phone');
    expect(ocrPhone?.sources).toContain('ocr');
    expect(ocrPhone?.sources).toContain('regex');
  });

  it('TEST 3: VISION face region detection', () => {
    const sensitiveEntities = detectSensitiveEntities(mockUnifiedModel);
    const faceEntity = sensitiveEntities.find((e) => e.type === 'face');

    expect(faceEntity).toBeDefined();
    expect(faceEntity?.sources).toContain('vision');
    expect(faceEntity?.visualRegionId).toBe('face_1');
    expect(faceEntity?.confidence).toBe(0.94);
  });

  it('TEST 4: DOM + OCR text correlation & duplicate evidence merging', () => {
    const sensitiveEntities = detectSensitiveEntities(mockUnifiedModel);
    const matchingEmails = sensitiveEntities.filter((e) => e.value === 'rahul.sharma@example.com');

    // Should merge into 1 single entity instead of duplicating
    expect(matchingEmails.length).toBe(1);
    expect(matchingEmails[0].sources).toContain('dom');
  });

  it('TEST 5: False-positive resistance (uncontextualized number "123456789" rejected)', () => {
    const sensitiveEntities = detectSensitiveEntities(mockUnifiedModel);
    const falsePhone = sensitiveEntities.find((e) => e.value === '123456789');

    expect(falsePhone).toBeUndefined();
  });

  it('TEST 6: Action button ("View Profile") is NOT classified as a person name', () => {
    const sensitiveEntities = detectSensitiveEntities(mockUnifiedModel);
    const falseName = sensitiveEntities.find((e) => e.value === 'View Profile');

    expect(falseName).toBeUndefined();
  });
});
