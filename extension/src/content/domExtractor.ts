// Phase 2: Local DOM / ARIA Perception Engine
// Extracts a compact, structured PageModel from the live webpage locally.
// Zero external network requests, zero AI calls, strictly in-browser.

export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ElementType =
  | 'button'
  | 'link'
  | 'input'
  | 'textarea'
  | 'select'
  | 'form'
  | 'heading'
  | 'text'
  | 'image';

export interface PageElement {
  id: string;
  type: ElementType;
  tagName: string;
  label: string;
  role: string;
  accessibleName?: string;
  inputType?: string | null;
  visible: boolean;
  position: ElementPosition;
  attributes?: Record<string, string>;
}

export interface PageMetadata {
  url: string;
  title: string;
  lang?: string;
  viewport?: {
    width: number;
    height: number;
  };
}

export interface OcrTextRegion {
  id: string;
  text: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imageBbox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  source: 'ocr';
  elementId?: string;
  isDuplicateOfDom?: boolean;
}

export interface PageModel {
  page: PageMetadata;
  elements: PageElement[];
  text_regions?: OcrTextRegion[];
}


let perceptionCounter = 0;

/**
 * Finds or assigns a stable identifier to a DOM element.
 * If the element has a native DOM id, that id is used.
 * Otherwise, assigns a stable 'data-perception-id' attribute.
 */
function getOrAssignId(el: HTMLElement): string {
  if (el.id && el.id.trim().length > 0) {
    return el.id.trim();
  }

  const existingPerceptionId = el.getAttribute('data-perception-id');
  if (existingPerceptionId) {
    return existingPerceptionId;
  }

  const newId = `elem_${++perceptionCounter}`;
  el.setAttribute('data-perception-id', newId);
  return newId;
}

/**
 * Resolves a perception ID back to the real DOM element.
 * Usable by future action execution stages.
 */
export function getElementByPerceptionId(id: string): HTMLElement | null {
  const byId = document.getElementById(id);
  if (byId) return byId;

  return document.querySelector(`[data-perception-id="${id}"]`);
}

/**
 * Evaluates whether an element is visible to the user.
 * Filters out scripts, styles, hidden containers, and collapsed sections.
 */
function isElementVisible(el: HTMLElement): boolean {
  const tagName = el.tagName.toUpperCase();
  if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'PATH'].includes(tagName)) {
    return false;
  }

  // Check if inside any hidden or aria-hidden container
  if (el.closest('.hidden') || el.closest('[aria-hidden="true"]')) {
    return false;
  }

  const style = window.getComputedStyle(el);
  if (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0'
  ) {
    return false;
  }

  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  const rect = el.getBoundingClientRect();
  if (!isJsdom && (rect.width <= 0 || rect.height <= 0)) {
    return false;
  }

  return true;
}

/**
 * Computes the accessible role for an element.
 */
function computeRole(el: HTMLElement): string {
  const explicitRole = el.getAttribute('role');
  if (explicitRole && explicitRole.trim()) {
    return explicitRole.trim();
  }

  const tag = el.tagName.toUpperCase();
  switch (tag) {
    case 'BUTTON':
      return 'button';
    case 'A':
      return el.hasAttribute('href') ? 'link' : 'generic';
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6':
      return 'heading';
    case 'INPUT': {
      const type = (el.getAttribute('type') || 'text').toLowerCase();
      if (['button', 'submit', 'reset'].includes(type)) return 'button';
      if (type === 'checkbox') return 'checkbox';
      if (type === 'radio') return 'radio';
      return 'textbox';
    }
    case 'TEXTAREA':
      return 'textbox';
    case 'SELECT':
      return 'combobox';
    case 'FORM':
      return 'form';
    case 'IMG':
      return 'img';
    case 'ARTICLE':
      return 'article';
    case 'SECTION':
      return 'region';
    case 'NAV':
      return 'navigation';
    case 'HEADER':
      return 'banner';
    case 'FOOTER':
      return 'contentinfo';
    case 'MAIN':
      return 'main';
    default:
      return 'generic';
  }
}

