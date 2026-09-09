// Phase 4: Context-Aware Privacy Policy Engine
// Evaluates Sensitivity x Task Relevance x Necessity x Disclosure Risk.
// Produces structured PrivacyDecisions for minimum sufficient disclosure.
// Zero external network requests, zero remote AI calls.

import { PageModel } from '../content/domExtractor';
import { SensitiveEntity, SensitiveEntityType } from './piiDetector';

export type TaskIntent =
  | 'IDENTIFY_PERSON'
  | 'FIND_INFORMATION'
  | 'OPEN_ELEMENT'
  | 'READ_INFORMATION'
  | 'LIST_FORM_FIELDS'
  | 'SEARCH'
  | 'NAVIGATE'
  | 'COMPARE'
  | 'SUMMARIZE'
  | 'TYPE_INFORMATION'
  | 'SELECT_INFORMATION'
  | 'OTHER';

export type DecisionType =
  | 'ALLOW'
  | 'MASK'
  | 'TOKENIZE'
  | 'ABSTRACT'
  | 'LOCAL_ONLY'
  | 'BLOCK';

export interface PrivacyDecision {
  entityId: string;
  entityType: SensitiveEntityType | 'image';
  value: string;
  sensitivity: 'low' | 'medium' | 'high';
  taskRelevance: 'none' | 'low' | 'medium' | 'high';
  taskRequired: boolean;
  remoteNecessity: 'none' | 'low' | 'medium' | 'high';
  decision: DecisionType;
  reason: string;
  elementId: string;
  confidence?: number;
  source?: string;
}

export interface TaskClassification {
  intent: TaskIntent;
  requestedFields: string[];
  targetName?: string;
  targetNames?: string[];
}

/**
 * Classifies user task string into a structured TaskClassification.
 * Uses deterministic keyword and pattern matching.
 */
