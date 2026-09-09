// Phase 30: In-Page Webpage Visualizer (webpageVisualizer.ts)
// Three.js-inspired holographic visualization engine injected into webpages.
// Controls: Luminous Viewport Border, Traveling Photon, Floating Modality Badges,
// Holographic Element Target Frame, Animated AI Cursor, Laser Scanner, and Take Control Overlay.

export type ModalityBadgeState = 'ACTIVE' | 'OBSERVING' | 'ACTING' | 'ANALYZING' | 'COMPLETE' | 'PAUSED';

export interface VisualizerState {
  isActive: boolean;
  badgeState: ModalityBadgeState;
  targetElement?: HTMLElement | null;
  targetLabel?: string;
  cursorPos?: { x: number; y: number };
  isScanning?: boolean;
  scanLabel?: 'CAPTURING' | 'ANALYZING';
  isPaused?: boolean;
}

class WebpageVisualizer {
  private overlayContainer: HTMLDivElement | null = null;
  private viewportGlow: HTMLDivElement | null = null;
  private floatingBadge: HTMLDivElement | null = null;
  private targetFrame: HTMLDivElement | null = null;
  private aiCursor: HTMLDivElement | null = null;
  private scanLaser: HTMLDivElement | null = null;
  private takeControlPill: HTMLButtonElement | null = null;
  private pausedBanner: HTMLDivElement | null = null;

  private isInitialized = false;
  private onTakeControlCallback?: () => void;
  private onResumeCallback?: () => void;

