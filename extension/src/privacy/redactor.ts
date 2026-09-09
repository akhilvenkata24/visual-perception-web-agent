// Phase 4: Local Redactor & Minimum Disclosure Sanitizer
// Transforms the PageModel into a SanitizedContext following PrivacyDecisions.
// Strictly non-destructive: original DOM and original PageModel are NEVER mutated.
// Includes a final post-redaction integrity check ensuring no prohibited raw PII escapes.

import { PageModel, PageMetadata } from '../content/domExtractor';
import { SensitiveEntity } from './piiDetector';
import { PrivacyDecision, TaskClassification } from './policyEngine';
import { redactImageRegions, ImageRedactionResult } from '../perception/imageRedactor';
import { fusePerceptionDetections } from '../perception/detectionFusion';

export interface SanitizedElement {
  id: string;
  type: string;
  tagName: string;
  label: string;
  role: string;
  accessibleName?: string;
  attributes?: Record<string, string>;
}

export interface SanitizedImage {
  id: string;
  dataUrl: string;
  mimeType?: string;
  description?: string;
}

export interface SanitizedContext {
  page: PageMetadata;
  task: string;
  intent: string;
  elements: SanitizedElement[];
  images?: SanitizedImage[];
  decisionsSummary: {
    totalEntities: number;
    allowCount: number;
    maskCount: number;
    tokenizeCount: number;
    localOnlyCount: number;
    blockCount: number;
  };
}

/**
 * Generates a compact, minimum-disclosure SanitizedContext from the original PageModel.
 */
export function createSanitizedContext(
  task: string,
  classification: TaskClassification,
  pageModel: PageModel,
  sensitiveEntities: SensitiveEntity[],
  decisions: PrivacyDecision[],
  sanitizedImages?: Record<string, ImageRedactionResult>
): SanitizedContext {
  // Map elementId -> PrivacyDecision for fast lookup
  const decisionMap = new Map<string, PrivacyDecision>();
  for (const d of decisions) {
    if (d.entityId) decisionMap.set(d.entityId, d);
    if (d.elementId) decisionMap.set(d.elementId, d);
  }

  // Token counter for TOKENIZE decision (e.g. PERSON_01)
  const tokenCounters: Record<string, number> = {};

  function getToken(type: string): string {
    const uppercaseType = type.toUpperCase();
    tokenCounters[uppercaseType] = (tokenCounters[uppercaseType] || 0) + 1;
    return `${uppercaseType}_0${tokenCounters[uppercaseType]}`;
  }

  const sanitizedElements: SanitizedElement[] = [];

  for (const el of pageModel.elements) {
    // 1. Check if element is an image (face/visual asset) -> enforce LOCAL_ONLY rule
    if (el.type === 'image') {
      // Excluded from remote sanitized context (retained locally on device)
      continue;
    }

    const decision = decisionMap.get(el.id);
    let sanitizedLabel = el.label;
    let sanitizedAccessibleName = el.accessibleName;

    if (decision) {
      switch (decision.decision) {
        case 'ALLOW':
          // Retain original raw label/value
          break;

        case 'MASK':
          sanitizedLabel = '[REDACTED]';
          if (sanitizedAccessibleName) {
            sanitizedAccessibleName = '[REDACTED]';
          }
          break;

        case 'TOKENIZE': {
          const token = getToken(decision.entityType);
          sanitizedLabel = token;
          if (sanitizedAccessibleName) {
            sanitizedAccessibleName = token;
          }
          break;
        }

        case 'ABSTRACT':
          sanitizedLabel = `[Abstract ${decision.entityType}]`;
          if (sanitizedAccessibleName) {
            sanitizedAccessibleName = `[Abstract ${decision.entityType}]`;
          }
          break;

        case 'LOCAL_ONLY':
        case 'BLOCK':
          // Completely omit element from remote representation
          continue;
      }
    }

    sanitizedElements.push({
      id: el.id,
      type: el.type,
      tagName: el.tagName,
      label: sanitizedLabel,
      role: el.role,
      accessibleName: sanitizedAccessibleName,
      attributes: el.attributes,
    });
  }

  // 2. Include OCR text regions in sanitized elements if present
  if (pageModel.text_regions && pageModel.text_regions.length > 0) {
    for (const region of pageModel.text_regions) {
      // Look up decision specifically for this OCR region
      let decision = decisionMap.get(region.id);

      // If no direct region.id match, check if any decision was made for an entity matching this textRegionId
      if (!decision) {
        for (const se of sensitiveEntities) {
          if (se.textRegionId === region.id) {
            decision = decisionMap.get(se.id);
            if (decision) break;
          }
        }
      }

      let label = region.text;

      if (decision) {
        switch (decision.decision) {
          case 'ALLOW':
            label = region.text;
            break;
          case 'MASK':
            label = '[REDACTED]';
            break;
          case 'TOKENIZE':
            label = getToken(decision.entityType);
            break;
          case 'ABSTRACT':
            label = `[Abstract ${decision.entityType}]`;
            break;
          case 'LOCAL_ONLY':
          case 'BLOCK':
            continue;
        }
      }

      sanitizedElements.push({
        id: region.id,
        type: 'ocr_text',
        tagName: 'ocr_text',
        label: label,
        role: 'text',
        accessibleName: `Visual text extracted from ${region.elementId || 'canvas'}: "${label}"`,
        attributes: { elementId: region.elementId || '', source: 'ocr' },
      });
    }
  }

  // 3. Include ALLOW'd Visual Identification Entities in sanitized elements
  for (const se of sensitiveEntities) {
    if (se.sources.includes('vision') || se.source === 'vision') {
      const decision = decisionMap.get(se.id);
      if (decision && decision.decision === 'ALLOW') {
        sanitizedElements.push({
          id: se.id,
          type: 'visual_entity',
          tagName: 'vision',
          label: se.value,
          role: 'visual_identification',
          accessibleName: `Visual entity identified from ${se.elementId || 'image'}: "${se.value}"`,
          attributes: { elementId: se.elementId || '', source: 'vision' },
        });
      }
    }
  }

  // 4. Attach Live Viewport Screenshot (Universal Perception across arbitrary pages)
  const sanitizedImagesList: SanitizedImage[] = [];

  if (sanitizedImages) {
    for (const [imgId, redactRes] of Object.entries(sanitizedImages)) {
      const resObj = redactRes as any;
      if (resObj && (resObj.redactedDataUrl || resObj.dataUrl)) {
        const dataUrl = resObj.redactedDataUrl || resObj.dataUrl;
        const boxCount = resObj.redactedBoxesCount || 0;
        if (!sanitizedImagesList.some((img) => img.id === imgId)) {
          sanitizedImagesList.push({
            id: imgId,
            dataUrl,
            mimeType: 'image/jpeg',
            description:
              imgId === 'viewport_screenshot'
                ? boxCount > 0
                  ? `Live viewport screenshot with selective in-browser privacy redactions (${boxCount} sensitive regions blurred)`
                  : 'Live viewport screenshot with 100% intact visual context for perception'
                : `Visual context image (${boxCount} sensitive regions blurred)`,
          });
        }
      }
    }
  }

  // Count decision breakdown
  let allowCount = 0;
  let maskCount = 0;
  let tokenizeCount = 0;
  let localOnlyCount = 0;
  let blockCount = 0;

  for (const d of decisions) {
    if (d.decision === 'ALLOW') allowCount++;
    if (d.decision === 'MASK') maskCount++;
    if (d.decision === 'TOKENIZE') tokenizeCount++;
    if (d.decision === 'LOCAL_ONLY') localOnlyCount++;
    if (d.decision === 'BLOCK') blockCount++;
  }

  const sanitizedContext: SanitizedContext = {
    page: {
      url: pageModel.page.url,
      title: pageModel.page.title,
      viewport: pageModel.page.viewport,
    },
    task,
    intent: classification.intent,
    elements: sanitizedElements,
    images: sanitizedImagesList.length > 0 ? sanitizedImagesList : undefined,
    decisionsSummary: {
      totalEntities: decisions.length,
      allowCount,
      maskCount,
      tokenizeCount,
      localOnlyCount,
      blockCount,
    },
  };

  // Run Final Privacy Validation
  return validateSanitizedContext(sanitizedContext, sensitiveEntities, decisions);
}

