import { describe, test, expect } from 'vitest';
import { validateAction } from '../actionFirewall';
import { PageModel } from '../../content/domExtractor';

const mockPageModel: PageModel = {
  page: {
    url: 'http://localhost:8080/index.html',
    title: 'Employee Directory',
  },
  elements: [
    {
      id: 'name_rahul',
      type: 'heading',
      tagName: 'H3',
      label: 'Rahul Sharma',
      role: 'heading',
      visible: true,
      position: { x: 50, y: 100, width: 200, height: 30 },
    },
    {
      id: 'btn_profile_rahul',
      type: 'button',
      tagName: 'BUTTON',
      label: 'View Profile',
      role: 'button',
      accessibleName: 'View profile of Rahul Sharma',
      visible: true,
      position: { x: 50, y: 200, width: 120, height: 40 },
    },
    {
      id: 'btn_delete_account',
      type: 'button',
      tagName: 'BUTTON',
      label: 'Delete Account',
      role: 'button',
      visible: true,
      position: { x: 50, y: 300, width: 120, height: 40 },
    },
  ],
};

describe('Phase 8: Local Action Firewall Unit Tests', () => {
  test('TEST 1: Valid click action on observed element -> ALLOW', () => {
    const action = {
      action: 'click',
      element_id: 'btn_profile_rahul',
      reasoning: 'Clicking Rahul profile button',
    };

    const result = validateAction(action, mockPageModel, {
      pageUrl: 'http://localhost:8080/index.html',
      timestamp: Date.now(),
    });

    expect(result.allowed).toBe(true);
    expect(result.decision).toBe('ALLOW');
    expect(result.validationChecks.schemaValid).toBe(true);
    expect(result.validationChecks.elementExists).toBe(true);
    expect(result.validationChecks.actionTypeAllowed).toBe(true);
    expect(result.validationChecks.currentPageMatches).toBe(true);
  });

  test('TEST 2: Invented element ID -> DENY', () => {
    const action = {
      action: 'click',
      element_id: 'profile_999',
      reasoning: 'Clicking invented element ID',
    };

    const result = validateAction(action, mockPageModel, {
      pageUrl: 'http://localhost:8080/index.html',
      timestamp: Date.now(),
    });

    expect(result.allowed).toBe(false);
    expect(result.decision).toBe('DENY');
    expect(result.reason).toContain('profile_999');
    expect(result.validationChecks.elementExists).toBe(false);
  });

  test('TEST 3: Unsupported action (execute_javascript) -> DENY', () => {
    const action = {
      action: 'execute_javascript',
      code: "alert('hacked')",
    };

    const result = validateAction(action, mockPageModel);

    expect(result.allowed).toBe(false);
    expect(result.decision).toBe('DENY');
    expect(result.reason).toContain('execute_javascript');
    expect(result.validationChecks.actionTypeAllowed).toBe(false);
  });

  test('TEST 4: Stale action due to URL mismatch -> DENY', () => {
    const action = {
      action: 'click',
      element_id: 'btn_profile_rahul',
    };

    const result = validateAction(action, mockPageModel, {
      pageUrl: 'http://localhost:8080/different-page.html',
      timestamp: Date.now(),
    });

    expect(result.allowed).toBe(false);
    expect(result.decision).toBe('DENY');
    expect(result.reason).toContain('Page URL mismatch');
    expect(result.validationChecks.currentPageMatches).toBe(false);
  });

  test('TEST 5: Dangerous action (delete_account) -> REQUIRE_CONFIRMATION', () => {
    const action = {
      action: 'click',
      element_id: 'btn_delete_account',
      reasoning: 'Attempting to delete account',
    };

    const result = validateAction(action, mockPageModel, {
      pageUrl: 'http://localhost:8080/index.html',
      timestamp: Date.now(),
    });

    expect(result.allowed).toBe(false);
    expect(result.decision).toBe('REQUIRE_CONFIRMATION');
    expect(result.reason).toContain('destructive');
    expect(result.validationChecks.safeAction).toBe(false);
  });

  test('TEST 6: Malformed action payload (missing element_id) -> DENY', () => {
    const action = {
      action: 'click',
      // Missing element_id
    };

    const result = validateAction(action, mockPageModel);

    expect(result.allowed).toBe(false);
    expect(result.decision).toBe('DENY');
    expect(result.reason).toContain('requires a valid string element_id');
    expect(result.validationChecks.schemaValid).toBe(false);
  });

  test('TEST 7: Unsafe navigation (javascript: scheme) -> DENY', () => {
    const action = {
      action: 'navigate',
      value: 'javascript:alert(document.cookie)',
    };

    const result = validateAction(action, mockPageModel);

    expect(result.allowed).toBe(false);
    expect(result.decision).toBe('DENY');
    expect(result.reason).toContain('prohibited URL scheme');
  });

  test('TEST 8: ActionType.NONE no-op -> ALLOW', () => {
    const action = {
      action: 'none',
      reasoning: 'No suitable action found',
    };

    const result = validateAction(action, mockPageModel);

    expect(result.allowed).toBe(true);
    expect(result.decision).toBe('ALLOW');
    expect(result.reason).toContain('No action requested');
  });
});
