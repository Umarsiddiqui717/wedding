import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, ExternalLink, RotateCcw } from 'lucide-react';
import { NikahScratchAnimation } from './components/NikahScratchAnimation';
import { RoyalVideoIntro } from './components/RoyalVideoIntro';
import { clearIntroVideoFromStorage } from './utils/videoStorage';
import defaultCardImage from './assets/card-design.webp';
import defaultCardPng from './assets/card-design.png';
import floralCornerImg from './assets/floral-corner.webp';

const invitationData = {
  bride: 'Saleha',
  groom: 'Owesh',
  date: '20 November 2026',
  day: 'Friday',
  hijriDate: '9th Jumada -al-Thani 1448 Hijri',
  nikah: 'After Namaz -e- Maghrib',
  dinner: '7:30 PM to 11:00 PM',
  host: 'Mr. Muqeemuddin Siddiqui',
  brideParent: 'Mr. Ubaidullah Siddiqui',
  groomParent: 'Mr. Sohel Khatri',
  venue: 'Parshuram Taware Stadium',
  address: [
    '(Dhobi Talao), Opp. Swimming Pool,',
    'Behind BSNL Telephone Exchange,',
    'Bhiwandi - 421302',
  ],
  googleMapsUrl:
    'https://maps.google.com/?cid=15353783081448437413&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA',
  mapCenter: { latitude: 19.2922293, longitude: 73.0529126 },
  countdownTarget: '2026-11-20T00:00:00+05:30',
  hosts: [
    'Mr. Abdullah Siddiqui',
    'Mr. Abdul Rub Siddiqui',
    'Mr. Amanullah Siddiqui',
    'Mr. Mohammed Uzair Khan',
    'Relatives & Friends.',
  ],
};

function getTimeRemaining(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <b>◆</b>
      <span />
    </div>
  );
}

function FloralCorners({
  subtle = false,
  bothSides = false,
}: {
  subtle?: boolean;
  bothSides?: boolean;
}) {
  return (
    <>
      {/* Top Left Floral Corner */}
      <img
        src={floralCornerImg}
        alt="Floral decoration top left"
        width={1024}
        height={1024}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={`floral-corner floral-corner-top ${subtle ? 'floral-subtle' : ''}`}
      />
      {/* Top Right Floral Corner (flowers on the right side) */}
      {bothSides && (
        <img
          src={floralCornerImg}
          alt="Floral decoration top right"
          width={1024}
          height={1024}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`floral-corner floral-corner-top-right ${subtle ? 'floral-subtle' : ''}`}
        />
      )}
      {/* Bottom Right Floral Corner */}
      <img
        src={floralCornerImg}
        alt="Floral decoration bottom right"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        width={1024}
        height={1024}
        className={`floral-corner floral-corner-bottom ${subtle ? 'floral-subtle' : ''}`}
      />
      {/* Bottom Left Floral Corner */}
      {bothSides && (
        <img
          src={floralCornerImg}
          alt="Floral decoration bottom left"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1024}
          height={1024}
          className={`floral-corner floral-corner-bottom-left ${subtle ? 'floral-subtle' : ''}`}
        />
      )}
    </>
  );
}

