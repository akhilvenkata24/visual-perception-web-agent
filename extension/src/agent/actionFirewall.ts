// Phase 8: Local Action Firewall
// Treats every AI-generated action as UNTRUSTED INPUT.
// Validates schema, element existence, page URL state, staleness, and safety rules.
// Strictly 100% local execution in browser JS/TS without network calls.

import { PageModel } from '../content/domExtractor';

export type ActionType = 'click' | 'type' | 'scroll' | 'navigate' | 'select' | 'none';

export interface UntrustedAction {
  action?: string;
  element_id?: string | null;
  value?: string | null;
  reasoning?: string | null;
  [key: string]: any;
}

export type FirewallDecision = 'ALLOW' | 'DENY' | 'REQUIRE_CONFIRMATION';

export interface ValidationChecks {
  schemaValid: boolean;
  actionTypeAllowed: boolean;
  elementExists: boolean;
  elementObservedLocally: boolean;
  currentPageMatches: boolean;
  actionNotStale: boolean;
  safeAction: boolean;
}

export interface FirewallResult {
  allowed: boolean;
  decision: FirewallDecision;
  reason: string;
  action?: UntrustedAction;
  validationChecks: ValidationChecks;
}

export interface PageSnapshotContext {
  pageUrl?: string;
  timestamp?: number;
  maxAgeMs?: number; // Maximum permissible snapshot age in milliseconds (default 30,000ms)
}

export const SAFE_ACTIONS: readonly string[] = [
  'click',
  'type',
  'scroll',
  'navigate',
  'select',
  'none',
];

export const DANGEROUS_KEYWORDS: readonly string[] = [
  'delete',
  'remove',
  'purge',
  'destroy',
  'buy',
  'purchase',
  'pay',
  'transfer',
  'checkout',
  'submit_payment',
  'change_password',
  'reset_password',
];

/**
 * Validates an AI-generated action against the current local PageModel and state.
 * Implements the rule: LOCAL STATE WINS. Untrusted input is strictly validated.
 */
