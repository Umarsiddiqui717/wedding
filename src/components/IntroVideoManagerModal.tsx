import React, { useState, useRef } from 'react';
import { Film, Upload, CheckCircle2, Trash2, X, Play } from 'lucide-react';
import { saveIntroVideoToStorage, clearIntroVideoFromStorage } from '../utils/videoStorage';

interface IntroVideoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideoSrc: string | null;
  onVideoUpdated: (newSrc: string | null) => void;
  onTestPlay: () => void;
}

export const IntroVideoManagerModal: React.FC<IntroVideoManagerModalProps> = ({
  isOpen,
  onClose,
  currentVideoSrc,
  onVideoUpdated,
  onTestPlay,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setSuccessMsg('Saving video to app for everyone...');
    try {
      // 1. Upload to server to save directly into public/wedding-intro.mp4 so it works for EVERYONE
      try {
        const uploadRes = await fetch('/api/upload-video', {
          method: 'POST',
          headers: { 'Content-Type': file.type || 'video/mp4' },
          body: file,
        });
        if (uploadRes.ok) {
          console.log('Video saved to server /wedding-intro.mp4');
        }
      } catch (err) {
        console.warn('Server upload error, saving locally:', err);
      }

      // 2. Also save to local IndexedDB for immediate playback
      await saveIntroVideoToStorage(file);
      onVideoUpdated('/wedding-intro.mp4');
      setSuccessMsg('✓ Perfect! Video is now saved in the app and will play for EVERYONE who visits!');
    } catch {
      setSuccessMsg('Failed to save video. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async () => {
    setIsProcessing(true);
    try {
      await clearIntroVideoFromStorage();
      onVideoUpdated(null);
      setSuccessMsg('Custom video removed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fffdfa] rounded-2xl border border-[#d4af37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 text-[#1a3838]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-[#d4af37]/15 text-[#9a7b2c]">
            <Film className="size-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#114b4b]">
              Royal Intro Video
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              Plays after opening the envelope &amp; before the card opens
            </p>
          </div>
        </div>

        <hr className="my-3 border-[#d4af37]/25" />

        {/* Status */}
        {currentVideoSrc ? (
          <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5">
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <p className="font-semibold text-emerald-900">
                Intro Video is active!
              </p>
              <p className="text-emerald-700 mt-0.5">
                When guests tap the wax seal, this video plays, and on the last second the card smoothly reveals.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTestPlay();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  <Play className="size-3 fill-current" />
                  <span>Test Play</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="size-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 mb-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900">
            <p className="font-semibold">No custom video loaded yet</p>
            <p className="mt-1 text-amber-800">
              Upload your video file (the castle gate opening video) here to test it immediately in this app!
            </p>
          </div>
        )}

        {/* Upload Button */}
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#114b4b] hover:bg-[#0c3838] text-white font-serif text-sm font-semibold shadow-md active:scale-[0.99] transition-all disabled:opacity-50"
          >
            <Upload className="size-4" />
            <span>{currentVideoSrc ? 'Upload Different Video' : 'Choose Video File (.mp4)'}</span>
          </button>

          {successMsg && (
            <p className="text-xs text-center font-medium text-emerald-700">
              {successMsg}
            </p>
          )}

          {/* Deployment notice */}
          <div className="p-3 rounded-lg bg-stone-100/90 border border-stone-200 text-[11px] text-stone-600 leading-relaxed font-sans">
            <span className="font-semibold text-stone-800">💡 For all guests when deployed:</span>
            <br />
            You can also place your video into your project as{' '}
            <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-900 font-mono">
              public/wedding-intro.mp4
            </code>
            . The app automatically detects and plays it for everyone.
          </div>
        </div>
      </div>
    </div>
  );
};
