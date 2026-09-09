// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runAutonomousAgentLoop } from '../agentLoop';

describe('Autonomous Multi-Step Browser Agent Loop', () => {
  beforeEach(() => {
    // Setup DOM mock with profile card and hidden details section
    document.body.innerHTML = `
      <div id="container">
        <h2 id="name_rahul">Rahul Sharma</h2>
        <button id="btn_profile_rahul" aria-label="View profile of Rahul Sharma">View Profile</button>
        <section id="profile_rahul" class="hidden" style="display: none;">
          <h3>Detailed Profile</h3>
          <p id="bio_rahul">Rahul is a senior software engineer specializing in frontend architecture and privacy-preserving systems.</p>
        </section>
      </div>
    `;

    // Hook click to reveal profile section
    const btn = document.getElementById('btn_profile_rahul');
    btn?.addEventListener('click', () => {
      const section = document.getElementById('profile_rahul');
      if (section) {
        section.classList.remove('hidden');
        section.style.display = 'block';
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Test 1: Executes single-step informational task directly when answer is available', async () => {
    // Mock fetch for 1 step returning answer directly
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'success',
        action: {
          action: 'none',
          answer: 'Rahul Sharma is listed in the directory.',
          reasoning: 'Rahul Sharma is listed in the directory.',
        },
      }),
    } as Response);

    const result = await runAutonomousAgentLoop("Who is in the directory?", {
      maxSteps: 3,
      settlingDelayMs: 0,
    });

    expect(result.status).toBe('SUCCESS');
    expect(result.totalSteps).toBe(1);
    expect(result.finalAnswer).toBe('Rahul Sharma is listed in the directory.');
    expect(result.steps.length).toBe(1);
  });

  it('Test 2: Executes 2-step composite task: Click View Profile -> Re-perceive -> Extract Bio', async () => {
    // Step 1: AI plans click on 'btn_profile_rahul'
    // Step 2: AI sees revealed bio and plans action: 'none' with the bio text
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'success',
          action: {
            action: 'click',
            element_id: 'btn_profile_rahul',
            reasoning: "Clicking View Profile button to reveal Rahul's bio.",
          },
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'success',
          action: {
            action: 'none',
            answer: 'Rahul is a senior software engineer specializing in frontend architecture and privacy-preserving systems.',
            reasoning: 'Bio extracted from revealed profile section.',
          },
        }),
      } as Response);

    const result = await runAutonomousAgentLoop("Open Rahul's profile and give me his bio", {
      maxSteps: 5,
      settlingDelayMs: 10,
    });

    expect(result.status).toBe('SUCCESS');
    expect(result.totalSteps).toBe(2);
    expect(result.steps.length).toBe(2);
    expect(result.steps[0].executionResult?.success).toBe(true);
    expect(result.finalAnswer).toContain('Rahul is a senior software engineer');

    // Verify profile section in DOM was opened by step 1
    const profileSection = document.getElementById('profile_rahul');
    expect(profileSection?.style.display).toBe('block');
  });

  it('Test 3: Aborts loop safely if Action Firewall blocks an unauthorized action', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'success',
        action: {
          action: 'click',
          element_id: 'invented_fake_element_999',
          reasoning: 'Clicking invented element.',
        },
      }),
    } as Response);

    const result = await runAutonomousAgentLoop("Click fake element", {
      maxSteps: 3,
      settlingDelayMs: 0,
    });

    expect(result.status).toBe('BLOCKED_BY_FIREWALL');
    expect(result.error).toContain('Action blocked by Local Action Firewall');
  });
});
