import React from 'react';

/**
 * High-fidelity floral bouquets inspired directly by the physical Nikah card
 * featuring soft pink English roses, sunny yellow blooms, dark teal foliage, and subtle gold stems.
 */

export const TopLeftFloral: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <defs>
      {/* Rose Pink Gradients */}
      <radialGradient id="tlRosePink" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#f7cbd4" />
        <stop offset="45%" stopColor="#e898aa" />
        <stop offset="85%" stopColor="#cf6d82" />
        <stop offset="100%" stopColor="#a34358" />
      </radialGradient>
      <radialGradient id="tlRoseCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9e344a" />
        <stop offset="60%" stopColor="#c75c73" />
        <stop offset="100%" stopColor="#f3bac7" />
      </radialGradient>

      {/* Yellow Blossom Gradients */}
      <radialGradient id="tlYellowBloom" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#fff3b0" />
        <stop offset="50%" stopColor="#f5ce42" />
        <stop offset="90%" stopColor="#d69b1e" />
        <stop offset="100%" stopColor="#9e6d0a" />
      </radialGradient>

      {/* Teal Leaf Gradients */}
      <linearGradient id="tlTealLeafDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2c7a7b" />
        <stop offset="60%" stopColor="#114b4b" />
        <stop offset="100%" stopColor="#082b2b" />
      </linearGradient>
      <linearGradient id="tlTealLeafLight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4fd1c5" />
        <stop offset="50%" stopColor="#287e7e" />
        <stop offset="100%" stopColor="#134e4e" />
      </linearGradient>

      {/* Gold Accents */}
      <linearGradient id="tlGoldBranch" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f9e79f" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#997314" />
      </linearGradient>
    </defs>

    {/* Gold tendrils and leaves spreading outward */}
    <g opacity="0.9">
      <path
        d="M20 20 Q70 45 110 30 T160 55 T200 95"
        stroke="url(#tlGoldBranch)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M25 40 Q55 85 85 125 T120 180"
        stroke="url(#tlGoldBranch)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small golden leaves */}
      <ellipse cx="120" cy="38" rx="8" ry="4" transform="rotate(-25 120 38)" fill="url(#tlGoldBranch)" opacity="0.8" />
      <ellipse cx="165" cy="62" rx="9" ry="4.5" transform="rotate(30 165 62)" fill="url(#tlGoldBranch)" opacity="0.8" />
      <ellipse cx="195" cy="100" rx="8" ry="4" transform="rotate(50 195 100)" fill="url(#tlGoldBranch)" opacity="0.8" />
      <ellipse cx="100" cy="145" rx="7" ry="4" transform="rotate(65 100 145)" fill="url(#tlGoldBranch)" opacity="0.8" />
      <ellipse cx="125" cy="182" rx="8" ry="4" transform="rotate(45 125 182)" fill="url(#tlGoldBranch)" opacity="0.8" />
      <circle cx="178" cy="72" r="3" fill="#d4af37" />
      <circle cx="206" cy="112" r="3.5" fill="#d4af37" />
      <circle cx="130" cy="195" r="3" fill="#d4af37" />
    </g>

    {/* Teal foliage clusters */}
    <g>
      {/* Top right leaves */}
      <path
        d="M60 25 C80 15 115 18 128 32 C118 48 85 45 60 25 Z"
        fill="url(#tlTealLeafDark)"
      />
      <path
        d="M65 27 C85 30 115 36 128 32"
        stroke="#5eead4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M90 28 C110 22 135 25 145 38 C135 50 110 46 90 28 Z"
        fill="url(#tlTealLeafLight)"
        opacity="0.9"
      />

      {/* Downward leaves */}
      <path
        d="M30 65 C22 90 26 125 42 140 C55 128 50 95 30 65 Z"
        fill="url(#tlTealLeafDark)"
      />
      <path
        d="M48 85 C42 110 48 140 65 152 C75 140 68 110 48 85 Z"
        fill="url(#tlTealLeafLight)"
        opacity="0.85"
      />
      <path
        d="M32 70 C30 95 35 125 42 140"
        stroke="#5eead4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>

    {/* Yellow Flower 1 (Upper) */}
    <g transform="translate(130, 75) rotate(-15)">
      {/* 8 Yellow Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M0 0 C-7 -14 -9 -28 0 -34 C9 -28 7 -14 0 0 Z"
          fill="url(#tlYellowBloom)"
          transform={`rotate(${angle})`}
          opacity="0.95"
        />
      ))}
      <circle cx="0" cy="0" r="8" fill="#8c5806" />
      <circle cx="0" cy="0" r="5" fill="#f5ce42" />
      <circle cx="1" cy="-1" r="2" fill="#fff" opacity="0.6" />
    </g>

    {/* Main Pink English Rose (Corner focal point) */}
    <g transform="translate(68, 62)">
      {/* Outer Petals */}
      <path d="M-38 -12 C-48 -35 -15 -52 10 -46 C32 -40 44 -20 38 5 C32 28 10 42 -14 38 C-36 34 -45 10 -38 -12 Z" fill="url(#tlRosePink)" opacity="0.65" />
      <path d="M-30 -28 C-10 -48 25 -42 35 -24 C45 -6 38 25 18 32 C-2 38 -30 25 -32 -2 Z" fill="url(#tlRosePink)" opacity="0.8" />
      {/* Mid Petals */}
      <path d="M-22 -20 C-5 -35 22 -30 26 -14 C30 2 20 22 5 24 C-10 26 -24 12 -22 -20 Z" fill="url(#tlRosePink)" />
      {/* Layered Cup Petals */}
      <path d="M-15 -12 C-2 -24 16 -20 18 -8 C20 4 12 16 0 16 C-12 16 -18 2 -15 -12 Z" fill="url(#tlRoseCenter)" />
      <path d="M-8 -6 C0 -14 10 -12 12 -4 C14 4 6 10 0 10 C-6 10 -10 2 -8 -6 Z" fill="#7a1f33" />
      <circle cx="0" cy="0" r="3.5" fill="#fce7ed" opacity="0.8" />
    </g>

    {/* Small Yellow Accent Flower (Lower Left) */}
    <g transform="translate(62, 132) rotate(20) scale(0.75)">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={i}
          d="M0 0 C-6 -12 -7 -24 0 -30 C7 -24 6 -12 0 0 Z"
          fill="url(#tlYellowBloom)"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="6" fill="#8c5806" />
      <circle cx="0" cy="0" r="3.5" fill="#f5ce42" />
    </g>

    {/* Small Pink Rosebud */}
    <g transform="translate(165, 115) rotate(40) scale(0.6)">
      <path d="M-15 0 C-20 -20 0 -30 10 -25 C20 -20 20 -5 10 10 C0 20 -10 15 -15 0 Z" fill="url(#tlRosePink)" />
      <path d="M-6 -8 C0 -18 10 -14 8 -4 C6 4 -2 8 -6 -8 Z" fill="#9e344a" />
    </g>
  </svg>
);

