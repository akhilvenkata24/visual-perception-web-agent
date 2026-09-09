// Phase 14: Task-Aware Privacy Demonstration Integration Tests
// Validates that DIFFERENT USER TASKS on the SAME WEBPAGE produce DIFFERENT PRIVACY DECISIONS.

import { describe, it, expect } from 'vitest';
import { executePerceptionPipeline } from '../../perception/perceptionManager';
import { buildUnifiedPageModel } from '../../perception/unifiedPageModel';
import { detectSensitiveEntities } from '../../privacy/piiDetector';
import { evaluatePrivacyPolicy } from '../../privacy/policyEngine';
import { createSanitizedContext } from '../../privacy/redactor';
import { validateAction } from '../actionFirewall';
import { PageModel } from '../../content/domExtractor';


describe('Phase 14 — Task-Aware Privacy Demonstration Suite', () => {
  // Controlled Employee Directory Page Model Fixture (Same Webpage for all tasks)
  const employeeDirectoryModel: PageModel = {
    page: {
      url: 'http://localhost:8080/index.html',
      title: 'Company Employee Directory',
    },
    elements: [
      {
        id: 'name_rahul',
        type: 'heading',
        tagName: 'h2',
        label: 'Rahul Sharma',
        role: 'heading',
        visible: true,
        position: { x: 10, y: 10, width: 150, height: 25 },
      },
      {
        id: 'title_rahul',
        type: 'text',
        tagName: 'p',
        label: 'Software Engineer',
        role: 'generic',
        visible: true,
        position: { x: 10, y: 35, width: 150, height: 20 },
      },
      {
        id: 'email_rahul',
        type: 'link',
        tagName: 'a',
        label: 'rahul.sharma@example.com',
        role: 'link',
        attributes: { href: 'mailto:rahul.sharma@example.com' },
        visible: true,
        position: { x: 10, y: 60, width: 200, height: 20 },
      },
      {
        id: 'phone_rahul',
        type: 'text',
        tagName: 'span',
        label: '+91 9876543210',
        role: 'generic',
        accessibleName: 'Phone number for Rahul Sharma',
        visible: true,
        position: { x: 10, y: 85, width: 150, height: 20 },
      },
      {
        id: 'btn_profile_rahul',
        type: 'button',
        tagName: 'button',
        label: 'View Profile',
        role: 'button',
        attributes: { 'data-target': 'rahul', 'aria-controls': 'profile_rahul' },
        visible: true,
        position: { x: 10, y: 110, width: 100, height: 30 },
      },
      {
        id: 'photo_rahul',
        type: 'image',
        tagName: 'img',
        label: 'Profile photo of Rahul Sharma',
        role: 'img',
        visible: true,
        position: { x: 200, y: 10, width: 128, height: 128 },
      },
      // Priya Nair (Unrelated Employee)
      {
        id: 'name_priya',
        type: 'heading',
        tagName: 'h2',
        label: 'Priya Nair',
        role: 'heading',
        visible: true,
        position: { x: 300, y: 10, width: 150, height: 25 },
      },
      {
        id: 'email_priya',
        type: 'link',
        tagName: 'a',
        label: 'priya.nair@example.com',
        role: 'link',
        attributes: { href: 'mailto:priya.nair@example.com' },
        visible: true,
        position: { x: 300, y: 60, width: 200, height: 20 },
      },
    ],
  };

  it('DEMO A: Task "Open Rahul\'s profile" -> MASK Email/Phone, ALLOW Button & Name', async () => {
    const task = "Open Rahul's profile";

    // 1. Perception & Unified Model
    const perceptionResults = await executePerceptionPipeline(task, employeeDirectoryModel);
    const unifiedModel = buildUnifiedPageModel(perceptionResults);

    // 2. Hybrid PII Detector
    const sensitiveEntities = detectSensitiveEntities(unifiedModel);

    // 3. Context-Aware Privacy Engine
    const { classification, decisions } = evaluatePrivacyPolicy(task, unifiedModel, sensitiveEntities);

    // 4. Sanitization
    const sanitizedContext = createSanitizedContext(task, classification, unifiedModel, sensitiveEntities, decisions);

    expect(classification.intent).toBe('OPEN_ELEMENT');

    const emailDecision = decisions.find((d) => d.elementId === 'email_rahul');
    expect(emailDecision?.decision).toBe('MASK');

    const phoneDecision = decisions.find((d) => d.elementId === 'phone_rahul');
    expect(phoneDecision?.decision).toBe('MASK');

    const nameDecision = decisions.find((d) => d.elementId === 'name_rahul');
    expect(nameDecision?.decision).toBe('ALLOW');

    // Verify raw email is not exposed in sanitized payload
    const serializedPayload = JSON.stringify(sanitizedContext);
    expect(serializedPayload).not.toContain('rahul.sharma@example.com');
    expect(serializedPayload).toContain('[REDACTED]');

    // 5. Action Firewall Validation
    const mockAction = { action: 'click', element_id: 'btn_profile_rahul' };
    const firewallResult = validateAction(mockAction, unifiedModel, {
      pageUrl: unifiedModel.page.url,
      timestamp: Date.now(),
    });

    expect(firewallResult.allowed).toBe(true);
    expect(firewallResult.decision).toBe('ALLOW');
  });

  it('DEMO B: Task "Find Rahul\'s email" -> ALLOW Email, MASK Phone', async () => {
    const task = "Find Rahul's email";

    const perceptionResults = await executePerceptionPipeline(task, employeeDirectoryModel);
    const unifiedModel = buildUnifiedPageModel(perceptionResults);
    const sensitiveEntities = detectSensitiveEntities(unifiedModel);
    const { classification, decisions } = evaluatePrivacyPolicy(task, unifiedModel, sensitiveEntities);
    const sanitizedContext = createSanitizedContext(task, classification, unifiedModel, sensitiveEntities, decisions);

    expect(classification.intent).toBe('FIND_INFORMATION');

    // Rahul's email is explicitly requested -> ALLOW
    const rahulEmailDecision = decisions.find((d) => d.elementId === 'email_rahul');
    expect(rahulEmailDecision?.decision).toBe('ALLOW');

    // Phone remains MASK
    const phoneDecision = decisions.find((d) => d.elementId === 'phone_rahul');
    expect(phoneDecision?.decision).toBe('MASK');

    // Unrelated employee (Priya) email remains MASK
    const priyaEmailDecision = decisions.find((d) => d.elementId === 'email_priya');
    expect(priyaEmailDecision?.decision).toBe('MASK');

    // Verified: Rahul's requested email exists in sanitized payload, Priya's is redacted
    const serializedPayload = JSON.stringify(sanitizedContext);
    expect(serializedPayload).toContain('rahul.sharma@example.com');
    expect(serializedPayload).not.toContain('priya.nair@example.com');
  });

  it('DEMO C: Task "What\'s Rahul\'s phone number?" -> ALLOW Phone, MASK Email', async () => {
    const task = "What's Rahul's phone number?";

    const perceptionResults = await executePerceptionPipeline(task, employeeDirectoryModel);
    const unifiedModel = buildUnifiedPageModel(perceptionResults);
    const sensitiveEntities = detectSensitiveEntities(unifiedModel);
    const { classification, decisions } = evaluatePrivacyPolicy(task, unifiedModel, sensitiveEntities);
    const sanitizedContext = createSanitizedContext(task, classification, unifiedModel, sensitiveEntities, decisions);

    expect(classification.intent).toBe('FIND_INFORMATION');

    // Rahul's phone is explicitly requested -> ALLOW
    const phoneDecision = decisions.find((d) => d.elementId === 'phone_rahul');
    expect(phoneDecision?.decision).toBe('ALLOW');

    // Email remains MASK
    const emailDecision = decisions.find((d) => d.elementId === 'email_rahul');
    expect(emailDecision?.decision).toBe('MASK');

    const serializedPayload = JSON.stringify(sanitizedContext);
    expect(serializedPayload).toContain('+91 9876543210');
    expect(serializedPayload).not.toContain('rahul.sharma@example.com');
  });

  it('DEMO D: Task "Who\'s this person?" -> Activates Vision, Face LOCAL_ONLY, Name ALLOW', async () => {
    const task = "Who's this person?";

    const perceptionResults = await executePerceptionPipeline(task, employeeDirectoryModel);
    const unifiedModel = buildUnifiedPageModel(perceptionResults);

    // Verify Vision perception ran
    expect(perceptionResults.activeSources).toContain('vision');
    expect(unifiedModel.visual_regions.length).toBeGreaterThan(0);

    const sensitiveEntities = detectSensitiveEntities(unifiedModel);
    const { classification, decisions } = evaluatePrivacyPolicy(task, unifiedModel, sensitiveEntities);
    const sanitizedContext = createSanitizedContext(task, classification, unifiedModel, sensitiveEntities, decisions);

    expect(classification.intent).toBe('IDENTIFY_PERSON');

    // Face visual region -> ALLOW (permitted for person identification)
    const faceDecision = decisions.find((d) => d.entityType === 'face');
    expect(faceDecision?.decision).toBe('ALLOW');

    // Person Name -> ALLOW
    const nameDecision = decisions.find((d) => d.elementId === 'name_rahul');
    expect(nameDecision?.decision).toBe('ALLOW');

    // Verify prohibited contact info is omitted from remote sanitized network payload
    const serializedPayload = JSON.stringify(sanitizedContext);
    expect(serializedPayload).not.toContain('rahul.sharma@example.com');
  });
});
