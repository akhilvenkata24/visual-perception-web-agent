// Phase 13: Hybrid PII / Sensitive Data Detection Engine
// Aggregates evidence across DOM, REGEX, OCR, and VISION sources.
// Strictly DETECT ONLY. Zero sanitization, zero network requests, zero page modifications.

import { PageModel, PageElement } from '../content/domExtractor';
import { UnifiedPageModel } from '../perception/unifiedPageModel';

export type SensitiveEntityType =
  | 'email'
  | 'phone'
  | 'person_name'
  | 'password'
  | 'credit_card'
  | 'government_id'
  | 'address'
  | 'face'
  | 'signature'
  | 'id_document'
  | 'sensitive_visual_region';

export interface SensitiveEntity {
  id: string;
  type: SensitiveEntityType;
  value: string;
  sources: string[]; // e.g., ["dom", "regex"], ["ocr", "regex"], ["vision"]
  source: string;    // legacy combined string e.g. "dom+regex" for backwards compatibility
  confidence: number; // 0.0 to 1.0
  elementId?: string;
  textRegionId?: string;
  visualRegionId?: string;
  bbox?: { x: number; y: number; width: number; height: number };
  imageBbox?: { x: number; y: number; width: number; height: number };
  context?: string;
}

// Regular Expressions for deterministic detection (stateless)
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/;
const CREDIT_CARD_REGEX = /\b(?:\d[ -]*?){13,19}\b/;
const SSN_REGEX = /\b\d{3}-\d{2}-\d{4}\b/;
const PAN_REGEX = /\b[A-Z]{5}\d{4}[A-Z]{1}\b/;
const AADHAAR_REGEX = /\b\d{4}\s\d{4}\s\d{4}(?!\d|\s?\d{4})\b/;

// Keywords that indicate non-person buttons/action labels
const ACTION_KEYWORDS = [
  'view profile',
  'close',
  'submit',
  'save',
  'cancel',
  'edit',
  'delete',
  'search',
  'login',
  'sign up',
  'register',
  'company employee directory',
  'detailed profile',
  'employee directory',
];

/**
 * Validates a credit card number using the Luhn Algorithm.
 */
function isValidLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Checks if text resembles a person's name using structural and semantic heuristics.
 */
