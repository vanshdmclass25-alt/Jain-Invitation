import React, { useRef, useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Clock, 
  Share2, 
  Sparkles, 
  Heart, 
  Users,
  Eye,
  Volume2,
  VolumeX,
  Languages,
} from 'lucide-react';
import { InvitationData, TemplateDefinition } from '../types';
import { TEMPLATES } from '../config/templates';
import { formatDatePretty } from '../utils/storage';
import { JainLotusPrayer, OrnateArchBorder, GoldDivider } from '../config/assets';
import { MahavirSwamiImage } from './MahavirSwamiImage';
import { SereneParticleSystem } from './SereneParticleSystem';
import { LotusPranamArtwork } from './LotusPranamArtwork';
import { FestiveTemplePavilionArtwork } from './FestiveTemplePavilionArtwork';
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

interface InvitationCardProps {
  data: InvitationData;
  template?: TemplateDefinition;
  isInteractivePreview?: boolean;
  onPreviewPhoto?: (url: string) => void;
  onEdit?: () => void;
  onChangeTemplate?: () => void;
  onShareWhatsApp?: () => void;
  onWebShare?: () => void;
  onDownloadImage?: () => void;
  onOpenPrintModal?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = React.memo(({
  data,
  template,
  isInteractivePreview = false,
  onPreviewPhoto,
  onEdit,
  onChangeTemplate,
  onShareWhatsApp,
  onWebShare,
  onDownloadImage,
  onOpenPrintModal,
}) => {
  const currentTemplate = useMemo(() => template || TEMPLATES[data.selectedTemplate] || TEMPLATES.sukoon, [template, data.selectedTemplate]);
  const formattedDate = useMemo(() => formatDatePretty(data.date), [data.date]);
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = currentTemplate?.colors;
  const isDark = useMemo(() => currentTemplate.id === 'divya' || currentTemplate.id === 'param', [currentTemplate.id]);

  // Selected language for full invitation card
  const [activeLang, setActiveLang] = useState<SupportedLanguage>(
    (data.language === 'hi' ? 'hi' : data.language === 'en' ? 'en' : 'gu')
  );

  React.useEffect(() => {
    if (data.language) {
      setActiveLang(data.language === 'hi' ? 'hi' : data.language === 'en' ? 'en' : 'gu');
    }
  }, [data.language]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (cardRef.current) {
      cardRef.current.scrollTop = 0;
    }
  }, [currentTemplate.id]);

  const t = useMemo(() => TRANSLATIONS[activeLang] || TRANSLATIONS.gu, [activeLang]);

  // Auto-scroll disabled by default so guests have smooth, uninterrupted touch scroll control
  const { isAutoScrolling, stopAutoScroll } = useAutoScroll({
    delayMs: 8000,
    scrollSpeed: 1.0,
    enabled: false,
  });

  // Construct Google Maps URL if not directly set
  const mapsUrl = useMemo(() =>
    data.googleMapsUrl ||
    (data.location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`
      : 'https://maps.google.com'),
    [data.googleMapsUrl, data.location]
  );

  const familyPhotos = useMemo(() => 
    data.familyPhotos && data.familyPhotos.length > 0 ? data.familyPhotos : (data.familyPhoto ? [data.familyPhoto] : []),
    [data.familyPhotos, data.familyPhoto]
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Subtle Auto-scroll active indicator */}
      {isAutoScrolling && (
        <div 
          onClick={stopAutoScroll}
          className="fixed bottom-5 z-40 px-4 py-2 rounded-full bg-[#1A120B]/90 backdrop-blur-md text-[#FAF2DE] border border-[#D4AF37]/50 text-xs font-semibold shadow-2xl flex items-center gap-2.5 cursor-pointer hover:bg-black transition-all transform hover:scale-105"
          title="Tap to pause auto scrolling"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="font-sans text-[11px] tracking-wide">{t.autoScrollTapToPause}</span>
        </div>
      )}

      {/* The Invitation Card */}
      <div
        ref={cardRef}
        id="invitation-card-container"
        className="relative w-full max-w-xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 border"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.border,
          color: colors.text,
        }}
      >
        {/* Decorative Template Background Atmosphere */}
        <JainTempleAccents
          templateId={currentTemplate.id}
          color={colors.border}
          accentColor={colors.accentGold}
        />
        {currentTemplate.id === 'parnaUtsav' && (
          <>
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-grain" />
            <FestiveTemplePavilionArtwork variant="top-drapes" className="w-full absolute top-0 inset-x-0 z-0 opacity-85" />
          </>
        )}
        {currentTemplate.id === 'shwet' && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23C5B8A5' stroke-width='0.7'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />
        )}
        {currentTemplate.id === 'sukoon' && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-grain" />
        )}
        {currentTemplate.id === 'divya' && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0B1524] via-[#0E1B2E] to-[#0A121E]">
            <div className="absolute top-8 left-8 text-[#E5C07B] opacity-60 text-xs">✦</div>
            <div className="absolute top-16 right-10 text-[#E5C07B] opacity-40 text-sm">✧</div>
            <div className="absolute top-48 left-6 text-[#E5C07B] opacity-30 text-xs">✦</div>
            <div className="absolute top-96 right-8 text-[#E5C07B] opacity-50 text-xs">✧</div>
            <div className="absolute bottom-24 left-10 text-[#E5C07B] opacity-40 text-xs">✦</div>
          </div>
        )}
        {currentTemplate.id === 'aura' && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `radial-gradient(circle, #E8998D 1.2px, transparent 1.2px)`,
              backgroundSize: '26px 26px',
            }}
          />
        )}
        {currentTemplate.id === 'param' && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `linear-gradient(90deg, #C59B4B 1px, transparent 1px), linear-gradient(0deg, #C59B4B 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
        )}
        {currentTemplate.id === 'mangalam' && (
          <>
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-grain" />
            <FestiveTemplePavilionArtwork variant="top-drapes" className="w-full absolute top-0 inset-x-0 z-0 opacity-80" />
          </>
        )}

        {/* Ambient template-specific falling blossoms / stardust */}
        <SereneParticleSystem
          variant="ambient"
          density="subtle"
          templateTheme={currentTemplate?.colors.particleTheme}
          colorScheme={
            currentTemplate.id === 'divya'
              ? 'celestial'
              : currentTemplate.id === 'shwet' || currentTemplate.id === 'aura'
              ? 'champagne'
              : 'gold'
          }
          className="absolute inset-0 pointer-events-none z-0 opacity-60"
        />

        {/* Outer Padding Container */}
        <div className="relative p-5 sm:p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* Inner Decorative Arch Border Frame */}
          <div 
            className="absolute inset-3 sm:inset-4 rounded-xl sm:rounded-2xl border pointer-events-none"
            style={{ borderColor: `${colors.border}40` }}
          />

          {/* Reference 1: Decorative Lotus Corner Floral Accents for Sukoon */}
          {currentTemplate.id === 'sukoon' && (
            <>
              <div className="absolute top-4 right-4 pointer-events-none opacity-70">
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                  <path d="M25 45 C15 30, 10 15, 25 5 C40 15, 35 30, 25 45 Z" fill="#F7CAD0" stroke="#C29B38" strokeWidth="1" />
                  <circle cx="25" cy="20" r="4" fill="#D67595" />
                </svg>
              </div>
              <div className="absolute top-4 left-4 pointer-events-none opacity-70 scale-x-[-1]">
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                  <path d="M25 45 C15 30, 10 15, 25 5 C40 15, 35 30, 25 45 Z" fill="#F7CAD0" stroke="#C29B38" strokeWidth="1" />
                  <circle cx="25" cy="20" r="4" fill="#D67595" />
                </svg>
              </div>
            </>
          )}

          {/* 1. STARTING: LORD MAHAVEER SWAMI IS SHOWN */}
          <div className="relative z-10 w-full flex flex-col items-center pt-2 mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span 
                className="h-[1px] w-8 sm:w-16" 
                style={{ backgroundColor: `${colors.accentGold}60` }}
              />
              <span 
                className="font-hindi text-sm sm:text-base tracking-widest font-normal"
                style={{ color: colors.accentGold }}
              >
                {t.topMantra}
              </span>
              <span 
                className="h-[1px] w-8 sm:w-16" 
                style={{ backgroundColor: `${colors.accentGold}60` }}
              />
            </div>

            {/* Sacred Motif Header - Bhagwan Mahavir Swami with Glowing Aura */}
            <div className="relative my-2.5 flex items-center justify-center">
              <div className="absolute -inset-10 flex items-center justify-center pointer-events-none -z-0">
                <SereneParticleSystem
                  variant="aura"
                  density="subtle"
                  colorScheme={currentTemplate.id === 'divya' ? 'celestial' : 'gold'}
                  className="w-32 h-32 sm:w-36 sm:h-36"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <MahavirSwamiImage
                  customImageUrl={data.mahavirSwamiImage}
                  className="w-24 h-28 sm:w-28 sm:h-32 drop-shadow-sm"
                  showAura={true}
                />
              </div>
            </div>
          </div>

          {/* 2. TEXT WITH MAIN HEADLINE USER PROVIDES & TAPASVI PORTRAIT */}
          <div className="relative z-10 my-2">
            <span 
              className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium font-cinzel block mb-1"
              style={{ color: colors.subtext }}
            >
              {data.headline || t.welcomeHeadlineDefault}
            </span>

            {/* TAPASVI'S NAME - Primary Focal Point */}
            <h1 
              className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-1 mb-1 ${currentTemplate.fontHeading}`}
              style={{ color: colors.text }}
            >
              {data.name || 'Tapasvi Name'}
            </h1>

