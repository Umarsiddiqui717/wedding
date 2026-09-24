import React from 'react';

/**
 * RoyalFloralSideGarland
 * Faithfully recreates the lush, multi-bloom vertical floral garlands from replace.jpeg
 * featuring:
 * - Dusty blush English roses
 * - Velvety deep burgundy/wine roses
 * - Soft ivory/cream tea roses
 * - Lavender/purple hydrangea clusters
 * - Coral/peach blossoms
 * - Metallic antique golden twigs, eucalyptus, and berries
 * - Emerald, olive, and sage foliage
 */

interface RoyalFloralSideGarlandProps {
  side?: 'left' | 'right';
  className?: string;
}

export const RoyalFloralSideGarland: React.FC<RoyalFloralSideGarlandProps> = ({
  side = 'left',
  className = '',
}) => {
  const isRight = side === 'right';
  const prefix = isRight ? 'rg_r_' : 'rg_l_';

  return (
    <div
      className={`royal-garland ${
        isRight ? 'royal-garland-right' : 'royal-garland-left'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 220 1100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* ==================== 1. Deep Burgundy / Wine Rose Gradients ==================== */}
          <radialGradient id={`${prefix}burgundyRose`} cx="42%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#cf3857" />
            <stop offset="35%" stopColor="#9e1834" />
            <stop offset="70%" stopColor="#69091e" />
            <stop offset="100%" stopColor="#3d030f" />
          </radialGradient>
          <radialGradient id={`${prefix}burgundyInner`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a0412" />
            <stop offset="60%" stopColor="#7a0e24" />
            <stop offset="100%" stopColor="#a82341" />
          </radialGradient>

          {/* ==================== 2. Dusty Blush Pink Rose Gradients ==================== */}
          <radialGradient id={`${prefix}dustyPinkRose`} cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#fce4ec" />
            <stop offset="30%" stopColor="#f8bbd0" />
            <stop offset="65%" stopColor="#e57393" />
            <stop offset="85%" stopColor="#c24367" />
            <stop offset="100%" stopColor="#962846" />
          </radialGradient>
          <radialGradient id={`${prefix}pinkInner`} cx="48%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#801b34" />
            <stop offset="50%" stopColor="#b33654" />
            <stop offset="85%" stopColor="#e37190" />
            <stop offset="100%" stopColor="#ffd4e0" />
          </radialGradient>

          {/* ==================== 3. Cream / Ivory Rose Gradients ==================== */}
          <radialGradient id={`${prefix}creamRose`} cx="45%" cy="42%" r="58%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fefaf0" />
            <stop offset="75%" stopColor="#faecd0" />
            <stop offset="90%" stopColor="#e4cd9f" />
            <stop offset="100%" stopColor="#bfa068" />
          </radialGradient>

          {/* ==================== 4. Purple / Lavender Hydrangea Gradients ==================== */}
          <radialGradient id={`${prefix}purplePetal`} cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#f1ebf9" />
            <stop offset="35%" stopColor="#d3bfe6" />
            <stop offset="70%" stopColor="#9b7ec2" />
            <stop offset="100%" stopColor="#674794" />
          </radialGradient>
          <radialGradient id={`${prefix}lavenderDeep`} cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#55347e" />
            <stop offset="50%" stopColor="#815ba8" />
            <stop offset="100%" stopColor="#bfa8de" />
          </radialGradient>

          {/* ==================== 5. Peach / Coral Blossom Gradients ==================== */}
          <radialGradient id={`${prefix}peachBlossom`} cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fff1e8" />
            <stop offset="40%" stopColor="#fed0bb" />
            <stop offset="75%" stopColor="#f59c7f" />
            <stop offset="100%" stopColor="#cf5d3a" />
          </radialGradient>

          {/* ==================== 6. Antique Gold Branches & Sprigs ==================== */}
          <linearGradient id={`${prefix}goldSprig`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff1b8" />
            <stop offset="40%" stopColor="#e5c05c" />
            <stop offset="75%" stopColor="#bfa136" />
            <stop offset="100%" stopColor="#7a6212" />
          </linearGradient>

          {/* ==================== 7. Foliage / Leaf Gradients ==================== */}
          <linearGradient id={`${prefix}leafDeep`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d6b4f" />
            <stop offset="50%" stopColor="#1e4530" />
            <stop offset="100%" stopColor="#0d2418" />
          </linearGradient>
          <linearGradient id={`${prefix}leafSage`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#78aa89" />
            <stop offset="60%" stopColor="#437757" />
            <stop offset="100%" stopColor="#254d34" />
          </linearGradient>
          <linearGradient id={`${prefix}leafOlive`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#627845" />
            <stop offset="60%" stopColor="#3f5427" />
            <stop offset="100%" stopColor="#233312" />
          </linearGradient>
        </defs>

        {/* 
          ========================================================================
          CONTINUOUS GOLDEN CONNECTING VINES & BRANCHES (Top to Bottom)
          ========================================================================
        */}
        <g opacity="0.88">
          {/* Main vertical vine curving in and out along the card border */}
          <path
            d="M20 0 Q65 140 30 260 T55 420 T25 610 T60 800 T30 980 L20 1100"
            stroke={`url(#${prefix}goldSprig)`}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M35 80 Q90 180 50 280 T80 470 T40 680 T75 880 T40 1080"
            stroke={`url(#${prefix}goldSprig)`}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Golden Berries and Leaflets scattered along the vine */}
          <circle cx="110" cy="95" r="4" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="132" cy="115" r="3.2" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="95" cy="140" r="3.5" fill={`url(#${prefix}goldSprig)`} />

          <circle cx="120" cy="340" r="4.2" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="145" cy="365" r="3.5" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="105" cy="495" r="4" fill={`url(#${prefix}goldSprig)`} />

          <circle cx="135" cy="670" r="3.8" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="150" cy="695" r="3.2" fill={`url(#${prefix}goldSprig)`} />

          <circle cx="125" cy="890" r="4.2" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="140" cy="920" r="3.5" fill={`url(#${prefix}goldSprig)`} />
          <circle cx="110" cy="1010" r="4" fill={`url(#${prefix}goldSprig)`} />

          {/* Golden Ruscus / Eucalyptus Leaflets */}
          <ellipse cx="85" cy="70" rx="9" ry="4" transform="rotate(-30 85 70)" fill={`url(#${prefix}goldSprig)`} />
          <ellipse cx="125" cy="180" rx="8" ry="4" transform="rotate(40 125 180)" fill={`url(#${prefix}goldSprig)`} />
          <ellipse cx="95" cy="315" rx="9" ry="4.5" transform="rotate(-25 95 315)" fill={`url(#${prefix}goldSprig)`} />
          <ellipse cx="135" cy="480" rx="9" ry="4.2" transform="rotate(35 135 480)" fill={`url(#${prefix}goldSprig)`} />
          <ellipse cx="105" cy="650" rx="8.5" ry="4" transform="rotate(-35 105 650)" fill={`url(#${prefix}goldSprig)`} />
          <ellipse cx="140" cy="840" rx="9" ry="4.5" transform="rotate(40 140 840)" fill={`url(#${prefix}goldSprig)`} />
          <ellipse cx="90" cy="960" rx="8" ry="4" transform="rotate(-20 90 960)" fill={`url(#${prefix}goldSprig)`} />
        </g>

        {/* 
          ========================================================================
          LUSH EMERALD, SAGE, AND OLIVE FOLIAGE CLUSTERS
          ========================================================================
        */}
        <g>
          {/* Top Leaves (level with top corner) */}
          <path d="M10 20 C45 0 95 10 115 35 C90 55 50 50 10 20 Z" fill={`url(#${prefix}leafDeep)`} />
          <path d="M40 30 C75 15 120 28 135 50 C110 70 70 65 40 30 Z" fill={`url(#${prefix}leafSage)`} />
          <path d="M5 85 C35 60 85 75 95 105 C70 125 30 115 5 85 Z" fill={`url(#${prefix}leafOlive)`} />

          {/* Upper Leaves (level with Bismillah & Host) */}
          <path d="M15 210 C45 185 90 200 100 230 C75 250 35 240 15 210 Z" fill={`url(#${prefix}leafSage)`} />
          <path d="M25 245 C60 225 110 240 125 270 C100 290 55 285 25 245 Z" fill={`url(#${prefix}leafDeep)`} />

          {/* Mid Leaves (level with Saleha & Owesh) */}
          <path d="M10 390 C45 365 95 380 110 410 C85 435 45 425 10 390 Z" fill={`url(#${prefix}leafDeep)`} />
          <path d="M30 430 C70 410 120 425 135 455 C110 480 65 470 30 430 Z" fill={`url(#${prefix}leafSage)`} />
          <path d="M15 520 C50 495 95 510 108 540 C85 565 45 555 15 520 Z" fill={`url(#${prefix}leafOlive)`} />

          {/* Lower Mid Leaves (level with In Sha Allah Nikah) */}
          <path d="M20 630 C55 605 105 620 120 650 C95 675 55 665 20 630 Z" fill={`url(#${prefix}leafDeep)`} />
          <path d="M10 710 C45 685 95 700 110 730 C85 755 45 745 10 710 Z" fill={`url(#${prefix}leafSage)`} />

          {/* Bottom Leaves (level with Scratch Card) */}
          <path d="M25 810 C65 785 115 800 130 830 C105 855 60 845 25 810 Z" fill={`url(#${prefix}leafDeep)`} />
          <path d="M15 870 C50 845 100 860 115 890 C90 915 50 905 15 870 Z" fill={`url(#${prefix}leafSage)`} />
          <path d="M20 980 C60 955 110 970 125 1000 C100 1025 55 1015 20 980 Z" fill={`url(#${prefix}leafDeep)`} />
        </g>

        {/* 
          ========================================================================
          SECTION 1: TOP FLORAL BURST (Dusty Pink Rose + Deep Burgundy Rose + Cream Rose)
          ========================================================================
        */}
        {/* Large Dusty Pink English Rose at Top Corner (x: 55, y: 70) */}
        <g transform="translate(55, 75)">
          {/* Outer Layer Petals */}
          <path d="M-45 -18 C-58 -45 -18 -68 15 -60 C42 -52 58 -26 50 8 C42 38 12 55 -18 50 C-46 45 -58 14 -45 -18 Z" fill={`url(#${prefix}dustyPinkRose)`} opacity="0.75" />
          <path d="M-38 -34 C-12 -60 32 -52 45 -28 C58 -5 48 34 22 42 C-5 50 -40 32 -42 -2 Z" fill={`url(#${prefix}dustyPinkRose)`} opacity="0.88" />
          {/* Mid Layer Petals */}
          <path d="M-28 -25 C-5 -45 28 -38 34 -18 C40 4 26 28 8 30 C-14 32 -32 15 -28 -25 Z" fill={`url(#${prefix}dustyPinkRose)`} />
          {/* Inner Cup & Core */}
          <path d="M-18 -15 C-2 -30 20 -25 24 -10 C28 6 16 20 0 20 C-15 20 -22 2 -18 -15 Z" fill={`url(#${prefix}pinkInner)`} />
          <path d="M-10 -8 C0 -18 12 -15 15 -5 C18 5 8 12 0 12 C-8 12 -12 2 -10 -8 Z" fill="#6d152a" />
          <circle cx="0" cy="0" r="4.5" fill="#fce4ec" opacity="0.85" />
        </g>

        {/* Velvety Deep Burgundy Rose (x: 28, y: 125) */}
        <g transform="translate(28, 130)">
          <path d="M-32 -12 C-42 -32 -12 -48 10 -42 C30 -36 40 -18 35 5 C30 26 8 38 -12 35 C-32 32 -40 10 -32 -12 Z" fill={`url(#${prefix}burgundyRose)`} opacity="0.85" />
          <path d="M-24 -22 C-5 -38 22 -32 28 -14 C34 4 22 24 6 26 C-12 28 -26 12 -24 -22 Z" fill={`url(#${prefix}burgundyRose)`} />
          <path d="M-15 -12 C-2 -24 16 -20 18 -6 C22 8 12 18 0 18 C-12 18 -18 2 -15 -12 Z" fill={`url(#${prefix}burgundyInner)`} />
          <path d="M-8 -6 C0 -14 10 -12 12 -3 C14 6 6 10 0 10 C-6 10 -10 2 -8 -6 Z" fill="#36030c" />
          <circle cx="0" cy="0" r="3.5" fill="#f8bbd0" opacity="0.75" />
        </g>

        {/* Ivory / Cream Blossom (x: 88, y: 125) */}
        <g transform="translate(88, 125) scale(0.78)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={i}
              d="M0 0 C-8 -15 -10 -30 0 -36 C10 -30 8 -15 0 0 Z"
              fill={`url(#${prefix}creamRose)`}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="8" fill="#d8be86" />
          <circle cx="0" cy="0" r="5" fill="#fefaf0" />
        </g>

        {/* 
          ========================================================================
          SECTION 2: UPPER-MID GARLAND (Level with Host: Muqeemuddin Siddiqui)
          ========================================================================
        */}
        {/* Soft Peach Blossom (x: 42, y: 225) */}
        <g transform="translate(42, 225) scale(0.7)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <path
              key={i}
              d="M0 0 C-9 -16 -12 -32 0 -38 C12 -32 9 -16 0 0 Z"
              fill={`url(#${prefix}peachBlossom)`}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="#cf5d3a" />
          <circle cx="0" cy="0" r="4" fill="#fed0bb" />
        </g>

        {/* Delicate Pink Rosebud (x: 25, y: 275) */}
        <g transform="translate(25, 275) rotate(25) scale(0.7)">
          <path d="M-18 0 C-24 -24 0 -36 12 -30 C24 -24 24 -6 12 12 C0 24 -12 18 -18 0 Z" fill={`url(#${prefix}dustyPinkRose)`} />
          <path d="M-8 -10 C0 -22 12 -18 10 -6 C8 6 -3 10 -8 -10 Z" fill="#801b34" />
        </g>

        {/* 
          ========================================================================
          SECTION 3: MID FLORAL CLUSTER (Flanking Saleha, Weds, Owesh)
          ========================================================================
        */}
        {/* Lavender / Purple Hydrangea Blossom Cluster (x: 58, y: 385) */}
        <g transform="translate(58, 385)">
          {/* Multi-petal Hydrangea florets grouped in a rich lilac mound */}
          {[
            { dx: -18, dy: -18, scale: 0.55 },
            { dx: 14, dy: -16, scale: 0.52 },
            { dx: -12, dy: 14, scale: 0.54 },
            { dx: 16, dy: 12, scale: 0.5 },
            { dx: 0, dy: 0, scale: 0.65 },
          ].map((floret, idx) => (
            <g key={idx} transform={`translate(${floret.dx}, ${floret.dy}) scale(${floret.scale})`}>
              {[0, 90, 180, 270].map((angle, k) => (
                <path
                  key={k}
                  d="M0 0 C-10 -16 -12 -28 0 -34 C12 -28 10 -16 0 0 Z"
                  fill={`url(#${prefix}purplePetal)`}
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="6" fill={`url(#${prefix}lavenderDeep)`} />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" opacity="0.9" />
            </g>
          ))}
        </g>

        {/* Rich Burgundy Rose (x: 28, y: 445) */}
        <g transform="translate(28, 445)">
          <path d="M-35 -14 C-46 -35 -14 -52 10 -46 C34 -40 44 -20 38 6 C32 28 8 42 -14 38 C-36 34 -44 12 -35 -14 Z" fill={`url(#${prefix}burgundyRose)`} opacity="0.88" />
          <path d="M-26 -24 C-6 -42 24 -35 30 -16 C36 4 24 26 6 28 C-14 30 -28 14 -26 -24 Z" fill={`url(#${prefix}burgundyRose)`} />
          <path d="M-16 -14 C-2 -26 18 -22 20 -7 C24 8 14 20 0 20 C-14 20 -20 2 -16 -14 Z" fill={`url(#${prefix}burgundyInner)`} />
          <circle cx="0" cy="0" r="4" fill="#fce4ec" opacity="0.8" />
        </g>

        {/* Cream Tea Rose beside Burgundy (x: 82, y: 475) */}
        <g transform="translate(82, 475) scale(0.85)">
          <path d="M-30 -12 C-40 -30 -10 -45 12 -38 C32 -32 40 -16 35 5 C30 24 8 36 -10 32 C-28 28 -36 8 -30 -12 Z" fill={`url(#${prefix}creamRose)`} opacity="0.85" />
          <path d="M-22 -20 C-4 -36 22 -30 26 -14 C32 4 20 24 4 26 C-12 28 -24 12 -22 -20 Z" fill={`url(#${prefix}creamRose)`} />
          <circle cx="0" cy="0" r="6" fill="#bfa068" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
        </g>

        {/* Dusty Pink Rosebud (x: 30, y: 535) */}
        <g transform="translate(30, 535) rotate(-15) scale(0.72)">
          <path d="M-18 0 C-24 -24 0 -36 12 -30 C24 -24 24 -6 12 12 C0 24 -12 18 -18 0 Z" fill={`url(#${prefix}dustyPinkRose)`} />
          <path d="M-8 -10 C0 -22 12 -18 10 -6 C8 6 -3 10 -8 -10 Z" fill="#801b34" />
          <circle cx="0" cy="0" r="3" fill="#fce4ec" />
        </g>

        {/* 
          ========================================================================
          SECTION 4: LOWER-MID GARLAND (Flanking In Sha Allah Nikah)
          ========================================================================
        */}
        {/* Coral / Peach Garden Flower (x: 52, y: 645) */}
        <g transform="translate(52, 645) scale(0.75)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={i}
              d="M0 0 C-8 -15 -10 -30 0 -36 C10 -30 8 -15 0 0 Z"
              fill={`url(#${prefix}peachBlossom)`}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="#cf5d3a" />
          <circle cx="0" cy="0" r="3.5" fill="#fff1e8" />
        </g>

        {/* Small Lavender Blossom (x: 25, y: 705) */}
        <g transform="translate(25, 705) scale(0.6)">
          {[0, 90, 180, 270].map((angle, k) => (
            <path
              key={k}
              d="M0 0 C-10 -16 -12 -28 0 -34 C12 -28 10 -16 0 0 Z"
              fill={`url(#${prefix}purplePetal)`}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="5" fill={`url(#${prefix}lavenderDeep)`} />
        </g>

        {/* 
          ========================================================================
          SECTION 5: LOWER FLORAL CLUSTER (Flanking the Scratch Card)
          ========================================================================
        */}
        {/* Full Dusty Pink Rose (x: 55, y: 820) */}
        <g transform="translate(55, 820) scale(0.92)">
          <path d="M-45 -18 C-58 -45 -18 -68 15 -60 C42 -52 58 -26 50 8 C42 38 12 55 -18 50 C-46 45 -58 14 -45 -18 Z" fill={`url(#${prefix}dustyPinkRose)`} opacity="0.78" />
          <path d="M-38 -34 C-12 -60 32 -52 45 -28 C58 -5 48 34 22 42 C-5 50 -40 32 -42 -2 Z" fill={`url(#${prefix}dustyPinkRose)`} opacity="0.9" />
          <path d="M-28 -25 C-5 -45 28 -38 34 -18 C40 4 26 28 8 30 C-14 32 -32 15 -28 -25 Z" fill={`url(#${prefix}dustyPinkRose)`} />
          <path d="M-18 -15 C-2 -30 20 -25 24 -10 C28 6 16 20 0 20 C-15 20 -22 2 -18 -15 Z" fill={`url(#${prefix}pinkInner)`} />
          <circle cx="0" cy="0" r="4.5" fill="#fce4ec" opacity="0.85" />
        </g>

        {/* Deep Burgundy Rose (x: 28, y: 885) */}
        <g transform="translate(28, 885) scale(0.85)">
          <path d="M-32 -12 C-42 -32 -12 -48 10 -42 C30 -36 40 -18 35 5 C30 26 8 38 -12 35 C-32 32 -40 10 -32 -12 Z" fill={`url(#${prefix}burgundyRose)`} opacity="0.85" />
          <path d="M-24 -22 C-5 -38 22 -32 28 -14 C34 4 22 24 6 26 C-12 28 -26 12 -24 -22 Z" fill={`url(#${prefix}burgundyRose)`} />
          <path d="M-15 -12 C-2 -24 16 -20 18 -6 C22 8 12 18 0 18 C-12 18 -18 2 -15 -12 Z" fill={`url(#${prefix}burgundyInner)`} />
          <circle cx="0" cy="0" r="3.5" fill="#f8bbd0" opacity="0.75" />
        </g>

        {/* Ivory Cream Rose (x: 82, y: 915) */}
        <g transform="translate(82, 915) scale(0.75)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={i}
              d="M0 0 C-8 -15 -10 -30 0 -36 C10 -30 8 -15 0 0 Z"
              fill={`url(#${prefix}creamRose)`}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="#d8be86" />
          <circle cx="0" cy="0" r="4" fill="#fefaf0" />
        </g>

        {/* Bottom Lavender Blossom Cluster (x: 45, y: 990) */}
        <g transform="translate(45, 990) scale(0.7)">
          {[
            { dx: -12, dy: -10, scale: 0.5 },
            { dx: 10, dy: -8, scale: 0.48 },
            { dx: 0, dy: 6, scale: 0.58 },
          ].map((floret, idx) => (
            <g key={idx} transform={`translate(${floret.dx}, ${floret.dy}) scale(${floret.scale})`}>
              {[0, 90, 180, 270].map((angle, k) => (
                <path
                  key={k}
                  d="M0 0 C-10 -16 -12 -28 0 -34 C12 -28 10 -16 0 0 Z"
                  fill={`url(#${prefix}purplePetal)`}
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="5" fill={`url(#${prefix}lavenderDeep)`} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
