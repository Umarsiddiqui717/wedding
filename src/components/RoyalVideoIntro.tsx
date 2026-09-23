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

    // Start video playback immediately upon mount (user just tapped wax seal)
    const startPlayback = () => {
      // First attempt with sound
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay with sound prevented by browser policy, switching to muted:', err);
          // If iOS Safari or browser blocks audio autoplay, mute and resume immediately!
          video.muted = true;
          video.play().catch((playErr) => {
            console.error('Playback failed completely:', playErr);
            onErrorFallback();
          });
        });
      }
    };

    startPlayback();
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

  return (
    <div
      onClick={() => {
        // If mobile browser paused video, tap anywhere resumes it
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play();
        }
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        isEnding ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
    >
      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        autoPlay
        onCanPlay={() => {
          if (videoRef.current && videoRef.current.paused && !isEnding) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={triggerCompletion}
        onError={() => {
          console.error('Video error event triggered for source:', videoSrc);
          onErrorFallback();
        }}
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