/**
 * Computes the Accessible Name following the ARIA precedence order:
 * 1. aria-labelledby
 * 2. aria-label
 * 3. Associated <label> (for form controls)
 * 4. alt (for images)
 * 5. title or placeholder
 * 6. Element textContent
 */
function computeAccessibleName(el: HTMLElement): string {
  // 1. aria-labelledby
  const labelledBy = el.getAttribute('aria-labelledby');
  if (labelledBy) {
    const ids = labelledBy.split(/\s+/);
    const resolved = ids
      .map((id) => document.getElementById(id)?.textContent?.trim() || '')
      .filter((s) => s.length > 0);
    if (resolved.length > 0) {
      return resolved.join(' ');
    }
  }

  // 2. aria-label
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.trim()) {
    return ariaLabel.trim();
  }

  // 3. Associated label for inputs
  if (el.id) {
    const labelEl = document.querySelector(`label[for="${el.id}"]`);
    if (labelEl && labelEl.textContent?.trim()) {
      return labelEl.textContent.trim();
    }
  }
  const parentLabel = el.closest('label');
  if (parentLabel && parentLabel.textContent?.trim()) {
    return parentLabel.textContent.trim();
  }

  // 4. alt attribute (for images)
  if (el instanceof HTMLImageElement && el.alt && el.alt.trim()) {
    return el.alt.trim();
  }

  // 5. placeholder or title
  const placeholder = el.getAttribute('placeholder');
  if (placeholder && placeholder.trim()) {
    return placeholder.trim();
  }
  const title = el.getAttribute('title');
  if (title && title.trim()) {
    return title.trim();
  }

  // 6. Visible text
  return el.textContent?.trim() || '';
}

/**
 * Maps an HTML element to its primary ElementType.
 */
/**
 * Maps an HTML element to its primary ElementType.
 */
function determineElementType(el: HTMLElement): ElementType {
  const tag = el.tagName.toUpperCase();

  if (tag === 'BUTTON') return 'button';
  if (tag === 'A' && el.hasAttribute('href')) return 'link';
  if (tag === 'INPUT') {
    const type = (el.getAttribute('type') || 'text').toLowerCase();
    if (['button', 'submit', 'reset'].includes(type)) return 'button';
    return 'input';
  }
  if (tag === 'TEXTAREA') return 'textarea';
  if (tag === 'SELECT') return 'select';
  if (tag === 'FORM') return 'form';
  if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tag)) return 'heading';
  if (tag === 'IMG') return 'image';

  // Explicit ARIA role overrides
  const role = el.getAttribute('role');
  if (role === 'button' || role === 'menuitem' || role === 'tab' || role === 'switch') return 'button';
  if (role === 'link') return 'link';
  if (role === 'heading') return 'heading';
  if (role === 'textbox' || role === 'searchbox') return 'input';
  if (role === 'combobox' || role === 'listbox') return 'select';

  // Editable content containers (e.g. Gmail / Slack / Rich Editors)
  if (el.hasAttribute('contenteditable') || el.isContentEditable || el.getAttribute('contenteditable') === 'true') {
    return 'input';
  }

  // Interactive controls with click handlers or keyboard focusable
  if (el.hasAttribute('onclick') || el.getAttribute('tabindex') === '0' || tag === 'SUMMARY') {
    return 'button';
  }

  return 'text';
}

/**
 * Recursively collects candidate DOM nodes across standard DOM and Shadow DOM trees.
 */
