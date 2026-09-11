import React, { useState } from 'react';
import { Heart, Calendar, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InvitationData } from '../types';
import { playTempleBellChime } from '../utils/audio';

interface AnumodnaAndRSVPProps {
  data: InvitationData;
  accentColor?: string;
  textColor?: string;
  isDark?: boolean;
  sectionBg?: string;
  sectionBorder?: string;
}

export const AnumodnaAndRSVP: React.FC<AnumodnaAndRSVPProps> = React.memo(({
  data,
  accentColor = '#C29B38',
  textColor = '#2C1810',
  isDark = false,
  sectionBg,
  sectionBorder,
}) => {
  // Anumodna state
  const [anumodnaCount, setAnumodnaCount] = useState<number>(() => {
    const saved = localStorage.getItem(`anumodna_${data.name || 'tapasvi'}`);
    return saved ? parseInt(saved, 10) : 108;
  });
  const [hasExpressedAnumodna, setHasExpressedAnumodna] = useState(false);

  const handleAnumodna = () => {
    const newCount = anumodnaCount + 1;
    setAnumodnaCount(newCount);
    setHasExpressedAnumodna(true);
    localStorage.setItem(`anumodna_${data.name || 'tapasvi'}`, newCount.toString());

    playTempleBellChime();

    try {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#F5D061', '#FFF8E7', '#C29B38', '#E5C07B'],
      });
    } catch {
      // safe fallback
    }
  };

  // Google Calendar URL Generator
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${data.name} - ${data.tapasyaType || 'Tapasya Pārna'}`);
    const details = encodeURIComponent(
      `Auspicious Tapasya Pārna Mahotsav of ${data.name}.\nHost: ${data.hostNames || 'Shah Family'}\nVenue: ${data.location}`
    );
    const location = encodeURIComponent(data.location || 'Jain Derasar');

    const cleanDate = (data.date || '2026-10-18').replace(/-/g, '');
    const dates = `${cleanDate}T030000Z/${cleanDate}T060000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Apple/Outlook .ics file download
  const handleDownloadICS = () => {
    const cleanDate = (data.date || '2026-10-18').replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tattva//Jain Parna Invitation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${data.name} - ${data.tapasyaType || 'Tapasya Pārna'}`,
      `DESCRIPTION:${data.name} Tapasya Pārna. Host: ${data.hostNames || 'Shah Family'}`,
      `LOCATION:${data.location || 'Jain Derasar'}`,
      `DTSTART:${cleanDate}T083000`,
      `DTEND:${cleanDate}T120000`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(data.name || 'tapasvi').toLowerCase()}-parna-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4 select-none">
      {/* 1. SACRED ANUMODNA (અનુમોદના) CELEBRATION BLOCK */}
      <div
        className="relative p-5 sm:p-6 rounded-2xl border text-center shadow-sm overflow-hidden"
        style={{
          background: sectionBg || (isDark ? 'rgba(27, 38, 59, 0.7)' : '#FAF6ED'),
          borderColor: sectionBorder || `${accentColor}50`,
        }}
      >
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="font-hindi text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: accentColor }}>
            ॥ તપ અનુમોદના પાવન પુષ્પ ॥
          </span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
        </div>

        <h3 className="font-hindi text-lg sm:text-xl font-bold mb-1" style={{ color: textColor }}>
          તપસ્વીની ખૂબ ખૂબ અનુમોદના!
        </h3>

        <p className="text-xs sm:text-sm max-w-md mx-auto mb-4 font-hindi opacity-85" style={{ color: textColor }}>
          જૈન દર્શન અનુસાર તપસ્વીની ભાવપૂર્વક અનુમોદના કરવાથી અનંત ગુણ પુણ્યની પ્રાપ્તિ થાય છે. એક સ્પર્શથી આપની અનુમોદના અર્પણ કરો.
        </p>

        {/* Anumodna Action Button */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleAnumodna}
            className="group px-6 py-3 rounded-full text-sm sm:text-base font-bold text-[#4A2600] bg-gradient-to-r from-[#FDE8B3] via-[#FCE09B] to-[#F7CE74] border-2 border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Heart className={`w-5 h-5 text-[#9E1B32] transition-transform group-hover:scale-125 ${hasExpressedAnumodna ? 'fill-[#9E1B32]' : ''}`} />
            <span className="font-hindi">ખૂબ ખૂબ અનુમોદના ({anumodnaCount})</span>
          </button>

          {hasExpressedAnumodna && (
            <span className="text-xs font-semibold text-emerald-600 font-hindi animate-fade-in flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> આપની પાવન અનુમોદના તપસ્વી સુધી પહોંચી ગઈ!
            </span>
          )}
        </div>
      </div>

      {/* 2. CALENDAR SYNC (ONE-TAP ADD TO CALENDAR) */}
      <div
        className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{
          background: sectionBg || (isDark ? 'rgba(13, 27, 42, 0.6)' : '#FFFDF9'),
          borderColor: sectionBorder || `${accentColor}35`,
        }}
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-hindi text-sm font-bold" style={{ color: textColor }}>
              મુહૂર્ત કેલેન્ડરમાં સાચવો
            </h4>
            <p className="text-xs opacity-75 font-sans" style={{ color: textColor }}>
              Add Pārna date & sacred muhurat to your mobile calendar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-2xs transition flex items-center gap-1.5"
          >
            <span>Google Cal</span>
          </a>
          <button
            type="button"
            onClick={handleDownloadICS}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-700 hover:bg-stone-800 text-white shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Apple / .ICS</span>
          </button>
        </div>
      </div>
    </div>
  );
});
