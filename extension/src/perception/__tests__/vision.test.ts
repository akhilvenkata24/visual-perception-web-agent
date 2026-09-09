// Phase 11: Local Vision Unit Tests (ONNX Runtime Web)
import { describe, it, expect } from 'vitest';
import { shouldRunVision, extractVisualRegions, getVisionMetadata } from '../vision';
import { PageModel } from '../../content/domExtractor';

describe('Phase 11 — Local Vision Engine (ONNX Runtime Web)', () => {
  const mockPageModel: PageModel = {
    page: {
      url: 'http://localhost:8080/index.html',
      title: 'Employee Directory',
    },
    elements: [
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
  };

  describe('Selective & Task-Aware Trigger Logic (shouldRunVision)', () => {
    it('Returns FALSE for DOM tasks (skips vision)', () => {
      expect(shouldRunVision("Click View Profile", mockPageModel)).toBe(false);
      expect(shouldRunVision("What is Rahul's email?", mockPageModel)).toBe(false);
    });

    it('Returns TRUE for visual identity tasks ("Who\'s this person?")', () => {
      expect(shouldRunVision("Who's this person?", mockPageModel)).toBe(true);
      expect(shouldRunVision("Identify person in photo", mockPageModel)).toBe(true);
    });
  });

  describe('Visual Region Detection', () => {
    it('Extracts structured face visual regions from profile photo', async () => {
      const regions = await extractVisualRegions(mockPageModel);

      expect(regions.length).toBe(1);
      expect(regions[0].id).toBe('face_1');
      expect(regions[0].type).toBe('face');
      expect(regions[0].source).toBe('vision');
      expect(regions[0].elementId).toBe('photo_rahul');
      expect(regions[0].confidence).toBeGreaterThan(0.9);
    });

    it('Exposes runtime metadata with WebGPU / WASM execution provider info', () => {
      const metadata = getVisionMetadata();
      expect(metadata.modelName).toBe('tiny-face-detector.onnx');
      expect(metadata.modelSize).toBe('1.2 MB');
      expect(['webgpu', 'wasm', 'stub']).toContain(metadata.executionProvider);
    });
  });
});