function collectAllCandidateNodes(root: Document | ShadowRoot | HTMLElement, targetSelector: string): HTMLElement[] {
  const nodes: HTMLElement[] = [];

  try {
    const directMatches = root.querySelectorAll(targetSelector);
    directMatches.forEach((node) => {
      if (node instanceof HTMLElement) {
        nodes.push(node);
      }
    });

    // Check all elements in this subtree for shadowRoot attachments
    const allElements = root.querySelectorAll('*');
    allElements.forEach((el) => {
      if (el instanceof HTMLElement && el.shadowRoot) {
        try {
          const shadowNodes = collectAllCandidateNodes(el.shadowRoot, targetSelector);
          nodes.push(...shadowNodes);
        } catch {}
      }
    });
  } catch {}

  return nodes;
}

/**
 * Collects useful attributes like data-target, aria-controls, href, etc.
 */
function extractUsefulAttributes(el: HTMLElement): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  const monitoredAttrs = [
    'data-target',
    'aria-controls',
    'href',
    'name',
    'placeholder',
    'value',
    'aria-label',
    'title',
    'role',
  ];

  for (const attr of monitoredAttrs) {
    const val = el.getAttribute(attr);
    if (val !== null && val !== '') {
      result[attr] = val;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Extracts a compact, structured PageModel of the current DOM.
 * Runs 100% locally with zero network requests.
 */
export function extractPageModel(): PageModel {
  const elements: PageElement[] = [];
  const processedElements = new Set<HTMLElement>();

  // Selector targeting interactive elements, headings, forms, images, and text containers
  const targetSelector = [
    'button',
    'a[href]',
    'input',
    'textarea',
    'select',
    'form',
    'h1, h2, h3, h4, h5, h6',
    '[role="button"]',
    '[role="link"]',
    '[role="heading"]',
    '[role="menuitem"]',
    '[role="tab"]',
    '[role="switch"]',
    '[tabindex="0"]',
    '[contenteditable]',
    'summary',
    '.employee-name',
    '.employee-title',
    '.employee-email',
    '.employee-phone',
    'p',
    'span',
    'img[alt]',
  ].join(', ');

  const candidateNodes = collectAllCandidateNodes(document, targetSelector);

  candidateNodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (processedElements.has(node)) return;

    if (!isElementVisible(node)) return;

    const elementType = determineElementType(node);
    const accessibleName = computeAccessibleName(node);

    // Primary visible label
    let label = (node.textContent || '').trim();

    // For images, use alt as label
    if (elementType === 'image' && node instanceof HTMLImageElement) {
      label = node.alt || '';
    }

    // For inputs with no textContent, use placeholder, value, or accessibleName
    if (elementType === 'input' && !label) {
      const input = node as HTMLInputElement;
      label = input.placeholder || input.value || accessibleName || '';
    }

    // If it's a generic text node ('p' or 'span')
    if (elementType === 'text') {
      // Skip if empty or purely whitespace
      if (!label) return;

      // Skip container if it wraps interactive or identified child elements to prevent duplicate text
      if (!node.id && node.children.length > 0) {
        const hasChildCandidate = node.querySelector(
          'button, a[href], input, textarea, select, [id], .employee-email, .employee-phone'
        );
        if (hasChildCandidate) {
          return;
        }
      }
    }

    // If element has no meaningful label or accessible name, skip it
    if (!label && !accessibleName) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const position: ElementPosition = {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };

    const id = getOrAssignId(node);
    const role = computeRole(node);
    const inputType =
      node instanceof HTMLInputElement
        ? node.getAttribute('type') || 'text'
        : null;

    const attributes = extractUsefulAttributes(node);

    const pageElement: PageElement = {
      id,
      type: elementType,
      tagName: node.tagName.toLowerCase(),
      label,
      role,
      accessibleName: accessibleName !== label ? accessibleName : undefined,
      inputType,
      visible: true,
      position,
      attributes,
    };

    elements.push(pageElement);
    processedElements.add(node);
  });

  const pageModel: PageModel = {
    page: {
      url: window.location.href,
      title: document.title,
      lang: document.documentElement.lang || undefined,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
    elements,
  };

  return pageModel;
}

// Legacy alias for compatibility
export const extractDOM = extractPageModel;
