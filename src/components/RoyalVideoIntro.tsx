import React, { useEffect, useRef, useState } from 'react';

interface RoyalVideoIntroProps {
  videoSrc: string;
  posterSrc?: string;
  onFinish: () => void;
  onPreFinish?: () => void;
  onErrorFallback: () => void;
}

export const RoyalVideoIntro: React.FC<RoyalVideoIntroProps> = ({
  videoSrc,
  posterSrc = '/video-poster.webp',
  onFinish,
  onPreFinish,
  onErrorFallback,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState(videoSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
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
    // Smooth entrance trigger on first paint
    const raf = requestAnimationFrame(() => {
      setHasEntered(true);
    });

    const video = videoRef.current;
    if (!video) return () => cancelAnimationFrame(raf);

    // Play completely muted as requested
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay error:', err);
        // Retry with public path if bundled failed
        if (currentSrc !== '/wedding-intro.mp4') {
          setCurrentSrc('/wedding-intro.mp4');
        } else {
          onErrorFallback();
        }
      });
    }

    return () => cancelAnimationFrame(raf);
  }, [onErrorFallback, currentSrc]);

  const handleVideoError = () => {
    if (currentSrc !== '/wedding-intro.mp4') {
      console.warn('Switching to fallback video path /wedding-intro.mp4');
      setCurrentSrc('/wedding-intro.mp4');
    } else {
      console.error('All video sources failed, proceeding to invitation fallback');
      onErrorFallback();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const total = video.duration;

    // Trigger transition within the last 0.6 seconds of the video for a seamless dissolve
    if (total > 1.5 && current >= total - 0.6) {
      triggerCompletion();
    }
  };

  return (
    <div
      onClick={() => {
        // If mobile browser paused video, tap anywhere resumes it
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#2b1d0e_0%,_#140d07_60%,_#090604_100%)] transition-all duration-700 ${
        isEnding
          ? 'opacity-0 scale-105 pointer-events-none'
          : hasEntered
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-98'
      }`}
      style={{ isolation: 'isolate' }}
    >
      {/* Radiant golden light burst on opening */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 bg-radial from-[#fff4d1]/60 via-[#d4af37]/20 to-transparent ${
          hasEntered && !isEnding ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Main Video & Seamless Poster Layer */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main Video Element with hardware acceleration */}
        <video
          ref={videoRef}
          src={currentSrc}
          poster={posterLoaded ? posterSrc : undefined}
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          autoPlay
          muted
          onPlaying={() => setIsPlaying(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={triggerCompletion}
          onError={handleVideoError}
          className="w-full h-full object-cover sm:object-contain"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        />

        {/* 
          Pixel-perfect first-frame poster layer:
          Displayed at 100% opacity the exact instant user opens the invitation,
          guaranteeing ZERO black screen or flicker while video decodes!
        */}
        <img
          src={posterSrc}
          alt="Saleha & Owesh Wedding Intro"
          onLoad={() => setPosterLoaded(true)}
          onError={() => setPosterLoaded(false)}
          className={`absolute inset-0 w-full h-full object-cover sm:object-contain transition-opacity duration-300 pointer-events-none ${
            isPlaying || !posterLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Golden Dissolve Burst Overlay when ending */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-600 bg-radial from-[#fff4d1]/80 via-[#d4af37]/40 to-transparent ${
          isEnding ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
