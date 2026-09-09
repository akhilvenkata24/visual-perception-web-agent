import { describe, it, expect } from 'vitest';
import {
  calculateIoU,
  calculateContainment,
  mergeTwoBoxes,
  mergeOverlappingBoxes,
  fusePerceptionDetections,
} from '../detectionFusion';
import { SensitiveEntity } from '../../privacy/piiDetector';
import { PrivacyDecision } from '../../privacy/policyEngine';

describe('Detection Fusion & Bounding Box Reconciliation Engine', () => {
  describe('Geometry Utilities', () => {
    it('calculates IoU accurately for identical, partial, and disjoint boxes', () => {
      const boxA = { x: 10, y: 10, width: 100, height: 100 };
      const boxB = { x: 10, y: 10, width: 100, height: 100 };
      const boxDisjoint = { x: 200, y: 200, width: 50, height: 50 };
      const boxPartial = { x: 50, y: 50, width: 100, height: 100 };

      // Identical
      expect(calculateIoU(boxA, boxB)).toBeCloseTo(1.0, 4);

      // Disjoint
      expect(calculateIoU(boxA, boxDisjoint)).toBe(0);

      // Partial overlap:
      // Intersection: (50,50) to (110,110) => 60x60 = 3600
      // Area A = 10000, Area B = 10000, Union = 10000 + 10000 - 3600 = 16400
      // IoU = 3600 / 16400 ≈ 0.2195
      expect(calculateIoU(boxA, boxPartial)).toBeCloseTo(3600 / 16400, 4);
    });

    it('calculates Containment accurately for nested boxes', () => {
      const parent = { x: 0, y: 0, width: 200, height: 200 };
      const child = { x: 50, y: 50, width: 40, height: 20 }; // completely inside parent

      expect(calculateContainment(parent, child)).toBe(1.0);
    });

    it('merges two boxes into their minimal bounding union', () => {
      const box1 = { x: 10, y: 20, width: 50, height: 30 }; // max x=60, y=50
      const box2 = { x: 40, y: 10, width: 60, height: 70 }; // min x=40, y=10, max x=100, y=80

      const merged = mergeTwoBoxes(box1, box2);
      expect(merged).toEqual({
        x: 10,
        y: 10,
        width: 90,
        height: 70,
      });
    });

    it('iteratively merges overlapping boxes while preserving disjoint boxes', () => {
      const boxes = [
        { x: 10, y: 10, width: 40, height: 40 },
        { x: 20, y: 20, width: 40, height: 40 }, // overlaps box 1
        { x: 300, y: 300, width: 50, height: 50 }, // disjoint
      ];

      const merged = mergeOverlappingBoxes(boxes, 0.1, 0.5);
      expect(merged.length).toBe(2);
      // Merged box 1+2: x=10, y=10, max x=60, max y=60 => w=50, h=50
      expect(merged[0]).toEqual({ x: 10, y: 10, width: 50, height: 50 });
      // Preserved disjoint box
      expect(merged[1]).toEqual({ x: 300, y: 300, width: 50, height: 50 });
    });
  });

  describe('Multi-Modal Detection Fusion (fusePerceptionDetections)', () => {
    const testElementId = 'badge_image_1';

    it('Test 1: Fuses OCR-only sensitive text boxes for blurring', () => {
      const sensitiveEntities: SensitiveEntity[] = [
        {
          id: 'ocr_phone_1',
          type: 'phone',
          value: '+1-555-0199',
          elementId: testElementId,
          textRegionId: `${testElementId}_ocr_line_1`,
          source: 'ocr',
          sources: ['ocr'],
          confidence: 0.98,
          imageBbox: { x: 20, y: 80, width: 140, height: 25 },
        },
      ];

      const decisions: PrivacyDecision[] = [
        {
          entityId: 'ocr_phone_1',
          elementId: testElementId,
          entityType: 'phone',
          value: '+1-555-0199',
          sensitivity: 'high',
          taskRelevance: 'none',
          taskRequired: false,
          remoteNecessity: 'none',
          decision: 'MASK',
          confidence: 0.98,
          reason: 'Unrequested phone number on image',
        },
      ];

      const fused = fusePerceptionDetections(testElementId, sensitiveEntities, decisions);
      expect(fused.length).toBe(1);
      expect(fused[0]).toEqual({ x: 20, y: 80, width: 140, height: 25 });
    });

    it('Test 2: Fuses CV-only sensitive visual features (face/signature) for blurring', () => {
      const sensitiveEntities: SensitiveEntity[] = [
        {
          id: 'vis_face_1',
          type: 'face',
          value: '[face_region]',
          elementId: testElementId,
          visualRegionId: `${testElementId}_face_1`,
          source: 'vision',
          sources: ['vision'],
          confidence: 0.95,
          imageBbox: { x: 30, y: 30, width: 80, height: 80 },
        },
      ];

      const decisions: PrivacyDecision[] = [
        {
          entityId: 'vis_face_1',
          elementId: testElementId,
          entityType: 'face',
          value: '[face_region]',
          sensitivity: 'high',
          taskRelevance: 'none',
          taskRequired: false,
          remoteNecessity: 'none',
          decision: 'MASK',
          confidence: 0.95,
          reason: 'Biometric face visual feature protected',
        },
      ];

      const fused = fusePerceptionDetections(testElementId, sensitiveEntities, decisions);
      expect(fused.length).toBe(1);
      expect(fused[0]).toEqual({ x: 30, y: 30, width: 80, height: 80 });
    });

    it('Test 3: Merges overlapping OCR text and CV visual boxes into a unified bounding box', () => {
      const sensitiveEntities: SensitiveEntity[] = [
        // CV detected a sensitive visual region / badge card
        {
          id: 'vis_id_doc_1',
          type: 'sensitive_visual_region',
          value: '[sensitive_visual_region]',
          elementId: testElementId,
          visualRegionId: `${testElementId}_id_1`,
          source: 'vision',
          sources: ['vision'],
          confidence: 0.92,
          imageBbox: { x: 10, y: 10, width: 200, height: 120 },
        },
        // OCR detected sensitive text inside the badge region
        {
          id: 'ocr_email_1',
          type: 'email',
          value: 'user@corp.internal',
          elementId: testElementId,
          textRegionId: `${testElementId}_ocr_line_2`,
          source: 'ocr',
          sources: ['ocr'],
          confidence: 0.99,
          imageBbox: { x: 30, y: 50, width: 150, height: 20 },
        },
      ];

      const decisions: PrivacyDecision[] = [
        {
          entityId: 'vis_id_doc_1',
          elementId: testElementId,
          entityType: 'sensitive_visual_region',
          value: '[sensitive_visual_region]',
          sensitivity: 'high',
          taskRelevance: 'none',
          taskRequired: false,
          remoteNecessity: 'none',
          decision: 'MASK',
          confidence: 0.92,
          reason: 'Sensitive visual region protected',
        },
        {
          entityId: 'ocr_email_1',
          elementId: testElementId,
          entityType: 'email',
          value: 'user@corp.internal',
          sensitivity: 'high',
          taskRelevance: 'none',
          taskRequired: false,
          remoteNecessity: 'none',
          decision: 'MASK',
          confidence: 0.99,
          reason: 'Internal email protected',
        },
      ];

      const fused = fusePerceptionDetections(testElementId, sensitiveEntities, decisions);
      // Because email is contained within the visual region bounding box, fusion merges them into 1 unified box
      expect(fused.length).toBe(1);
      expect(fused[0]).toEqual({ x: 10, y: 10, width: 200, height: 120 });
    });

    it('Test 4: Preserves multiple disjoint sensitive regions across OCR and CV', () => {
      const sensitiveEntities: SensitiveEntity[] = [
        // Face in top-left
        {
          id: 'vis_face_1',
          type: 'face',
          value: '[face_region]',
          elementId: testElementId,
          visualRegionId: `${testElementId}_face_1`,
          source: 'vision',
          sources: ['vision'],
          confidence: 0.96,
          imageBbox: { x: 10, y: 10, width: 60, height: 60 },
        },
        // Phone number in bottom-right
        {
          id: 'ocr_phone_1',
          type: 'phone',
          value: '555-0199',
          elementId: testElementId,
          textRegionId: `${testElementId}_ocr_line_3`,
          source: 'ocr',
          sources: ['ocr'],
          confidence: 0.97,
          imageBbox: { x: 150, y: 200, width: 100, height: 30 },
        },
      ];

      const decisions: PrivacyDecision[] = [
        {
          entityId: 'vis_face_1',
          elementId: testElementId,
          entityType: 'face',
          value: '[face_region]',
          sensitivity: 'high',
          taskRelevance: 'none',
          taskRequired: false,
          remoteNecessity: 'none',
          decision: 'MASK',
          confidence: 0.96,
          reason: 'Face protected',
        },
        {
          entityId: 'ocr_phone_1',
          elementId: testElementId,
          entityType: 'phone',
          value: '555-0199',
          sensitivity: 'high',
          taskRelevance: 'none',
          taskRequired: false,
          remoteNecessity: 'none',
          decision: 'MASK',
          confidence: 0.97,
          reason: 'Phone protected',
        },
      ];

      const fused = fusePerceptionDetections(testElementId, sensitiveEntities, decisions);
      expect(fused.length).toBe(2);
      expect(fused[0]).toEqual({ x: 10, y: 10, width: 60, height: 60 });
      expect(fused[1]).toEqual({ x: 150, y: 200, width: 100, height: 30 });
    });

    it('Test 5: Ignores ALLOW decisions and handles empty/missing bounding boxes gracefully', () => {
      const sensitiveEntities: SensitiveEntity[] = [
        {
          id: 'ocr_name_1',
          type: 'person_name',
          value: 'Rahul Sharma',
          elementId: testElementId,
          textRegionId: `${testElementId}_ocr_line_4`,
          source: 'ocr',
          sources: ['ocr'],
          confidence: 0.98,
          imageBbox: { x: 10, y: 10, width: 80, height: 20 },
        },
      ];

      const decisions: PrivacyDecision[] = [
        {
          entityId: 'ocr_name_1',
          elementId: testElementId,
          entityType: 'person_name',
          value: 'Rahul Sharma',
          sensitivity: 'medium',
          taskRelevance: 'high',
          taskRequired: true,
          remoteNecessity: 'high',
          decision: 'ALLOW',
          confidence: 0.98,
          reason: 'Requested identity anchor allowed',
        },
      ];

      const fused = fusePerceptionDetections(testElementId, sensitiveEntities, decisions);
      expect(fused.length).toBe(0); // Nothing to redact
    });
  });
});
