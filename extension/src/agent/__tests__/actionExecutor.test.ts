// @vitest-environment jsdom
import { describe, test, expect, beforeEach } from 'vitest';
import { executeAction } from '../../content/actionExecutor';
import { PageModel } from '../../content/domExtractor';
import { FirewallResult } from '../actionFirewall';

describe('Phase 9: Safe Browser Action Executor Unit Tests', () => {
  let mockPageModel: PageModel;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <h3 id="name_rahul">Rahul Sharma</h3>
        <button id="btn_profile_rahul">View Profile</button>
        <input id="search_input" type="text" value="" />
      </div>
    `;

    mockPageModel = {
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
          position: { x: 0, y: 0, width: 100, height: 20 },
        },
        {
          id: 'btn_profile_rahul',
          type: 'button',
          tagName: 'BUTTON',
          label: 'View Profile',
          role: 'button',
          visible: true,
          position: { x: 0, y: 50, width: 100, height: 30 },
        },
        {
          id: 'search_input',
          type: 'input',
          tagName: 'INPUT',
          label: 'Search',
          role: 'textbox',
          visible: true,
          position: { x: 0, y: 100, width: 100, height: 30 },
        },
      ],
    };
  });

  test('TEST 1: Approved click action executes successfully on DOM element', () => {
    let clicked = false;
    const btn = document.getElementById('btn_profile_rahul')!;
    btn.addEventListener('click', () => {
      clicked = true;
    });

    const firewallResult: FirewallResult = {
      allowed: true,
      decision: 'ALLOW',
      reason: 'Validated safe click action.',
      action: {
        action: 'click',
        element_id: 'btn_profile_rahul',
      },
      validationChecks: {
        schemaValid: true,
        actionTypeAllowed: true,
        elementExists: true,
        elementObservedLocally: true,
        currentPageMatches: true,
        actionNotStale: true,
        safeAction: true,
      },
    };

    const result = executeAction(firewallResult, mockPageModel);
    console.log('TEST 1 RESULT:', result);
    expect(result.success).toBe(true);
    expect(result.action).toBe('click');
    expect(result.elementId).toBe('btn_profile_rahul');
    expect(clicked).toBe(true);
  });

  test('TEST 2: Unapproved firewall action rejected before execution', () => {
    const firewallResult: FirewallResult = {
      allowed: false,
      decision: 'DENY',
      reason: 'Invented element ID profile_999.',
      action: {
        action: 'click',
        element_id: 'profile_999',
      },
      validationChecks: {
        schemaValid: true,
        actionTypeAllowed: true,
        elementExists: false,
        elementObservedLocally: false,
        currentPageMatches: true,
        actionNotStale: true,
        safeAction: false,
      },
    };

    const result = executeAction(firewallResult, mockPageModel);
    expect(result.success).toBe(false);
    expect(result.message).toContain('rejected by Action Firewall');
  });

  test('TEST 3: Nonexistent / disconnected element fails safely', () => {
    const firewallResult: FirewallResult = {
      allowed: true,
      decision: 'ALLOW',
      reason: 'Validated click action.',
      action: {
        action: 'click',
        element_id: 'nonexistent_id',
      },
      validationChecks: {
        schemaValid: true,
        actionTypeAllowed: true,
        elementExists: true,
        elementObservedLocally: true,
        currentPageMatches: true,
        actionNotStale: true,
        safeAction: true,
      },
    };

    const result = executeAction(firewallResult, mockPageModel);
    expect(result.success).toBe(false);
    expect(result.message).toContain('no longer available in DOM');
  });

  test('TEST 4: Approved type action enters value into input', () => {
    const input = document.getElementById('search_input') as HTMLInputElement;

    const firewallResult: FirewallResult = {
      allowed: true,
      decision: 'ALLOW',
      reason: 'Validated type action.',
      action: {
        action: 'type',
        element_id: 'search_input',
        value: 'Rahul',
      },
      validationChecks: {
        schemaValid: true,
        actionTypeAllowed: true,
        elementExists: true,
        elementObservedLocally: true,
        currentPageMatches: true,
        actionNotStale: true,
        safeAction: true,
      },
    };

    const result = executeAction(firewallResult, mockPageModel);
    expect(result.success).toBe(true);
    expect(input.value).toBe('Rahul');
  });

  test('TEST 5: ActionType.NONE returns safe no-op success', () => {
    const firewallResult: FirewallResult = {
      allowed: true,
      decision: 'ALLOW',
      reason: 'No action requested.',
      action: {
        action: 'none',
      },
      validationChecks: {
        schemaValid: true,
        actionTypeAllowed: true,
        elementExists: true,
        elementObservedLocally: true,
        currentPageMatches: true,
        actionNotStale: true,
        safeAction: true,
      },
    };

    const result = executeAction(firewallResult, mockPageModel);
    expect(result.success).toBe(true);
    expect(result.action).toBe('none');
  });
});
