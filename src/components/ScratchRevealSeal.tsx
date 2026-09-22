import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Hand } from 'lucide-react';

interface ScratchRevealSealProps {
  onRevealComplete: () => void;
  disabled?: boolean;
}

export const ScratchRevealSeal: React.FC<ScratchRevealSealProps> = ({
  onRevealComplete,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(false);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef<number>(0);

  // Initialize Canvas with Ivory & Gold Shimmer Scratch Surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // 1. Base Ivory / Pale Pearl Satin Coat
    const grad = ctx.createRadialGradient(
      width * 0.45,
      height * 0.45,
      10,
      width * 0.5,
      height * 0.5,
      width * 0.5
    );
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, '#fbf8f2');
    grad.addColorStop(0.7, '#f4ece1');
    grad.addColorStop(0.9, '#e8dcce');
    grad.addColorStop(1, '#dfcebd');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // 2. Subtle Paper / Linen Texture Specks
    ctx.fillStyle = 'rgba(196, 154, 69, 0.08)';
    for (let i = 0; i < 400; i++) {
      const rx = (Math.random() - 0.5) * (width - 20) + width / 2;
      const ry = (Math.random() - 0.5) * (height - 20) + height / 2;
      const dist = Math.hypot(rx - width / 2, ry - height / 2);
      if (dist < width / 2 - 10) {
        ctx.fillRect(rx, ry, 1.5, 1.5);
      }
    }

    // 3. Ornate Outer Gold Foil Rim on Scratch Cover
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aa7e22';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 8, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Inner Ring with Beaded Dots
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(17, 75, 75, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Islamic Star / Monogram Shimmer on the Scratch Surface
    ctx.save();
    ctx.translate(width / 2, height / 2 - 14);
    // Draw 8-point star emblem
    ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(5, -6);
      ctx.lineTo(0, 0);
      ctx.lineTo(-5, -6);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 6. "Scratch to Reveal" Lettering in Deep Teal & Gold
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = '600 11px "Cinzel", serif';
    ctx.fillStyle = '#aa7e22';
    ctx.fillText('• TAP OR RUB •', width / 2, height / 2 + 10);

    ctx.font = '700 14px "Cinzel", serif';
    ctx.fillStyle = '#0e4343';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 + 28);

    ctx.font = 'italic 12px "Cormorant Garamond", serif';
    ctx.fillStyle = '#4a7c7c';
    ctx.fillText('Nikah Mubarak', width / 2, height / 2 + 45);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Pixel calculation to estimate scratched percentage
  const calculateScratchedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 0;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let transparentCount = 0;
    let totalCirclePixels = 0;
    const radius = width / 2 - 6;
    const radiusSq = radius * radius;
    const cx = width / 2;
    const cy = height / 2;

    // Sample every 4th pixel for speed & high 60fps performance
    const step = 4;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= radiusSq) {
          totalCirclePixels++;
          const alphaIndex = (y * width + x) * 4 + 3;
          if (data[alphaIndex] < 80) {
            transparentCount++;
          }
        }
      }
    }

    return totalCirclePixels > 0 ? (transparentCount / totalCirclePixels) * 100 : 0;
  }, []);

  // Scratch action
  const scratchAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!hasStartedScratching) {
        setHasStartedScratching(true);
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 38; // generous brush for tactile mobile scraping
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (lastPosRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, 19, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPosRef.current = { x, y };

      // Check percentage throttled to every 120ms
      const now = Date.now();
      if (now - lastCheckTimeRef.current > 120) {
        lastCheckTimeRef.current = now;
        const pct = calculateScratchedPercentage();
        setPercentScratched(pct);

        if (pct >= 55 && !hasTriggeredComplete) {
          triggerComplete();
        }
      }
    },
    [calculateScratchedPercentage, hasStartedScratching, hasTriggeredComplete]
  );

  const triggerComplete = useCallback(() => {
    if (hasTriggeredComplete) return;
    setHasTriggeredComplete(true);
    setPercentScratched(100);

    // Animate canvas fade out
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'opacity 0.65s ease-out, transform 0.65s ease-out';
      canvas.style.opacity = '0';
      canvas.style.transform = 'scale(1.08)';
    }

    setTimeout(() => {
      onRevealComplete();
    }, 550);
  }, [hasTriggeredComplete, onRevealComplete]);

  // Coordinates helper
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled || hasTriggeredComplete) return;
    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    scratchAt(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled || hasTriggeredComplete) return;
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    scratchAt(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  // Touch Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled || hasTriggeredComplete || e.touches.length === 0) return;
    setIsDrawing(true);
    const touch = e.touches[0];
    const { x, y } = getCanvasCoords(touch.clientX, touch.clientY);
    scratchAt(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled || hasTriggeredComplete || e.touches.length === 0) return;
    // Prevent mobile page dragging during scratching
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getCanvasCoords(touch.clientX, touch.clientY);
    scratchAt(x, y);
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      id="scratch-seal-container"
      className="relative flex flex-col items-center justify-center select-none"
    >
      {/* 
        The Underlying Layer: Ornate Baroque Oval Medallion 
        Matches the physical closed card in wedding 2.jpeg!
      */}
      <div
        id="underlying-revealed-seal"
        className="w-[190px] h-[190px] sm:w-[210px] sm:h-[210px] rounded-full p-2 relative flex items-center justify-center shadow-xl transition-transform duration-500"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, #faf6ee 65%, #ebdcc9 100%)',
          boxShadow: '0 12px 30px -5px rgba(17, 75, 75, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.35)',
        }}
      >
        {/* Scalloped Rococo Filigree Border (SVG) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="sealGoldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fdf3cb" />
                <stop offset="35%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#aa7e22" />
                <stop offset="100%" stopColor="#f3de8a" />
              </linearGradient>
            </defs>
            {/* Outer Scallop loops */}
            <circle cx="100" cy="100" r="94" stroke="url(#sealGoldGrad)" strokeWidth="2.5" fill="none" />
            <circle cx="100" cy="100" r="88" stroke="#114b4b" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx="100" cy="100" r="76" stroke="url(#sealGoldGrad)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Inner Content Revealed Underneath */}
        <div className="flex flex-col items-center justify-center text-center z-10 px-2">
          {/* Islamic Monogram / Bismillah in Embossed Gold */}
          <div className="relative mb-1">
            <svg
              viewBox="0 0 90 60"
              className="w-16 h-12 text-[#a87a1d] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              fill="currentColor"
            >
              {/* Ornate Arabic Calligraphy Monogram Motif */}
              <path d="M45 4 C38 4 33 9 32 16 C30 25 35 34 45 38 C55 34 60 25 58 16 C57 9 52 4 45 4 Z M45 10 C48 10 52 13 52 18 C52 23 48 29 45 32 C42 29 38 23 38 18 C38 13 42 10 45 10 Z" />
              <path d="M22 20 Q28 12 35 15 Q30 22 25 24 Z" />
              <path d="M68 20 Q62 12 55 15 Q60 22 65 24 Z" />
              <circle cx="45" cy="44" r="2.5" fill="#114b4b" />
            </svg>
          </div>

          {/* Couple Names Monogram */}
          <div className="font-script text-2xl sm:text-3xl text-[#0e4343] font-bold leading-none tracking-wide drop-shadow-sm">
            Saleha & Owesh
          </div>

          <div className="text-[10px] sm:text-[11px] font-display uppercase tracking-widest text-[#966f1e] font-semibold mt-1">
            Nikah Ceremony
          </div>

          <div className="text-[9px] font-serif-lux text-[#134e4e] tracking-wider mt-0.5">
            20 . 11 . 2026
          </div>
        </div>
      </div>

      {/* 
        Scratch Canvas Overlay (Covers the seal until rubbed)
      */}
      <canvas
        ref={canvasRef}
        id="scratch-canvas"
        width={210}
        height={210}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`absolute top-0 left-0 w-[190px] h-[190px] sm:w-[210px] sm:h-[210px] rounded-full cursor-pointer touch-none z-20 transition-all ${
          disabled ? 'pointer-events-none' : ''
        }`}
        style={{
          boxShadow: '0 10px 25px -4px rgba(17, 75, 75, 0.25)',
        }}
      />

      {/* 
        Interactive scratch guidance indicator (Pulsing hand / swipe animation)
      */}
      {!hasStartedScratching && !hasTriggeredComplete && (
        <div
          onClick={triggerComplete}
          className="absolute -bottom-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#d4af37]/60 shadow-md backdrop-blur-sm cursor-pointer z-30 transition-all hover:scale-105 active:scale-95 group"
        >
          <Hand className="w-3.5 h-3.5 text-[#aa7e22] animate-bounce" />
          <span className="text-[11px] font-display tracking-wider text-[#0e4343] font-semibold">
            Scratch or Tap to Reveal
          </span>
          <Sparkles className="w-3 h-3 text-[#d4af37] animate-pulse" />
        </div>
      )}

      {/* Percent Scratched progress (subtle feedback) */}
      {hasStartedScratching && !hasTriggeredComplete && (
        <div className="absolute -bottom-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#d4af37]/40 shadow-sm z-30">
          <div className="w-16 h-1.5 bg-[#e2d5c3] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#114b4b] transition-all duration-150"
              style={{ width: `${Math.min(100, Math.round(percentScratched * 1.8))}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-medium text-[#114b4b]">
            {Math.round(Math.min(100, percentScratched * 1.8))}%
          </span>
        </div>
      )}
    </div>
  );
};
