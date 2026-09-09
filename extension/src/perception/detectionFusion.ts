// Detection Fusion & Bounding Box Reconciliation Engine (detectionFusion.ts)
// Merges multi-modal detections across OCR (sensitive text) and Computer Vision (visual features).
// Resolves overlapping rectangles using IoU and containment checks to prevent duplicate blurring.

import { BoundingBox } from './imageRedactor';
import { SensitiveEntity } from '../privacy/piiDetector';
import { PrivacyDecision } from '../privacy/policyEngine';
import { UnifiedPageModel } from './unifiedPageModel';

export interface FusedRegion {
  box: BoundingBox;
  sources: ('ocr' | 'vision')[];
  types: string[];
  entityIds: string[];
  confidence: number;
}

/**
 * Calculates the Intersection-Over-Union (IoU) between two bounding boxes.
 */
export function calculateIoU(a: BoundingBox, b: BoundingBox): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);

  const intersectionW = Math.max(0, x2 - x1);
  const intersectionH = Math.max(0, y2 - y1);
  const intersectionArea = intersectionW * intersectionH;

  if (intersectionArea === 0) return 0;

  const areaA = a.width * a.height;
  const areaB = b.width * b.height;
  const unionArea = areaA + areaB - intersectionArea;

  return unionArea > 0 ? intersectionArea / unionArea : 0;
}

/**
 * Calculates how much the smaller box is contained within the larger box (0.0 to 1.0).
 */
export function calculateContainment(a: BoundingBox, b: BoundingBox): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);

  const intersectionW = Math.max(0, x2 - x1);
  const intersectionH = Math.max(0, y2 - y1);
  const intersectionArea = intersectionW * intersectionH;

  if (intersectionArea === 0) return 0;

  const minArea = Math.min(a.width * a.height, b.width * b.height);
  return minArea > 0 ? intersectionArea / minArea : 0;
}

/**
 * Merges two overlapping bounding boxes into their bounding union.
 */
export function mergeTwoBoxes(a: BoundingBox, b: BoundingBox): BoundingBox {
  const minX = Math.min(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxX = Math.max(a.x + a.width, b.x + b.width);
  const maxY = Math.max(a.y + a.height, b.y + b.height);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Merges an array of bounding boxes by reconciling overlapping or contained boxes.
 * Runs iteratively until no further overlaps exceeding the threshold exist.
 */
export function mergeOverlappingBoxes(
  boxes: BoundingBox[],
  iouThreshold = 0.15,
  containmentThreshold = 0.5
): BoundingBox[] {
  if (!boxes || boxes.length <= 1) return boxes ? [...boxes] : [];

  let currentBoxes = boxes.map((b) => ({ ...b }));
  let mergedAny = true;

  while (mergedAny) {
    mergedAny = false;
    const nextBoxes: BoundingBox[] = [];
    const used = new Set<number>();

    for (let i = 0; i < currentBoxes.length; i++) {
      if (used.has(i)) continue;

      let current = currentBoxes[i];

      for (let j = i + 1; j < currentBoxes.length; j++) {
        if (used.has(j)) continue;

        const candidate = currentBoxes[j];
        const iou = calculateIoU(current, candidate);
        const containment = calculateContainment(current, candidate);

        if (iou > iouThreshold || containment > containmentThreshold) {
          current = mergeTwoBoxes(current, candidate);
          used.add(j);
          mergedAny = true;
        }
      }

      nextBoxes.push(current);
      used.add(i);
    }

    currentBoxes = nextBoxes;
  }

  return currentBoxes;
}

/**
 * Fuses sensitive detections across OCR and Computer Vision for a specific image element.
 * Gathers all masked/prohibited bounding boxes from both sources and produces deduplicated,
 * non-overlapping bounding boxes ready for selective blurring.
 */
export function fusePerceptionDetections(
  elementId: string,
  sensitiveEntities: SensitiveEntity[],
  decisions: PrivacyDecision[]
): BoundingBox[] {
  const decisionMap = new Map<string, PrivacyDecision>();
  for (const d of decisions) {
    decisionMap.set(d.entityId, d);
    if (d.elementId) decisionMap.set(d.elementId, d);
  }

  // Filter sensitive entities belonging to this image element (both OCR & Vision)
  const matchingEntities = sensitiveEntities.filter(
    (se) =>
      se.elementId === elementId ||
      se.textRegionId?.startsWith(elementId) ||
      se.visualRegionId?.startsWith(elementId)
  );

  const rawCandidateBoxes: BoundingBox[] = [];

  for (const entity of matchingEntities) {
    const decision =
      decisionMap.get(entity.id) ||
      (entity.textRegionId ? decisionMap.get(entity.textRegionId) : undefined) ||
      (entity.visualRegionId ? decisionMap.get(entity.visualRegionId) : undefined);

    // If decision requires protection (MASK, BLOCK, or LOCAL_ONLY)
    if (decision && ['MASK', 'BLOCK', 'LOCAL_ONLY'].includes(decision.decision)) {
      const box = entity.imageBbox || entity.bbox;
      if (box && box.width > 0 && box.height > 0) {
        rawCandidateBoxes.push(box);
      }
    }
  }

  // Fuse and merge overlapping rectangles
  return mergeOverlappingBoxes(rawCandidateBoxes);
}

/**
 * Fuses sensitive detections across the entire page viewport (DOM, OCR, and Computer Vision).
 * Collects all viewport-coordinate bounding boxes for entities marked MASK, BLOCK, or LOCAL_ONLY.
 */
export function fuseViewportDetections(
  sensitiveEntities: SensitiveEntity[],
  decisions: PrivacyDecision[],
  pageModel?: UnifiedPageModel
): BoundingBox[] {
  const decisionMap = new Map<string, PrivacyDecision>();
  for (const d of decisions) {
    decisionMap.set(d.entityId, d);
    if (d.elementId) decisionMap.set(d.elementId, d);
  }

  // Create element position lookup map if pageModel is provided
  const elementPositionMap = new Map<string, BoundingBox>();
  if (pageModel && pageModel.elements) {
    for (const el of pageModel.elements) {
      if (el.position && el.position.width > 0 && el.position.height > 0) {
        elementPositionMap.set(el.id, el.position);
      }
    }
  }

  const rawCandidateBoxes: BoundingBox[] = [];

  for (const entity of sensitiveEntities) {
    const decision =
      decisionMap.get(entity.id) ||
      (entity.elementId ? decisionMap.get(entity.elementId) : undefined) ||
      (entity.textRegionId ? decisionMap.get(entity.textRegionId) : undefined) ||
      (entity.visualRegionId ? decisionMap.get(entity.visualRegionId) : undefined);

    // Only protect entities marked MASK, BLOCK, or LOCAL_ONLY (ALLOW is omitted so it remains visible)
    if (decision && ['MASK', 'BLOCK', 'LOCAL_ONLY'].includes(decision.decision)) {
      let box: BoundingBox | undefined = entity.bbox;

      // If entity doesn't have a direct viewport bbox, check if its element has position
      if (!box && entity.elementId && elementPositionMap.has(entity.elementId)) {
        box = elementPositionMap.get(entity.elementId);
      }

      if (box && box.width > 0 && box.height > 0) {
        rawCandidateBoxes.push({
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
        });
      }
    }
  }

  // Fuse and merge overlapping rectangles
  return mergeOverlappingBoxes(rawCandidateBoxes);
}

