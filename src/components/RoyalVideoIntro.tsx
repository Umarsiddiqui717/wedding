import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ChevronRight } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
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

    // Attempt autoplay since user clicked the wax seal
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasStarted(true);
        })
        .catch(() => {
          // If browser policy requires muted autoplay, mute and retry
          video.muted = true;
          setIsMuted(true);
          video
            .play()
            .then(() => setHasStarted(true))
            .catch(() => {
              // If completely unable to play, fallback to card
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
    setProgress((current / total) * 100);

    // "when the last sec of video is done then my card will open"
    // Trigger transition when within the last 0.8 seconds of the video
    if (total > 1.5 && current >= total - 0.75) {
      triggerCompletion();
    }
  };

  const handleEnded = () => {
    triggerCompletion();
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        isEnding ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
    >
      {/* Top Gold Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-30">
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#fce79f] to-[#d4af37] transition-[width] duration-150 shadow-[0_0_10px_#d4af37]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        webkit-playsinline="true"
        autoPlay
        muted={isMuted}
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

      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
        {/* Sound toggle button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-[#d4af37]/40 text-[#fef9e7] text-xs font-serif transition-all active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX className="size-4 text-[#fef9e7]/80" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="size-4 text-[#d4af37]" />
              <span>Sound On</span>
            </>
          )}
        </button>

        {/* Skip button */}
        <button
          type="button"
          onClick={triggerCompletion}
          aria-label="Skip video and open invitation card"
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-[#d4af37]/50 text-[#fef9e7] text-xs font-serif tracking-wider uppercase transition-all active:scale-95 shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
        >
          <span>Skip to Card</span>
          <ChevronRight className="size-3.5 text-[#d4af37]" />
        </button>
      </div>

      {/* Tap hint if paused */}
      {!hasStarted && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 text-white font-serif text-sm tracking-widest uppercase"
        >
          <span className="px-5 py-2.5 rounded-full bg-black/70 border border-[#d4af37]/60 backdrop-blur-sm shadow-lg">
            Tap to Play Intro
          </span>
        </button>
      )}
    </div>
  );
};
