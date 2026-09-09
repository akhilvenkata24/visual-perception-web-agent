// Step: Unified Page Model Builder (unifiedPageModel.ts)
// Single normalized internal contract combining DOM / ARIA, OCR, and Vision results.
// Preserves source provenance, reconciles duplicate text, and ensures zero sanitization in perception layer.

import { PageElement, PageMetadata, OcrTextRegion } from '../content/domExtractor';
import { VisualRegion } from './vision';
import { PerceptionResultSet } from './perceptionManager';

export interface UnifiedEntity {
  id: string;
  type: 'person' | 'element' | 'visual_object';
  references: string[]; // IDs of referenced DOM elements, OCR regions, or Vision regions
}

export interface UnifiedPageModel {
  page: PageMetadata;
  elements: PageElement[];
  text_regions: OcrTextRegion[];
  visual_regions: VisualRegion[];
  entities: UnifiedEntity[];
  metadata: {
    sourcesRun: ('dom' | 'ocr' | 'vision')[];
    timestamp: number;
  };
}

/**
 * Builds the normalized Unified Page Model from any combination of perception source results.
 * Non-destructive: original perception results remain completely untouched.
 */
export function buildUnifiedPageModel(perceptionResults: PerceptionResultSet): UnifiedPageModel {
  const domModel = perceptionResults.dom.data;
  const ocrRegions = perceptionResults.ocr.status === 'success' ? perceptionResults.ocr.data : [];
  const visualRegions = perceptionResults.vision.status === 'success' ? perceptionResults.vision.data : [];

  // Deep clone elements to preserve immutability of original perception outputs
  const elements: PageElement[] = domModel.elements ? domModel.elements.map((el) => ({ ...el })) : [];

  // Deduplicate text regions where text matches existing DOM label exactly
  const text_regions: OcrTextRegion[] = [];
  const domTextLabels = new Set(elements.map((el) => (el.label || '').trim().toLowerCase()).filter((s) => s.length > 0));

  for (const region of ocrRegions) {
    const cleanText = (region.text || '').trim().toLowerCase();
    const isDuplicate = domTextLabels.has(cleanText);

    text_regions.push({
      ...region,
      isDuplicateOfDom: isDuplicate,
    });
  }

  // Deep clone visual regions
  const visual_regions: VisualRegion[] = visualRegions.map((vr) => ({ ...vr }));

  // Deterministic Entity Mapping for MVP (linking profile photos and names)
  const entities: UnifiedEntity[] = [];
  let entityCounter = 0;

  for (const el of elements) {
    if (el.id.startsWith('name_')) {
      const nameKey = el.id.replace('name_', '');
      const refs = [el.id];

      // Match corresponding photo or face region
      const photoEl = elements.find((e) => e.id === `photo_${nameKey}`);
      if (photoEl) refs.push(photoEl.id);

      const faceRegion = visual_regions.find((vr) => vr.elementId === `photo_${nameKey}`);
      if (faceRegion) refs.push(faceRegion.id);

      entities.push({
        id: `entity_ref_${++entityCounter}`,
        type: 'person',
        references: refs,
      });
    }
  }

  return {
    page: {
      url: domModel.page?.url || '',
      title: domModel.page?.title || '',
      lang: domModel.page?.lang,
      viewport: domModel.page?.viewport,
    },
    elements,
    text_regions,
    visual_regions,
    entities,
    metadata: {
      sourcesRun: perceptionResults.activeSources,
      timestamp: Date.now(),
    },
  };
}
