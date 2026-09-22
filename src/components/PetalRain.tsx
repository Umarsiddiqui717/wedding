import React, { useMemo } from 'react';

interface PetalRainProps {
  active?: boolean;
}

interface PetalItem {
  id: number;
  left: string;
  delay: string;
  duration: string;
  rot: string;
  driftX: string;
  scale: number;
  type: 'pink' | 'ivory' | 'gold' | 'teal';
}

export const PetalRain: React.FC<PetalRainProps> = ({ active = true }) => {
  const petals = useMemo<PetalItem[]>(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const left = `${Math.floor(Math.random() * 96) + 2}%`;
      const delay = `${(Math.random() * 6).toFixed(2)}s`;
      const duration = `${(7 + Math.random() * 6).toFixed(2)}s`;
      const rot = `${Math.floor(Math.random() * 720) - 360}deg`;
      const driftX = `${Math.floor(Math.random() * 120) - 60}px`;
      const scale = 0.65 + Math.random() * 0.55;
      const types: ('pink' | 'ivory' | 'gold' | 'teal')[] = [
        'pink',
        'pink',
        'ivory',
        'ivory',
        'ivory',
        'gold',
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      return { id: i, left, delay, duration, rot, driftX, scale, type };
    });
  }, []);

  if (!active) return null;

  return (
    <div
      id="petal-rain-container"
      className="fixed inset-0 pointer-events-none overflow-hidden z-40"
      aria-hidden="true"
    >
      {petals.map((petal) => {
        let fill = '#fbcfe8'; // soft blush pink
        let opacity = 0.8;
        if (petal.type === 'ivory') {
          fill = '#fdfbf7';
          opacity = 0.85;
        } else if (petal.type === 'gold') {
          fill = '#f5ce42';
          opacity = 0.7;
        }

        return (
          <div
            key={petal.id}
            className="absolute top-0 animate-petal"
            style={
              {
                left: petal.left,
                animationDelay: petal.delay,
                '--duration': petal.duration,
                '--rot': petal.rot,
                '--drift-x': petal.driftX,
              } as React.CSSProperties
            }
          >
            <svg
              width="24"
              height="30"
              viewBox="0 0 24 30"
              fill="none"
              style={{
                transform: `scale(${petal.scale})`,
                filter: 'drop-shadow(0 2px 4px rgba(17, 75, 75, 0.12))',
              }}
            >
              {/* Petal silhouette */}
              <path
                d="M12 0 C5 8 0 16 2 24 C4 29 10 30 14 28 C20 25 24 16 18 8 C15 3 13 1 12 0 Z"
                fill={fill}
                fillOpacity={opacity}
                stroke="#e2d3be"
                strokeWidth="0.5"
              />
              <path
                d="M12 5 C11 12 11 18 13 24"
                stroke={petal.type === 'gold' ? '#d4af37' : '#f472b6'}
                strokeWidth="0.6"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