function isPersonName(text: string, element: PageElement): boolean {
  const lower = text.toLowerCase().trim();

  // Exclude action buttons, navigation controls, and general headings
  if (ACTION_KEYWORDS.some((kw) => lower.includes(kw))) {
    return false;
  }

  // Strong signal 1: DOM ID or class indicates a person name (e.g. 'name_rahul', '.employee-name')
  if (element.id.startsWith('name_') || element.id.includes('name')) {
    return true;
  }

  // Strong signal 2: Heading tag (h1-h4) or text element inside employee card/article context
  if (element.type === 'heading' || element.type === 'text') {
    const words = text.trim().split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      const isCapitalized = words.every((w) => /^[A-Z][a-zA-Z.-]*$/.test(w));
      if (isCapitalized) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Main Hybrid PII Detector.
 * Synthesizes evidence across DOM, REGEX, OCR, and VISION perception channels.
 */
export function detectSensitiveEntities(pageModel: UnifiedPageModel | PageModel): SensitiveEntity[] {
  const rawDetections: SensitiveEntity[] = [];
  let entityCounter = 0;

  const elements = pageModel.elements || [];
  const textRegions = (pageModel as UnifiedPageModel).text_regions || [];
  const visualRegions = (pageModel as UnifiedPageModel).visual_regions || [];

  // -------------------------------------------------------------
  // SOURCE 1 & 2: DOM & REGEX DETECTION ACROSS DOM ELEMENTS
  // -------------------------------------------------------------
  for (const element of elements) {
    const text = element.label || '';
    const accessibleName = element.accessibleName || '';
    const combinedText = `${text} ${accessibleName}`.trim();
    const elementId = element.id;
    const lowerId = elementId.toLowerCase();
    const lowerAccessibleName = accessibleName.toLowerCase();

    // 1. EMAIL DETECTION (DOM + REGEX)
    const isEmailDOM =
      element.inputType === 'email' ||
      element.attributes?.href?.startsWith('mailto:') ||
      lowerId.includes('email') ||
      lowerAccessibleName.includes('email');

    const emailMatches = combinedText.match(EMAIL_REGEX);

    if (isEmailDOM || emailMatches) {
      const emailValue = emailMatches ? emailMatches[0] : text;
      if (emailValue && emailValue.includes('@')) {
        const sources: string[] = [];
        if (isEmailDOM) sources.push('dom');
        if (emailMatches) sources.push('regex');

        rawDetections.push({
          id: `entity_${++entityCounter}`,
          type: 'email',
          value: emailValue,
          sources,
          source: sources.join('+') || 'dom',
          confidence: isEmailDOM && emailMatches ? 0.99 : isEmailDOM ? 0.90 : 0.95,
          elementId,
          context: accessibleName || element.role,
        });
      }
    }

    // 2. GOVERNMENT / IDENTITY ID DETECTION (DOM + REGEX)
    const idKeywords = ['ssn', 'social security', 'aadhaar', 'pan card', 'tax id', 'national id', 'identity', 'govt'];
    const isGovIdDOM = idKeywords.some(
      (kw) => lowerId.includes(kw) || lowerAccessibleName.includes(kw)
    );

    const ssnMatch = combinedText.match(SSN_REGEX);
    const panMatch = combinedText.match(PAN_REGEX);
    const aadhaarMatch = combinedText.match(AADHAAR_REGEX);

    let isGovId = false;
    if (ssnMatch || panMatch || aadhaarMatch || isGovIdDOM) {
      const val = ssnMatch?.[0] || panMatch?.[0] || aadhaarMatch?.[0] || text;
      if (val && val.length >= 5) {
        isGovId = true;
        const sources: string[] = [];
        if (isGovIdDOM) sources.push('dom');
        if (ssnMatch || panMatch || aadhaarMatch) sources.push('regex');

        rawDetections.push({
          id: `entity_${++entityCounter}`,
          type: 'government_id',
          value: val.trim(),
          sources,
          source: sources.join('+') || 'dom',
          confidence: isGovIdDOM ? 0.96 : 0.88,
          elementId,
          context: 'Government identity number',
        });
      }
    }

    // 3. PHONE DETECTION (DOM + REGEX)
    const isPhoneDOM =
      element.inputType === 'tel' ||
      lowerId.includes('phone') ||
      lowerId.includes('mobile') ||
      lowerAccessibleName.includes('phone') ||
      lowerAccessibleName.includes('mobile');

    if (!isGovId) {
      const phoneMatches = combinedText.match(PHONE_REGEX);

      if (phoneMatches || isPhoneDOM) {
        if (phoneMatches) {
          for (const match of phoneMatches) {
            const digits = match.replace(/\D/g, '');
            // False-Positive Resistance: Unformatted 9-10 digit numbers require phone DOM context
            const isFormatted = /[\+\(\)\-]/.test(match);
            if ((isFormatted && digits.length >= 7 && digits.length <= 15) || (isPhoneDOM && digits.length >= 7)) {
              const sources: string[] = [];
              if (isPhoneDOM) sources.push('dom');
              sources.push('regex');

              rawDetections.push({
                id: `entity_${++entityCounter}`,
                type: 'phone',
                value: match.trim(),
                sources,
                source: sources.join('+'),
                confidence: isPhoneDOM ? 0.98 : 0.85,
                elementId,
                context: accessibleName || 'Telephone number',
              });
            }
          }
        } else if (isPhoneDOM && text) {
          rawDetections.push({
            id: `entity_${++entityCounter}`,
            type: 'phone',
            value: text,
            sources: ['dom'],
            source: 'dom',
            confidence: 0.90,
            elementId,
            context: accessibleName || 'Telephone control',
          });
        }
      }
    }

    // 4. PASSWORD DETECTION (DOM)
    if (
      element.inputType === 'password' ||
      lowerId.includes('password') ||
      lowerId.includes('passcode') ||
      lowerAccessibleName.includes('password')
    ) {
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'password',
        value: text || '[PASSWORD_INPUT]',
        sources: ['dom'],
        source: 'dom',
        confidence: element.inputType === 'password' ? 1.0 : 0.90,
        elementId,
        context: 'Password input field',
      });
    }

    // 5. CREDIT CARD DETECTION (DOM + REGEX + LUHN)
    const ccKeywords = ['card', 'credit', 'cvv', 'ccv', 'mastercard', 'visa', 'amex'];
    const isCCDOM = ccKeywords.some(
      (kw) => lowerId.includes(kw) || lowerAccessibleName.includes(kw)
    );
    const ccMatches = combinedText.match(CREDIT_CARD_REGEX);

    if (ccMatches) {
      for (const match of ccMatches) {
        const cleanDigits = match.replace(/\D/g, '');
        if (isValidLuhn(cleanDigits) || isCCDOM) {
          const sources: string[] = [];
          if (isCCDOM) sources.push('dom');
          sources.push('regex');

          rawDetections.push({
            id: `entity_${++entityCounter}`,
            type: 'credit_card',
            value: match.trim(),
            sources,
            source: sources.join('+'),
            confidence: isValidLuhn(cleanDigits) ? 0.99 : 0.85,
            elementId,
            context: 'Financial payment card number',
          });
        }
      }
    }

    // 6. ADDRESS DETECTION (DOM)
    const addressKeywords = ['address', 'street', 'location', 'city', 'state', 'zipcode', 'postal'];
    const isAddressDOM = addressKeywords.some(
      (kw) => lowerId.includes(kw) || lowerAccessibleName.includes(kw)
    );

    if (isAddressDOM && text) {
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'address',
        value: text,
        sources: ['dom', 'semantic'],
        source: 'dom+semantic',
        confidence: 0.92,
        elementId,
        context: 'Location / Address entity',
      });
    }

    // 7. PERSON NAME DETECTION (DOM + SEMANTIC)
    if (isPersonName(text, element)) {
      const sources = lowerId.includes('name') ? ['dom', 'semantic'] : ['semantic'];
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'person_name',
        value: text,
        sources,
        source: sources.join('+'),
        confidence: lowerId.includes('name') ? 0.98 : 0.90,
        elementId,
        context: 'Employee / Person Name',
      });
    }
  }

  // -------------------------------------------------------------
  // SOURCE 3: OCR EVIDENCE DETECTION (TEXT REGIONS)
  // -------------------------------------------------------------
  for (const region of textRegions) {
    const text = region.text || '';
    const textRegionId = region.id;
    const elementId = region.elementId;
    const bbox = region.bbox;
    const imageBbox = region.imageBbox;

    // Email in OCR
    const emailMatches = text.match(EMAIL_REGEX);
    if (emailMatches) {
      for (const match of emailMatches) {
        rawDetections.push({
          id: `entity_${++entityCounter}`,
          type: 'email',
          value: match,
          sources: ['ocr', 'regex'],
          source: 'ocr+regex',
          confidence: 0.95,
          textRegionId,
          elementId,
          bbox,
          imageBbox,
          context: 'OCR Visual Text Email',
        });
      }
    }

    // Phone in OCR
    const phoneMatches = text.match(PHONE_REGEX);
    if (phoneMatches) {
      for (const match of phoneMatches) {
        const digits = match.replace(/\D/g, '');
        if (digits.length >= 7 && digits.length <= 15) {
          rawDetections.push({
            id: `entity_${++entityCounter}`,
            type: 'phone',
            value: match.trim(),
            sources: ['ocr', 'regex'],
            source: 'ocr+regex',
            confidence: 0.92,
            textRegionId,
            elementId,
            bbox,
            imageBbox,
            context: 'OCR Visual Text Phone',
          });
        }
      }
    }

    // Government ID in OCR
    const ssnMatch = text.match(SSN_REGEX);
    const panMatch = text.match(PAN_REGEX);
    const aadhaarMatch = text.match(AADHAAR_REGEX);
    if (ssnMatch || panMatch || aadhaarMatch) {
      const val = (ssnMatch?.[0] || panMatch?.[0] || aadhaarMatch?.[0] || '').trim();
      if (val.length >= 5) {
        rawDetections.push({
          id: `entity_${++entityCounter}`,
          type: 'government_id',
          value: val,
          sources: ['ocr', 'regex'],
          source: 'ocr+regex',
          confidence: 0.92,
          textRegionId,
          elementId,
          bbox,
          imageBbox,
          context: 'OCR Visual Identity Number',
        });
      }
    }

    // Credit Card in OCR
    const ccMatches = text.match(CREDIT_CARD_REGEX);
    if (ccMatches) {
      for (const match of ccMatches) {
        const cleanDigits = match.replace(/\D/g, '');
        if (isValidLuhn(cleanDigits)) {
          rawDetections.push({
            id: `entity_${++entityCounter}`,
            type: 'credit_card',
            value: match.trim(),
            sources: ['ocr', 'regex'],
            source: 'ocr+regex',
            confidence: 0.95,
            textRegionId,
            elementId,
            bbox,
            imageBbox,
            context: 'OCR Visual Credit Card',
          });
        }
      }
    }

    // Person Name in OCR
    const words = text.trim().split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      const isCapitalized = words.every((w) => /^[A-Z][a-zA-Z.-]*$/.test(w));
      const lower = text.toLowerCase();
      const isActionKw = ACTION_KEYWORDS.some((kw) => lower.includes(kw));
      if (isCapitalized && !isActionKw && !emailMatches && !phoneMatches && !ssnMatch && !panMatch && !aadhaarMatch) {
        rawDetections.push({
          id: `entity_${++entityCounter}`,
          type: 'person_name',
          value: text.trim(),
          sources: ['ocr', 'semantic'],
          source: 'ocr+semantic',
          confidence: 0.88,
          textRegionId,
          elementId,
          bbox,
          imageBbox,
          context: 'OCR Visual Person Name',
        });
      }
    }
  }

  // -------------------------------------------------------------
  // SOURCE 4: VISION EVIDENCE DETECTION (VISUAL REGIONS)
  // -------------------------------------------------------------
  for (const vr of visualRegions) {
    if (vr.type === 'face') {
      const faceVal = vr.metadata?.subject || `Face [${vr.id}]`;
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'face',
        value: faceVal,
        sources: ['vision'],
        source: 'vision',
        confidence: vr.confidence || 0.94,
        visualRegionId: vr.id,
        elementId: vr.elementId,
        bbox: vr.bbox,
        imageBbox: vr.imageBbox,
        context: vr.metadata?.visualDescription || 'Local Computer Vision Face Detection',
      });
    } else if (vr.type === 'signature') {
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'signature',
        value: `Signature [${vr.id}]`,
        sources: ['vision'],
        source: 'vision',
        confidence: vr.confidence || 0.92,
        visualRegionId: vr.id,
        elementId: vr.elementId,
        bbox: vr.bbox,
        imageBbox: vr.imageBbox,
        context: 'Local Computer Vision Signature Detection',
      });
    } else if (vr.type === 'id_document') {
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'id_document',
        value: `Identity Document [${vr.id}]`,
        sources: ['vision'],
        source: 'vision',
        confidence: vr.confidence || 0.90,
        visualRegionId: vr.id,
        elementId: vr.elementId,
        bbox: vr.bbox,
        imageBbox: vr.imageBbox,
        context: 'Local Computer Vision ID Document Detection',
      });
    } else {
      rawDetections.push({
        id: `entity_${++entityCounter}`,
        type: 'sensitive_visual_region',
        value: `Visual Region [${vr.id}]`,
        sources: ['vision'],
        source: 'vision',
        confidence: vr.confidence || 0.90,
        visualRegionId: vr.id,
        elementId: vr.elementId,
        bbox: vr.bbox,
        imageBbox: vr.imageBbox,
        context: 'Sensitive Visual Region',
      });
    }
  }

  // Deduplicate and merge multi-source evidence
  return mergeDuplicates(rawDetections);
}