  public init(onTakeControl?: () => void, onResume?: () => void) {
    if (this.isInitialized || typeof document === 'undefined') return;
    this.onTakeControlCallback = onTakeControl;
    this.onResumeCallback = onResume;

    this.overlayContainer = document.createElement('div');
    this.overlayContainer.id = 'webpilot-overlay-root';
    this.overlayContainer.className = 'webpilot-overlay-root';

    // 1. Viewport Luminous Glow Border & Traveling Photon
    this.viewportGlow = document.createElement('div');
    this.viewportGlow.className = 'webpilot-viewport-glow';
    this.viewportGlow.innerHTML = `
      <div class="webpilot-photon photon-top"></div>
      <div class="webpilot-photon photon-right"></div>
      <div class="webpilot-photon photon-bottom"></div>
      <div class="webpilot-photon photon-left"></div>
    `;

    // 2. Floating Modality Badge (Top-Right)
    this.floatingBadge = document.createElement('div');
    this.floatingBadge.className = 'webpilot-floating-badge';
    this.floatingBadge.innerHTML = `
      <span class="webpilot-badge-icon">◉</span>
      <span class="webpilot-badge-text">AI ACTIVE</span>
    `;

    // 3. Holographic Element Target Frame (Inspection frame + 4 corners + label)
    this.targetFrame = document.createElement('div');
    this.targetFrame.className = 'webpilot-target-frame';
    this.targetFrame.innerHTML = `
      <div class="webpilot-corner corner-tl"></div>
      <div class="webpilot-corner corner-tr"></div>
      <div class="webpilot-corner corner-br"></div>
      <div class="webpilot-corner corner-bl"></div>
      <div class="webpilot-target-label">
        <span class="target-sparkle">✦</span>
        <span class="target-title">AI TARGET</span>
        <span class="target-name"></span>
      </div>
    `;

    // 4. Futuristic AI Cursor
    this.aiCursor = document.createElement('div');
    this.aiCursor.className = 'webpilot-ai-cursor';
    this.aiCursor.innerHTML = `
      <div class="cursor-core"></div>
      <div class="cursor-ring"></div>
      <div class="cursor-sparkle">✦</div>
      <div class="cursor-ripple"></div>
    `;

    // 5. Cinematic Laser Scanner
    this.scanLaser = document.createElement('div');
    this.scanLaser.className = 'webpilot-scan-laser';
    this.scanLaser.innerHTML = `
      <div class="laser-beam"></div>
      <div class="scan-badge">
        <span class="scan-icon">◌</span>
        <span class="scan-text">CAPTURING</span>
      </div>
    `;

    // 6. Floating Take Control Pill
    this.takeControlPill = document.createElement('button');
    this.takeControlPill.className = 'webpilot-take-control-pill';
    this.takeControlPill.innerHTML = `
      <span class="pill-icon">⏸</span>
      <span class="pill-text">Take Control</span>
    `;
    this.takeControlPill.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleTakeControl();
    });

    // 7. Paused Banner
    this.pausedBanner = document.createElement('div');
    this.pausedBanner.className = 'webpilot-paused-banner';
    this.pausedBanner.innerHTML = `
      <div class="paused-content">
        <span class="paused-icon">⏸</span>
        <div class="paused-text-group">
          <strong>Agent Paused</strong>
          <span>You are in control. Click resume when ready.</span>
        </div>
      </div>
      <button class="btn-resume-agent">▶ Resume Agent</button>
    `;
    this.pausedBanner.querySelector('.btn-resume-agent')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleResume();
    });

    // Assemble DOM
    this.overlayContainer.appendChild(this.viewportGlow);
    this.overlayContainer.appendChild(this.floatingBadge);
    this.overlayContainer.appendChild(this.targetFrame);
    this.overlayContainer.appendChild(this.aiCursor);
    this.overlayContainer.appendChild(this.scanLaser);
    this.overlayContainer.appendChild(this.takeControlPill);
    this.overlayContainer.appendChild(this.pausedBanner);

    document.body.appendChild(this.overlayContainer);
    this.isInitialized = true;
  }

  public setActive(active: boolean, badgeState: ModalityBadgeState = 'ACTIVE') {
    this.init();
    if (!this.overlayContainer || !this.viewportGlow || !this.floatingBadge) return;

    if (active) {
      this.overlayContainer.classList.add('visible');
      this.viewportGlow.classList.add('active');
      this.updateBadge(badgeState);
      this.takeControlPill?.classList.add('visible');
    } else {
      this.overlayContainer.classList.remove('visible');
      this.viewportGlow.classList.remove('active');
      this.targetFrame?.classList.remove('active');
      this.aiCursor?.classList.remove('visible');
      this.scanLaser?.classList.remove('active');
      this.takeControlPill?.classList.remove('visible');
      this.pausedBanner?.classList.remove('visible');
    }
  }

  public updateBadge(state: ModalityBadgeState) {
    if (!this.floatingBadge) return;
    this.floatingBadge.className = `webpilot-floating-badge badge-${state.toLowerCase()}`;
    const icon = this.floatingBadge.querySelector('.webpilot-badge-icon');
    const text = this.floatingBadge.querySelector('.webpilot-badge-text');

    switch (state) {
      case 'OBSERVING':
        if (icon) icon.textContent = '◉';
        if (text) text.textContent = 'OBSERVING';
        break;
      case 'ACTING':
        if (icon) icon.textContent = '✦';
        if (text) text.textContent = 'AI ACTION';
        break;
      case 'ANALYZING':
        if (icon) icon.textContent = '◌';
        if (text) text.textContent = 'ANALYZING';
        break;
      case 'COMPLETE':
        if (icon) icon.textContent = '✓';
        if (text) text.textContent = 'COMPLETE';
        break;
      case 'PAUSED':
        if (icon) icon.textContent = '⏸';
        if (text) text.textContent = 'PAUSED';
        break;
      case 'ACTIVE':
      default:
        if (icon) icon.textContent = '●';
        if (text) text.textContent = 'AI ACTIVE';
        break;
    }
  }

  public highlightTarget(element: HTMLElement, label?: string) {
    this.init();
    if (!this.targetFrame) return;

    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    const pad = 6;
    this.targetFrame.style.left = `${rect.left + scrollX - pad}px`;
    this.targetFrame.style.top = `${rect.top + scrollY - pad}px`;
    this.targetFrame.style.width = `${rect.width + pad * 2}px`;
    this.targetFrame.style.height = `${rect.height + pad * 2}px`;

    const nameSpan = this.targetFrame.querySelector('.target-name');
    if (nameSpan) {
      nameSpan.textContent = label ? `"${label}"` : '';
    }

    this.targetFrame.classList.add('active');

    // Move AI Cursor smoothly to the element center
    const targetCenterX = rect.left + scrollX + rect.width / 2;
    const targetCenterY = rect.top + scrollY + rect.height / 2;
    this.moveCursorTo(targetCenterX, targetCenterY, () => {
      this.triggerCursorRipple();
    });
  }

  public clearTargetHighlight() {
    if (this.targetFrame) {
      this.targetFrame.classList.remove('active');
    }
  }

  public moveCursorTo(x: number, y: number, onArrival?: () => void) {
    this.init();
    if (!this.aiCursor) return;

    this.aiCursor.classList.add('visible');
    this.aiCursor.style.left = `${x}px`;
    this.aiCursor.style.top = `${y}px`;

    setTimeout(() => {
      onArrival?.();
    }, 400);
  }

  public triggerCursorRipple() {
    if (!this.aiCursor) return;
    const ripple = this.aiCursor.querySelector('.cursor-ripple') as HTMLElement;
    if (ripple) {
      ripple.classList.remove('animating');
      // Trigger reflow
      void ripple.offsetWidth;
      ripple.classList.add('animating');
    }
  }

  public startScan(label: 'CAPTURING' | 'ANALYZING' = 'CAPTURING', durationMs = 1200) {
    this.init();
    if (!this.scanLaser) return;

    const scanText = this.scanLaser.querySelector('.scan-text');
    if (scanText) scanText.textContent = label;

    this.scanLaser.classList.add('active');
    this.updateBadge('ANALYZING');

    setTimeout(() => {
      if (this.scanLaser) this.scanLaser.classList.remove('active');
    }, durationMs);
  }

  private handleTakeControl() {
    this.updateBadge('PAUSED');
    this.pausedBanner?.classList.add('visible');
    this.viewportGlow?.classList.add('paused');
    this.takeControlPill?.classList.remove('visible');
    this.clearTargetHighlight();
    this.aiCursor?.classList.remove('visible');
    this.onTakeControlCallback?.();
  }

  private handleResume() {
    this.pausedBanner?.classList.remove('visible');
    this.viewportGlow?.classList.remove('paused');
    this.takeControlPill?.classList.add('visible');
    this.updateBadge('ACTIVE');
    this.onResumeCallback?.();
  }
}

export const visualizer = new WebpageVisualizer();
