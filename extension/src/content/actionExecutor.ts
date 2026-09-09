// Phase 9: Safe Browser Action Executor
// Executes ALREADY-APPROVED browser actions locally using native DOM APIs.
// Consumes strictly validated actions from Action Firewall.
// Never executes raw unvalidated AI output.

import { PageModel } from './domExtractor';
import { FirewallResult } from '../agent/actionFirewall';

export interface ExecutionResult {
  success: boolean;
  action: string;
  elementId?: string | null;
  message: string;
  timestamp: number;
}

/**
 * Safely executes an action that has ALREADY passed Action Firewall validation.
 * NEVER execute raw, unvalidated AI output directly.
 */
export function executeAction(
  firewallResult: FirewallResult,
  pageModel: PageModel
): ExecutionResult {
  const timestamp = Date.now();

  // Pre-check 1: Must be explicitly approved by Action Firewall
  if (!firewallResult.allowed || !firewallResult.action) {
    return {
      success: false,
      action: firewallResult.action?.action || 'unknown',
      elementId: firewallResult.action?.element_id || null,
      message: `Action execution rejected by Action Firewall: ${firewallResult.reason}`,
      timestamp,
    };
  }

  const actionObj = firewallResult.action;
  const rawActionStr = (actionObj.action || '').toLowerCase().trim();

  // No-op action
  if (rawActionStr === 'none') {
    return {
      success: true,
      action: 'none',
      message: 'No-op action executed successfully.',
      timestamp,
    };
  }

  // Handle navigate
  if (rawActionStr === 'navigate') {
    const targetUrl = actionObj.value;
    if (!targetUrl) {
      return {
        success: false,
        action: 'navigate',
        message: 'Execution failed: Navigation destination URL is missing.',
        timestamp,
      };
    }
    try {
      window.location.href = targetUrl;
      return {
        success: true,
        action: 'navigate',
        message: `Navigated to '${targetUrl}'.`,
        timestamp,
      };
    } catch (e: any) {
      return {
        success: false,
        action: 'navigate',
        message: `Navigation failed: ${e.message}`,
        timestamp,
      };
    }
  }

  // Handle scroll
  if (rawActionStr === 'scroll') {
    const y = typeof actionObj.y === 'number' ? actionObj.y : 500;
    window.scrollTo({ top: y, behavior: 'smooth' });
    return {
      success: true,
      action: 'scroll',
      message: `Scrolled page to y=${y}.`,
      timestamp,
    };
  }

  // Handle element-targeted actions (click, type, select)
  const targetId = actionObj.element_id;
  if (!targetId) {
    return {
      success: false,
      action: rawActionStr,
      message: `Execution failed: Action '${rawActionStr}' requires a target element ID.`,
      timestamp,
    };
  }

  // Resolve DOM Element using local PageModel and DOM attributes
  const domElement = resolveDOMElement(targetId, pageModel);

  if (!domElement) {
    return {
      success: false,
      action: rawActionStr,
      elementId: targetId,
      message: `Execution failed: Element '${targetId}' is no longer available in DOM.`,
      timestamp,
    };
  }

  // Check element connection
  if (!domElement.isConnected) {
    return {
      success: false,
      action: rawActionStr,
      elementId: targetId,
      message: `Execution failed: Element '${targetId}' is disconnected from DOM.`,
      timestamp,
    };
  }

  // Execute click
  if (rawActionStr === 'click') {
    try {
      if (typeof domElement.scrollIntoView === 'function') {
        try {
          domElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch {
          // Ignore JSDOM layout method errors
        }
      }

      // Focus if focusable
      if (typeof (domElement as any).focus === 'function') {
        try {
          (domElement as any).focus();
        } catch {}
      }

      // Dispatch synthetic pointer and mouse event chain for modern SPAs
      const eventOpts: MouseEventInit = { bubbles: true, cancelable: true };
      try {
        if (typeof PointerEvent !== 'undefined') {
          domElement.dispatchEvent(new PointerEvent('pointerdown', eventOpts));
          domElement.dispatchEvent(new PointerEvent('pointerup', eventOpts));
        }
        domElement.dispatchEvent(new MouseEvent('mousedown', eventOpts));
        domElement.dispatchEvent(new MouseEvent('mouseup', eventOpts));
      } catch {}

      // Trigger native click
      if (typeof (domElement as HTMLElement).click === 'function') {
        (domElement as HTMLElement).click();
      }

      // Dispatch native click event
      try {
        domElement.dispatchEvent(new MouseEvent('click', eventOpts));
      } catch {}

      return {
        success: true,
        action: 'click',
        elementId: targetId,
        message: `Clicked element '${targetId}' successfully.`,
        timestamp,
      };
    } catch (e: any) {
      return {
        success: false,
        action: 'click',
        elementId: targetId,
        message: `Click execution error: ${e.message}`,
        timestamp,
      };
    }
  }

  // Execute type
  if (rawActionStr === 'type') {
    const textToType = actionObj.value || '';
    try {
      if ('value' in domElement) {
        (domElement as any).value = textToType;
        domElement.dispatchEvent(new Event('input', { bubbles: true }));
        domElement.dispatchEvent(new Event('change', { bubbles: true }));
        return {
          success: true,
          action: 'type',
          elementId: targetId,
          message: `Entered text into input '${targetId}'.`,
          timestamp,
        };
      } else {
        return {
          success: false,
          action: 'type',
          elementId: targetId,
          message: `Target element '${targetId}' is not an editable input or textarea.`,
          timestamp,
        };
      }
    } catch (e: any) {
      return {
        success: false,
        action: 'type',
        elementId: targetId,
        message: `Type execution error: ${e.message}`,
        timestamp,
      };
    }
  }

  // Execute select
  if (rawActionStr === 'select') {
    const optionVal = actionObj.value || '';
    try {
      if (domElement.tagName === 'SELECT') {
        (domElement as HTMLSelectElement).value = optionVal;
        domElement.dispatchEvent(new Event('change', { bubbles: true }));
        return {
          success: true,
          action: 'select',
          elementId: targetId,
          message: `Selected option '${optionVal}' on select '${targetId}'.`,
          timestamp,
        };
      } else {
        return {
          success: false,
          action: 'select',
          elementId: targetId,
          message: `Target element '${targetId}' is not a native SELECT element.`,
          timestamp,
        };
      }
    } catch (e: any) {
      return {
        success: false,
        action: 'select',
        elementId: targetId,
        message: `Select execution error: ${e.message}`,
        timestamp,
      };
    }
  }

  return {
    success: false,
    action: rawActionStr,
    elementId: targetId,
    message: `Unsupported action type '${rawActionStr}'.`,
    timestamp,
  };
}

/**
 * Resolves a local PageModel targetId to an actual live DOM Element reference.
 * Checks native DOM ID first, data-perception-id, and searches recursively through Shadow DOM trees.
 */
export function resolveDOMElement(targetId: string, _pageModel: PageModel): Element | null {
  if (typeof document === 'undefined') return null;

  // 1. Direct getElementById
  const elById = document.getElementById(targetId);
  if (elById) return elById;

  // 2. Direct data-perception-id query
  const elByPerceptionId = document.querySelector(`[data-perception-id="${targetId}"]`);
  if (elByPerceptionId) return elByPerceptionId;

  // 3. Recursive Shadow DOM Search
  return findElementInTree(document, targetId);
}

function findElementInTree(root: Document | ShadowRoot | Element, targetId: string): Element | null {
  try {
    const directMatch = root.querySelector(`[data-perception-id="${targetId}"]`);
    if (directMatch) return directMatch;

    const allElements = root.querySelectorAll('*');
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      if (el.shadowRoot) {
        const found = findElementInTree(el.shadowRoot, targetId);
        if (found) return found;
      }
    }
  } catch {}

  return null;
}
