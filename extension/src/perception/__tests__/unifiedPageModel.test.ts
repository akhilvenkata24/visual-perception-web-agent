// Step: Unified Page Model Unit Tests
import { describe, it, expect } from 'vitest';
import { buildUnifiedPageModel } from '../unifiedPageModel';
import { PerceptionResultSet } from '../perceptionManager';

describe('Step — Unified Page Model (Normalized Contract)', () => {
  const baseResultSet: PerceptionResultSet = {
    dom: {
      source: 'dom',
      status: 'success',
      data: {
        page: { url: 'http://localhost:8080/index.html', title: 'Employee Directory' },
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
            id: 'photo_rahul',
            type: 'image',
            tagName: 'img',
            label: 'Profile photo of Rahul Sharma',
            role: 'img',
            visible: true,
            position: { x: 50, y: 50, width: 128, height: 128 },
          },
        ],
      },
    },
    ocr: {
      source: 'ocr',
      status: 'skipped',
      data: [],
    },
    vision: {
      source: 'vision',
      status: 'skipped',
      data: [],
    },
    activeSources: ['dom'],
  };

  it('TEST 1: DOM only -> builds valid UnifiedPageModel', () => {
    const unifiedModel = buildUnifiedPageModel(baseResultSet);

    expect(unifiedModel.page.title).toBe('Employee Directory');
    expect(unifiedModel.elements.length).toBe(2);
    expect(unifiedModel.text_regions).toEqual([]);
    expect(unifiedModel.visual_regions).toEqual([]);
    expect(unifiedModel.metadata.sourcesRun).toEqual(['dom']);
  });

  it('TEST 2: DOM + OCR -> includes text_regions', () => {
    const ocrResultSet: PerceptionResultSet = {
      ...baseResultSet,
      ocr: {
        source: 'ocr',
        status: 'success',
        data: [
          {
            id: 'ocr_01',
            text: 'rahul_ocr@example.com',
            confidence: 0.95,
            bbox: { x: 20, y: 90, width: 180, height: 20 },
            source: 'ocr',
            elementId: 'badge_canvas',
          },
        ],
      },
      activeSources: ['dom', 'ocr'],
    };

    const unifiedModel = buildUnifiedPageModel(ocrResultSet);

    expect(unifiedModel.text_regions.length).toBe(1);
    expect(unifiedModel.text_regions[0].text).toBe('rahul_ocr@example.com');
    expect(unifiedModel.text_regions[0].source).toBe('ocr');
  });

  it('TEST 3: DOM + Vision -> includes visual_regions', () => {
    const visionResultSet: PerceptionResultSet = {
      ...baseResultSet,
      vision: {
        source: 'vision',
        status: 'success',
        data: [
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
      },
      activeSources: ['dom', 'vision'],
    };

    const unifiedModel = buildUnifiedPageModel(visionResultSet);

    expect(unifiedModel.visual_regions.length).toBe(1);
    expect(unifiedModel.visual_regions[0].id).toBe('face_1');
    expect(unifiedModel.visual_regions[0].source).toBe('vision');
  });

  it('TEST 4: DOM + OCR + Vision -> includes all three modalities', () => {
    const fullResultSet: PerceptionResultSet = {
      ...baseResultSet,
      ocr: {
        source: 'ocr',
        status: 'success',
        data: [
          {
            id: 'ocr_01',
            text: 'rahul_ocr@example.com',
            confidence: 0.95,
            bbox: { x: 20, y: 90, width: 180, height: 20 },
            source: 'ocr',
          },
        ],
      },
      vision: {
        source: 'vision',
        status: 'success',
        data: [
          {
            id: 'face_1',
            type: 'face',
            bbox: { x: 50, y: 50, width: 128, height: 128 },
            confidence: 0.94,
            source: 'vision',
            executionProvider: 'wasm',
          },

        ],
      },
      activeSources: ['dom', 'ocr', 'vision'],
    };

    const unifiedModel = buildUnifiedPageModel(fullResultSet);

    expect(unifiedModel.elements.length).toBe(2);
    expect(unifiedModel.text_regions.length).toBe(1);
    expect(unifiedModel.visual_regions.length).toBe(1);
    expect(unifiedModel.entities.length).toBe(1);
    expect(unifiedModel.entities[0].references).toContain('name_rahul');
    expect(unifiedModel.entities[0].references).toContain('photo_rahul');
  });

  it('TEST 7 & 8: Duplicate handling and non-destructive immutability', () => {
    const duplicateResultSet: PerceptionResultSet = {
      ...baseResultSet,
      ocr: {
        source: 'ocr',
        status: 'success',
        data: [
          {
            id: 'ocr_dup',
            text: 'Rahul Sharma', // Same text as DOM heading label
            confidence: 0.96,
            bbox: { x: 10, y: 10, width: 100, height: 20 },
            source: 'ocr',
          },
        ],
      },
      activeSources: ['dom', 'ocr'],
    };

    const unifiedModel = buildUnifiedPageModel(duplicateResultSet);
    expect(unifiedModel.text_regions[0].isDuplicateOfDom).toBe(true);

    // Verify original perception results were NOT mutated
    expect(baseResultSet.dom.data.elements.length).toBe(2);
  });
});
