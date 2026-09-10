import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Check, Heart, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InvitationData, TemplateDefinition } from '../types';
import { playTempleBellChime } from '../utils/audio';

interface DigitalTilakCeremonyProps {
  data: InvitationData;
  template: TemplateDefinition;
  onComplete: () => void;
  onSkip: () => void;
}

export const DigitalTilakCeremony: React.FC<DigitalTilakCeremonyProps> = ({
  data,
  template,
  onComplete,
  onSkip,
}) => {
  const [tilakApplied, setTilakApplied] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 100%
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number | null>(null);
  const thaliRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const colors = template?.colors || ({} as any);

  // Cleanup auto-advance timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const handleApplyTilak = () => {
    if (tilakApplied) return;
    setTilakApplied(true);
    setDragProgress(100);

    // Auspicious temple chime sound
    playTempleBellChime();

    // Saffron, gold, and vermilion celebratory petals shower
    try {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#E53935', '#F57C00', '#FFF8E7', '#FFD54F', '#C29B38'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    // Auto-advance to full invitation after celebration
    autoAdvanceRef.current = setTimeout(() => {
      onComplete();
    }, 2400);
  };

  // Window-level listeners while dragging to guarantee release is caught
  useEffect(() => {
    if (!isDragging || tilakApplied) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (startYRef.current === null) return;
      const diff = startYRef.current - e.clientY;
      if (diff > 0) {
        const progress = Math.min(100, Math.max(0, (diff / 90) * 100));
        setDragProgress(progress);
        if (progress >= 80) {
          setIsDragging(false);
          handleApplyTilak();
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setDragProgress(0);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (startYRef.current === null || !e.touches[0]) return;
      const currentY = e.touches[0].clientY;
      const diff = startYRef.current - currentY;
      if (diff > 0) {
        const progress = Math.min(100, Math.max(0, (diff / 90) * 100));
        setDragProgress(progress);
        if (progress >= 80) {
          setIsDragging(false);
          handleApplyTilak();
        }
      }
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
      setDragProgress(0);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    window.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, tilakApplied]);

  // Touch handlers for upward swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (tilakApplied) return;
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
  };

  // Mouse handlers for desktop swipe/drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (tilakApplied) return;
    setIsDragging(true);
    startYRef.current = e.clientY;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0B07]/95 backdrop-blur-xl overflow-y-auto px-3 sm:px-4 py-6 select-none"
    >
      {/* Radiant Divine Background Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colors.accentGold} 0%, rgba(212,175,55,0.2) 40%, transparent 70%)`,
        }}
      />

      {/* Skip Button at Top Right */}
      <button
        type="button"
        onClick={onSkip}
        className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-xs font-sans tracking-wide transition flex items-center gap-1 cursor-pointer"
      >
        <span>Skip to invite</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Center Stage Container */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37]/25 via-[#F3E5AB]/20 to-[#D4AF37]/25 border border-[#D4AF37]/50 backdrop-blur-md shadow-sm mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
            <span className="font-hindi text-xs text-[#FBF5B7] font-semibold tracking-wider">
              ॥ પાવન મંગલ તિલક વિધિ ॥
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
          </div>
          <p className="text-white/70 text-[11px] font-hindi">
            પારણા મહોત્સવમાં પધારેલા સર્વે સ્નેહીજનોનું પરંપરાગત કુંકુમ તિલકથી સ્વાગત
          </p>
        </motion.div>

        {/* 1. REPRESENTATION OF THE INVITATION PATRIKA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full rounded-2xl p-4 sm:p-5 shadow-2xl border-2 flex flex-col items-center text-center overflow-hidden"
          style={{
            background: colors.cardBg,
            borderColor: colors.border,
            color: colors.text,
            boxShadow: `0 20px 40px -15px rgba(0,0,0,0.5), 0 0 25px ${colors.accentGold}35`,
          }}
        >
          {/* Top Decorative Temple Arch Border */}
          <div className="w-full flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C29B38]" />
            <span className="font-hindi text-xs font-bold tracking-widest text-[#8C5D1F]">
              ॥ ૐ શ્રી નવકારાય નમઃ ॥
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C29B38]" />
          </div>

          {/* SACRED FOREHEAD TILAK SPOT (INTERACTIVE TARGET) */}
          <div
            ref={targetRef}
            onClick={handleApplyTilak}
            className="relative my-1 w-16 h-20 flex flex-col items-center justify-center cursor-pointer group"
            title="Gently swipe up or tap here to apply Tilak"
          >
            {/* Dashed Target Ring (Before Tilak is applied) */}
            {!tilakApplied && (
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  borderColor: ['#D4AF3780', '#E5393590', '#D4AF3780'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-16 rounded-full border-2 border-dashed flex flex-col items-center justify-center bg-amber-500/5 backdrop-blur-xs"
              >
                <span className="text-[9px] font-hindi text-[#8C5D1F] font-bold opacity-80 uppercase tracking-tighter text-center leading-tight">
                  તિલક
                  <br />
                  સ્થાન
                </span>
              </motion.div>
            )}

            {/* Rising Drag Preview Dot while swiping up */}
            {isDragging && !tilakApplied && dragProgress > 10 && (
              <motion.div
                className="absolute w-5 h-8 rounded-full bg-gradient-to-b from-[#D32F2F] to-[#B71C1C] shadow-md pointer-events-none"
                style={{
                  opacity: dragProgress / 100,
                  transform: `scale(${0.6 + (dragProgress / 100) * 0.4})`,
                }}
              />
            )}

            {/* APPLIED SACRED KUMKUM & CHANDAN TILAK WITH AKSHAT (On Completion) */}
            <AnimatePresence>
              {tilakApplied && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.2, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="relative flex flex-col items-center justify-center pointer-events-none"
                >
                  {/* Radiant Golden Glow behind Tilak */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-16 h-16 rounded-full bg-amber-400/40 blur-md pointer-events-none"
                  />

                  {/* Sacred Traditional Vermilion (Kumkum) Tilak */}
                  <div className="relative w-5 h-11 rounded-t-full rounded-b-lg bg-gradient-to-b from-[#C62828] via-[#D32F2F] to-[#B71C1C] shadow-[0_2px_8px_rgba(198,40,40,0.6)] flex flex-col items-center justify-start pt-1.5">
                    {/* Golden Kesari Chandan Core */}
                    <div className="w-2.5 h-3 rounded-full bg-gradient-to-br from-[#FFE082] to-[#FFB300] shadow-xs" />
                    
                    {/* Consecrated Akshat (Sacred Rice Grains) */}
                    <div className="absolute -bottom-1 flex items-center gap-0.5">
                      <div className="w-1 h-2 rounded-full bg-white rotate-12 shadow-xs border-[0.5px] border-amber-200" />
                      <div className="w-1 h-2 rounded-full bg-white -rotate-6 shadow-xs border-[0.5px] border-amber-200" />
                      <div className="w-1 h-2 rounded-full bg-white rotate-45 shadow-xs border-[0.5px] border-amber-200" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Invitation Content Preview */}
          <div className="mt-1 space-y-1">
            <span 
              className="text-[11px] font-hindi font-bold tracking-wider block"
              style={{ color: colors.accentGold }}
            >
              ॥ શ્રી તપસ્વી પારણા મહોત્સવ ॥
            </span>
            <h3 
              className="font-hindi text-xl font-extrabold leading-tight"
              style={{ color: colors.text }}
            >
              {data.name || 'પૂજ્ય તપસ્વીશ્રી'}
            </h3>
            <p 
              className="text-xs font-hindi font-semibold"
              style={{ color: colors.accentGold }}
            >
              {data.tapasyaType || 'માસક્ષમણ તપ પારણા'}
            </p>
            <p 
              className="text-[11px] font-hindi line-clamp-1"
              style={{ color: colors.subtext }}
            >
              સૌજન્ય: {data.hostNames || 'સમસ્ત શાહ પરિવાર'}
            </p>
          </div>

          {/* Welcoming Status Badge after Tilak is applied */}
          <AnimatePresence>
            {tilakApplied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-[#D4AF37]/50 w-full"
              >
                <div className="flex items-center justify-center gap-1.5 text-rose-700 mb-0.5">
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
                  <span className="font-hindi text-xs sm:text-sm font-bold">
                    ॥ પધારો આપનું હાર્દિક સ્વાગત છે ॥
                  </span>
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
                </div>
                <p className="text-[10.5px] text-stone-600 font-hindi leading-tight">
                  મિચ્છામિ દુક્કડં! આપની પાવન ઉપસ્થિતિ અમારું અહોભાગ્ય છે.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2. TRADITIONAL BRASS POOJA THALI & SWIPE CONTROLS */}
        {!tilakApplied ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full mt-4 flex flex-col items-center"
          >
            {/* Gesture Instruction */}
            <div className="flex items-center gap-2 mb-2 text-amber-200/90 text-xs font-hindi">
              <Hand className="w-4 h-4 text-[#F5D061] animate-bounce" />
              <span>ઉપર તરફ સ્વાઇપ કરીને તિલક લગાવો (અથવા ટચ કરો)</span>
            </div>

            {/* Brass Pooja Thali with Kumkum, Chandan & Akshat */}
            <div
              ref={thaliRef}
              onTouchStart={handleTouchStart}
              onMouseDown={handleMouseDown}
              onClick={handleApplyTilak}
              className="relative w-full max-w-[280px] p-3 rounded-2xl bg-gradient-to-b from-[#8C6D2D] via-[#B8923E] to-[#6E5018] border-2 border-[#E7C978] shadow-xl flex items-center justify-around cursor-grab active:cursor-grabbing group hover:scale-102 transition-transform touch-none"
            >
              {/* Ornate Thali Rim Texture */}
              <div className="absolute inset-0 rounded-2xl border border-[#FDF0CD]/40 pointer-events-none" />

              {/* 1. Kumkum Katori (Vermilion Red) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6F61] via-[#D32F2F] to-[#801313] border-2 border-[#FFE082] shadow-inner flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#B71C1C] shadow-inner" />
                </div>
                <span className="text-[10px] font-hindi text-[#FFF8E7] font-semibold">
                  કુંકુમ
                </span>
              </div>

              {/* 2. Kesari Chandan Katori (Sandalwood Paste) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFF59D] via-[#FBC02D] to-[#E65100] border-2 border-[#FFE082] shadow-inner flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#F57F17] shadow-inner" />
                </div>
                <span className="text-[10px] font-hindi text-[#FFF8E7] font-semibold">
                  ચંદન
                </span>
              </div>

              {/* 3. Akshat Katori (Consecrated Sacred Rice) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFFDE7] via-[#FFF8E1] to-[#D7CCC8] border-2 border-[#FFE082] shadow-inner flex items-center justify-center">
                  <div className="w-5 h-5 flex flex-wrap gap-0.5 items-center justify-center">
                    <span className="w-1 h-1.5 rounded-full bg-white" />
                    <span className="w-1 h-1.5 rounded-full bg-white" />
                    <span className="w-1 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
                <span className="text-[10px] font-hindi text-[#FFF8E7] font-semibold">
                  અક્ષત
                </span>
              </div>

              {/* Upward Swipe Arrow Indicator */}
              <motion.div
                animate={{ y: [-2, -8, -2], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#E53935] text-white text-[9px] font-hindi font-bold shadow-md border border-white/40 flex items-center gap-1"
              >
                <span>↑ સ્વાઇપ કરો</span>
              </motion.div>
            </div>

            {/* Quick Action Button for Direct Tap */}
            <button
              type="button"
              onClick={handleApplyTilak}
              className="mt-3 text-xs text-amber-300/80 hover:text-amber-200 underline decoration-amber-400/50 cursor-pointer font-hindi transition"
            >
              અથવા સીધું તિલક કરવા માટે અહીં ટચ કરો
            </button>
          </motion.div>
        ) : (
          /* 3. PROCEED BUTTON ONCE TILAK IS APPLIED */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full mt-4 flex flex-col items-center"
          >
            <button
              type="button"
              onClick={onComplete}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6E8C3] to-[#ECCF8D] hover:from-[#ECCF8D] hover:to-[#D4AF37] text-[#4A2600] font-hindi font-bold text-sm sm:text-base border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#8C5D1F]" />
              <span>પાવન નિમંત્રણ પત્રિકા જુઓ (Enter)</span>
              <ArrowRight className="w-4 h-4 text-[#8C5D1F]" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