            {/* Host family tagline */}
            {data.hostNames && (
              <p 
                className="text-xs font-cormorant italic tracking-wider mt-0.5"
                style={{ color: colors.subtext }}
              >
                {t.familyHostedBy(data.hostNames)}
              </p>
            )}
          </div>

          {/* Tapasvi Portrait Photo in Ornate Arch */}
          {data.profileImage && (
            <div className="relative z-10 my-3 group">
              <div 
                className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-t-[75px] sm:rounded-t-[90px] rounded-b-xl overflow-hidden p-1 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.accentGold}, ${colors.border}, ${colors.accentGold})`,
                }}
              >
                <div className="w-full h-full rounded-t-[72px] sm:rounded-t-[86px] rounded-b-lg overflow-hidden bg-stone-100">
                  <img
                    src={data.profileImage}
                    alt={data.name || 'Tapasvi'}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Tapasvi Vandan Lotus badge */}
              <div 
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] uppercase font-cinzel font-semibold shadow-xs border flex items-center gap-1 whitespace-nowrap"
                style={{
                  backgroundColor: colors.badgeBg,
                  color: colors.badgeText,
                  borderColor: colors.border,
                }}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>{t.tapasviVandanBadge}</span>
              </div>
            </div>
          )}

          {/* Tapasya Type Badge */}
          <div className="relative z-10 mt-4 mb-2 flex flex-col items-center">
            <div 
              className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xs border my-1"
              style={{
                backgroundColor: colors.badgeBg,
                color: colors.badgeText,
                borderColor: `${colors.accentGold}80`,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.celebratingJourneyBadge}</span>
            </div>

            <h2 
              className="text-lg sm:text-xl font-bold font-cinzel mt-1 tracking-wide"
              style={{ color: colors.accentGold }}
            >
              {data.tapasyaType || t.defaultTapasyaName}
            </h2>

            <GoldDivider className="w-32 h-4 my-2" color={colors.accentGold} />
          </div>

          {/* 3. HEARTFELT INVITATION (IN ALL AVAILABLE LANGUAGES) & USER'S MESSAGE */}
          <div 
            className="relative z-10 w-full max-w-md rounded-2xl p-4 sm:p-5 my-4 border text-center backdrop-blur-xs shadow-xs"
            style={{
              backgroundColor: colors.sectionBg,
              borderColor: colors.sectionBorder,
            }}
          >
            {/* Language Selection Pills */}
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {(['gu', 'hi', 'en'] as const).map((lang) => {
                const label = lang === 'gu' ? 'ગુજરાતી' : lang === 'hi' ? 'हिंदी' : 'English';
                const isSelected = activeLang === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'shadow-xs'
                        : 'hover:bg-stone-200/50'
                    }`}
                    style={{
                      backgroundColor: isSelected ? colors.primary : 'rgba(0, 0, 0, 0.04)',
                      color: isSelected ? '#FFFFFF' : colors.text || '#2B080F',
                      borderColor: isSelected ? colors.primary : `${colors.border}60`,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Heartfelt Invitation Title */}
            <h3 
              className="font-hindi text-lg sm:text-xl font-bold tracking-wide mb-1.5"
              style={{ color: colors.accentGold }}
            >
              ॥ {t.heartfeltTitle} ॥
            </h3>

            {/* User Provided Invitation Message */}
            <p 
              className="text-xs sm:text-sm font-cormorant italic leading-relaxed whitespace-pre-line text-stone-700 max-w-sm mx-auto"
              style={{ color: colors.text }}
            >
              {data.invitationMessage || t.heartfeltDefaultMessage}
            </p>
          </div>

          {/* NEW SECTIONS TO MATCH VIDEO STRUCTURE */}
          <EventScheduleTimeline
            events={data.events}
            eventScheduleTitle={data.eventScheduleTitle}
            template={currentTemplate}
            language={activeLang}
          />
          <EventLocation
            location={data.location}
            mapsUrl={mapsUrl}
            template={currentTemplate}
            language={activeLang}
          />
          <MangalMuhurat
            date={formattedDate}
            time={data.time}
            location={data.location}
            mapsUrl={mapsUrl}
            template={currentTemplate}
            language={activeLang}
          />
          <div className="relative z-10 w-full max-w-md">
            <FlowerDevotion
              customMahavirSwamiImage={data.mahavirSwamiImage}
              template={currentTemplate}
              language={activeLang}
            />
          </div>
          <FamilyHosts
            photos={familyPhotos}
            hostNames={data.hostNames}
            template={currentTemplate}
            language={activeLang}
          />
          <YearlyJourneyTimeline
            milestones={data.yearlyPhotos}
            template={currentTemplate}
            language={activeLang}
            onPreviewPhoto={onPreviewPhoto}
          />

          {/* Additional Information (No WhatsApp RSVP) */}
          {data.additionalInformation && (
            <div 
              className="relative z-10 w-full max-w-md rounded-xl p-4 my-3 text-left border"
              style={{
                backgroundColor: colors.sectionBg,
                borderColor: colors.sectionBorder,
              }}
            >
              <span 
                className="text-[10px] uppercase font-cinzel tracking-wider font-semibold block mb-1.5"
                style={{ color: colors.subtext }}
              >
                {t.additionalInfoTitle}
              </span>
              <p 
                className="text-xs sm:text-sm leading-relaxed whitespace-pre-line"
                style={{ color: colors.text }}
              >
                {data.additionalInformation}
              </p>
            </div>
          )}

          {/* 9. Parna Vidhi & Rituals Guide */}
          <div className="relative z-10 w-full max-w-md my-4">
            <ParnaVidhiGuide
              accentColor={colors.accentGold}
              textColor={colors.text}
              isDark={isDark}
              sectionBg={colors.sectionBg}
              sectionBorder={colors.sectionBorder}
            />
          </div>

          {/* 10. Sacred Anumodna Celebration & Swami Vatsalya RSVP */}
          <div className="relative z-10 w-full max-w-md my-4">
            <AnumodnaAndRSVP
              data={data}
              accentColor={colors.accentGold}
              textColor={colors.text}
              isDark={isDark}
              sectionBg={colors.sectionBg}
              sectionBorder={colors.sectionBorder}
            />
          </div>

          {/* 11. Sacred Jain Closing Message & Reference Artworks */}
          <div className="relative z-10 mt-6 pt-4 border-t w-full max-w-md flex flex-col items-center"
            style={{ borderColor: `${colors.border}35` }}
          >
            {currentTemplate.id === 'sukoon' && (
              <div className="w-full my-2 flex justify-center">
                <LotusPranamArtwork variant="bottom-pranam" className="w-64 max-w-xs" />
              </div>
            )}

            {currentTemplate.id === 'parnaUtsav' && (
              <div className="w-full my-2 flex justify-center">
                <FestiveTemplePavilionArtwork variant="bottom-palace" className="w-full max-w-sm" />
              </div>
            )}

            {currentTemplate.id !== 'sukoon' && currentTemplate.id !== 'parnaUtsav' && (
              <div className="w-full my-2 flex justify-center opacity-80">
                <JainLotusPrayer className="w-32 h-6" color={colors.accentGold} />
              </div>
            )}

            <p 
              className="font-hindi text-base tracking-widest font-normal mt-1"
              style={{ color: colors.accentGold }}
            >
              {t.closingMantra}
            </p>
            <p 
              className="font-cormorant text-xs sm:text-sm italic mt-1 max-w-xs"
              style={{ color: colors.subtext }}
            >
              {t.closingWish}
            </p>

            {/* 10. WATERMARK & HYPERLINK TO OUR WEBSITE */}
            <div className="mt-4 pt-3 border-t w-full flex items-center justify-center gap-2"
              style={{ borderColor: `${colors.border}25` }}
            >
              <a
                href="https://jain-invitation.vercel.app/#designs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-cinzel font-semibold transition hover:scale-105 border shadow-2xs group"
                style={{
                  backgroundColor: `${colors.accentGold}10`,
                  borderColor: `${colors.accentGold}40`,
                  color: colors.text,
                }}
                title="Visit Official Website"
              >
                <div className="w-4 h-4 rounded-full overflow-hidden border border-[#D4AF37]/60">
                  <img src="/logo.png" alt="Tattva Logo" className="w-full h-full object-cover" />
                </div>
                <span>{t.craftedBy} <strong className="underline underline-offset-2 text-[#C29B38] group-hover:text-amber-500">Tattva</strong></span>
                <span className="text-[9px] text-stone-400 font-mono">jain-invitation.vercel.app</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls underneath - ONLY WhatsApp Share and Link Share */}
      <div className="w-full max-w-xl mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-2">
        {onShareWhatsApp && (
          <button
            id="share-whatsapp-btn"
            onClick={onShareWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md transition hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t.shareWhatsApp}</span>
          </button>
        )}

        {onWebShare && (
          <button
            id="web-share-btn"
            onClick={onWebShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-white shadow-md transition hover:-translate-y-0.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.shareLink}</span>
          </button>
        )}
      </div>
    </div>
  );
});
