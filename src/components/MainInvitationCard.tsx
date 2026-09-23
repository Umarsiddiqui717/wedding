import React, { useState, useEffect } from 'react';
import {
  TopLeftFloral,
  HangingLanterns,
  SideRoseMotif,
  IslamicRosette,
} from './FloralCorner';
import { TimeLeft } from '../types';
import { MapPin, Calendar, ExternalLink, RotateCcw } from 'lucide-react';

interface MainInvitationCardProps {
  onReopenEnvelope: () => void;
}

export const MainInvitationCard: React.FC<MainInvitationCardProps> = ({ onReopenEnvelope }) => {
  // Target date: Friday, 20th November 2026 (IST timezone approx Maghrib ~ 18:00)
  const targetDate = new Date('2026-11-20T18:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Google Maps link to Parshuram Taware Stadium, Bhiwandi
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Parshuram+Taware+Stadium+Dhobi+Talao+Bhiwandi+421302';

  // Add to calendar event generator
  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Nikah Ceremony: Saleha & Owesh');
    const details = encodeURIComponent(
      'Nikah ceremony of Saleha (D/o Mr. Ubaidullah Siddiqui) and Owesh (S/o Mr. Sohel Khatri). Dinner 7:30 PM to 11:00 PM.'
    );
    const location = encodeURIComponent(
      'Parshuram Taware Stadium, Dhobi Talao, Bhiwandi - 421302'
    );
    // 20261120T123000Z to 20261120T173000Z (UTC for 18:00 to 23:00 IST)
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261120T123000Z/20261120T173000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="main-invitation-container"
      className="w-full max-w-[460px] mx-auto transition-all duration-700 animate-in fade-in zoom-in-95"
    >
      {/* 
        The Physical Card Recreation (wedding.jpeg)
        White / Ivory Cardstock with Dark Teal Ink & Subtle Gold Accents
      */}
      <div
        id="physical-card-interior"
        className="relative bg-[#fdfcf9] rounded-xl border-2 border-[#d9ccb6] p-4 sm:p-7 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -15px rgba(17, 75, 75, 0.22), 0 0 0 1px rgba(212, 175, 55, 0.3)',
        }}
      >
        {/* Subtle ghostly watermark vine texture across paper */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#114b4b 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* 
          Outer & Inner Decorative Dark Teal Double Line Border
          With notched corners matching the physical card
        */}
        <div className="absolute inset-2 sm:inset-3.5 border border-[#114b4b] rounded-lg pointer-events-none opacity-80" />
        <div className="absolute inset-3 sm:inset-[18px] border border-[#114b4b]/40 rounded pointer-events-none" />

        {/* Top-Left Floral Bouquet (matching physical card) */}
        <div className="absolute -top-3 -left-3 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-10">
          <TopLeftFloral className="w-full h-full" />
        </div>

        {/* Top-Right Hanging Fanoos Lanterns (matching physical card) */}
        <div className="absolute top-0 right-1 w-32 h-36 sm:w-36 sm:h-40 pointer-events-none z-10">
          <HangingLanterns className="w-full h-full" />
        </div>

        {/* CARD CONTENT */}
        <div className="relative z-20 flex flex-col items-center text-center text-[#0e4343] pt-6 sm:pt-8 pb-3 sm:pb-5 px-1 sm:px-3">
          {/* Bismillah in English */}
          <div className="font-serif-lux italic text-xs sm:text-sm text-[#0e4343] tracking-wide max-w-[280px]">
            In the name of &quot;ALLAH&quot;
            <br />
            the most beneficent and the most merciful
          </div>

          {/* Host announcement */}
          <div className="mt-4 sm:mt-5">
            <h2 className="font-serif-lux text-base sm:text-lg font-bold tracking-wide text-[#0b3838] whitespace-nowrap">
              Mr. Muqeemuddin Siddiqui
            </h2>
            <p className="font-serif-lux italic text-xs sm:text-[13px] text-[#1a5555] mt-1 leading-snug">
              requests the honour of your presence at the
              <br />
              Nikah ceremony of his Granddaughter
            </p>
          </div>

          {/* Bride Section: SALEHA */}
          <div className="mt-3 sm:mt-4 flex flex-col items-center">
            <h1 className="font-script text-4xl sm:text-5xl md:text-[54px] font-bold text-[#0e4343] tracking-wide leading-tight drop-shadow-[0_1px_1px_rgba(212,175,55,0.25)]">
              Saleha
            </h1>
            <p className="font-serif-lux text-xs sm:text-sm font-semibold text-[#114b4b] mt-0.5 tracking-wide">
              ( D/o. Mr. Ubaidullah Siddiqui )
            </p>
          </div>

          {/* Connector: Weds with Floral Wreath & Side Roses */}
          <div className="my-2 sm:my-3 w-full flex items-center justify-center gap-1 sm:gap-2">
            <SideRoseMotif className="w-8 h-10 sm:w-10 sm:h-12 opacity-90" />

            {/* Weds Medallion */}
            <div className="relative flex items-center justify-center px-4 py-1">
              {/* Ornate Wreath SVG */}
              <svg
                viewBox="0 0 100 46"
                className="absolute inset-0 w-full h-full text-[#114b4b]"
                fill="none"
              >
                {/* Oval leaf garland */}
                <ellipse cx="50" cy="23" rx="46" ry="18" stroke="#114b4b" strokeWidth="1.2" strokeDasharray="3 2" />
                <ellipse cx="50" cy="23" rx="42" ry="15" stroke="#d4af37" strokeWidth="0.8" opacity="0.8" />
                <circle cx="5" cy="23" r="2" fill="#d4af37" />
                <circle cx="95" cy="23" r="2" fill="#d4af37" />
              </svg>
              <span className="font-script text-xl sm:text-2xl font-bold text-[#0e4343] px-2 z-10">
                Weds
              </span>
            </div>

            <SideRoseMotif flip className="w-8 h-10 sm:w-10 sm:h-12 opacity-90" />
          </div>

          {/* Groom Section: OWESH */}
          <div className="flex flex-col items-center">
            <h1 className="font-script text-4xl sm:text-5xl md:text-[54px] font-bold text-[#0e4343] tracking-wide leading-tight drop-shadow-[0_1px_1px_rgba(212,175,55,0.25)]">
              Owesh
            </h1>
            <p className="font-serif-lux text-xs sm:text-sm font-semibold text-[#114b4b] mt-0.5 tracking-wide">
              ( S/o. Mr. Sohel Khatri )
            </p>
          </div>

          {/* In Sha Allah Nikah heading */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2">
            <IslamicRosette size={16} />
            <span className="font-serif-lux text-sm sm:text-base font-bold tracking-wider text-[#0e4343]">
              In Sha Allah Nikah
            </span>
            <IslamicRosette size={16} />
          </div>

          {/* Date & Time Badge */}
          <div className="mt-2.5 w-full max-w-[340px] flex flex-col items-center border-y border-[#114b4b]/60 py-2.5">
            <div className="font-serif-lux font-bold text-xs sm:text-sm tracking-[0.25em] text-[#0e4343] uppercase">
              FRIDAY
            </div>

            {/* NOVEMBER 20TH 2026 */}
            <div className="my-1 flex items-center justify-center gap-3 w-full font-serif-lux text-[#0e4343]">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#114b4b]" />
              <div className="flex items-baseline gap-1 text-sm sm:text-base font-bold tracking-wider">
                <span className="uppercase text-xs sm:text-sm">NOVEMBER</span>
                <span className="text-xl sm:text-2xl font-bold text-[#082b2b]">20</span>
                <span className="text-[10px] uppercase align-super">TH</span>
                <span className="text-xs sm:text-sm ml-1 font-semibold">2026</span>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#114b4b]" />
            </div>

            <div className="font-serif-lux italic text-xs sm:text-[13px] text-[#114b4b] tracking-wide">
              ( 9th Jumada -al- Thani 1448 Hijri )
            </div>

            {/* Ceremonial timings */}
            <div className="mt-2 space-y-0.5 text-xs sm:text-[13px] font-serif-lux font-semibold text-[#0e4343]">
              <p>
                <span className="text-[#966f1e] font-bold">Nikah :</span> After Namaz -e- Maghrib
              </p>
              <p>
                <span className="text-[#966f1e] font-bold">Dinner :</span> 7:30 PM to 11:00 PM
              </p>
            </div>
          </div>

          {/* Venue Box (matching physical card rounded/beveled inner box) */}
          <div className="mt-4 w-full max-w-[340px] flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1.5">
              <IslamicRosette size={14} />
              <span className="font-serif-lux text-sm sm:text-base font-bold tracking-wider text-[#0e4343]">
                Venue
              </span>
              <IslamicRosette size={14} />
            </div>

            <div className="w-full border border-[#114b4b] rounded-lg p-2.5 sm:p-3 bg-[#fbf9f4] shadow-sm relative">
              {/* Corner notch accents */}
              <div className="font-serif-lux text-sm sm:text-[15px] font-bold text-[#0b3838]">
                Parshuram Taware Stadium
              </div>
              <div className="font-serif-lux italic text-xs sm:text-[13px] text-[#1a5555] mt-0.5 leading-snug">
                (Dhobi Talao), Opp. Swimming Pool,
                <br />
                Behind BSNL Telephone Exchange,
                <br />
                Bhiwandi - 421302
              </div>
            </div>
          </div>

          {/* Family Awaiting Invitation */}
          <div className="mt-4 sm:mt-5 text-center max-w-[340px]">
            <p className="font-serif-lux italic text-xs sm:text-[13px] text-[#114b4b] tracking-wide underline underline-offset-4 decoration-[#d4af37]/60">
              Awaiting the pleasure of your presence
            </p>
            <h3 className="font-serif-lux text-xs sm:text-sm font-bold text-[#0b3838] mt-1.5">
              Mr. Abdullah Siddiqui,
            </h3>
            <p className="font-serif-lux text-[11px] sm:text-xs text-[#134e4e] font-medium leading-relaxed mt-0.5">
              Abdul Rub Siddiqui, Amanullah Siddiqui, Mohammed Uzair Khan,
              <br />
              <span className="font-semibold text-[#0e4343]">Relatives & Friends.</span>
            </p>
          </div>

          {/* Bottom Dotted Divider & Blessing */}
          <div className="mt-3 sm:mt-4 w-full max-w-[300px] border-t border-dotted border-[#114b4b]/60 pt-2.5">
            <p className="font-serif-lux italic text-xs sm:text-sm text-[#0e4343] font-semibold tracking-wide">
              Your presence will be a blessing
            </p>
          </div>

          {/* Bottom Corner Floral Accents */}
          <div className="w-full flex justify-between items-center px-4 mt-1 opacity-70">
            <SideRoseMotif className="w-6 h-8" />
            <SideRoseMotif flip className="w-6 h-8" />
          </div>
        </div>
      </div>

      {/* 
        COUNTDOWN TIMER TO NIKAH CEREMONY (Required Feature)
        Styled in elegant ivory card with teal and gold trims
      */}
      <div
        id="countdown-section"
        className="mt-6 bg-white/95 rounded-xl border border-[#d9ccb6] p-4 shadow-lg text-center backdrop-blur-sm"
      >
        <div className="text-[11px] font-display uppercase tracking-widest text-[#966f1e] font-semibold flex items-center justify-center gap-1.5 mb-3">
          <IslamicRosette size={12} />
          <span>Counting Down To The Blessed Day</span>
          <IslamicRosette size={12} />
        </div>

        <div className="grid grid-cols-4 gap-2 text-center max-w-[320px] mx-auto">
          {/* Days */}
          <div className="bg-[#faf8f4] border border-[#d4af37]/40 rounded-lg py-2 px-1 shadow-inner">
            <span className="font-serif-lux text-2xl sm:text-3xl font-bold text-[#0e4343] block leading-none">
              {timeLeft.days}
            </span>
            <span className="text-[10px] font-display uppercase tracking-wider text-[#114b4b] font-medium mt-1 block">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#faf8f4] border border-[#d4af37]/40 rounded-lg py-2 px-1 shadow-inner">
            <span className="font-serif-lux text-2xl sm:text-3xl font-bold text-[#0e4343] block leading-none">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] font-display uppercase tracking-wider text-[#114b4b] font-medium mt-1 block">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#faf8f4] border border-[#d4af37]/40 rounded-lg py-2 px-1 shadow-inner">
            <span className="font-serif-lux text-2xl sm:text-3xl font-bold text-[#0e4343] block leading-none">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] font-display uppercase tracking-wider text-[#114b4b] font-medium mt-1 block">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#faf8f4] border border-[#d4af37]/40 rounded-lg py-2 px-1 shadow-inner">
            <span className="font-serif-lux text-2xl sm:text-3xl font-bold text-[#966f1e] block leading-none">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] font-display uppercase tracking-wider text-[#114b4b] font-medium mt-1 block">
              Secs
            </span>
          </div>
        </div>
      </div>

      {/* 
        ACTION BUTTONS: Google Maps + Add To Calendar + Re-open Envelope
      */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Google Maps Button */}
        <a
          id="google-maps-btn"
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0e4343] hover:bg-[#135555] text-[#fdfbf7] font-serif-lux font-semibold text-sm shadow-md transition-all hover:shadow-lg active:scale-[0.98] border border-[#d4af37]/40"
        >
          <MapPin className="w-4 h-4 text-[#d4af37]" />
          <span>Get Venue Directions</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]/80 ml-0.5" />
        </a>

        {/* Add to Calendar */}
        <button
          id="add-calendar-btn"
          onClick={handleAddToCalendar}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white hover:bg-[#faf8f4] text-[#0e4343] font-serif-lux font-semibold text-sm shadow-md transition-all border border-[#c49a45]/50 active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4 text-[#966f1e]" />
          <span>Add to Calendar</span>
        </button>
      </div>

      {/* Re-play Envelope Opening Experience */}
      <div className="mt-6 mb-8 text-center">
        <button
          id="reopen-envelope-btn"
          onClick={onReopenEnvelope}
          className="inline-flex items-center gap-1.5 text-xs font-serif-lux text-[#114b4b]/80 hover:text-[#0e4343] hover:underline underline-offset-4 transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-[#d4af37]" />
          <span>Re-open Card & Envelope</span>
        </button>
      </div>
    </div>
  );
};