function LivingAtmosphere({ invitationView = false }: { invitationView?: boolean }) {
  return (
    <div
      className={`living-atmosphere ${invitationView ? 'atmosphere-page' : 'atmosphere-opening'}`}
      aria-hidden="true"
    >
      <div className="ambient-glow" />
      <div className="butterfly butterfly-one">
        <i />
        <i />
        <b />
      </div>
      <div className="butterfly butterfly-two">
        <i />
        <i />
        <b />
      </div>
      <div className="butterfly butterfly-three">
        <i />
        <i />
        <b />
      </div>
      <div className="floating-petals">
        {Array.from({ length: 16 }, (_, i) => (
          <i key={i} className={`floating-petal floating-petal-${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeRemaining(invitationData.countdownTarget));
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeRemaining(invitationData.countdownTarget));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return <p className="today-message">Today is the day! ❤️</p>;
  }

  const units: [string, number][] = [
    ['DAYS', timeLeft.days],
    ['HOURS', timeLeft.hours],
    ['MINUTES', timeLeft.minutes],
    ['SECONDS', timeLeft.seconds],
  ];

  return (
    <div className="countdown-grid">
      {units.map(([label, value]) => (
        <div key={label} className="countdown-unit">
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>('/wedding-intro.mp4');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [customCardImage, setCustomCardImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('customCardDesign');
      // Only use localStorage value if it's a valid data URL or valid external image URL
      if (saved && (saved.startsWith('data:image/') || saved.startsWith('http://') || saved.startsWith('https://'))) {
        return saved;
      }
      // Clear invalid or stale /api/... references
      if (saved) {
        localStorage.removeItem('customCardDesign');
      }
    } catch {}
    return defaultCardImage;
  });

  const handleCardImageError = () => {
    // Multi-tier fallback guarantee:
    if (customCardImage !== defaultCardImage && customCardImage !== defaultCardPng) {
      try {
        localStorage.removeItem('customCardDesign');
      } catch {}
      setCustomCardImage(defaultCardImage);
    } else if (customCardImage === defaultCardImage) {
      // If bundled JPG failed on this browser/environment, fallback to bundled PNG
      setCustomCardImage(defaultCardPng);
    } else {
      // Direct root public fallback
      setCustomCardImage('/card-design.jpg');
    }
  };

  const petalIndices = useMemo(() => Array.from({ length: 11 }, (_, i) => i), []);

  const embedMapUrl = `https://www.google.com/maps?q=${invitationData.mapCenter.latitude},${invitationData.mapCenter.longitude}&z=16&output=embed`;

  useEffect(() => {
    // Eagerly preload critical image assets in browser memory so they render synchronously
    const preloadCard = new Image();
    preloadCard.src = defaultCardImage;

    const preloadFloral = new Image();
    preloadFloral.src = floralCornerImg;

    // Purge any stale legacy video cached in browser IndexedDB
    clearIntroVideoFromStorage().catch(() => {});

    // Check if an intro video is saved on the server (if backend exists)
    fetch('/api/video-info')
      .then((res) => {
        if (!res.ok) throw new Error('No backend');
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) throw new Error('Not JSON');
        return res.json();
      })
      .then((data) => {
        // Only update if custom video URL differs from local standard
        if (data && data.hasVideo && data.videoUrl && !data.videoUrl.startsWith('/wedding-intro.mp4')) {
          setVideoSrc(data.videoUrl);
        }
      })
      .catch(() => {});

    // Check if a custom card image design is saved on the server (if backend exists)
    fetch('/api/card-image-info')
      .then((res) => {
        if (!res.ok) throw new Error('No backend');
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) throw new Error('Not JSON');
        return res.json();
      })
      .then((data) => {
        if (data && data.hasCardImage && data.imageUrl) {
          setCustomCardImage(data.imageUrl);
        }
      })
      .catch(() => {});
  }, []);

  const uploadCardImageFile = async (file: File) => {
    if (!file) return;

    // Fast local preview via FileReader
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setCustomCardImage(dataUrl);
        try {
          localStorage.setItem('customCardDesign', dataUrl);
        } catch {}
      }
    };
    reader.readAsDataURL(file);

    // Optional server persist if available (fails silently on static hosts like Netlify)
    try {
      const res = await fetch('/api/upload-card-image', {
        method: 'POST',
        body: file,
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.imageUrl) {
          setCustomCardImage(data.imageUrl);
        }
      }
    } catch {
      // Netlify is static; dataUrl in localStorage works immediately
    }
  };

  const handleGlobalDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleGlobalDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDraggingOver(false);
  };

  const handleGlobalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      uploadCardImageFile(file);
    }
  };

  const handleOpenClick = useCallback(() => {
    if (isOpening || isOpen || isVideoPlaying) return;

    // Immediately trigger tactile 3D envelope opening animation
    setIsOpening(true);

    if (videoSrc) {
      // Allow envelope wax seal pop and 3D flap unfold for 350ms before video blooms
      window.setTimeout(() => {
        setIsVideoPlaying(true);
      }, 350);
    } else {
      window.setTimeout(() => {
        setIsOpen(true);
        setIsOpening(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('nikah-redraw'));
      }, 1200);
    }
  }, [isOpening, isOpen, isVideoPlaying, videoSrc]);

  // Called right as video starts dissolving: mounts card underneath
  const handleVideoPreFinish = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Called when video overlay is fully faded out and unmounted
  const handleVideoFinish = useCallback(() => {
    setIsVideoPlaying(false);
    setIsOpening(false);
    setIsOpen(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('nikah-redraw'));
  }, []);

  // Fallback if video fails to play on device
  const handleVideoFallback = useCallback(() => {
    setIsVideoPlaying(false);
    setIsOpen(true);
    setIsOpening(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('nikah-redraw'));
  }, []);

  const handleResealEnvelope = useCallback(() => {
    setIsOpen(false);
    setIsOpening(false);
    setIsVideoPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main
      id="invitation-app-root"
      className={`invitation-site ${isOpening ? 'is-opening' : ''} ${isOpen ? 'is-open' : ''} relative`}
      onDragOver={handleGlobalDragOver}
      onDragLeave={handleGlobalDragLeave}
      onDrop={handleGlobalDrop}
    >
      {/* Royal Gate Video Transition */}
      {isVideoPlaying && videoSrc && (
        <RoyalVideoIntro
          videoSrc={videoSrc}
          onPreFinish={handleVideoPreFinish}
          onFinish={handleVideoFinish}
          onErrorFallback={handleVideoFallback}
        />
      )}

      {/* 
        ========================================================================
        OPENING ENVELOPE SCREEN
        ========================================================================
      */}
      {!isOpen && (
        <section className="opening-screen" aria-label="Wedding invitation cover">
          <LivingAtmosphere />
          <FloralCorners bothSides />

          <div className="envelope-stage">
            <div className="envelope-title">
              <div className="envelope-bismillah-arabic" lang="ar" dir="rtl">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </div>
              <p>In the name of ‘ALLAH’</p>
              <span>the most beneficent and the most merciful</span>
            </div>

            <div className={`envelope ${isOpening ? 'is-opening' : ''}`} aria-label="Sealed wedding invitation envelope">
              {/* Envelope Paper with preview */}
              <div className="envelope-paper">
                <span>Wedding Invitation</span>
                <strong>
                  Saleha <i>&amp;</i> Owesh
                </strong>
                <small>20 · 11 · 2026</small>
              </div>

              {/* Realistic 3D 4-way outward opening envelope flaps (Top, Bottom, Left, Right) */}
              <div className="envelope-back" />
              <div className="envelope-left" />
              <div className="envelope-right" />
              <div className="envelope-bottom" />
              <div className="envelope-top envelope-flap" />

              {/* Divine Center Light Burst & Radiant Rays when opening */}
              <div className="envelope-center-light" aria-hidden="true">
                <div className="light-rays" />
                <div className="light-core" />
              </div>

              {/* Central Wax Seal Button with authentic Arabic Bismillah calligraphy */}
              <button
                type="button"
                onClick={handleOpenClick}
                disabled={isOpening || isVideoPlaying}
                aria-disabled={isOpening || isVideoPlaying}
                aria-label="Open invitation with Bismillah"
                className="wax-seal"
              >
                <span className="bismillah-arabic" lang="ar" dir="rtl">
                  بِسْمِ&nbsp;اللَّهِ
                </span>
                <span className="seal-subtext">Tap to Open</span>
              </button>
            </div>

            <p className="tap-instruction flex items-center justify-center gap-1.5">
              <span>Tap to Open</span>
              <ChevronDown className="size-3.5 text-[var(--gold)] animate-bounce" aria-hidden="true" />
            </p>
          </div>
        </section>
      )}

      {/* 
        ========================================================================
        MAIN REVEALED INVITATION SECTION
        ========================================================================
      */}
      <section id="invitation" className="invitation-wrap" aria-hidden={!isOpen}>
        {isOpen && <LivingAtmosphere invitationView />}

        {isOpen && (
          <div className="petals" aria-hidden="true">
            {petalIndices.map((idx) => (
              <i key={idx} className={`petal petal-${idx + 1}`} />
            ))}
          </div>
        )}

        <article className={`invitation-card ${customCardImage ? 'with-card-image' : ''}`}>
          {/* Card Presentation: wedding invitation design with royal scratch animation on the date section below In Sha Allah Nikah */}
          {customCardImage ? (
            <div
              className="custom-card-wrapper relative w-full overflow-hidden select-none mb-6 sm:mb-8"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith('image/')) {
                  uploadCardImageFile(file);
                }
              }}
            >
              <img
                src={customCardImage}
                alt="Nikah Invitation - Saleha & Owesh"
                className="w-full h-auto block select-none pointer-events-none"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() => {
                  window.dispatchEvent(new Event('nikah-redraw'));
                  window.dispatchEvent(new Event('resize'));
                }}
                onError={handleCardImageError}
              />

              {/* Interactive Scratch Card directly on the image below In Sha Allah Nikah covering Friday and date */}
              <div
                className="absolute z-20 pointer-events-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
                style={{
                  top: '70.2%',
                  left: '5.5%',
                  width: '89%',
                  height: '26.8%',
                }}
              >
                <NikahScratchAnimation />
              </div>
            </div>
          ) : (
            <>
              {/* Header blessing & host */}
              <header className="invitation-header reveal-section">
                <div className="card-bismillah-arabic" lang="ar" dir="rtl">
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </div>
                <p className="blessing">
                  In the name of ‘ALLAH’
                  <br />
                  <small>the most beneficent and the most merciful</small>
                </p>
                <p className="request">
                  <strong className="host-name">{invitationData.host}</strong>
                  <br />
                  requests the honour of your presence at the
                  <br />
                  Nikah ceremony of his Granddaughter
                </p>
              </header>

              {/* Bride and Groom Names */}
              <section className="names reveal-section" aria-label="Bride and groom">
                <h1>{invitationData.bride}</h1>
                <p>( D/o. {invitationData.brideParent} )</p>
                <span className="weds-seal">Weds</span>
                <h1>{invitationData.groom}</h1>
                <p>( S/o. {invitationData.groomParent} )</p>
                <h2>
                  <span className="text-[0.7em] leading-none opacity-80" aria-hidden="true">✿</span>
                  <span className="tracking-wide">In Sha Allah Nikah</span>
                  <span className="text-[0.7em] leading-none opacity-80" aria-hidden="true">✿</span>
                </h2>
              </section>

              {/* Date & Timings */}
              <section className="date-block reveal-section" aria-label="Wedding date">
                <div className="py-2 px-1 sm:px-3">
                  <p className="day">{invitationData.day}</p>
                  <div className="date-row">
                    <span className="date-month">NOVEMBER</span>
                    <div className="date-day-num">
                      <span className="num">20</span>
                      <sup className="ordinal">TH</sup>
                    </div>
                    <span className="date-year">2026</span>
                  </div>
                  <p className="hijri">({invitationData.hijriDate})</p>

                  <Ornament />

                  <p>
                    <b>Nikah :</b> {invitationData.nikah}
                  </p>
                  <p>
                    <b>Dinner :</b> {invitationData.dinner}
                  </p>
                </div>
              </section>
            </>
          )}

          {/* Venue & Map */}
          <section className="venue reveal-section">
            <h2>✿ Venue ✿</h2>
            <div className="venue-box">
              <h3>{invitationData.venue}</h3>
              <address>
                {invitationData.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <a
                href={invitationData.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-12 rounded-full px-7 text-[0.82rem] tracking-[0.12em] uppercase font-semibold text-white bg-[oklch(35%_0.072_178)] hover:bg-[oklch(32%_0.072_178)] shadow-[var(--shadow-gold)] transition-all active:scale-[0.98] border border-[oklch(35%_0.072_178)]/35"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="size-4 ml-1" aria-hidden="true" />
              </a>

              <div className="map-frame">
                <iframe
                  title={`Map to ${invitationData.venue}`}
                  src={embedMapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

          {/* Countdown */}
          <section className="countdown reveal-section">
            <Ornament />
            <h2>Counting down to the Nikah</h2>
            <CountdownTimer />
          </section>

          {/* Footer message and family names */}
          <footer className="final-message reveal-section">
            <p className="script-line">Awaiting the pleasure of your presence</p>
            <p>
              {invitationData.hosts.map((hostName) => (
                <span key={hostName}>{hostName}</span>
              ))}
            </p>

            <Ornament />
            <strong>Your presence will be a blessing</strong>

            <div className="mt-8 pt-4 border-t border-[var(--gold)]/30 flex justify-center">
              <button
                type="button"
                onClick={handleResealEnvelope}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--gold)]/50 text-[oklch(35%_0.072_178)] hover:bg-[oklch(35%_0.072_178)]/10 text-xs font-serif font-semibold tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Re-close Envelope</span>
              </button>
            </div>
          </footer>
        </article>
      </section>
    </main>
  );
}
