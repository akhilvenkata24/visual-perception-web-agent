import { describe, it, expect } from 'vitest';
import { fuseViewportDetections } from '../detectionFusion';
import { redactViewportScreenshot } from '../imageRedactor';
import { compressScreenshot } from '../screenshotCapturer';
import { SensitiveEntity } from '../../privacy/piiDetector';
import { PrivacyDecision } from '../../privacy/policyEngine';

describe('Phase 26: Universal Viewport Screenshot Perception & Privacy Redaction', () => {
  it('fuses sensitive bounding boxes across the viewport accurately', () => {
    const sensitiveEntities: SensitiveEntity[] = [
      {
        id: 'entity_1',
        type: 'person_name',
        value: 'Rahul Sharma',
        sources: ['dom'],
        source: 'dom',
        confidence: 0.95,
        elementId: 'elem_name',
        bbox: { x: 50, y: 100, width: 150, height: 30 },
      },
      {
        id: 'entity_2',
        type: 'email',
        value: 'rahul@example.com',
        sources: ['dom', 'regex'],
        source: 'dom+regex',
        confidence: 0.98,
        elementId: 'elem_email',
        bbox: { x: 50, y: 140, width: 200, height: 25 },
      },
      {
        id: 'entity_3',
        type: 'face',
        value: 'Chris Hemsworth',
        sources: ['vision'],
        source: 'vision',
        confidence: 0.94,
        bbox: { x: 300, y: 100, width: 120, height: 120 },
      },
    ];

    // Scenario A: Clothing task -> Face is LOCAL_ONLY (must blur face & email, allow name)
    const decisionsClothing = [
      { entityId: 'entity_1', entityType: 'person_name', decision: 'ALLOW', confidence: 0.95, reason: 'Allowed' },
      { entityId: 'entity_2', entityType: 'email', decision: 'MASK', confidence: 0.98, reason: 'Masked' },
      { entityId: 'entity_3', entityType: 'face', decision: 'LOCAL_ONLY', confidence: 0.94, reason: 'Blurred' },
    ] as unknown as PrivacyDecision[];

    const boxesClothing = fuseViewportDetections(sensitiveEntities, decisionsClothing);
    expect(boxesClothing.length).toBe(2); // Email and Face boxes
    expect(boxesClothing.some((b) => b.x === 50 && b.y === 140)).toBe(true);
    expect(boxesClothing.some((b) => b.x === 300 && b.y === 100)).toBe(true);

    // Scenario B: Identity task -> Face is ALLOW (must NOT blur face)
    const decisionsIdentity = [
      { entityId: 'entity_1', entityType: 'person_name', decision: 'ALLOW', confidence: 0.95, reason: 'Allowed' },
      { entityId: 'entity_2', entityType: 'email', decision: 'MASK', confidence: 0.98, reason: 'Masked' },
      { entityId: 'entity_3', entityType: 'face', decision: 'ALLOW', confidence: 0.94, reason: 'Identify' },
    ] as unknown as PrivacyDecision[];

    const boxesIdentity = fuseViewportDetections(sensitiveEntities, decisionsIdentity);
    expect(boxesIdentity.length).toBe(1); // Only Email box is blurred, Face is unblurred!
    expect(boxesIdentity[0].x).toBe(50);
    expect(boxesIdentity[0].y).toBe(140);
  });

  it('redactViewportScreenshot creates a sanitized screenshot result', async () => {
    const mockDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const boxes = [{ x: 0, y: 0, width: 1, height: 1 }];

    const result = await redactViewportScreenshot(mockDataUrl, boxes);
    expect(result.elementId).toBe('viewport_screenshot');
    expect(result.isRedacted).toBe(true);
  });

  it('compressScreenshot preserves data and applies bounds', async () => {
    const mockDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const result = await compressScreenshot(mockDataUrl, 960, 640);
    expect(result.dataUrl).toBeDefined();
  });
});
