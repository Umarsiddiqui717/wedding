import React, { useEffect, useRef, useState, useCallback } from 'react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const hasTriggeredFinish = useRef(false);
  const playInitiatedRef = useRef(false);

  const triggerCompletion = useCallback(() => {
    if (hasTriggeredFinish.current) return;
    hasTriggeredFinish.current = true;
    setIsEnding(true);

    // Prepare card underneath so cross-fade is seamless
    onPreFinish?.();

    // Clean, cinematic 500ms fade before unmounting overlay
    window.setTimeout(() => {
      onFinish();
    }, 500);
  }, [onFinish, onPreFinish]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || playInitiatedRef.current) return;
    playInitiatedRef.current = true;

    // Strict muted playback guarantee for flawless mobile autoplay
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Intro video autoplay could not start, falling back gracefully:', err);
          // If video can't autoplay on this device/network, smoothly complete to invitation
          onErrorFallback();
        });
    }
  }, [onErrorFallback]);

  const handleVideoError = () => {
    console.warn('Video failed to decode or load, falling back to invitation card');
    onErrorFallback();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const total = video.duration;

    // Trigger smooth fade within the last 0.4 seconds of playback
    if (total > 1.2 && current >= total - 0.4) {
      triggerCompletion();
    }
  };

  return (
    <div
      onClick={() => {
        // Tapping video will un-pause if mobile browser interrupted it
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-opacity duration-500 ease-out select-none ${
        isEnding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
      aria-label="Wedding intro video"
    >
      {/* Video stage container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/*
          Poster Layer:
          Preloaded and visible on Frame 1 instantly.
          Guarantees zero black screen while video decoder spins up!
        */}
        <img
          src={posterSrc}
          alt="Saleha & Owesh Wedding Intro"
          className="w-full h-full object-contain pointer-events-none"
          loading="eager"
          decoding="async"
        />

        {/*
          Main Video Element:
          Fades in smoothly over the matching poster frame the moment playback begins.
        */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          autoPlay
          muted
          preload="auto"
          onPlaying={() => setIsPlaying(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={triggerCompletion}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
        />
      </div>
    </div>
  );
};