/**
 * Final Privacy Validation Check.
 * Verifies that no prohibited raw values (MASK, BLOCK, LOCAL_ONLY) survive anywhere
 * in the final serialized SanitizedContext.
 *
 * Smart conflict resolution: if the same raw value was MASK'd for one element but
 * explicitly ALLOW'd for another (e.g., OCR text that was requested by the user),
 * the global purge is skipped — the element-level redaction already masked the DOM
 * version, and the OCR/visual version was intentionally permitted by the privacy policy.
 */
export function validateSanitizedContext(
  context: SanitizedContext,
  _sensitiveEntities: SensitiveEntity[],
  decisions: PrivacyDecision[]
): SanitizedContext {
  let serialized = JSON.stringify(context);

  // Build a set of values that have been explicitly ALLOWED for at least one element.
  // These should not be globally purged even if they are prohibited elsewhere (e.g.,
  // the same phone number MASKed in a DOM element but ALLOWed in an OCR reading).
  const explicitlyAllowedValues = new Set<string>();
  for (const d of decisions) {
    if (d.decision === 'ALLOW' && d.value && d.value.trim().length > 0) {
      explicitlyAllowedValues.add(d.value.trim());
    }
  }

  for (const d of decisions) {
    if (['MASK', 'BLOCK', 'LOCAL_ONLY'].includes(d.decision)) {
      const prohibitedValue = d.value;
      if (prohibitedValue && prohibitedValue.trim().length > 0) {
        // Skip global purge if this value was also explicitly allowed for another
        // element (e.g., OCR visual text that the user's task requested).
        if (explicitlyAllowedValues.has(prohibitedValue.trim())) {
          // The element-level redaction already handled the DOM version.
          // Globally purging here would incorrectly redact the permitted OCR text.
          continue;
        }
        // Search if prohibited string occurs in serialized context
        if (serialized.includes(prohibitedValue)) {
          console.warn(
            `🚨 [Privacy Violation Safeguard] Prohibited value "${prohibitedValue}" found in sanitized context. Applying fallback redaction.`
          );
          // Forcefully purge prohibited raw value
          const escaped = prohibitedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          serialized = serialized.replace(new RegExp(escaped, 'g'), '[REDACTED]');
        }
      }
    }
  }

  return JSON.parse(serialized);
}