/**
 * Merges duplicate detections targeting the same element/region and SensitiveEntityType.
 * Combines evidence sources into sources: string[] and calculates boosted confidence.
 */
function mergeDuplicates(entities: SensitiveEntity[]): SensitiveEntity[] {
  const mergedMap = new Map<string, SensitiveEntity>();

  for (const entity of entities) {
    const key = `${entity.elementId || entity.textRegionId || entity.visualRegionId || entity.value}:${entity.type}`;

    if (!mergedMap.has(key)) {
      mergedMap.set(key, {
        ...entity,
        sources: [...entity.sources],
      });
    } else {
      const existing = mergedMap.get(key)!;
      // Combine distinct sources
      const combinedSources = Array.from(new Set([...existing.sources, ...entity.sources]));
      existing.sources = combinedSources;
      existing.source = combinedSources.join('+');

      // Boosted confidence score for multi-source agreement
      const maxConf = Math.max(existing.confidence, entity.confidence);
      existing.confidence = Math.min(0.99, maxConf + 0.04);

      // Retain longer value if available
      if (entity.value.length > existing.value.length) {
        existing.value = entity.value;
      }
      if (entity.bbox && !existing.bbox) {
        existing.bbox = entity.bbox;
      }
      if (entity.imageBbox && !existing.imageBbox) {
        existing.imageBbox = entity.imageBbox;
      }
    }
  }

  // Renumber entity IDs deterministically
  return Array.from(mergedMap.values()).map((entity, index) => ({
    ...entity,
    id: `entity_${index + 1}`,
  }));
}