export const BottomRightFloral: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rotate-180 ${className}`}>
    <TopLeftFloral />
  </div>
);

/**
 * Vintage Islamic Hanging Lanterns (Fanoos) with delicate chains and warm inner glow
 * matching the top-right corner of the inner card in `wedding.jpeg`
 */
export const HangingLanterns: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 150 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <defs>
      <linearGradient id="lanternTeal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1d6464" />
        <stop offset="50%" stopColor="#0e4343" />
        <stop offset="100%" stopColor="#082b2b" />
      </linearGradient>
      <linearGradient id="lanternGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fae69e" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8c6a12" />
      </linearGradient>
      <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff7d6" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Lantern 1 (Left - Shortest) */}
    <g transform="translate(32, 0)">
      {/* Beaded String */}
      <line x1="0" y1="0" x2="0" y2="40" stroke="#0e4343" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="0" cy="40" r="2.5" fill="url(#lanternGold)" />
      {/* Dome Top */}
      <path d="M-10 48 Q0 40 10 48 L8 53 L-8 53 Z" fill="url(#lanternTeal)" />
      <circle cx="0" cy="45" r="1.5" fill="url(#lanternGold)" />
      {/* Glass Body */}
      <rect x="-9" y="53" width="18" height="24" rx="2" fill="#faf8f2" stroke="#0e4343" strokeWidth="1.2" />
      <rect x="-9" y="53" width="18" height="24" fill="url(#candleGlow)" />
      {/* Inner Candle Flame */}
      <ellipse cx="0" cy="65" rx="2" ry="4" fill="#f59e0b" />
      <circle cx="0" cy="66" r="1.2" fill="#fff" />
      {/* Grille lines */}
      <line x1="-9" y1="65" x2="9" y2="65" stroke="#0e4343" strokeWidth="0.8" opacity="0.6" />
      <line x1="0" y1="53" x2="0" y2="77" stroke="#0e4343" strokeWidth="0.8" opacity="0.6" />
      {/* Base */}
      <path d="M-8 77 L8 77 L6 82 L-6 82 Z" fill="url(#lanternTeal)" />
      {/* Bottom finial tassel */}
      <polygon points="0,82 -3,87 3,87" fill="url(#lanternGold)" />
      <line x1="0" y1="87" x2="0" y2="92" stroke="#d4af37" strokeWidth="1" />
      <circle cx="0" cy="92" r="1.5" fill="#d4af37" />
    </g>

    {/* Lantern 2 (Center - Longest) */}
    <g transform="translate(80, 0)">
      <line x1="0" y1="0" x2="0" y2="65" stroke="#0e4343" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="0" cy="65" r="3" fill="url(#lanternGold)" />
      {/* Crescent finial */}
      <path d="M-2 60 Q0 57 2 60 Q0 59 -2 60" fill="#d4af37" />
      {/* Dome Top */}
      <path d="M-13 75 Q0 65 13 75 L11 81 L-11 81 Z" fill="url(#lanternTeal)" />
      <circle cx="0" cy="71" r="2" fill="url(#lanternGold)" />
      {/* Glass Body */}
      <rect x="-12" y="81" width="24" height="30" rx="3" fill="#faf8f2" stroke="#0e4343" strokeWidth="1.4" />
      <rect x="-12" y="81" width="24" height="30" fill="url(#candleGlow)" />
      {/* Candle */}
      <rect x="-2" y="99" width="4" height="8" rx="1" fill="#fdfbf7" stroke="#d4af37" strokeWidth="0.5" />
      <ellipse cx="0" cy="96" rx="2.5" ry="5" fill="#f59e0b" />
      <circle cx="0" cy="97" r="1.5" fill="#fff" />
      {/* Grille cross */}
      <line x1="-12" y1="96" x2="12" y2="96" stroke="#0e4343" strokeWidth="1" opacity="0.6" />
      <line x1="0" y1="81" x2="0" y2="111" stroke="#0e4343" strokeWidth="1" opacity="0.6" />
      {/* Base */}
      <path d="M-10 111 L10 111 L7 118 L-7 118 Z" fill="url(#lanternTeal)" />
      <polygon points="0,118 -3,124 3,124" fill="url(#lanternGold)" />
      <line x1="0" y1="124" x2="0" y2="132" stroke="#d4af37" strokeWidth="1.2" />
      <circle cx="0" cy="132" r="2" fill="#d4af37" />
    </g>

    {/* Lantern 3 (Right - Medium) */}
    <g transform="translate(125, 0)">
      <line x1="0" y1="0" x2="0" y2="28" stroke="#0e4343" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="0" cy="28" r="2.5" fill="url(#lanternGold)" />
      <path d="M-9 35 Q0 28 9 35 L7 40 L-7 40 Z" fill="url(#lanternTeal)" />
      <circle cx="0" cy="32" r="1.5" fill="url(#lanternGold)" />
      <rect x="-8" y="40" width="16" height="22" rx="2" fill="#faf8f2" stroke="#0e4343" strokeWidth="1.2" />
      <rect x="-8" y="40" width="16" height="22" fill="url(#candleGlow)" />
      <ellipse cx="0" cy="51" rx="1.8" ry="3.5" fill="#f59e0b" />
      <circle cx="0" cy="52" r="1" fill="#fff" />
      <line x1="-8" y1="51" x2="8" y2="51" stroke="#0e4343" strokeWidth="0.8" opacity="0.6" />
      <line x1="0" y1="40" x2="0" y2="62" stroke="#0e4343" strokeWidth="0.8" opacity="0.6" />
      <path d="M-7 62 L7 62 L5 67 L-5 67 Z" fill="url(#lanternTeal)" />
      <polygon points="0,67 -2.5,72 2.5,72" fill="url(#lanternGold)" />
      <line x1="0" y1="72" x2="0" y2="76" stroke="#d4af37" strokeWidth="1" />
      <circle cx="0" cy="76" r="1.5" fill="#d4af37" />
    </g>
  </svg>
);

/**
 * Delicate Rose Branch for the Names (flanking Saleha & Owesh)
 */
export const SideRoseMotif: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = '',
}) => (
  <svg
    viewBox="0 0 60 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${flip ? 'scale-x-[-1]' : ''} ${className}`}
  >
    {/* Rose Bloom in Teal Ink */}
    <g transform="translate(32, 28)">
      <path
        d="M-15 -6 C-20 -18 -8 -24 3 -20 C12 -17 18 -6 14 6 C10 16 0 20 -10 18 C-18 15 -20 4 -15 -6 Z"
        fill="#114b4b"
        opacity="0.85"
      />
      <path
        d="M-10 -12 C-2 -20 10 -16 12 -6 C14 4 8 12 0 12 C-8 12 -12 2 -10 -12 Z"
        fill="#0a3333"
      />
      <path
        d="M-6 -4 C0 -10 6 -8 6 -2 C6 4 2 6 -1 6 C-4 6 -6 2 -6 -4 Z"
        fill="#2dd4bf"
        opacity="0.6"
      />
    </g>
    {/* Curved Stem with leaves & flourishes */}
    <path
      d="M32 38 Q30 55 18 64 Q8 68 2 60"
      stroke="#114b4b"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M26 46 Q16 44 12 36 Q20 38 25 44"
      fill="#114b4b"
    />
    <path
      d="M22 55 Q12 58 8 66 Q16 63 21 56"
      fill="#0e4343"
    />
    {/* Gold accent dot */}
    <circle cx="16" cy="22" r="2" fill="#d4af37" />
    <circle cx="8" cy="62" r="1.5" fill="#d4af37" />
  </svg>
);

/**
 * Elegant Islamic Four-Petal Rosette used in the original card
 */
export const IslamicRosette: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 18,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <g transform="translate(12, 12)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M0 0 C-2 -4 -3 -7 0 -9 C3 -7 2 -4 0 0 Z"
          fill={i % 2 === 0 ? '#114b4b' : '#c49a45'}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="2.5" fill="#d4af37" />
      <circle cx="0" cy="0" r="1.2" fill="#082b2b" />
    </g>
  </svg>
);
