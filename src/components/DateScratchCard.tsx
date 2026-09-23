import React, { useEffect, useRef, useState, useCallback } from 'react';

interface DateScratchCardProps {
  onRevealComplete?: () => void;
  children: React.ReactNode;
}

const CELEBRATION_PARTICLES = [
  { id: 1, char: '✦', color: '#f59e0b', tx: -115, ty: -75, r: 45, size: 16, delay: 0 },
  { id: 2, char: '★', color: '#d97706', tx: 125, ty: -85, r: -30, size: 18, delay: 0.04 },
  { id: 3, char: '✿', color: '#ec4899', tx: -85, ty: -115, r: 60, size: 15, delay: 0.02 },
  { id: 4, char: '✦', color: '#eab308', tx: 95, ty: -105, r: -45, size: 14, delay: 0.08 },
  { id: 5, char: '✨', color: '#fbbf24', tx: -145, ty: 10, r: 20, size: 18, delay: 0.03 },
  { id: 6, char: '✨', color: '#fbbf24', tx: 140, ty: 20, r: -25, size: 18, delay: 0.05 },
  { id: 7, char: '♥', color: '#f43f5e', tx: -105, ty: 85, r: 15, size: 14, delay: 0.09 },
  { id: 8, char: '✿', color: '#fb7185', tx: 110, ty: 90, r: -35, size: 15, delay: 0.04 },
  { id: 9, char: '✧', color: '#fef08a', tx: -55, ty: 125, r: 50, size: 16, delay: 0.06 },
  { id: 10, char: '✧', color: '#fef08a', tx: 60, ty: 130, r: -40, size: 16, delay: 0.08 },
  { id: 11, char: '✦', color: '#d4af37', tx: 0, ty: -135, r: 0, size: 20, delay: 0.01 },
  { id: 12, char: '✦', color: '#d4af37', tx: 0, ty: 135, r: 180, size: 17, delay: 0.07 },
  { id: 13, char: '●', color: '#fbbf24', tx: -130, ty: -35, r: 0, size: 9, delay: 0.03 },
  { id: 14, char: '●', color: '#f59e0b', tx: 135, ty: -45, r: 0, size: 9, delay: 0.05 },
  { id: 15, char: '●', color: '#e11d48', tx: -65, ty: -90, r: 0, size: 8, delay: 0.06 },
  { id: 16, char: '●', color: '#eab308', tx: 75, ty: -85, r: 0, size: 8, delay: 0.04 },
  { id: 17, char: '●', color: '#d4af37', tx: -115, ty: 55, r: 0, size: 9, delay: 0.08 },
  { id: 18, char: '●', color: '#f43f5e', tx: 120, ty: 65, r: 0, size: 8, delay: 0.07 },
  { id: 19, char: '✧', color: '#ffffff', tx: -35, ty: -120, r: 30, size: 14, delay: 0.02 },
  { id: 20, char: '✧', color: '#ffffff', tx: 40, ty: -120, r: -30, size: 14, delay: 0.03 },
  { id: 21, char: '✦', color: '#fbbf24', tx: -155, ty: -15, r: 70, size: 15, delay: 0.05 },
  { id: 22, char: '✦', color: '#fbbf24', tx: 155, ty: 10, r: -70, size: 15, delay: 0.05 },
];

