import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TemplateDefinition, InvitationData } from '../types';
import { DEFAULT_INVITATION_DATA } from '../config/templates';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { playTempleBellChime } from '../utils/audio';
import {
  OrnateArchBorder,
  JainDhyanaSymbol,
  BhagwanMahavirSwamiFigure,
} from '../config/assets';
import { MahavirSwamiImage } from './MahavirSwamiImage';
import { SereneParticleSystem } from './SereneParticleSystem';
import { DigitalTilakCeremony } from './DigitalTilakCeremony';
import confetti from 'canvas-confetti';

interface DoorRevealProps {
  template: TemplateDefinition;
  onDoorOpened: () => void;
  autoOpenDelay?: number;
  customMahavirSwamiImage?: string;
  language?: SupportedLanguage;
  invitationData?: InvitationData;
}

export const DoorReveal: React.FC<DoorRevealProps> = ({
  template,
  onDoorOpened,
  autoOpenDelay,
  customMahavirSwamiImage,
  language = 'gu',
  invitationData,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.gu;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [doorsFullyOpen, setDoorsFullyOpen] = useState(false);
  const [showTilakCeremony, setShowTilakCeremony] = useState(false);
  const [textPhase, setTextPhase] = useState<'awaits' | 'enter' | 'darshan'>('enter');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  // Auto open is strictly disabled by default so user can experience tapping the Jai Jinendra button
  useEffect(() => {
    if (autoOpenDelay && autoOpenDelay > 0) {
      const autoTimer = setTimeout(() => {
        handleOpenDoors();
      }, autoOpenDelay);
      return () => clearTimeout(autoTimer);
    }
  }, [autoOpenDelay]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const handleOpenDoors = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    playTempleBellChime();

    // Trigger celebratory soft gold particles
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#FFFDF9', '#C29B38', '#E5C07B'],
        disableForReducedMotion: true,
      });
    } catch {
      // noop
    }

    // When the doors complete their swing, mark them as fully opened
    timerRef.current = setTimeout(() => {
      setDoorsFullyOpen(true);
      setTextPhase('darshan');
    }, 1400);

    // Transition to Digital Tilak ceremony after appreciating Bhagwan Mahavir Swami
    autoAdvanceRef.current = setTimeout(() => {
      setShowTilakCeremony(true);
    }, 4200);
  };

  const handleProceed = () => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    setShowTilakCeremony(true);
  };

  const handleStageClick = () => {
    if (!isOpening) {
      handleOpenDoors();
    } else if (doorsFullyOpen) {
      handleProceed();
    }
  };

  // If user transitions to the Digital Tilak ceremony
  if (showTilakCeremony) {
    return (
      <DigitalTilakCeremony
        data={invitationData || DEFAULT_INVITATION_DATA}
        template={template}
        onComplete={() => {
          setIsOpen(true);
          onDoorOpened();
        }}
        onSkip={() => {
          setIsOpen(true);
          onDoorOpened();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#110D09]/95 backdrop-blur-xl overflow-hidden px-4">
      {/* Radiant Divine Light Glow behind the doorway */}
      <motion.div
        animate={{
          scale: isOpening ? [1, 1.4, 2] : [1, 1.08, 1],
          opacity: isOpening ? [0.4, 0.9, 1] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isOpening ? 1.5 : 3,
          repeat: isOpening ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[600px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${template?.colors.accentGold} 0%, ${template.ambientLight} 45%, transparent 70%)`,
        }}
      />

      {/* Ambient Floating Spiritual Particles */}
      <SereneParticleSystem
        variant="ambient"
        density="medium"
        colorScheme={template.id === 'divya' ? 'celestial' : template.id === 'shwet' ? 'champagne' : 'gold'}
        templateTheme={template?.colors.particleTheme}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Main Doorway Architecture Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md h-[86vh] max-h-[750px] flex flex-col items-center justify-between">
        {/* Top Spiritual Text Badge */}
        <div className="text-center pt-2 pb-2">
          <AnimatePresence mode="wait">
            {textPhase === 'awaits' ? (
              <motion.div
                key="awaits"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/30 backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span className="font-cinzel text-xs sm:text-sm text-[#F7F2E7] tracking-[0.2em] font-medium uppercase">
                  {t.doorSacredAwaits}
                </span>
              </motion.div>
            ) : textPhase === 'enter' ? (
              <motion.div
                key="enter"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 backdrop-blur-md shadow-lg shadow-[#D4AF37]/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB] animate-pulse" />
                <span className="font-cinzel text-xs sm:text-sm text-[#FBF5B7] tracking-[0.2em] font-semibold uppercase">
                  {t.doorTapToEnter}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="darshan"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/25 via-[#F3E5AB]/25 to-[#D4AF37]/25 border border-[#D4AF37]/60 backdrop-blur-md shadow-lg shadow-[#D4AF37]/15"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7]" />
                <span className="font-hindi text-xs sm:text-sm text-[#FBF5B7] tracking-wider font-normal">
                  {t.topMantra}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3D Doorway Stage - Matches Reference 3 (House warming invite ✨.jpeg) */}
        <div 
          onClick={handleStageClick}
          className="relative w-full flex-1 flex flex-col items-center cursor-pointer select-none perspective-1200 group"
          title={isOpening ? 'Click to proceed to invitation' : 'Tap or click to open the doors'}
        >
          {/* Outer Wall with Diamond Jali Pattern */}
          <div 
            className="relative w-full h-full rounded-t-[130px] sm:rounded-t-[150px] p-3 sm:p-4 shadow-2xl border-2 flex flex-col items-center overflow-hidden"
            style={{
              background: template?.colors.doorWallGradient,
              borderColor: `${template?.colors.accentGold}B0`,
            }}
          >
            {/* Diamond Jali Lattice Background Watermark */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0 L36 18 L18 36 L0 18 Z' fill='none' stroke='%23B97858' stroke-width='0.8'/%3E%3Ccircle cx='18' cy='18' r='1.5' fill='%23B97858' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '28px 28px',
              }}
            />

            {/* Top Ornamental Header with Mantra */}
            <div className="relative z-10 w-full flex flex-col items-center pt-1 pb-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="h-[1.5px] w-10 sm:w-14" style={{ background: `linear-gradient(to right, transparent, ${template?.colors.accentGold})` }} />
                <span 
                  className="font-hindi text-base sm:text-lg tracking-wider font-bold"
                  style={{ color: ['shwet', 'aura', 'sukoon'].includes(template.id) ? template?.colors.text : '#FFFFFF' }}
                >
                  {t.jaiJinendra}
                </span>
                <span className="h-[1.5px] w-10 sm:w-14" style={{ background: `linear-gradient(to left, transparent, ${template?.colors.accentGold})` }} />
              </div>
              <span 
                className="text-[11px] font-cinzel font-semibold tracking-wider"
                style={{ color: template?.colors.accentGold }}
              >
                {t.doorCeremonyHeader}
              </span>
              <div className="w-32 opacity-90 mt-0.5">
                <OrnateArchBorder className="w-full h-3" color={template?.colors.accentGold} />
              </div>
            </div>

            {/* Door Portal Opening Viewport with Scalloped Top Arch */}
            <div 
              className="relative w-full flex-1 rounded-t-[110px] sm:rounded-t-[130px] overflow-hidden flex transform-style-3d border-2 shadow-inner"
              style={{
                background: template?.colors.sectionBg,
                borderColor: `${template?.colors.accentGold}90`,
              }}
            >
              
              {/* Divine Chamber Interior (Revealed when doors swing open) */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-between p-4 sm:p-5 text-center overflow-hidden"
                style={{
                  background: template.id === 'divya' 
                    ? 'radial-gradient(circle at 50% 30%, #152744 0%, #0D1B2A 70%, #070E18 100%)' 
                    : template.id === 'sukoon'
                    ? 'radial-gradient(circle at 50% 30%, #F5FAF6 0%, #EAF3EC 70%, #D8E8DC 100%)'
                    : template.id === 'parnaUtsav'
                    ? 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #FAF0DE 60%, #F0DFBF 100%)'
                    : 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FAF8F5 60%, #F0EDE5 100%)',
                  color: template?.colors.text,
                }}
              >
                {/* Serene glowing aura particle system inside inner temple chamber */}
                <SereneParticleSystem
                  variant="aura"
                  density="rich"
                  colorScheme={template.id === 'divya' ? 'celestial' : template.id === 'shwet' ? 'champagne' : 'gold'}
                  templateTheme={template?.colors.particleTheme}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />

                {/* Soft ambient golden back-glow */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* SPIRITUAL CENTERPIECE: BHAGWAN MAHAVIR SWAMI FIGURE WITH SMOOTH DELAYED FADE-IN */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 16, filter: 'blur(4px)' }}
                  animate={
                    isOpening
                      ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, scale: 0.88, y: 16, filter: 'blur(4px)' }
                  }
                  transition={{
                    duration: 1.3,
                    delay: 1.4, // Smooth delayed entry: initiates right after the doors have fully opened!
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative z-10 flex flex-col items-center justify-center my-auto w-full"
                >
                  {/* Top Auspicious Inscription */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={isOpening ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.9, delay: 1.6, ease: 'easeOut' }}
                    className="mb-1 flex items-center gap-2"
                  >
                    <span className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="font-hindi text-xs sm:text-sm text-[#9C7A28] tracking-widest font-semibold">
                      ॥ ॐ नमो जिणाणं ॥
                    </span>
                    <span className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </motion.div>

                  {/* Divine Halo & Bhagwan Mahavir Swami Pratima Figure */}
                  <div className="relative my-0.5 sm:my-1 flex items-center justify-center">
                    {/* Concentric Divine Bhamandala Aura Glow */}
                    <motion.div
                      animate={
                        isOpening
                          ? {
                              scale: [1, 1.12, 1],
                              opacity: [0.45, 0.8, 0.45],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2.0,
                      }}
                      className="absolute -inset-8 sm:-inset-10 rounded-full bg-gradient-to-r from-[#D4AF37]/25 via-[#FFF4D0]/35 to-[#D4AF37]/25 blur-2xl pointer-events-none -z-10"
                    />

                    <MahavirSwamiImage
                      customImageUrl={customMahavirSwamiImage}
                      className="w-36 h-44 sm:w-44 sm:h-52 drop-shadow-[0_8px_20px_rgba(212,175,55,0.25)] transition-transform"
                      showAura={true}
                    />
                  </div>

                  {/* Reverent Blessing & Inscription from Reference 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isOpening ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.8, delay: 1.85, ease: 'easeOut' }}
                    className="mt-1 flex flex-col items-center px-4"
                  >
                    <span className="font-hindi text-base sm:text-lg font-bold text-[#8C5D1F] tracking-widest">
                      {t.topMantra}
                    </span>
                    <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#5A4018] uppercase font-semibold mt-0.5">
                      {t.eventHeadingDefault}
                    </span>
                    <h3 className="font-cormorant text-lg sm:text-2xl font-bold text-stone-900 italic leading-tight">
                      {t.celebratingJourneyBadge}
                    </h3>
                  </motion.div>

                  {/* Action Button to enter the invitation via Tilak */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={isOpening ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.8, delay: 2.15, ease: 'easeOut' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProceed();
                    }}
                    className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C29B38] text-[#261C0B] font-hindi text-xs tracking-wider font-bold shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border border-[#AA771C]/40 cursor-pointer"
                  >
                    <span>॥ મંગલ તિલક અને પ્રવેશ ॥</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>

              {/* LEFT DOOR LEAF */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={isOpening ? { rotateY: -105 } : { rotateY: 0 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  transformOrigin: 'left center',
                  background: template?.colors.doorWoodGradient,
                }}
                className="w-1/2 h-full border-r relative flex flex-col justify-between shadow-2xl backface-hidden z-20 overflow-hidden"
              >
                {/* Door Sandstone Plaster Texture */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${template?.colors.accentGold} 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Subtle Inner Border Frame */}
                <div 
                  className="absolute inset-2 border pointer-events-none"
                  style={{ borderColor: `${template?.colors.doorTrimGold}50` }}
                />

                {/* ORNATE GOLD FLOWER RING KNOCKER */}
                <div className="absolute top-1/2 right-2.5 -translate-y-1/2 flex flex-col items-center select-none">
                  {/* 8-Petal Filigree Floral Rosette Backplate */}
                  <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <defs>
                        <radialGradient id="knockerGoldGradLeft" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FFF4D0" />
                          <stop offset="40%" stopColor={template?.colors.doorKnockerColor} />
                          <stop offset="75%" stopColor={template?.colors.doorTrimGold} />
                          <stop offset="100%" stopColor="#553A0A" />
                        </radialGradient>
                      </defs>
                      {/* 8 Scalloped Petals */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <circle
                          key={`petal-${deg}`}
                          cx={50 + 26 * Math.cos((deg * Math.PI) / 180)}
                          cy={50 + 26 * Math.sin((deg * Math.PI) / 180)}
                          r="15"
                          fill="url(#knockerGoldGradLeft)"
                          stroke="#754E0E"
                          strokeWidth="2.5"
                        />
                      ))}
                      {/* Central Raised Boss / Stud */}
                      <circle cx="50" cy="50" r="20" fill="url(#knockerGoldGradLeft)" stroke="#754E0E" strokeWidth="3" />
                      <circle cx="50" cy="50" r="10" fill="#FFEAA8" />
                    </svg>

                    {/* Hanging Twisted Rope Gold Ring Pull */}
                    <div 
                      className="absolute top-6 w-9 h-11 rounded-full border-[4.5px] shadow-lg group-hover:rotate-6 transition-transform origin-top flex items-center justify-center"
                      style={{
                        borderColor: template?.colors.doorTrimGold,
                        boxShadow: '0 5px 8px rgba(0,0,0,0.35)',
                      }}
                    >
                      <div className="w-5 h-7 rounded-full border border-[#FFF3CF] opacity-60" />
                    </div>
                  </div>
                </div>

                {/* Auspicious Shubh Inscription at Base */}
                <div className="relative z-10 mt-auto pb-3 pl-3">
                  <span className="font-hindi text-xs tracking-widest" style={{ color: `${template?.colors.accentGold}E0` }}>
                    {t.doorShubhLabhLeft}
                  </span>
                </div>
              </motion.div>

              {/* RIGHT DOOR LEAF */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={isOpening ? { rotateY: 105 } : { rotateY: 0 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  transformOrigin: 'right center',
                  background: template?.colors.doorWoodGradient,
                }}
                className="w-1/2 h-full border-l relative flex flex-col justify-between shadow-2xl backface-hidden z-20 overflow-hidden"
              >
                {/* Door Texture */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${template?.colors.accentGold} 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Subtle Inner Border Frame */}
                <div 
                  className="absolute inset-2 border pointer-events-none"
                  style={{ borderColor: `${template?.colors.doorTrimGold}50` }}
                />

                {/* ORNATE GOLD FLOWER RING KNOCKER */}
                <div className="absolute top-1/2 left-2.5 -translate-y-1/2 flex flex-col items-center select-none">
                  {/* 8-Petal Filigree Floral Rosette Backplate */}
                  <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <defs>
                        <radialGradient id="knockerGoldGradRight" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FFF4D0" />
                          <stop offset="40%" stopColor={template?.colors.doorKnockerColor} />
                          <stop offset="75%" stopColor={template?.colors.doorTrimGold} />
                          <stop offset="100%" stopColor="#553A0A" />
                        </radialGradient>
                      </defs>
                      {/* 8 Scalloped Petals */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <circle
                          key={`petal-r-${deg}`}
                          cx={50 + 26 * Math.cos((deg * Math.PI) / 180)}
                          cy={50 + 26 * Math.sin((deg * Math.PI) / 180)}
                          r="15"
                          fill="url(#knockerGoldGradRight)"
                          stroke="#754E0E"
                          strokeWidth="2.5"
                        />
                      ))}
                      {/* Central Raised Boss / Stud */}
                      <circle cx="50" cy="50" r="20" fill="url(#knockerGoldGradRight)" stroke="#754E0E" strokeWidth="3" />
                      <circle cx="50" cy="50" r="10" fill="#FFEAA8" />
                    </svg>

                    {/* Hanging Twisted Rope Gold Ring Pull */}
                    <div 
                      className="absolute top-6 w-9 h-11 rounded-full border-[4.5px] shadow-lg group-hover:-rotate-6 transition-transform origin-top flex items-center justify-center"
                      style={{
                        borderColor: template?.colors.doorTrimGold,
                        boxShadow: '0 5px 8px rgba(0,0,0,0.35)',
                      }}
                    >
                      <div className="w-5 h-7 rounded-full border border-[#FFF3CF] opacity-60" />
                    </div>
                  </div>
                </div>

                {/* Auspicious Labh Inscription at Base */}
                <div className="relative z-10 mt-auto pb-3 pr-3 flex justify-end">
                  <span className="font-hindi text-xs tracking-widest" style={{ color: `${template?.colors.accentGold}E0` }}>
                    {t.doorShubhLabhRight}
                  </span>
                </div>
              </motion.div>

              {/* Vertical Door Seam Shadow Line (Reference 3) */}
              <div 
                className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#A56B48] via-[#7D4829] to-[#542B15] pointer-events-none transition-opacity duration-300 z-30 shadow-xs ${
                  isOpening ? 'opacity-0' : 'opacity-100'
                }`} 
              />

              {/* SACRED JAI JINENDRA ENTRANCE BUTTON & CEREMONIAL SEAL */}
              {!isOpening && !doorsFullyOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDoors();
                  }}
                >
                  {/* Concentric Divine Halo Rings */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-44 h-44 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                    <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-amber-300/30 via-yellow-200/40 to-amber-400/30 blur-sm pointer-events-none" />

                    {/* Auspicious Medallion Button */}
                    <button
                      id="jai-jinendra-entrance-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDoors();
                      }}
                      className="relative px-6 py-4 rounded-2xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E2] to-[#F1E4C3] border-2 border-[#D4AF37] shadow-[0_10px_28px_rgba(74,38,0,0.45)] hover:shadow-[0_12px_36px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group"
                    >
                      {/* Auspicious top miniature symbols */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#C29B38] text-xs">卐</span>
                        <span className="font-hindi text-[11px] font-bold text-[#8C5D1F] tracking-widest">
                          ॥ શ્રી મહાવીરાય નમઃ ॥
                        </span>
                        <span className="text-[#C29B38] text-xs">卐</span>
                      </div>

                      {/* MAIN GUJARATI JAI JINENDRA CALLIGRAPHY */}
                      <span className="font-hindi text-2xl sm:text-3xl font-extrabold tracking-wide text-[#5C1D06] drop-shadow-xs group-hover:text-[#7A1224] transition-colors">
                        જય જિનેન્દ્ર
                      </span>

                      {/* Subtitle sacred prompt */}
                      <div className="mt-1.5 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8C5D1F]/10 border border-[#C29B38]/40">
                        <Sparkles className="w-3 h-3 text-[#B8860B] animate-pulse" />
                        <span className="text-[11px] font-semibold text-[#5A380A] tracking-wide">
                          પાવન પ્રવેશ માટે સ્પર્શ કરો
                        </span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Tap Helper / Skip Bar */}
        <div className="w-full pt-3 pb-2 flex items-center justify-between px-2 text-xs text-stone-300">
          {!doorsFullyOpen ? (
            <button
              onClick={handleOpenDoors}
              disabled={isOpening}
              className="flex items-center gap-1.5 text-[#F5E5B8] hover:text-white transition font-cinzel tracking-wider text-xs underline underline-offset-4 cursor-pointer"
            >
              <span>{t.doorTapToEnter}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleProceed}
              className="flex items-center gap-1.5 text-[#F5E5B8] hover:text-white transition font-cinzel tracking-wider text-xs underline underline-offset-4 cursor-pointer"
            >
              <span>{t.doorEnterTemple}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleProceed}
            className="text-stone-400 hover:text-stone-200 transition text-[11px] cursor-pointer"
          >
            {t.doorSkipAnimation}
          </button>
        </div>
      </div>
    </div>
  );
};

