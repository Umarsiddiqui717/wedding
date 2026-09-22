import React, { useState } from 'react';
import { ScratchRevealSeal } from './ScratchRevealSeal';
import { TopLeftFloral, BottomRightFloral } from './FloralCorner';
import { Sparkles } from 'lucide-react';

interface GatefoldEnvelopeProps {
  onOpenComplete: () => void;
}

export const GatefoldEnvelope: React.FC<GatefoldEnvelopeProps> = ({ onOpenComplete }) => {
  const [isOpenAnimationStarted, setIsOpenAnimationStarted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealComplete = () => {
    setIsRevealed(true);
    // Give a brief moment for the user to admire the revealed gold seal
    setTimeout(() => {
      setIsOpenAnimationStarted(true);
      // Wait for 3D doors to finish unfolding then trigger completion
      setTimeout(() => {
        onOpenComplete();
      }, 1100);
    }, 850);
  };

  return (
    <div
      id="gatefold-envelope-wrapper"
      className="relative w-full max-w-[420px] mx-auto min-h-[580px] sm:min-h-[620px] flex items-center justify-center p-3"
      style={{ perspective: '1400px' }}
    >
      {/* 
        Background shadow under the envelope
      */}
      <div
        className={`absolute inset-4 rounded-xl transition-all duration-1000 ${
          isOpenAnimationStarted
            ? 'opacity-30 scale-105 blur-xl bg-[#0f4444]/20'
            : 'opacity-70 blur-lg bg-[#0f4444]/15'
        }`}
      />

      {/* 
        The Physical Card Shell (Outer White / Ivory Gatefold with Damask Texture)
        Matching wedding 2.jpeg
      */}
      <div
        id="gatefold-card"
        className="relative w-full h-[560px] sm:h-[600px] bg-[#fdfbf7] rounded-lg border-2 border-[#e6dccb] overflow-hidden shadow-2xl flex"
        style={{
          boxShadow: '0 25px 50px -12px rgba(17, 75, 75, 0.2), inset 0 0 20px rgba(196, 154, 69, 0.1)',
        }}
      >
        {/* Fine double border inlay around the whole card */}
        <div className="absolute inset-2 border border-[#c49a45]/40 rounded pointer-events-none z-10" />
        <div className="absolute inset-3 border border-[#114b4b]/20 rounded pointer-events-none z-10" />

        {/* 
          LEFT GATEFOLD DOOR 
        */}
        <div
          id="gatefold-door-left"
          className="relative w-1/2 h-full z-20 overflow-hidden bg-[#faf8f4] border-r border-[#d4af37]/40 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transformOrigin: 'left center',
            transform: isOpenAnimationStarted ? 'rotateY(-110deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle Pale Blue/Ivory Damask Wallpaper Texture (wedding 2.jpeg) */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#114b4b 0.75px, transparent 0.75px), radial-gradient(#d4af37 0.75px, #faf8f4 0.75px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
            }}
          />

          {/* Top-Left Floral Bouquet */}
          <div className="absolute -top-3 -left-3 w-40 h-40 pointer-events-none z-10">
            <TopLeftFloral className="w-full h-full" />
          </div>

          {/* Bottom Left delicate corner line flourish */}
          <div className="absolute bottom-4 left-4 pointer-events-none opacity-60">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M4 36 L4 12 Q4 4 12 4 L36 4" stroke="#c49a45" strokeWidth="1" />
              <circle cx="4" cy="36" r="2" fill="#114b4b" />
              <circle cx="36" cy="4" r="2" fill="#114b4b" />
            </svg>
          </div>

          {/* Realistic Paper Emboss Gradient Edge */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* 
          RIGHT GATEFOLD DOOR 
        */}
        <div
          id="gatefold-door-right"
          className="relative w-1/2 h-full z-20 overflow-hidden bg-[#faf8f4] border-l border-[#d4af37]/40 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transformOrigin: 'right center',
            transform: isOpenAnimationStarted ? 'rotateY(110deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Matching Damask Texture */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#114b4b 0.75px, transparent 0.75px), radial-gradient(#d4af37 0.75px, #faf8f4 0.75px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
            }}
          />

          {/* Bottom-Right Floral Bouquet */}
          <div className="absolute -bottom-3 -right-3 w-40 h-40 pointer-events-none z-10">
            <BottomRightFloral className="w-full h-full" />
          </div>

          {/* Top Right delicate corner flourish */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-60">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M36 4 L36 28 Q36 36 28 36 L4 36" stroke="#c49a45" strokeWidth="1" />
              <circle cx="36" cy="4" r="2" fill="#114b4b" />
              <circle cx="4" cy="36" r="2" fill="#114b4b" />
            </svg>
          </div>

          {/* Realistic Paper Emboss Gradient Edge */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* 
          CENTER SCRATCH SEAL & GOLD PLAQUE
          Bridging the two doors right in the center!
        */}
        <div
          id="center-seal-wrapper"
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-auto transition-all duration-700 ${
            isOpenAnimationStarted ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Scratch to Reveal Interactive Seal */}
          <ScratchRevealSeal onRevealComplete={handleRevealComplete} disabled={isOpenAnimationStarted} />

          {/* 
            Gold Embossed Name Plaque from wedding 2.jpeg:
            "SALEHA, WEDS OWESH" with intricate filigree scrolls
          */}
          <div className="mt-7 flex flex-col items-center">
            {/* Top gold filigree flourish */}
            <svg width="170" height="12" viewBox="0 0 170 12" fill="none" className="opacity-90">
              <path
                d="M10 6 C40 0 60 12 85 6 C110 0 130 12 160 6"
                stroke="#c49a45"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="85" cy="6" r="2.5" fill="#d4af37" />
              <circle cx="45" cy="4" r="1.5" fill="#aa7e22" />
              <circle cx="125" cy="4" r="1.5" fill="#aa7e22" />
            </svg>

            {/* Raised Gold Plaque */}
            <div
              className="mt-1 px-5 py-1.5 rounded bg-gradient-to-r from-[#d4af37] via-[#fbf1cc] to-[#aa7e22] border border-[#a0741c] shadow-md flex items-center justify-center relative overflow-hidden"
              style={{
                boxShadow: '0 4px 10px rgba(17, 75, 75, 0.25), inset 0 1px 1px rgba(255,255,255,0.8)',
              }}
            >
              {/* Shimmer line across plaque */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-pulse pointer-events-none" />
              <span className="font-serif-lux text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0e4343] uppercase text-shadow-sm whitespace-nowrap">
                SALEHA, WEDS OWESH
              </span>
            </div>

            {/* Bottom gold filigree flourish */}
            <svg width="170" height="12" viewBox="0 0 170 12" fill="none" className="opacity-90 mt-1 rotate-180">
              <path
                d="M10 6 C40 0 60 12 85 6 C110 0 130 12 160 6"
                stroke="#c49a45"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="85" cy="6" r="2.5" fill="#d4af37" />
            </svg>
          </div>
        </div>

        {/* 
          PEEK PREVIEW OF INTERIOR CARD (BEHIND DOORS)
          Visible as the doors rotate open
        */}
        <div
          id="interior-peek-preview"
          className={`absolute inset-0 bg-[#fdfcf9] flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${
            isOpenAnimationStarted ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
          }`}
        >
          <div className="font-serif-lux italic text-sm text-[#0e4343]/80">
            In the name of &quot;ALLAH&quot;
          </div>
          <div className="font-script text-4xl text-[#0e4343] mt-2">
            Saleha & Owesh
          </div>
          <div className="text-xs font-display tracking-widest text-[#aa7e22] mt-1">
            Friday, 20th November 2026
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#114b4b] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Opening your invitation...
          </div>
        </div>
      </div>
    </div>
  );
};
