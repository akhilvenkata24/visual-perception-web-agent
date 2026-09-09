import React, { useEffect, useRef } from 'react';

export type OrbState = 'ready' | 'working' | 'analyzing' | 'complete' | 'paused';

interface ThreeOrbCanvasProps {
  state?: OrbState;
  size?: number;
  className?: string;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  theta: number;
  phi: number;
  speed: number;
  size: number;
  color: string;
}

export const ThreeOrbCanvas: React.FC<ThreeOrbCanvasProps> = ({
  state = 'ready',
  size = 120,
  className = '',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const orbRadius = size * 0.32;

    // Generate spherical 3D particle cloud
    const particleCount = 42;
    const particles: Particle[] = [];
    const colors = ['#38bdf8', '#818cf8', '#6366f1', '#06b6d4', '#c084fc'];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particles.push({
        x: 0,
        y: 0,
        z: 0,
        baseRadius: orbRadius * (0.85 + Math.random() * 0.3),
        theta,
        phi,
        speed: (0.008 + Math.random() * 0.012) * (Math.random() > 0.5 ? 1 : -1),
        size: 1.2 + Math.random() * 1.8,
        color: colors[i % colors.length],
      });
    }

    let angleX = 0;
    let angleY = 0;
    let pulseScale = 1;
    let pulseDir = 1;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Speed multipliers based on agent state
      let speedMult = 1;
      if (state === 'working') speedMult = 2.4;
      if (state === 'analyzing') speedMult = 1.8;
      if (state === 'paused') speedMult = 0.2;

      // Mouse interactive tilt
      const targetAngleX = (mousePosRef.current.y / size - 0.5) * 0.6;
      const targetAngleY = (mousePosRef.current.x / size - 0.5) * 0.6;
      angleX += (targetAngleX - angleX) * 0.05 + 0.008 * speedMult;
      angleY += (targetAngleY - angleY) * 0.05 + 0.012 * speedMult;

      // Gentle breathing core pulse
      pulseScale += 0.004 * pulseDir * speedMult;
      if (pulseScale > 1.08) pulseDir = -1;
      if (pulseScale < 0.92) pulseDir = 1;

      // 1. Radiant Ambient Background Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        orbRadius * 1.5 * pulseScale
      );
      if (state === 'complete') {
        glowGrad.addColorStop(0, 'rgba(52, 211, 153, 0.45)');
        glowGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
        glowGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      } else if (state === 'paused') {
        glowGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
        glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
        glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
        glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.18)');
        glowGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 1.5 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Orbital Rings
      const ringCount = state === 'working' ? 3 : 2;
      for (let r = 0; r < ringCount; r++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angleY * (r === 0 ? 1 : -0.7) + (r * Math.PI) / 3);
        ctx.scale(1, 0.35 + (r * 0.1));

        ctx.beginPath();
        ctx.arc(0, 0, orbRadius * (1 + r * 0.18) * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle =
          state === 'complete'
            ? 'rgba(52, 211, 153, 0.4)'
            : state === 'paused'
            ? 'rgba(251, 191, 36, 0.4)'
            : r === 0
            ? 'rgba(56, 189, 248, 0.45)'
            : 'rgba(129, 140, 248, 0.3)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Central Glowing Holographic Sphere Core
      const coreGrad = ctx.createRadialGradient(
        centerX - orbRadius * 0.2,
        centerY - orbRadius * 0.2,
        0,
        centerX,
        centerY,
        orbRadius * 0.65 * pulseScale
      );
      if (state === 'complete') {
        coreGrad.addColorStop(0, '#a7f3d0');
        coreGrad.addColorStop(0.5, '#34d399');
        coreGrad.addColorStop(1, 'rgba(16, 185, 129, 0.2)');
      } else if (state === 'paused') {
        coreGrad.addColorStop(0, '#fef08a');
        coreGrad.addColorStop(0.5, '#fbbf24');
        coreGrad.addColorStop(1, 'rgba(245, 158, 11, 0.2)');
      } else {
        coreGrad.addColorStop(0, '#e0f2fe');
        coreGrad.addColorStop(0.4, '#38bdf8');
        coreGrad.addColorStop(0.8, '#6366f1');
        coreGrad.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
      }
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 0.65 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      // 4. Render 3D Projected Particles
      particles.forEach((p) => {
        p.theta += p.speed * speedMult;
        
        // 3D Spherical Coordinates
        const rad = p.baseRadius * pulseScale;
        const x3d = rad * Math.sin(p.phi) * Math.cos(p.theta);
        const y3d = rad * Math.sin(p.phi) * Math.sin(p.theta);
        const z3d = rad * Math.cos(p.phi);

        // Apply Rotation Matrix (Y and X axis)
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const xRot = x3d * cosY - z3d * sinY;
        const zRot = z3d * cosY + x3d * sinY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const yRot = y3d * cosX - zRot * sinX;
        const finalZ = zRot * cosX + y3d * sinX;

        // Perspective projection
        const fov = 160;
        const scale = fov / (fov + finalZ);
        const projX = centerX + xRot * scale;
        const projY = centerY + yRot * scale;
        const alpha = Math.max(0.15, Math.min(1, (finalZ + orbRadius) / (orbRadius * 2)));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [state, size, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`three-orb-canvas ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
