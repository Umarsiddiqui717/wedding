import React, { useEffect, useRef, useState } from 'react';

interface RoyalVideoIntroProps {
  videoSrc: string;
  onFinish: () => void;
  onPreFinish?: () => void;
  onErrorFallback: () => void;
}

export const RoyalVideoIntro: React.FC<RoyalVideoIntroProps> = ({
  videoSrc,
  onFinish,
  onPreFinish,
  onErrorFallback,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const hasTriggeredFinish = useRef(false);

  const triggerCompletion = () => {
    if (hasTriggeredFinish.current) return;
    hasTriggeredFinish.current = true;
    setIsEnding(true);

    // Mount and prepare the card underneath immediately so it opens directly
    onPreFinish?.();

    // Smooth golden dissolve before releasing overlay
    setTimeout(() => {
      onFinish();
    }, 550);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct playback with sound since user clicked "Tap to Open"
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If device audio policy requires muted autoplay, mute and continue playing smoothly
        video.muted = true;
        video.play().catch(() => {
          onErrorFallback();
        });
      });
    }
  }, [onErrorFallback]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const current = video.currentTime;
    const total = video.duration;

    // Trigger transition when within the last 0.8 seconds of the video
    if (total > 1.5 && current >= total - 0.75) {
      triggerCompletion();
    }
  };

  const handleEnded = () => {
    triggerCompletion();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        isEnding ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
    >
      {/* Main Video Element playing uninterrupted */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        webkit-playsinline="true"
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => onErrorFallback()}
        className="w-full h-full object-cover sm:object-contain bg-black"
      />

      {/* Golden Dissolve Burst Overlay when ending */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-600 bg-radial from-[#fff4d1]/80 via-[#d4af37]/40 to-transparent ${
          isEnding ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