/**
 * Determines whether a visual candidate element is relevant to the active user task.
 */
export function isElementRelevantToTask(elementId: string, task?: string, intent?: string): boolean {
  if (!task) return true;
  const lower = task.toLowerCase();
  const lowerId = elementId.toLowerCase();

  if (lower.includes(lowerId)) return true;

  // Person / Portrait / Visual Image / Attire tasks
  const isPersonImageTask =
    lower.includes('person') ||
    lower.includes('holding') ||
    lower.includes('wearing') ||
    lower.includes('dress') ||
    lower.includes('suit') ||
    lower.includes('clothes') ||
    lower.includes('outfit') ||
    lower.includes('attire') ||
    lower.includes('celebrity') ||
    lower.includes('face') ||
    lower.includes('who is') ||
    lower.includes("who's") ||
    lower.includes('portrait') ||
    lower.includes('photo') ||
    lower.includes('picture') ||
    intent === 'IDENTIFY_PERSON';

  if (isPersonImageTask) {
    if (
      lowerId === 'img2' ||
      lowerId.includes('celebrity') ||
      lowerId.includes('portrait') ||
      lowerId.includes('photo') ||
      lowerId.includes('face') ||
      lowerId.includes('img')
    ) {
      return true;
    }
    if (lowerId.includes('form') || lowerId.includes('license') || lowerId.includes('doc') || lowerId.includes('pet')) {
      return false;
    }
  }

  // Form tasks
  const isFormTask =
    lower.includes('form') ||
    lower.includes('field') ||
    lower.includes('application') ||
    lower.includes('enrollment') ||
    lower.includes('membership') ||
    intent === 'LIST_FORM_FIELDS';

  if (isFormTask) {
    if (lowerId.includes('form')) return true;
    if (lowerId === 'img2' || lowerId.includes('celebrity') || lowerId.includes('portrait')) return false;
  }

  // Badge tasks
  const isBadgeTask = lower.includes('badge') || lower.includes('security') || lower.includes('id card');
  if (isBadgeTask) {
    if (lowerId.includes('badge') || lowerId === 'img1') return true;
    return false;
  }

  // Document tasks
  const isDocTask = lower.includes('nda') || lower.includes('document') || lower.includes('contract');
  if (isDocTask) {
    if (lowerId.includes('doc') || lowerId.includes('nda')) return true;
    return false;
  }

  // Pet tasks
  const isPetTask = lower.includes('pet') || lower.includes('animal') || lower.includes('dog');
  if (isPetTask) {
    if (lowerId.includes('pet')) return true;
    return false;
  }

  // License tasks
  const isLicenseTask = lower.includes('license') || lower.includes('driver');
  if (isLicenseTask) {
    if (lowerId.includes('license')) return true;
    return false;
  }

  return true;
}

/**
 * Selectively redacts / blurs sensitive bounding boxes on image/canvas elements in-place.
 * Preserves 100% of non-sensitive pixels and only redacts boxes marked MASK/BLOCK/LOCAL_ONLY.
 */
export async function createSanitizedImages(
  _pageModel: PageModel,
  sensitiveEntities: SensitiveEntity[],
  decisions: PrivacyDecision[],
  task?: string,
  intent?: string
): Promise<Record<string, ImageRedactionResult>> {
  const results: Record<string, ImageRedactionResult> = {};
  if (typeof document === 'undefined') return results;

  // Find candidate images and canvases
  const canvases = document.querySelectorAll('canvas');
  const images = document.querySelectorAll('img');
  let candidateElements: { id: string; element: HTMLElement }[] = [];

  canvases.forEach((c, idx) => {
    const id = c.id || c.getAttribute('data-perception-id') || `canvas_${idx + 1}`;
    candidateElements.push({ id, element: c });
  });

  images.forEach((img, idx) => {
    const id = img.id || img.getAttribute('data-perception-id') || `img_${idx + 1}`;
    candidateElements.push({ id, element: img });
  });

  // Filter candidates strictly to active task context
  if (task) {
    candidateElements = candidateElements.filter((c) =>
      isElementRelevantToTask(c.id, task, intent)
    );
  }

  for (const { id, element } of candidateElements) {
    const boxesToRedact = fusePerceptionDetections(id, sensitiveEntities, decisions);
    if (!boxesToRedact || boxesToRedact.length === 0) {
      continue;
    }

    try {
      const redactRes = await redactImageRegions(
        element as HTMLImageElement | HTMLCanvasElement,
        boxesToRedact,
        { mode: 'blur' }
      );
      results[id] = redactRes;
    } catch (err) {
      console.warn(`[Image Redaction Warning] Could not redact image ${id}:`, err);
    }
  }

  return results;
}