export function validateAction(
  untrustedAction: any,
  pageModel: PageModel,
  snapshotContext?: PageSnapshotContext
): FirewallResult {
  const checks: ValidationChecks = {
    schemaValid: false,
    actionTypeAllowed: false,
    elementExists: false,
    elementObservedLocally: false,
    currentPageMatches: false,
    actionNotStale: false,
    safeAction: false,
  };

  // 1. Schema Validation Check
  if (
    !untrustedAction ||
    typeof untrustedAction !== 'object' ||
    Array.isArray(untrustedAction) ||
    typeof untrustedAction.action !== 'string'
  ) {
    return {
      allowed: false,
      decision: 'DENY',
      reason: 'Malformed action schema: payload must be an object with a string action property.',
      validationChecks: checks,
    };
  }

  const rawActionStr = untrustedAction.action.toLowerCase().trim();

  // Handle 'none' action explicitly as safe no-op
  if (rawActionStr === 'none') {
    checks.schemaValid = true;
    checks.actionTypeAllowed = true;
    checks.elementExists = true;
    checks.elementObservedLocally = true;
    checks.currentPageMatches = true;
    checks.actionNotStale = true;
    checks.safeAction = true;
    return {
      allowed: true,
      decision: 'ALLOW',
      reason: 'No action requested (ActionType.NONE). Safe no-op.',
      action: untrustedAction,
      validationChecks: checks,
    };
  }

  // Check required fields per action type
  if (['click', 'type', 'select'].includes(rawActionStr)) {
    if (!untrustedAction.element_id || typeof untrustedAction.element_id !== 'string') {
      return {
        allowed: false,
        decision: 'DENY',
        reason: `Malformed action schema: '${rawActionStr}' action requires a valid string element_id.`,
        validationChecks: checks,
      };
    }
  }

  if (rawActionStr === 'type') {
    if (typeof untrustedAction.value !== 'string') {
      return {
        allowed: false,
        decision: 'DENY',
        reason: "Malformed action schema: 'type' action requires a string value property.",
        validationChecks: checks,
      };
    }
  }

  if (rawActionStr === 'navigate') {
    if (!untrustedAction.value || typeof untrustedAction.value !== 'string') {
      return {
        allowed: false,
        decision: 'DENY',
        reason: "Malformed action schema: 'navigate' action requires a destination URL string value.",
        validationChecks: checks,
      };
    }
  }

  checks.schemaValid = true;

  // 2. Action Allowlist Check
  if (!SAFE_ACTIONS.includes(rawActionStr)) {
    return {
      allowed: false,
      decision: 'DENY',
      reason: `Action '${untrustedAction.action}' is not in the allowed actions list (${SAFE_ACTIONS.join(', ')}).`,
      validationChecks: checks,
    };
  }

  checks.actionTypeAllowed = true;

  // 3. Current Page URL State Check
  const currentUrl = pageModel.page.url;
  if (snapshotContext && snapshotContext.pageUrl) {
    if (snapshotContext.pageUrl.trim() !== currentUrl.trim()) {
      return {
        allowed: false,
        decision: 'DENY',
        reason: `Page URL mismatch: action was generated for '${snapshotContext.pageUrl}', but current page is '${currentUrl}'. Action marked STALE.`,
        validationChecks: checks,
      };
    }
  }

  checks.currentPageMatches = true;

  // 4. Staleness / Timestamp Check
  if (snapshotContext && snapshotContext.timestamp) {
    const maxAgeMs = snapshotContext.maxAgeMs || 30000; // 30s threshold
    const ageMs = Date.now() - snapshotContext.timestamp;
    if (ageMs > maxAgeMs) {
      return {
        allowed: false,
        decision: 'DENY',
        reason: `Action is stale: generated ${Math.round(ageMs / 1000)}s ago, exceeding maximum age threshold of ${Math.round(maxAgeMs / 1000)}s.`,
        validationChecks: checks,
      };
    }
  }

  checks.actionNotStale = true;

  // 5. Navigation Destination Validation
  if (rawActionStr === 'navigate') {
    const targetUrl = (untrustedAction.value || '').trim().toLowerCase();
    
    // Reject dangerous URL schemes (e.g. javascript:, data:, file:)
    if (
      targetUrl.startsWith('javascript:') ||
      targetUrl.startsWith('data:') ||
      targetUrl.startsWith('vbscript:')
    ) {
      return {
        allowed: false,
        decision: 'DENY',
        reason: `Unsafe navigation attempt using prohibited URL scheme in destination '${targetUrl}'.`,
        validationChecks: checks,
      };
    }

    try {
      const parsed = new URL(targetUrl, currentUrl);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return {
          allowed: false,
          decision: 'DENY',
          reason: `Navigation protocol '${parsed.protocol}' is not allowed. Only HTTP and HTTPS destinations are permitted.`,
          validationChecks: checks,
        };
      }
    } catch {
      return {
        allowed: false,
        decision: 'DENY',
        reason: `Malformed destination URL '${untrustedAction.value}' provided for navigation action.`,
        validationChecks: checks,
      };
    }

    checks.elementExists = true;
    checks.elementObservedLocally = true;
    checks.safeAction = true;

    return {
      allowed: true,
      decision: 'ALLOW',
      reason: `Validated safe navigation to '${untrustedAction.value}'.`,
      action: untrustedAction,
      validationChecks: checks,
    };
  }

  // 6. Element ID Validation against Local PageModel (Mandatory Element Safety Check)
  const targetElementId = untrustedAction.element_id;
  const matchedElement = pageModel.elements.find((el) => el.id === targetElementId);

  if (!matchedElement) {
    return {
      allowed: false,
      decision: 'DENY',
      reason: `Element ID '${targetElementId}' was not found in the current local PageModel. AI model invented an unobserved identifier.`,
      validationChecks: checks,
    };
  }

  checks.elementExists = true;
  checks.elementObservedLocally = true;

  // 7. Dangerous Actions / Confirmation Check
  const actionValue = (untrustedAction.value || '').toLowerCase();
  const elementLabel = (matchedElement.label || '').toLowerCase();

  const isDangerousKeyword = DANGEROUS_KEYWORDS.some(
    (kw) =>
      rawActionStr.includes(kw) ||
      actionValue.includes(kw) ||
      elementLabel.includes(kw) ||
      targetElementId.toLowerCase().includes(kw)
  );

  if (isDangerousKeyword) {
    checks.safeAction = false;
    return {
      allowed: false,
      decision: 'REQUIRE_CONFIRMATION',
      reason: `Potentially destructive or sensitive action detected (targets '${elementLabel || targetElementId}'). Explicit user confirmation required.`,
      action: untrustedAction,
      validationChecks: checks,
    };
  }

  checks.safeAction = true;

  // All 7 validation checks passed!
  return {
    allowed: true,
    decision: 'ALLOW',
    reason: `Validated safe ${rawActionStr} action targeting element '${targetElementId}'.`,
    action: untrustedAction,
    validationChecks: checks,
  };
}