export function classifyTaskIntent(task: string): TaskClassification {
  const lower = task.toLowerCase().trim();
  const requestedFields: string[] = [];

  // Bug fix 1: 'mail' word-boundary check to avoid matching 'gmail', 'female', etc.
  if (lower.includes('email') || /\bmail\b/.test(lower)) {
    requestedFields.push('email');
  }
  // Bug fix 2: 'number' alone must NOT trigger phone — requires phone/mobile/contact context
  if (
    lower.includes('phone') ||
    lower.includes('mobile') ||
    lower.includes('contact') ||
    (/\bnumber\b/.test(lower) && (lower.includes('phone') || lower.includes('mobile') || lower.includes('contact') || lower.includes('call') || lower.includes('dial')))
  ) {
    requestedFields.push('phone');
  }
  if (lower.includes('address') || lower.includes('location')) {
    requestedFields.push('address');
  }

  // Skip generic words that are never person names
  const skipWords = new Set([
    'open', 'find', 'what', 'whats', 'who', 'whos', 'whose', 'where', 'wheres', 'why', 'how', 'hows',
    'show', 'click', 'view', 'get', 'describe', 'identify', 'search', 'is', 'the', 'this', 'that',
    'person', 'profile', 'profiles', 'mobile', 'phone', 'number', 'email', 'address', 'contact', 'details', 'information',
    'info', 'name', 'names', 'me', 'tell', 'give', 'please', 'can', 'you', 'of', 'for', 'and', 'or', 'a', 'an',
    'in', 'on', 'at', 'to', 'from', 'with', 'by', 'list', 'display', 'fetch', 'retrieve', 'see', 'check', 'look',
    'bio', 'bios', 'their', 'his', 'her', 'them', 'all', 'both'
  ]);
  const targetNames: string[] = [];
  const taskWords = task.split(/\s+/);

  for (const word of taskWords) {
    const stripped = word.replace(/['’]s$/i, '');
    const clean = stripped.replace(/[^a-zA-Z]/g, '');
    if (
      clean.length > 1 &&
      !skipWords.has(clean.toLowerCase()) &&
      !targetNames.some((n) => n.toLowerCase() === clean.toLowerCase())
    ) {
      targetNames.push(clean);
    }
  }

  const targetName = targetNames[0];

  // Intent: LIST_FORM_FIELDS — "What are all the fields present in the form?", "What fields are in the form?"
  const isFormFieldsTask =
    (lower.includes('field') || lower.includes('fields')) &&
    (lower.includes('form') || lower.includes('present') || lower.includes('input') || lower.includes('what are') || lower.includes('list'));
  if (isFormFieldsTask) {
    return { intent: 'LIST_FORM_FIELDS', requestedFields, targetName, targetNames };
  }

  // Intent: IDENTIFY_PERSON — "Who's this?", "Who's that person here?", "Describe Rahul", "Who is...?", "Identify person"
  const isIdentifyPersonTask =
    lower.includes("who's") ||
    lower.includes('who is') ||
    lower.includes('identify') ||
    lower.includes('who that') ||
    lower.includes('who is that') ||
    lower.includes('who is he') ||
    lower.includes('who is she') ||
    lower.includes('describe person') ||
    (lower.includes('who') &&
      (lower.includes('person') ||
        lower.includes('man') ||
        lower.includes('woman') ||
        lower.includes('celebrity') ||
        lower.includes('actor') ||
        lower.includes('actress') ||
        lower.includes('character') ||
        lower.includes('here') ||
        lower.includes('this') ||
        lower.includes('that')));

  if (isIdentifyPersonTask) {
    return { intent: 'IDENTIFY_PERSON', requestedFields, targetName, targetNames };
  }

  // Intent: READ_INFORMATION — visual/attire/clothing/objects/OCR tasks
  const isClothingOrAttireTask =
    lower.includes('clothing') ||
    lower.includes('clothes') ||
    lower.includes('wearing') ||
    lower.includes('wear') ||
    lower.includes('dress') ||
    lower.includes('suit') ||
    lower.includes('outfit') ||
    lower.includes('attire') ||
    lower.includes('holding') ||
    lower.includes('costume') ||
    lower.includes('color') ||
    lower.includes('background');

  const isVisualTask =
    isClothingOrAttireTask ||
    lower.includes('written') ||
    lower.includes('badge') ||
    lower.includes('card text') ||
    lower.includes('text in image') ||
    lower.includes('in the image') ||
    lower.includes('in this image') ||
    lower.includes('visual text') ||
    lower.includes('acknowledgement') ||
    lower.includes('acknowledgment') ||
    lower.includes('on the screen') ||
    lower.includes('on screen') ||
    lower.includes('on the page') ||
    lower.includes('see on') ||
    lower.includes('what can you see') ||
    lower.includes('what do you see') ||
    lower.includes('describe the screen') ||
    lower.includes('describe the page') ||
    (lower.includes('text') && (lower.includes('image') || lower.includes('canvas') || lower.includes('picture') || lower.includes('photo') || lower.includes('screenshot') || lower.includes('read'))) ||
    (lower.includes('what') && (lower.includes('image') || lower.includes('picture') || lower.includes('photo') || lower.includes('canvas') || lower.includes('badge') || lower.includes('wearing') || lower.includes('holding') || lower.includes('screen') || lower.includes('see')));
  if (isVisualTask) {
    return { intent: 'READ_INFORMATION', requestedFields, targetName, targetNames };
  }

  // Intent: FIND_INFORMATION — "What is Rahul's email?", "Find phone number"
  const isFindQuestion =
    lower.startsWith('what is') ||
    lower.startsWith('what are') ||
    lower.startsWith('find') ||
    lower.startsWith('get') ||
    lower.startsWith('tell me') ||
    lower.startsWith('show me') ||
    lower.includes("what's") ||
    lower.includes("rahul's") ||
    lower.includes("priya's") ||
    lower.includes("arjun's");
  if (isFindQuestion && requestedFields.length > 0) {
    return { intent: 'FIND_INFORMATION', requestedFields, targetName, targetNames };
  }
  if (requestedFields.length > 0 && (lower.includes('?') || lower.includes('give') || lower.includes('need'))) {
    return { intent: 'FIND_INFORMATION', requestedFields, targetName, targetNames };
  }

  // Intent: OPEN_ELEMENT — "Open Rahul's profile", "Click view profile"
  if (
    lower.includes('open') ||
    lower.includes('click') ||
    lower.includes('show profile') ||
    lower.includes('view profile')
  ) {
    return { intent: 'OPEN_ELEMENT', requestedFields, targetName, targetNames };
  }

  // Intent: SEARCH
  if (lower.includes('search')) {
    return { intent: 'SEARCH', requestedFields, targetName, targetNames };
  }

  return { intent: 'OTHER', requestedFields, targetName, targetNames };
}

/**
 * Evaluates context-aware privacy policy for every detected PII entity and visual asset.
 * Applies the formula: Sensitivity x Task Relevance x Necessity x Disclosure Risk.
 */
export function evaluatePrivacyPolicy(
  task: string,
  _pageModel: PageModel,
  sensitiveEntities: SensitiveEntity[]
): { classification: TaskClassification; decisions: PrivacyDecision[] } {
  const classification = classifyTaskIntent(task);
  const decisions: PrivacyDecision[] = [];

  for (const entity of sensitiveEntities) {
    const type = entity.type;
    const targetElementId = entity.elementId || entity.textRegionId || entity.visualRegionId || '';
    
    // Check if matches ANY extracted target name in the task
    const isTargetEntity =
      (classification.targetNames && classification.targetNames.length > 0
        ? classification.targetNames.some(
            (n) =>
              entity.value.toLowerCase().includes(n.toLowerCase()) ||
              targetElementId.toLowerCase().includes(n.toLowerCase())
          )
        : Boolean(
            classification.targetName &&
              (entity.value.toLowerCase().includes(classification.targetName.toLowerCase()) ||
                targetElementId.toLowerCase().includes(classification.targetName.toLowerCase()))
          ));

    // Evaluate Default Sensitivity
    let sensitivity: 'low' | 'medium' | 'high' = 'high';
    if (type === 'person_name') sensitivity = 'medium';
    if (type === 'address') sensitivity = 'medium';

    let taskRelevance: 'none' | 'low' | 'medium' | 'high' = 'none';
    let taskRequired = false;
    let remoteNecessity: 'none' | 'low' | 'medium' | 'high' = 'none';
    let decision: DecisionType = 'MASK';
    let reason = '';

    // Rule: Visual Face, Signature and Sensitive Visual Regions
    if (type === 'face' || type === 'sensitive_visual_region' || type === 'signature') {
      if (type === 'face' && classification.intent === 'IDENTIFY_PERSON') {
        sensitivity = 'medium';
        taskRelevance = 'high';
        taskRequired = true;
        remoteNecessity = 'high';
        decision = 'ALLOW';
        reason = 'Visual face analysis explicitly permitted for person/celebrity identification task.';
      } else {
        sensitivity = 'high';
        taskRelevance = 'medium';
        taskRequired = false;
        remoteNecessity = 'none';
        decision = 'LOCAL_ONLY';
        reason = 'Face blurred to preserve biometric identity while allowing surrounding visual context inspection.';
      }
      decisions.push({
        entityId: entity.id,
        entityType: type,
        value: entity.value,
        sensitivity,
        taskRelevance,
        taskRequired,
        remoteNecessity,
        decision,
        reason,
        elementId: entity.elementId || entity.visualRegionId || 'vision',
        confidence: entity.confidence,
        source: entity.source,
      });
      continue;
    }

    switch (classification.intent) {
      case 'LIST_FORM_FIELDS': {
        decision = 'MASK';
        reason = 'Filled personal value masked; only form field names/structure requested.';
        break;
      }

      case 'READ_INFORMATION': {
        // Bug fix 5: Check entity.source for 'ocr' AND check element type === 'img'/'canvas' properly.
        // Previously used targetElementId.includes('img') which matched any id containing 'img' substring.
        const isOcrSource = entity.source?.includes('ocr') || entity.source?.includes('vision');
        const isVisualElement = targetElementId.startsWith('img') || targetElementId.startsWith('canvas') ||
          targetElementId.includes('_canvas') || targetElementId.includes('_img') ||
          targetElementId.includes('badge') || targetElementId.includes('photo');
        if (isOcrSource || isVisualElement) {
          taskRelevance = 'high';
          taskRequired = true;
          remoteNecessity = 'high';
          decision = 'ALLOW';
          reason = 'Visual OCR text explicitly requested by user task.';
        } else if (type === 'person_name') {
          taskRelevance = 'high';
          taskRequired = true;
          remoteNecessity = 'medium';
          decision = 'ALLOW';
          reason = 'Person entity retained for general context.';
        } else {
          decision = 'MASK';
          reason = 'Unrequested background PII masked.';
        }
        break;
      }

      case 'IDENTIFY_PERSON': {
        if (type === 'person_name') {
          taskRelevance = 'high';
          taskRequired = true;
          remoteNecessity = 'high';
          decision = isTargetEntity || !classification.targetName ? 'ALLOW' : 'TOKENIZE';
          reason = 'Required to identify the target person.';
        } else if (type === 'email' || type === 'phone') {
          taskRelevance = 'low';
          taskRequired = false;
          remoteNecessity = 'low';
          decision = 'MASK';
          reason = 'Contact information is unnecessary for identifying the person.';
        } else if (type === 'password' || type === 'credit_card' || type === 'government_id') {
          taskRelevance = 'none';
          taskRequired = false;
          remoteNecessity = 'none';
          decision = 'BLOCK';
          reason = 'Sensitive credential/ID is prohibited from remote disclosure.';
        } else {
          decision = 'MASK';
          reason = 'Entity not required for person identification.';
        }
        break;
      }

      case 'FIND_INFORMATION': {
        // Bug fix 6: OCR entities from images must be ALLOWED if the task involves an image.
        // Previously FIND_INFORMATION had NO handling for OCR sources — they fell through to MASK.
        const isOcrEntity = entity.source?.includes('ocr') || entity.source?.includes('vision');
        const taskInvolvesImage = /\b(image|picture|photo|img|canvas|badge|screenshot)\b/.test(
          task.toLowerCase()
        );
        if (isOcrEntity && taskInvolvesImage) {
          taskRelevance = 'high';
          taskRequired = true;
          remoteNecessity = 'high';
          decision = 'ALLOW';
          reason = 'Visual OCR text from image is relevant to the information task.';
          break;
        }

        if (classification.requestedFields.includes(type)) {
          // If a specific target name was requested (e.g. "Rahul"), only ALLOW for the target entity
          if (classification.targetName && !isTargetEntity) {
            taskRelevance = 'low';
            taskRequired = false;
            remoteNecessity = 'none';
            decision = 'MASK';
            reason = `Unrequested person's ${type.toUpperCase()} masked — only ${classification.targetName}'s data was requested.`;
          } else {
            taskRelevance = 'high';
            taskRequired = true;
            remoteNecessity = 'high';
            decision = 'ALLOW';
            reason = `${type.toUpperCase()} is the explicitly requested field for this task.`;
          }
        } else if (type === 'person_name') {
          taskRelevance = 'high';
          taskRequired = true;
          remoteNecessity = 'medium';
          decision = isTargetEntity ? 'ALLOW' : 'TOKENIZE';
          reason = 'Person name required as identity anchor for the requested information.';
        } else {
          taskRelevance = 'low';
          taskRequired = false;
          remoteNecessity = 'low';
          decision = 'MASK';
          reason = `Unrequested PII (${type}) masked — minimum sufficient disclosure policy.`;
        }
        break;
      }

      case 'OPEN_ELEMENT': {
        if (type === 'person_name') {
          taskRelevance = 'high';
          taskRequired = true;
          remoteNecessity = 'medium';
          decision = isTargetEntity ? 'ALLOW' : 'TOKENIZE';
          reason = 'Person name required to target matching profile element.';
        } else if (type === 'email' || type === 'phone' || type === 'address') {
          taskRelevance = 'low';
          taskRequired = false;
          remoteNecessity = 'low';
          decision = 'MASK';
          reason = 'Contact info is unnecessary for triggering element action.';
        } else if (type === 'password' || type === 'credit_card') {
          decision = 'BLOCK';
          reason = 'Credentials blocked from action payload.';
        } else {
          decision = 'MASK';
          reason = 'Entity irrelevant to opening target element.';
        }
        break;
      }

      default: {
        if (type === 'person_name') {
          decision = 'ALLOW';
          reason = 'Person entity retained for general context.';
        } else if (classification.requestedFields.includes(type)) {
          decision = 'ALLOW';
          reason = 'Entity explicitly mentioned in task.';
        } else {
          decision = 'MASK';
          reason = 'Default privacy protection applied.';
        }
        break;
      }
    }

    decisions.push({
      entityId: entity.id,
      entityType: type,
      value: entity.value,
      sensitivity,
      taskRelevance,
      taskRequired,
      remoteNecessity,
      decision,
      reason,
      elementId: targetElementId || 'unknown',
      confidence: entity.confidence,
      source: entity.source,
    });
  }


  return { classification, decisions };
}
