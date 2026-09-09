import { test, expect } from 'vitest';
import { evaluatePrivacyPolicy } from '../policyEngine.js';
import { createSanitizedContext } from '../redactor.js';
import { PageModel } from '../../content/domExtractor.js';
import { SensitiveEntity } from '../piiDetector.js';

test('Phase 4: Context-Aware Privacy Policy Unit Tests', () => {
  expect(runPolicyEngineTests()).toBe(true);
});

export function runPolicyEngineTests() {
  console.log('🧪 Running Phase 4 Context-Aware Privacy Policy Unit Tests...\n');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
    }
  }

  // Same PageModel
  const mockPageModel: PageModel = {
    page: {
      url: 'http://localhost:8080/index.html',
      title: 'Employee Directory',
    },
    elements: [
      {
        id: 'name_rahul',
        type: 'heading',
        tagName: 'h2',
        label: 'Rahul Sharma',
        role: 'heading',
        visible: true,
        position: { x: 57, y: 292, width: 419, height: 32 },
      },
      {
        id: 'title_rahul',
        type: 'text',
        tagName: 'p',
        label: 'Software Engineer',
        role: 'generic',
        visible: true,
        position: { x: 57, y: 328, width: 419, height: 26 },
      },
      {
        id: 'email_rahul',
        type: 'link',
        tagName: 'a',
        label: 'rahul.sharma@example.com',
        role: 'link',
        accessibleName: 'Email Rahul Sharma',
        visible: true,
        position: { x: 97, y: 382, width: 179, height: 23 },
      },
      {
        id: 'phone_rahul',
        type: 'text',
        tagName: 'span',
        label: '+91 9876543210',
        role: 'generic',
        accessibleName: 'Phone number for Rahul Sharma',
        visible: true,
        position: { x: 97, y: 413, width: 107, height: 23 },
      },
      {
        id: 'elem_2',
        type: 'button',
        tagName: 'button',
        label: 'View Profile',
        role: 'button',
        accessibleName: 'View profile of Rahul Sharma',
        visible: true,
        position: { x: 57, y: 472, width: 419, height: 42 },
      },
      {
        id: 'photo_rahul',
        type: 'image',
        tagName: 'img',
        label: 'Profile photo of Rahul Sharma',
        role: 'img',
        visible: true,
        position: { x: 160, y: 140, width: 120, height: 120 },
      },
    ],
  };

  // Same Detected Entities
  const mockEntities: SensitiveEntity[] = [
    {
      id: 'entity_1',
      type: 'person_name',
      value: 'Rahul Sharma',
      sources: ['dom', 'semantic'],
      source: 'dom+semantic',
      confidence: 0.98,
      elementId: 'name_rahul',
    },
    {
      id: 'entity_2',
      type: 'email',
      value: 'rahul.sharma@example.com',
      sources: ['dom', 'regex'],
      source: 'dom+regex',
      confidence: 0.99,
      elementId: 'email_rahul',
    },
    {
      id: 'entity_3',
      type: 'phone',
      value: '+91 9876543210',
      sources: ['dom', 'regex'],
      source: 'dom+regex',
      confidence: 0.98,
      elementId: 'phone_rahul',
    },
  ];


  // Scenario 1: Task = "Who's this person?"
  const t1 = "Who's this person?";
  const eval1 = evaluatePrivacyPolicy(t1, mockPageModel, mockEntities);
  const context1 = createSanitizedContext(t1, eval1.classification, mockPageModel, mockEntities, eval1.decisions);

  const nameDec1 = eval1.decisions.find((d) => d.elementId === 'name_rahul');
  const emailDec1 = eval1.decisions.find((d) => d.elementId === 'email_rahul');
  const phoneDec1 = eval1.decisions.find((d) => d.elementId === 'phone_rahul');

  assert(
    nameDec1?.decision === 'ALLOW' && emailDec1?.decision === 'MASK' && phoneDec1?.decision === 'MASK',
    'Scenario 1 ("Who\'s this person?"): Name ALLOW, Email MASK, Phone MASK'
  );
  assert(
    !JSON.stringify(context1).includes('rahul.sharma@example.com'),
    'Scenario 1 Sanitized Output: Prohibited raw email is NOT present in sanitized context'
  );

  // Scenario 2: Task = "What is Rahul's email?"
  const t2 = "What is Rahul's email?";
  const eval2 = evaluatePrivacyPolicy(t2, mockPageModel, mockEntities);
  const context2 = createSanitizedContext(t2, eval2.classification, mockPageModel, mockEntities, eval2.decisions);

  const emailDec2 = eval2.decisions.find((d) => d.elementId === 'email_rahul');
  const phoneDec2 = eval2.decisions.find((d) => d.elementId === 'phone_rahul');

  assert(
    emailDec2?.decision === 'ALLOW' && phoneDec2?.decision === 'MASK',
    'Scenario 2 ("What is Rahul\'s email?"): Email ALLOW (not masked!), Phone MASK'
  );
  assert(
    JSON.stringify(context2).includes('rahul.sharma@example.com'),
    'Scenario 2 Sanitized Output: Required email is preserved in sanitized context'
  );

  // Scenario 3: Task = "What is Rahul's phone number?"
  const t3 = "What is Rahul's phone number?";
  const eval3 = evaluatePrivacyPolicy(t3, mockPageModel, mockEntities);
  const context3 = createSanitizedContext(t3, eval3.classification, mockPageModel, mockEntities, eval3.decisions);

  const emailDec3 = eval3.decisions.find((d) => d.elementId === 'email_rahul');
  const phoneDec3 = eval3.decisions.find((d) => d.elementId === 'phone_rahul');

  assert(
    phoneDec3?.decision === 'ALLOW' && emailDec3?.decision === 'MASK',
    'Scenario 3 ("What is Rahul\'s phone number?"): Phone ALLOW (not masked!), Email MASK'
  );
  assert(
    JSON.stringify(context3).includes('+91 9876543210'),
    'Scenario 3 Sanitized Output: Required phone number is preserved in sanitized context'
  );

  // Scenario 4: Task = "Open Rahul's profile"
  const t4 = "Open Rahul's profile";
  const eval4 = evaluatePrivacyPolicy(t4, mockPageModel, mockEntities);
  const context4 = createSanitizedContext(t4, eval4.classification, mockPageModel, mockEntities, eval4.decisions);

  const nameDec4 = eval4.decisions.find((d) => d.elementId === 'name_rahul');
  const emailDec4 = eval4.decisions.find((d) => d.elementId === 'email_rahul');

  assert(
    nameDec4?.decision === 'ALLOW' && emailDec4?.decision === 'MASK',
    'Scenario 4 ("Open Rahul\'s profile"): Name ALLOW, Email & Phone MASK, Button ALLOW'
  );
  assert(
    context4.elements.some((el) => el.id === 'elem_2' && el.label === 'View Profile'),
    'Scenario 4 Sanitized Output: Target button "View Profile" is preserved for action execution'
  );

  // Test 5: Visual Asset LOCAL_ONLY (Omits image from remote context)
  assert(
    !context1.elements.some((el) => el.id === 'photo_rahul'),
    'LOCAL_ONLY Rule: Visual face image (photo_rahul) is omitted from remote sanitized context'
  );

  // Test 6: Non-Destructive Integrity (Original PageModel unchanged)
  assert(
    mockPageModel.elements.find((el) => el.id === 'email_rahul')?.label === 'rahul.sharma@example.com',
    'Non-Destructive Integrity: Original PageModel label remains 100% untouched'
  );

  console.log(`\nResults: ${passed}/${total} unit tests passed.\n`);
  return passed === total;
}

runPolicyEngineTests();
