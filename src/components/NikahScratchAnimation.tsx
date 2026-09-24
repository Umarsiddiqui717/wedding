import React, { useEffect, useRef, useState, useCallback } from 'react';

interface NikahScratchAnimationProps {
  onRevealComplete?: () => void;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  size: number;
  opacity: number;
  life: number;
  rotation: number;
  vr: number;
}

interface BurstItem {
  id: number;
  char: string;
  color: string;
  tx: number;
  ty: number;
  rot: number;
  size: number;
  delay: number;
  xPercent: number;
  yPercent: number;
}

const CELEBRATION_ITEMS = [
  { char: '✦', color: '#f59e0b' },
  { char: '★', color: '#d97706' },
  { char: '✿', color: '#ec4899' },
  { char: '✨', color: '#fbbf24' },
  { char: '✧', color: '#fef08a' },
  { char: '♥', color: '#f43f5e' },
  { char: '✦', color: '#d4af37' },
  { char: '●', color: '#ffd700' },
  { char: '✨', color: '#ffffff' },
];

export const NikahScratchAnimation: React.FC<NikahScratchAnimationProps> = ({
  onRevealComplete,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const checkThrottleRef = useRef<number>(0);
  const isRevealedRef = useRef<boolean>(false);

  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBurst, setShowBurst] = useState(false);
  const [burstItems, setBurstItems] = useState<BurstItem[]>([]);

  // Draw the rich royal gold scratch foil with rounded corners & inscribed text
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width), 100);
    const height = Math.max(Math.floor(rect.height), 60);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // Rounded corners for foil
    const cornerRadius = Math.max(Math.min(width * 0.04, 16), 12);

    // 1. Shimmering Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fbf3de');
    grad.addColorStop(0.14, '#eecf87');
    grad.addColorStop(0.35, '#d4af37');
    grad.addColorStop(0.52, '#fff6db');
    grad.addColorStop(0.72, '#c59a2f');
    grad.addColorStop(0.88, '#e7c679');
    grad.addColorStop(1, '#f9f0d7');

    ctx.fillStyle = grad;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, width, height, cornerRadius);
    } else {
      ctx.rect(0, 0, width, height);
    }
    ctx.fill();

    // 2. Fine metallic glitter stippling
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
    for (let x = 0; x < width; x += 6) {
      for (let y = 0; y < height; y += 6) {
        if ((x * 3 + y * 7) % 19 === 0) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    }
    ctx.restore();

    // 3. Elegant Double Gold Rounded Border
    ctx.save();
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.75)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(3, 3, width - 6, height - 6, Math.max(cornerRadius - 2, 6));
    } else {
      ctx.rect(3, 3, width - 6, height - 6);
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(6, 6, width - 12, height - 12, Math.max(cornerRadius - 4, 4));
    } else {
      ctx.rect(6, 6, width - 12, height - 12);
    }
    ctx.stroke();
    ctx.restore();

    // 4. Inscribed Typography: "✦ BLESSED NIKAH DATE ✦" & "SCRATCH TO REVEAL"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const titleSize = Math.max(Math.min(width * 0.05, 17), 12);
    ctx.font = `700 ${titleSize}px 'Cinzel', 'Playfair Display', serif`;
    ctx.fillStyle = '#4c3204';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 1;
    ctx.fillText('✦ BLESSED NIKAH DATE ✦', width / 2, height / 2 - 12);

    const subSize = Math.max(Math.min(width * 0.038, 13), 10);
    ctx.font = `700 ${subSize}px 'Cinzel', 'Playfair Display', serif`;
    ctx.fillStyle = '#6b4707';
    ctx.shadowBlur = 2;
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 + 11);
    ctx.restore();
  }, []);

  // Spawn dynamic spark particles as user rubs with finger
  const emitSparks = useCallback((x: number, y: number, intensity = 1) => {
    const count = Math.floor(Math.random() * 2 * intensity) + 1;
    const newSparks: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const template = CELEBRATION_ITEMS[Math.floor(Math.random() * CELEBRATION_ITEMS.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 1.2;
      newSparks.push({
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        char: template.char,
        color: template.color,
        size: Math.random() * 8 + 10,
        opacity: 1,
        life: 1,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
      });
    }
    setParticles((prev) => [...prev.slice(-24), ...newSparks]);
  }, []);

  // Erase a circular dab at (x, y)
  const eraseDab = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, brushRadius: number) => {
    const grad = ctx.createRadialGradient(x, y, brushRadius * 0.35, x, y, brushRadius);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(0.75, 'rgba(0,0,0,0.95)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // Smooth continuous stroke between points
  const strokeScratch = useCallback(
    (x1: number, y1: number, x2: number, y2: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'destination-out';

      const dist = Math.hypot(x2 - x1, y2 - y1);
      const stepSize = 4;
      const steps = Math.max(Math.ceil(dist / stepSize), 1);
      const brushRadius = Math.max(Math.min((canvas.width / dpr) * 0.09, 32), 20);

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = x1 + (x2 - x1) * t;
        const cy = y1 + (y2 - y1) * t;
        eraseDab(ctx, cx, cy, brushRadius);
      }

      ctx.restore();
    },
    [eraseDab]
  );

  // Trigger celebration explosion and smooth reveal animation
  const triggerCelebration = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setShowBurst(true);

    if (navigator.vibrate) {
      try {
        navigator.vibrate([40, 50, 40]);
      } catch {
        // ignore
      }
    }

    // 36 Celebration burst items exploding in all directions
    const items: BurstItem[] = [];
    for (let i = 0; i < 36; i++) {
      const charObj = CELEBRATION_ITEMS[i % CELEBRATION_ITEMS.length];
      const angle = (i / 36) * (Math.PI * 2) + (Math.random() - 0.5) * 0.3;
      const dist = Math.random() * 95 + 40;
      items.push({
        id: i,
        char: charObj.char,
        color: charObj.color,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        rot: (Math.random() - 0.5) * 360,
        size: Math.random() * 10 + 13,
        delay: Math.random() * 0.18,
        xPercent: 50 + (Math.random() - 0.5) * 20,
        yPercent: 50 + (Math.random() - 0.5) * 20,
      });
    }
    setBurstItems(items);

    setTimeout(() => {
      setShowBurst(false);
    }, 2400);

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }, 850);

    if (onRevealComplete) {
      onRevealComplete();
    }
  }, [onRevealComplete]);

  // Check how much has been rubbed off
  const checkScratchPercentage = useCallback(
    (minThreshold = 30) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealedRef.current) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      try {
        // Stride sampling every 16th pixel for high-performance 60fps check
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        let transparentCount = 0;
        let totalSamples = 0;

        for (let i = 3; i < data.length; i += 4 * 16) {
          totalSamples++;
          if (data[i] < 128) {
            transparentCount++;
          }
        }

        const ratio = totalSamples > 0 ? transparentCount / totalSamples : 0;
        const percent = Math.floor(ratio * 100);

        if (percent >= minThreshold) {
          triggerCelebration();
        }
      } catch {
        // Fallback
      }
    },
    [triggerCelebration]
  );

  // Handle pointer down (finger touch or mouse click)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealedRef.current) return;
    isPointerDownRef.current = true;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lastPosRef.current = { x, y };
    strokeScratch(x, y, x, y);
    emitSparks(x, y, 2);
  };

  // Handle pointer move (rubbing with finger)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current || isRevealedRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const last = lastPosRef.current || { x, y };
    strokeScratch(last.x, last.y, x, y);
    lastPosRef.current = { x, y };

    emitSparks(x, y, 1);

    // Throttle percentage check every ~7 pointer move events
    checkThrottleRef.current++;
    if (checkThrottleRef.current % 7 === 0) {
      checkScratchPercentage(30);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    lastPosRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // Check with a slightly lower threshold on lift (24%) for effortless completion
    checkScratchPercentage(24);
  };

  // Dynamic flying spark physics particle loop
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            rotation: p.rotation + p.vr,
            opacity: p.opacity - 0.045,
            life: p.life - 0.045,
          }))
          .filter((p) => p.life > 0 && p.opacity > 0)
      );
    }, 24);
    return () => clearInterval(timer);
  }, [particles.length]);

  // Initial mount: Draw foil & handle window resize
  useEffect(() => {
    drawFoil();

    const handleResize = () => {
      if (!isRevealedRef.current) {
        drawFoil();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFoil]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${
        isRevealed ? 'pointer-events-none' : 'pointer-events-auto'
      } rounded-xl sm:rounded-2xl ${className}`}
      aria-label="Interactive Nikah date scratch card"
    >
      {/* 
        Canvas Foil Container:
        Rounded edges with subtle gold border before scratching, completely borderless when scratched
      */}
      <div
        className={`absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ${
          isRevealed
            ? 'border-0 border-transparent shadow-none pointer-events-none'
            : 'border border-amber-300/40 shadow-sm pointer-events-auto'
        }`}
      >
        {/* Shimmer sweep effect across the gold foil */}
        {!isRevealed && (
          <div className="absolute inset-0 pointer-events-none z-15 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 animate-[shimmer_3s_infinite]" />
        )}

        {/* 
          The Interactive Scratch Canvas:
          Touching and rubbing with fingers rubs away the foil cleanly!
        */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-800 ease-out rounded-xl sm:rounded-2xl ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Dynamic Flying Spark Particles from Finger Rubbing */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute pointer-events-none select-none z-20 font-bold"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            color: p.color,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            textShadow: '0 0 6px rgba(255,215,0,0.9)',
          }}
        >
          {p.char}
        </span>
      ))}

      {/* 
        REVEAL ANIMATION SUITE:
        1. Golden Shockwave Ring
        2. Golden Reveal Flash
        3. Celebratory Particle Burst
      */}
      {showBurst && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
          {/* Golden Shockwave Wave */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl animate-[golden-shockwave_1.4s_ease-out_forwards] border border-amber-300/80" />

          {/* Golden Reveal Flash across the uncovered date */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-300/25 via-yellow-100/40 to-amber-300/25 animate-[golden-reveal-flash_1.2s_ease-out_forwards]" />

          {/* Burst Particles expanding smoothly outward */}
          {burstItems.map((b) => (
            <span
              key={b.id}
              className="burst-particle"
              style={
                {
                  left: `${b.xPercent}%`,
                  top: `${b.yPercent}%`,
                  color: b.color,
                  fontSize: `${b.size}px`,
                  animationDelay: `${b.delay}s`,
                  textShadow: '0 0 8px rgba(255,215,0,0.95)',
                  '--tx': `${b.tx}px`,
                  '--ty': `${b.ty}px`,
                  '--rot': `${b.rot}deg`,
                } as React.CSSProperties
              }
            >
              {b.char}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
