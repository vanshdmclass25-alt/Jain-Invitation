import React, { useEffect, useRef } from 'react';

export interface SereneParticleSystemProps {
  /**
   * 'ambient': Soft floating light motes across a large container (e.g., hero or page background)
   * 'aura': Concentric breathing halos and gentle radiating particles centered behind an icon/emblem (Bhagwan Mahavir Swami)
   */
  variant?: 'ambient' | 'aura';
  /**
   * Density level of the particles
   */
  density?: 'subtle' | 'medium' | 'rich';
  /**
   * Color palette preset
   */
  colorScheme?: 'gold' | 'champagne' | 'warm-ivory' | 'celestial';
  /**
   * Template-specific particle animation identity:
   * - 'rajwada': Falling royal red rose & marigold petals with golden embers
   * - 'shwet': Drifting pure white jasmine/mogra blossoms with silver champagne motes
   * - 'sukoon': Floating sacred pink lotus petals and tranquil morning dewdrops
   * - 'divya': Twinkling 4-point/8-point celestial starlight sparkles and golden cosmic dust
   * - 'aura': Gen Z Aesthetic: Floating soft blush sakura cherry blossom petals & pastel champagne sparkles
   * - 'param': Mid-Age Sophisticated: Rich warm amber-bronze luxury embers and quiet gold motes
   * - 'mangalam': Elders Traditional: Sacred saffron marigold petals, holy akshat rice grains & chandan sparks
   */
  templateTheme?: 'rajwada' | 'shwet' | 'sukoon' | 'divya' | 'aura' | 'param' | 'mangalam';
  /**
   * Additional CSS classes for the canvas wrapper
   */
  className?: string;
  /**
   * Whether mouse/touch movement creates very gentle deflection
   */
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
  glowColor: string;
  isLargeOrb?: boolean;
  shapeType?: 'orb' | 'rose' | 'marigold' | 'jasmine' | 'lotus' | 'star' | 'dewdrop' | 'sakura' | 'amberMote' | 'akshat';
  rotation?: number;
  rotSpeed?: number;
  swaySpeed?: number;
  angle?: number;
  speed?: number;
  life?: number;
  maxLife?: number;
}

// Drawing helpers for template-specific animations
const drawRosePetal = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.bezierCurveTo(r * 0.8, -r * 0.5, r * 0.9, r * 0.6, 0, r);
  ctx.bezierCurveTo(-r * 0.9, r * 0.6, -r * 0.8, -r * 0.5, 0, -r);
  const grad = ctx.createLinearGradient(0, -r, 0, r);
  grad.addColorStop(0, `rgba(220, 20, 60, ${alpha * 0.9})`);
  grad.addColorStop(1, `rgba(128, 15, 30, ${alpha * 0.85})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

const drawSakuraPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.bezierCurveTo(r * 0.6, -r * 0.6, r * 0.8, r * 0.3, 0, r);
  ctx.bezierCurveTo(-r * 0.8, r * 0.3, -r * 0.6, -r * 0.6, 0, -r);
  const grad = ctx.createLinearGradient(0, -r, 0, r);
  grad.addColorStop(0, `rgba(255, 183, 197, ${alpha * 0.9})`);
  grad.addColorStop(0.7, `rgba(255, 218, 224, ${alpha * 0.85})`);
  grad.addColorStop(1, `rgba(255, 245, 247, ${alpha * 0.75})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

const drawAmberMote = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  // Diamond facet sparkle
  ctx.moveTo(0, -r * 1.3);
  ctx.lineTo(r * 0.8, 0);
  ctx.lineTo(0, r * 1.3);
  ctx.lineTo(-r * 0.8, 0);
  ctx.closePath();
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 1.3);
  grad.addColorStop(0, `rgba(255, 230, 160, ${alpha * 0.95})`);
  grad.addColorStop(0.5, `rgba(217, 140, 54, ${alpha * 0.8})`);
  grad.addColorStop(1, `rgba(138, 79, 23, ${alpha * 0.4})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

const drawAkshatGrain = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  // Elongated consecrated rice grain shape
  ctx.ellipse(0, 0, r * 0.4, r * 1.2, 0, 0, Math.PI * 2);
  const grad = ctx.createLinearGradient(0, -r * 1.2, 0, r * 1.2);
  grad.addColorStop(0, `rgba(255, 253, 235, ${alpha * 0.95})`);
  grad.addColorStop(0.5, `rgba(255, 215, 0, ${alpha * 0.9})`);
  grad.addColorStop(1, `rgba(255, 248, 200, ${alpha * 0.85})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

const drawMarigoldPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(r * 0.6, -r * 0.2, r * 0.5, r * 0.8);
  ctx.quadraticCurveTo(0, r, -r * 0.5, r * 0.8);
  ctx.quadraticCurveTo(-r * 0.6, -r * 0.2, 0, -r);
  const grad = ctx.createLinearGradient(0, -r, 0, r);
  grad.addColorStop(0, `rgba(255, 179, 0, ${alpha * 0.9})`);
  grad.addColorStop(1, `rgba(230, 81, 0, ${alpha * 0.85})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

const drawJasmineBlossom = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  for (let p = 0; p < 5; p++) {
    const angle = (p * Math.PI * 2) / 5;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * r * 0.45, Math.sin(angle) * r * 0.45, r * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 235, 150, ${alpha * 0.9})`;
  ctx.fill();
  ctx.restore();
};

const drawLotusPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.bezierCurveTo(r * 0.7, -r * 0.4, r * 0.8, r * 0.5, 0, r);
  ctx.bezierCurveTo(-r * 0.8, r * 0.5, -r * 0.7, -r * 0.4, 0, -r);
  const grad = ctx.createLinearGradient(0, -r, 0, r);
  grad.addColorStop(0, `rgba(244, 143, 177, ${alpha * 0.9})`);
  grad.addColorStop(0.7, `rgba(252, 228, 236, ${alpha * 0.85})`);
  grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.8})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

const drawCelestialStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, alpha: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const spikes = 4;
  const outerR = r * 1.5;
  const innerR = r * 0.35;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / spikes;
    const px = Math.cos(a) * radius;
    const py = Math.sin(a) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 235, 140, ${alpha * 0.95})`;
  ctx.fill();
  ctx.restore();
};

const drawDewdrop = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
  grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
  grad.addColorStop(0.6, `rgba(180, 220, 200, ${alpha * 0.35})`);
  grad.addColorStop(1, `rgba(100, 160, 130, ${alpha * 0.1})`);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
};

export const SereneParticleSystem: React.FC<SereneParticleSystemProps> = ({
  variant = 'ambient',
  density = 'medium',
  colorScheme = 'gold',
  templateTheme,
  className = '',
  interactive = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    let dpr = isMobileScreen ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    let isDisposed = false;
    let isIntersecting = true;

    // IntersectionObserver to pause particle rendering when canvas is scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isIntersecting = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Palette definitions
    const palettes = {
      gold: {
        primary: 'rgba(212, 175, 55, ',
        core: 'rgba(255, 248, 220, ',
        glow: 'rgba(243, 229, 171, ',
        aura: 'rgba(212, 175, 55, ',
      },
      champagne: {
        primary: 'rgba(235, 209, 151, ',
        core: 'rgba(255, 252, 240, ',
        glow: 'rgba(247, 231, 206, ',
        aura: 'rgba(230, 198, 126, ',
      },
      'warm-ivory': {
        primary: 'rgba(218, 194, 142, ',
        core: 'rgba(255, 255, 245, ',
        glow: 'rgba(240, 226, 182, ',
        aura: 'rgba(218, 194, 142, ',
      },
      celestial: {
        primary: 'rgba(229, 192, 123, ',
        core: 'rgba(255, 250, 235, ',
        glow: 'rgba(255, 223, 115, ',
        aura: 'rgba(229, 192, 123, ',
      },
    };

    const palette = palettes[colorScheme] || palettes.gold;

    // Particle count multiplier based on density
    const countMultiplier = density === 'subtle' ? 0.6 : density === 'rich' ? 1.4 : 1.0;

    let particles: Particle[] = [];
    let mousePos = { x: -1000, y: -1000 };

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handlePointerLeave = () => {
      mousePos = { x: -1000, y: -1000 };
    };

    if (interactive) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseleave', handlePointerLeave);
    }

    // Initialize particles depending on variant
    const initParticles = () => {
      particles = [];
      if (width <= 0 || height <= 0) return;

      if (variant === 'ambient') {
        // Base count scaled to screen area with mobile cap
        const area = width * height;
        const maxCap = isMobileScreen ? (density === 'subtle' ? 12 : 20) : 55;
        const targetCount = Math.min(
          maxCap,
          Math.max(8, Math.floor((area / 16000) * countMultiplier * (isMobileScreen ? 0.45 : 1.0)))
        );

        for (let i = 0; i < targetCount; i++) {
          const isOrb = !templateTheme ? Math.random() < 0.12 : false;
          let shapeType: Particle['shapeType'] = 'orb';
          let vy = -(0.2 + Math.random() * 0.4);
          let radius = 1.2 + Math.random() * 2.2;
          const rotation = Math.random() * Math.PI * 2;
          const rotSpeed = (Math.random() - 0.5) * 0.03;

          if (templateTheme === 'rajwada') {
            const rand = Math.random();
            if (rand < 0.3) {
              shapeType = 'rose';
              radius = 5 + Math.random() * 5;
              vy = 0.35 + Math.random() * 0.45; // gently falling rose petals
            } else if (rand < 0.6) {
              shapeType = 'marigold';
              radius = 5 + Math.random() * 4.5;
              vy = 0.3 + Math.random() * 0.4; // falling marigolds
            } else {
              shapeType = 'orb';
              radius = 1.5 + Math.random() * 2.5;
              vy = -(0.15 + Math.random() * 0.3); // golden motes rise
            }
          } else if (templateTheme === 'shwet') {
            const rand = Math.random();
            if (rand < 0.4) {
              shapeType = 'jasmine';
              radius = 6 + Math.random() * 5;
              vy = 0.2 + Math.random() * 0.3; // gentle jasmine blossom descent
            } else {
              shapeType = 'orb';
              radius = 1.2 + Math.random() * 2.0;
              vy = -(0.1 + Math.random() * 0.25);
            }
          } else if (templateTheme === 'sukoon') {
            const rand = Math.random();
            if (rand < 0.38) {
              shapeType = 'lotus';
              radius = 6 + Math.random() * 5;
              vy = 0.22 + Math.random() * 0.35; // gentle lotus petal drift
            } else if (rand < 0.6) {
              shapeType = 'dewdrop';
              radius = 2.5 + Math.random() * 3.5;
              vy = 0.15 + Math.random() * 0.25;
            } else {
              shapeType = 'orb';
              radius = 1.2 + Math.random() * 2.0;
              vy = -(0.15 + Math.random() * 0.25);
            }
          } else if (templateTheme === 'divya') {
            const rand = Math.random();
            if (rand < 0.45) {
              shapeType = 'star';
              radius = 3.5 + Math.random() * 4.5;
              vy = -(0.08 + Math.random() * 0.2); // celestial drift
            } else {
              shapeType = 'orb';
              radius = 1.2 + Math.random() * 2.5;
              vy = -(0.15 + Math.random() * 0.35);
            }
          } else if (templateTheme === 'aura') {
            // Gen Z Aesthetic: Floating soft sakura cherry blossom petals & pastel champagne sparkles
            const rand = Math.random();
            if (rand < 0.4) {
              shapeType = 'sakura';
              radius = 5 + Math.random() * 4.5;
              vy = 0.25 + Math.random() * 0.35; // gentle falling aesthetic petals
            } else {
              shapeType = 'orb';
              radius = 1.2 + Math.random() * 2.0;
              vy = -(0.12 + Math.random() * 0.28); // rising champagne sparkles
            }
          } else if (templateTheme === 'param') {
            // Mid-Age Sophisticated: Rich warm amber bronze luxury embers & tailored gold motes
            const rand = Math.random();
            if (rand < 0.35) {
              shapeType = 'amberMote';
              radius = 2.5 + Math.random() * 3.5;
              vy = -(0.15 + Math.random() * 0.3); // drifting warm embers
            } else {
              shapeType = 'orb';
              radius = 1.0 + Math.random() * 2.2;
              vy = -(0.1 + Math.random() * 0.25);
            }
          } else if (templateTheme === 'mangalam') {
            // Elders Traditional: Auspicious saffron marigold petals, holy akshat grains & chandan embers
            const rand = Math.random();
            if (rand < 0.35) {
              shapeType = 'marigold';
              radius = 5 + Math.random() * 4.5;
              vy = 0.3 + Math.random() * 0.4;
            } else if (rand < 0.6) {
              shapeType = 'akshat';
              radius = 3 + Math.random() * 3;
              vy = 0.35 + Math.random() * 0.35; // gently showering holy akshat rice grains
            } else {
              shapeType = 'orb';
              radius = 1.2 + Math.random() * 2.2;
              vy = -(0.15 + Math.random() * 0.3);
            }
          }

          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy,
            radius,
            baseAlpha: shapeType === 'orb' ? (isOrb ? 0.08 + Math.random() * 0.08 : 0.25 + Math.random() * 0.45) : 0.65 + Math.random() * 0.3,
            alpha: 0,
            pulseSpeed: 0.015 + Math.random() * 0.02,
            pulsePhase: Math.random() * Math.PI * 2,
            color: palette.core,
            glowColor: palette.glow,
            isLargeOrb: isOrb,
            shapeType,
            rotation,
            rotSpeed,
          });
        }
      } else {
        // 'aura' variant: Radiating halo particles around center
        const targetCount = Math.floor(28 * countMultiplier);
        const centerX = width / 2;
        const centerY = height / 2;

        for (let i = 0; i < targetCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 10 + Math.random() * 45;
          const maxLife = 120 + Math.random() * 100;
          particles.push({
            x: centerX + Math.cos(angle) * dist,
            y: centerY + Math.sin(angle) * dist,
            vx: Math.cos(angle) * (0.15 + Math.random() * 0.25),
            vy: Math.sin(angle) * (0.15 + Math.random() * 0.25) - 0.2, // slight upward bias
            radius: 1.2 + Math.random() * 2.0,
            baseAlpha: 0.35 + Math.random() * 0.45,
            alpha: 0,
            pulseSpeed: 0.03 + Math.random() * 0.02,
            pulsePhase: Math.random() * Math.PI * 2,
            color: palette.core,
            glowColor: palette.glow,
            angle,
            speed: 0.2 + Math.random() * 0.3,
            life: Math.random() * maxLife,
            maxLife,
          });
        }
      }
    };

    // Resize handler using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && (newW !== width || newH !== height)) {
          width = Math.floor(newW);
          height = Math.floor(newH);
          dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);

          initParticles();
        }
      }
    });

    resizeObserver.observe(container);

    // Initial size trigger
    const initialRect = container.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
      width = Math.floor(initialRect.width);
      height = Math.floor(initialRect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    }

    // Aura breathing variables
    let auraPhase = 0;

    // Render loop
    const render = (time: number) => {
      if (isDisposed) return;

      if (!isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (prefersReducedMotion) {
        // Draw elegant static glow without active particle translation
        if (variant === 'aura') {
          const centerX = width / 2;
          const centerY = height / 2;
          const maxRadius = Math.min(width, height) * 0.45;
          const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius);
          grad.addColorStop(0, `${palette.aura}0.25)`);
          grad.addColorStop(0.5, `${palette.glow}0.10)`);
          grad.addColorStop(1, `${palette.aura}0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        return;
      }

      auraPhase += 0.015;

      // 1. Draw central breathing aura for 'aura' variant
      if (variant === 'aura') {
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * 0.38;

        // Outer soft breathing halo
        const breathingFactor1 = Math.sin(auraPhase) * 0.08 + 1;
        const radius1 = baseRadius * breathingFactor1;
        const auraAlpha1 = 0.16 + Math.sin(auraPhase) * 0.05;

        const grad1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius1);
        grad1.addColorStop(0, `${palette.aura}${auraAlpha1 * 1.5})`);
        grad1.addColorStop(0.45, `${palette.glow}${auraAlpha1 * 0.8})`);
        grad1.addColorStop(0.85, `${palette.primary}${auraAlpha1 * 0.25})`);
        grad1.addColorStop(1, `${palette.aura}0)`);

        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius1, 0, Math.PI * 2);
        ctx.fill();

        // Inner radiant divine core (Bhamandala golden ring)
        const breathingFactor2 = Math.cos(auraPhase * 0.8) * 0.05 + 1;
        const radius2 = baseRadius * 0.55 * breathingFactor2;
        const grad2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius2);
        grad2.addColorStop(0, `${palette.core}0.30)`);
        grad2.addColorStop(0.6, `${palette.glow}0.18)`);
        grad2.addColorStop(1, `${palette.glow}0)`);

        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius2, 0, Math.PI * 2);
        ctx.fill();

        // Delicate concentric golden aura rings
        ctx.strokeStyle = `${palette.primary}0.12)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius2 * 0.85, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `${palette.primary}0.07)`;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius1 * 0.9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Update and draw particles
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (variant === 'ambient') {
          // Ambient mode: gentle vertical drift with horizontal sine-wave sway
          p.pulsePhase += p.pulseSpeed;
          p.alpha = Math.max(
            0.02,
            p.baseAlpha + Math.sin(p.pulsePhase) * (p.baseAlpha * 0.5)
          );

          p.y += p.vy;
          p.x += p.vx + Math.sin(time * 0.0008 + p.pulsePhase) * 0.15;

          // Interactive soft deflection
          if (interactive && mousePos.x > 0) {
            const dx = p.x - mousePos.x;
            const dy = p.y - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80 && dist > 0) {
              const force = (80 - dist) / 80;
              p.x += (dx / dist) * force * 0.6;
              p.y += (dy / dist) * force * 0.6;
            }
          }

          // Wrap around edges smoothly
          if (p.vy > 0) {
            // Falling particle (e.g. petals/blossoms)
            if (p.y > height + 20) {
              p.y = -15;
              p.x = Math.random() * width;
            }
          } else {
            // Rising particle
            if (p.y < -20) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
          }
          if (p.x < -20) p.x = width + 10;
          if (p.x > width + 20) p.x = -10;

          // Update particle rotation if applicable
          if (p.rotation !== undefined && p.rotSpeed !== undefined) {
            p.rotation += p.rotSpeed;
          }

          // Drawing particle based on shapeType
          if (p.shapeType === 'rose') {
            drawRosePetal(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'marigold') {
            drawMarigoldPetal(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'jasmine') {
            drawJasmineBlossom(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'lotus') {
            drawLotusPetal(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'star') {
            drawCelestialStar(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'dewdrop') {
            drawDewdrop(ctx, p.x, p.y, p.radius, p.alpha);
          } else if (p.shapeType === 'sakura') {
            drawSakuraPetal(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'amberMote') {
            drawAmberMote(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.shapeType === 'akshat') {
            drawAkshatGrain(ctx, p.x, p.y, p.radius, p.rotation || 0, p.alpha);
          } else if (p.isLargeOrb) {
            // Soft large breathing orb
            ctx.beginPath();
            const orbGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            orbGrad.addColorStop(0, `${p.color}${p.alpha})`);
            orbGrad.addColorStop(0.5, `${p.glowColor}${p.alpha * 0.5})`);
            orbGrad.addColorStop(1, `${p.glowColor}0)`);
            ctx.fillStyle = orbGrad;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Tiny crisp golden mote with subtle halo
            ctx.beginPath();
            const moteGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
            moteGrad.addColorStop(0, `${p.color}${p.alpha})`);
            moteGrad.addColorStop(0.4, `${p.glowColor}${p.alpha * 0.7})`);
            moteGrad.addColorStop(1, `${p.glowColor}0)`);
            ctx.fillStyle = moteGrad;
            ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // 'aura' mode: particles radiate gently outward and upward from center
          p.life = (p.life || 0) + 1;
          const maxLife = p.maxLife || 150;

          if (p.life > maxLife) {
            // Respawn near center
            p.life = 0;
            const angle = Math.random() * Math.PI * 2;
            const dist = 5 + Math.random() * 30;
            p.x = centerX + Math.cos(angle) * dist;
            p.y = centerY + Math.sin(angle) * dist;
            p.vx = Math.cos(angle) * (0.12 + Math.random() * 0.2);
            p.vy = Math.sin(angle) * (0.12 + Math.random() * 0.2) - 0.25; // upward floating
            p.radius = 1.0 + Math.random() * 2.0;
            p.baseAlpha = 0.35 + Math.random() * 0.45;
          } else {
            p.x += p.vx;
            p.y += p.vy;
          }

          // Smooth fade in and fade out envelope
          const progress = p.life / maxLife;
          const lifeAlpha =
            progress < 0.2
              ? progress / 0.2
              : progress > 0.7
              ? (1 - progress) / 0.3
              : 1;

          p.pulsePhase += p.pulseSpeed;
          p.alpha = Math.max(0, p.baseAlpha * lifeAlpha * (0.7 + Math.sin(p.pulsePhase) * 0.3));

          // Draw aura particle
          ctx.beginPath();
          const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.2);
          pGrad.addColorStop(0, `${p.color}${p.alpha})`);
          pGrad.addColorStop(0.5, `${p.glowColor}${p.alpha * 0.6})`);
          pGrad.addColorStop(1, `${p.glowColor}0)`);
          ctx.fillStyle = pGrad;
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  }, [variant, density, colorScheme, interactive]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden transform-gpu ${className}`}
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
