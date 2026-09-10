import React, { useRef, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Sparkles, 
  Heart
} from 'lucide-react';
import { InvitationData, TemplateDefinition } from '../types';
import { MahavirSwamiImage } from './MahavirSwamiImage';
import { FlowerDevotion } from './FlowerDevotion';
import { ScratchCard } from './ScratchCard';
import { YearlyJourneyTimeline } from './YearlyJourneyTimeline';
import { EventScheduleTimeline } from "./EventScheduleTimeline";
import { EventLocation } from "./EventLocation";
import { MangalMuhurat } from "./MangalMuhurat";
import { FamilyHosts } from "./FamilyHosts";
import { JainTempleAccents } from './JainTempleAccents';
import { AnumodnaAndRSVP } from './AnumodnaAndRSVP';
import { ParnaVidhiGuide } from './ParnaVidhiGuide';
import { useAutoScroll } from '../utils/useAutoScroll';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';

interface LongInvitePreviewProps {
  data: InvitationData;
  template: TemplateDefinition;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
  className?: string;
}

export const LongInvitePreview: React.FC<LongInvitePreviewProps> = ({
  data,
  template,
  isPlayingAudio = false,
  onToggleAudio,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = template?.colors || ({} as any);
  const isDarkBg = ['rajwada', 'divya', 'param', 'mangalam'].includes(template.id);
  const canvasTextColor = isDarkBg ? colors.secondary : colors.text;
  const canvasSubtextColor = isDarkBg ? 'rgba(255, 255, 255, 0.75)' : colors.subtext;
  const isDark = isDarkBg; // Changed to match isDarkBg
  const isDarkTheme = isDarkBg;

  // Selected language for preview
  const [activeLang, setActiveLang] = useState<SupportedLanguage>(
    (data.language === 'hi' ? 'hi' : data.language === 'en' ? 'en' : 'gu')
  );

  React.useEffect(() => {
    if (data.language) {
      setActiveLang(data.language === 'hi' ? 'hi' : data.language === 'en' ? 'en' : 'gu');
    }
  }, [data.language]);

  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.gu;

  // Auto-scroll the preview container after 5 seconds if reader hasn't scrolled
  const { isAutoScrolling, stopAutoScroll } = useAutoScroll({
    delayMs: 5000,
    scrollSpeed: 1.2,
    scrollIntervalMs: 25,
    containerRef: containerRef,
    enabled: true,
  });

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Sunday, 18th October 2026';

  const mapsUrl =
    data.googleMapsUrl ||
    (data.location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`
      : 'https://maps.google.com');

  const scrollToSection = (id: string) => {
    stopAutoScroll();
    if (!containerRef.current) return;
    const target = containerRef.current.querySelector(`#${id}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`relative flex flex-col h-full ${className}`}>
      {/* Phone Browser Address Bar */}
      <div 
        className="px-3.5 py-2 border-b flex items-center justify-between shrink-0 text-xs backdrop-blur-md z-20"
        style={{ 
          backgroundColor: isDark ? 'rgba(13, 27, 42, 0.95)' : 'rgba(255, 253, 249, 0.95)',
          borderColor: `${colors.border}35`
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span 
            className="font-mono text-[10.5px] truncate font-medium"
            style={{ color: isDark ? '#B0BAC7' : '#6B6862' }}
          >
            tattva.co.in/parna/{((data.name || 'riya-shah').toLowerCase()).replace(/\s+/g, '-')}
          </span>
        </div>

        {onToggleAudio && (
          <button
            type="button"
            onClick={onToggleAudio}
            title={isPlayingAudio ? 'Mute Sacred Audio' : 'Play Sacred Audio'}
            className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 transition shadow-2xs cursor-pointer"
            style={{
              backgroundColor: isPlayingAudio ? `${colors.accentGold}25` : 'transparent',
              borderColor: `${colors.accentGold}60`,
              color: colors.accentGold,
            }}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3 h-3 animate-pulse" />
                <span>Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3" />
                <span>Audio</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Floating Section Quick-Jump Nav */}
      <div 
        className="px-2 py-1.5 border-b flex items-center justify-center gap-1 shrink-0 overflow-x-auto text-[9.5px] font-semibold no-scrollbar"
        style={{
          backgroundColor: isDark ? '#0A121E' : '#FAF6EE',
          borderColor: `${colors.border}20`,
        }}
      >
        {[
          { id: 'preview-darshan', label: 'Darshan' },
          { id: 'preview-heartfelt', label: 'Heartfelt' },
          { id: 'preview-schedule', label: 'Details' },
          { id: 'preview-venue', label: 'Location' },
          { id: 'preview-journey', label: 'Milestones' },
          { id: 'preview-pushpanjali', label: 'Pushpanjali' },
          { id: 'preview-scratch', label: 'Blessing' },
          { id: 'preview-vidhi', label: 'Vidhi' },
          { id: 'preview-anumodna', label: 'Anumodna & Muhurat' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className="px-2 py-0.5 rounded-md border whitespace-nowrap transition cursor-pointer hover:brightness-110"
            style={{
              backgroundColor: isDark ? '#1B263B' : '#FFFFFF',
              borderColor: `${colors.border}40`,
              color: colors.accentGold,
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Auto-scroll Banner */}
      {isAutoScrolling && (
        <div 
          onClick={stopAutoScroll}
          className="bg-amber-400 text-stone-900 text-[10px] font-bold text-center py-0.5 px-2 flex items-center justify-center gap-1 cursor-pointer animate-pulse z-20 shrink-0"
        >
          <span>{t.autoScrollTapToPause}</span>
        </div>
      )}

      {/* CONTINUOUS SCROLLABLE LONG WEBPAGE BODY */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto scroll-smooth divide-y"
        style={{ 
          backgroundColor: colors.bg,
          borderColor: `${colors.border}25`
        }}
      >
        
        
        
        {/* SECTION 1: DARSHAN & TITLE */}
        <div 
          id="preview-darshan"
          className="relative w-full aspect-[9/16] min-h-[700px] flex flex-col items-center justify-start text-center overflow-hidden"
          style={{
            background: isDarkBg
              ? `radial-gradient(circle at 50% 20%, ${colors.primary} 0%, ${colors.bg} 100%)`
              : `radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, ${colors.bg || '#F5ECDD'} 100%)`
          }}
        >
          {/* Custom Template Background (User's Uploaded Design) */}
          {data.mahavirSwamiImage && data.mahavirSwamiImage.startsWith('data:image/') ? (
            <img 
              src={data.mahavirSwamiImage} 
              alt="Template Background" 
              className="absolute inset-0 w-full h-full object-cover z-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 z-0 flex flex-col items-center pt-24">
              <JainTempleAccents templateId={template.id} color={colors.border} accentColor={colors.accentGold} />
              
              {/* Mahavir Swami Darshan with Badge */}
              <div className="relative flex justify-center z-10 mb-8">
                <div className="relative">
                  <img
                    src={data.mahavirSwamiImage || '/bhagwan-mahavir-pic.png'}
                    alt="Mahavir Swami"
                    className="w-36 h-40 object-cover drop-shadow-2xl rounded-t-full border border-[#D4AF37]/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EA] via-transparent to-transparent opacity-80" />
                </div>
                {/* Parna Utsav Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-xl border border-[#D4AF37]/50 flex items-center gap-2 z-20">
                  <span className="text-[#D4AF37] text-xs">🏮</span>
                  <span className="font-hindi text-[11px] font-bold text-[#1F3C2C]">પાવન પારણા ઉત્સવ</span>
                  <span className="text-[#D4AF37] text-xs">🏮</span>
                </div>
              </div>
            </div>
          )}

          {/* Content Wrapper positioned in the center/blank space of their background */}
          <div className="relative z-10 w-full px-6 flex flex-col items-center mt-[280px]">
            {/* Mahaveer Namah Badge */}
            <div className="bg-[#FAF6EB]/90 backdrop-blur-sm border border-[#D4AF37]/40 rounded-full px-4 py-1.5 inline-flex items-center gap-2 shadow-sm mb-4">
              <span className="text-[#C08B46] text-sm">✨</span>
              <span className="font-hindi text-[12px] font-bold text-[#C08B46] tracking-wide">॥ श्री महावीराय नमः ॥</span>
              <span className="text-[#C08B46] text-sm">✨</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-cormorant font-bold text-[#352516] mb-3 leading-tight drop-shadow-sm">
              Tapasya Pārna<br/>Mahotsav
            </h1>
            <p className="font-cormorant italic text-base text-[#6F4E37] max-w-[280px] mx-auto leading-relaxed drop-shadow-sm font-semibold">
              Auspicious celebration of spiritual penance and soul purification
            </p>
          </div>
        </div>


        {/* SECTION 2: TAPASVI VANDAN */}
        <div className="relative py-12 px-4 text-center bg-[#FAF6EB] bg-grain border-t border-[#D4AF37]/20">
          <span className="font-hindi text-[11px] font-bold text-[#C08B46] tracking-wide mb-2 block">
            ॥ श्री महावीराय नमः ॥
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#352516] mb-1">
            Noble Tapasvi Vandan
          </h2>
          <p className="font-cormorant italic text-sm text-[#8C5D1F] mb-10">
            Tapasya Pārna Sacred Penance
          </p>
          
          {/* Tapasvi Elaborate Frame */}
          <div className="relative max-w-[220px] mx-auto z-10 mb-8">
            
            {/* Hanging Floral Elements (CSS approximated) */}
            {/* Left Lotus Stem */}
            <div className="absolute -left-10 bottom-2 w-8 h-48 border-r-2 border-emerald-600/60 rounded-tr-[50px] z-0 pointer-events-none" />
            <div className="absolute -left-12 top-20 w-4 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full rounded-bl-full transform -rotate-12 shadow-sm z-0 pointer-events-none" />
            <div className="absolute -left-16 bottom-0 w-8 h-12 bg-emerald-500/80 rounded-t-full rounded-br-full transform -rotate-45 z-0 pointer-events-none" />
            
            {/* Right Lotus Stem */}
            <div className="absolute -right-10 bottom-2 w-8 h-48 border-l-2 border-emerald-600/60 rounded-tl-[50px] z-0 pointer-events-none" />
            <div className="absolute -right-12 top-20 w-4 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full rounded-br-full transform rotate-12 shadow-sm z-0 pointer-events-none" />
            <div className="absolute -right-16 bottom-0 w-8 h-12 bg-emerald-500/80 rounded-t-full rounded-bl-full transform rotate-45 z-0 pointer-events-none" />
            
            {/* Top Lanterns */}
            <div className="absolute -top-6 left-0 w-6 h-10 border border-[#D4AF37] rounded-sm bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] opacity-80 z-20 pointer-events-none flex flex-col items-center justify-center shadow-md">
              <div className="w-4 h-6 border border-white/50 rounded-sm bg-white/20" />
            </div>
            <div className="absolute -top-6 right-0 w-6 h-10 border border-[#D4AF37] rounded-sm bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] opacity-80 z-20 pointer-events-none flex flex-col items-center justify-center shadow-md">
              <div className="w-4 h-6 border border-white/50 rounded-sm bg-white/20" />
            </div>

            {/* The Frame */}
            <div className="border border-[#D4AF37] p-1.5 bg-white shadow-xl relative z-10 rounded-sm">
              <div className="border border-[#D4AF37] rounded-lg p-2.5 relative overflow-visible bg-white">
                
                {/* Decorative Vine & Dots Overlay */}
                <div className="absolute inset-0 border border-emerald-700/50 rounded-lg transform scale-[1.04] z-20 pointer-events-none">
                  <div className="absolute -top-1 left-6 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute -top-1 right-6 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute top-12 -left-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute top-12 -right-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute bottom-1/3 -left-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute bottom-1/3 -right-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute -bottom-1 left-8 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute -bottom-1 right-8 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                </div>
                
                {/* Tapasvi Photo */}
                <div className="w-full aspect-[3/4] bg-stone-100 rounded overflow-hidden shadow-inner">
                  {data.profileImage ? (
                    <img 
                      src={data.profileImage} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      alt="Tapasvi"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" 
                      className="w-full h-full object-cover opacity-80" 
                      alt="Tapasvi Placeholder"
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* TAPASVI Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2D4B3E] text-white text-[9.5px] font-bold tracking-[0.2em] px-5 py-1.5 rounded-full z-30 shadow-md">
              TAPASVI
            </div>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight mt-1 mb-1" style={{ color: canvasTextColor }}>
            {data.name || 'Tapasvi Name'}
          </h2>
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: colors.accentGold }}>
            {data.tapasyaType || t.defaultTapasyaName}
          </p>
          {data.hostNames && (
            <p className="text-xs font-cormorant italic" style={{ color: canvasSubtextColor }}>
              {t.familyHostedBy(data.hostNames)}
            </p>
          )}
        </div>


        {/* SECTION 2: HEARTFELT INVITATION (IN ALL AVAILABLE LANGUAGES) */}
        <div 
          id="preview-heartfelt"
          className="py-6 px-4 text-center"
        >
          <div 
            className="max-w-xs mx-auto rounded-2xl p-4 border shadow-sm"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: `${colors.border}50`
            }}
          >
            {/* Language Selector */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {(['gu', 'hi', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLang(lang)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer ${
                    activeLang === lang ? 'font-bold' : 'opacity-70'
                  }`}
                  style={{
                    backgroundColor: activeLang === lang ? colors.primary : 'transparent',
                    color: activeLang === lang ? colors.secondary : canvasTextColor,
                    borderColor: activeLang === lang ? colors.primary : `${colors.border}60`,
                  }}
                >
                  {lang === 'gu' ? 'ગુજરાતી' : lang === 'hi' ? 'हिंदी' : 'English'}
                </button>
              ))}
            </div>

            <h3 
              className="font-hindi text-base font-bold tracking-wide mb-1"
              style={{ color: colors.accentGold }}
            >
              ॥ {t.heartfeltTitle} ॥
            </h3>

            <p 
              className="text-xs font-cormorant italic leading-relaxed whitespace-pre-line"
              style={{ color: colors.text }}
            >
              {data.invitationMessage || t.heartfeltDefaultMessage}
            </p>
          </div>
        </div>

        {/* NEW SECTIONS TO MATCH VIDEO STRUCTURE */}
        <EventScheduleTimeline
          events={data.events}
          template={template}
          language={activeLang}
        textColor={canvasTextColor} />
        <EventLocation
          location={data.location}
          mapsUrl={mapsUrl}
          template={template}
          language={activeLang}
        textColor={canvasTextColor} />
        <MangalMuhurat
          date={formattedDate}
          time={data.time}
          location={data.location}
          mapsUrl={mapsUrl}
          template={template}
          language={activeLang}
        textColor={canvasTextColor} />
        <div id="preview-pushpanjali">
          <FlowerDevotion customMahavirSwamiImage={data.mahavirSwamiImage} template={template} language={activeLang} textColor={canvasTextColor} subtextColor={canvasTextColor} />
        </div>
        <FamilyHosts
          photos={data.familyPhotos}
          hostNames={data.hostNames}
          template={template}
          language={activeLang}
        textColor={canvasTextColor} />
        <YearlyJourneyTimeline
          milestones={data.yearlyPhotos}
          template={template}
          language={activeLang}
        textColor={canvasTextColor} />

        {/* SECTION 7: SCRATCHABLE BOX */}
        <div id="preview-scratch" className="py-5 px-3">
          <ScratchCard
            title={data.scratchTitle || t.scratchDefaultTitle}
            hiddenMessage={data.scratchMessage || t.scratchDefaultMessage}
            template={template}
            language={activeLang}
          />
        </div>

        {/* SECTION 8: PARNA VIDHI GUIDE */}
        <div id="preview-vidhi" className="py-5 px-3">
          <ParnaVidhiGuide
            accentColor={colors.accentGold}
            textColor={colors.text}
            isDark={isDark}
            sectionBg={colors.sectionBg}
            sectionBorder={colors.sectionBorder}
          />
        </div>

        {/* SECTION 9: SACRED ANUMODNA & SWAMI VATSALYA RSVP */}
        <div id="preview-anumodna" className="py-5 px-3">
          <AnumodnaAndRSVP
            data={data}
            accentColor={colors.accentGold}
            textColor={colors.text}
            isDark={isDark}
            sectionBg={colors.sectionBg}
            sectionBorder={colors.sectionBorder}
          />
        </div>

        {/* SECTION 10: MICHHAMI DUKKADAM & WATERMARK HYPERLINK */}
        <div 
          className="py-6 px-4 text-center"
          style={{
            backgroundColor: isDark ? '#0A121E' : '#FAF6EE'
          }}
        >
          <p 
            className="font-hindi text-sm font-semibold tracking-wider"
            style={{ color: colors.accentGold }}
          >
            {t.closingMantra}
          </p>
          <p 
            className="text-[11px] font-cormorant italic mt-1 max-w-xs mx-auto"
            style={{ color: canvasSubtextColor }}
          >
            {t.closingWish}
          </p>

          {/* Watermark & Hyperlink to our website */}
          <div className="mt-4 pt-3 border-t flex items-center justify-center gap-1.5"
            style={{ borderColor: `${colors.border}30` }}
          >
            <a
              href="https://tattva.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] font-cinzel font-semibold transition hover:scale-105 border shadow-2xs"
              style={{
                backgroundColor: `${colors.accentGold}10`,
                borderColor: `${colors.accentGold}40`,
                color: canvasTextColor,
              }}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden border border-[#D4AF37]/50">
                <img src="/logo.png" alt="Tattva" className="w-full h-full object-cover" />
              </div>
              <span>{t.craftedBy} <strong className="text-[#C29B38]">Tattva</strong></span>
              <span className="text-[8.5px] text-stone-400 font-mono">www.tattva.co.in</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
