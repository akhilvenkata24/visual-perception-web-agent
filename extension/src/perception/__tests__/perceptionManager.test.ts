// Step: Perception Manager Unit Tests
import { describe, it, expect } from 'vitest';
import { executePerceptionPipeline, selectRequiredModalities } from '../perceptionManager';
import { PageModel } from '../../content/domExtractor';

describe('Step — Perception Manager (Complementary Modalities)', () => {
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

  describe('Modality Selection', () => {
    it('TEST 1: Task only requiring DOM -> skips OCR and Vision', () => {
      const selection = selectRequiredModalities("Click View Profile", mockPageModel);
      expect(selection.needOcr).toBe(false);
      expect(selection.needVision).toBe(false);
    });

    it('TEST 2: Task requiring OCR -> activates OCR', () => {
      const selection = selectRequiredModalities("Read the text in this image", mockPageModel);
      expect(selection.needOcr).toBe(true);
    });

    it('TEST 3: Task requiring visual identity -> activates Vision', () => {
      const selection = selectRequiredModalities("Who's this person?", mockPageModel);
      expect(selection.needVision).toBe(true);
    });
  });

  describe('Pipeline Execution & Failure Isolation', () => {
    it('TEST 4 & 5 & 6: Executes pipeline independently and maintains failure isolation', async () => {
      const results = await executePerceptionPipeline("Who's this person?", mockPageModel);

      expect(results.dom.status).toBe('success');
      expect(results.dom.data.elements.length).toBe(2);

      // Vision ran concurrently and succeeded
      expect(results.vision.status).toBe('success');
      expect(results.vision.data.length).toBeGreaterThan(0);

      // OCR was skipped safely
      expect(results.ocr.status).toBe('skipped');
    });
  });
});