export const DateScratchCard: React.FC<DateScratchCardProps> = ({
  onRevealComplete,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (isFullyRevealed) {
      setShowBurst(true);
      const timer = setTimeout(() => {
        setShowBurst(false);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [isFullyRevealed]);

  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef<number>(0);

  // Initialize Canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width) || 360;
    const height = Math.floor(rect.height) || 170;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // 1. Shimmering Gold & Pale Ivory Radial Gradient Overlay
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f9f6ed');
    grad.addColorStop(0.25, '#ecd9a7');
    grad.addColorStop(0.5, '#fef9e7');
    grad.addColorStop(0.75, '#dec388');
    grad.addColorStop(1, '#f7f2e4');

    ctx.fillStyle = grad;
    // Rounded rect
    const radius = 10;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, 0, width, height, radius) : ctx.rect(0, 0, width, height);
    ctx.fill();

    // 2. Delicate Gold Foil Double Border
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#c49a45';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(4, 4, width - 8, height - 8, radius - 2) : ctx.rect(4, 4, width - 8, height - 8);
    ctx.stroke();

    ctx.lineWidth = 0.75;
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(7, 7, width - 14, height - 14, radius - 4) : ctx.rect(7, 7, width - 14, height - 14);
    ctx.stroke();

    // 3. Subtle gold speckles / sparkles pattern
    ctx.fillStyle = 'rgba(166, 124, 30, 0.14)';
    for (let i = 0; i < 280; i++) {
      const rx = 10 + Math.random() * (width - 20);
      const ry = 10 + Math.random() * (height - 20);
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }

    // 4. Center Scratch Prompt & Islamic Star Motif
    const cx = width / 2;
    const cy = height / 2;

    // Small 8-point gold star
    ctx.save();
    ctx.translate(cx, cy - 14);
    ctx.fillStyle = '#b3882a';
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(0, -11);
      ctx.lineTo(3.5, -3.5);
      ctx.lineTo(0, 0);
      ctx.lineTo(-3.5, -3.5);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Text: "✦ BLESSED NIKAH DATE ✦" & "SCRATCH TO REVEAL"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = '600 11px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#7a5a14';
    ctx.letterSpacing = '0.15em';
    ctx.fillText('✦ BLESSED NIKAH DATE ✦', cx, cy + 8);

    ctx.font = 'bold 15px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#0e4343';
    ctx.fillText('SCRATCH TO REVEAL', cx, cy + 28);
  }, []);

  useEffect(() => {
    // Initial setup with requestAnimationFrame to ensure container has measured dimensions
    const t = requestAnimationFrame(() => {
      initCanvas();
    });
    return () => cancelAnimationFrame(t);
  }, [initCanvas]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!isFullyRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isFullyRevealed]);

  // Calculate percentage scratched
  const calculateScratchedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 0;

    const width = canvas.width;
    const height = canvas.height;
    // Sample step 4 for performance
    const step = 4;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let transparentCount = 0;
    let totalSamples = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        totalSamples++;
        const alphaIndex = (y * width + x) * 4 + 3;
        if (data[alphaIndex] < 60) {
          transparentCount++;
        }
      }
    }

    return totalSamples > 0 ? (transparentCount / totalSamples) * 100 : 0;
  }, []);

  const scratchAt = useCallback(
    (x: number, y: number) => {
      if (isFullyRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!hasUserStarted) {
        setHasUserStarted(true);
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 42; // tactile brush
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (lastPosRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, 21, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPosRef.current = { x, y };

      const now = Date.now();
      if (now - lastCheckTimeRef.current > 110) {
        lastCheckTimeRef.current = now;
        const pct = calculateScratchedPercentage();
        setPercentScratched(pct);

        if (pct >= 30 && !hasTriggeredComplete) {
          setHasTriggeredComplete(true);
          setIsFullyRevealed(true);
          if (onRevealComplete) onRevealComplete();
        }
      }
    },
    [calculateScratchedPercentage, hasTriggeredComplete, hasUserStarted, isFullyRevealed, onRevealComplete]
  );

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    if (coords) {
      lastPosRef.current = coords;
      scratchAt(coords.x, coords.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    if (coords) {
      scratchAt(coords.x, coords.y);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    if (coords) {
      lastPosRef.current = coords;
      scratchAt(coords.x, coords.y);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    if (coords) {
      scratchAt(coords.x, coords.y);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] mx-auto select-none rounded-xl my-2"
    >
      {/* 
        UNDERLYING REVEALED CONTENT (Date & Timings)
      */}
      <div
        className={`w-full relative transition-all duration-700 ${
          isFullyRevealed
            ? 'opacity-100 scale-100 date-revealed-active'
            : 'opacity-95'
        }`}
      >
        {children}
        {isFullyRevealed && <div className="date-highlight-sheen" aria-hidden="true" />}
      </div>

      {/* 
        CUTE CELEBRATION BURST EFFECT
      */}
      {showBurst && (
        <div
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-visible"
          aria-hidden="true"
        >
          {/* Radial shockwave & golden flash */}
          <div className="scratch-shockwave" />
          <div className="scratch-flash" />

          {/* Flying cute celebration particles (sparkles, stars, hearts, blossoms) */}
          {CELEBRATION_PARTICLES.map((p) => (
            <span
              key={p.id}
              className="burst-particle"
              style={{
                color: p.color,
                fontSize: `${p.size}px`,
                ['--tx' as string]: `${p.tx}px`,
                ['--ty' as string]: `${p.ty}px`,
                ['--rot' as string]: `${p.r}deg`,
                animationDelay: `${p.delay}s`,
              }}
            >
              {p.char}
            </span>
          ))}
        </div>
      )}

      {/* 
        SCRATCH CANVAS OVERLAY
      */}
      {!isFullyRevealed && (
        <>
          <div className="absolute inset-0 z-20 overflow-hidden rounded-xl shadow-md border border-[#d4af37]/40">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full h-full cursor-grab active:cursor-grabbing touch-none block"
              style={{
                touchAction: 'none',
              }}
              title="Rub or scratch to reveal Nikah date & timings"
            />
          </div>
        </>
      )}
    </div>
  );
};
