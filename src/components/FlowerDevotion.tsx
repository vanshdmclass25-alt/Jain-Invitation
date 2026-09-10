import React, { useState, useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';

interface FlowerDevotionProps {
  customMahavirSwamiImage?: string;
  template: TemplateDefinition;
  textColor?: string;
  subtextColor?: string;
  className?: string;
  language?: SupportedLanguage;
}

interface FlowerPetal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  colorType: 'marigold' | 'rose' | 'jasmine' | 'goldPetal';
  delay: number;
  duration: number;
}

export const FlowerDevotion: React.FC<FlowerDevotionProps> = ({
  customMahavirSwamiImage,
  template,
  className = '',
  language = 'gu',
  textColor,
  subtextColor,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.gu;
  const [petals, setPetals] = useState<FlowerPetal[]>([]);
  const [flowerCount, setFlowerCount] = useState(0);
  const [isShowering, setIsShowering] = useState(false);
  if (!template) { console.error("template is undefined in FlowerDevotion!"); return null; }
  const colors = template?.colors || {};
  const appliedTextColor = textColor || colors.text;
  const appliedSubtextColor = subtextColor || colors.subtext;
  const nextId = useRef(0);

  // Play soft spiritual chime when offering flowers using Web Audio API
  const playDevotionalTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // High harmonious spiritual singing bowl / ghanti frequency (E6 / 1318.5Hz or C6 / 1046.5Hz)
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
      const selectedFreq = freqs[Math.floor(Math.random() * freqs.length)];
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(selectedFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleDevoteFlowers = () => {
    playDevotionalTone();
    setFlowerCount((prev) => prev + 1);
    setIsShowering(true);

    const types: Array<'marigold' | 'rose' | 'jasmine' | 'goldPetal'> = [
      'marigold',
      'rose',
      'jasmine',
      'goldPetal',
    ];

    // Spawn 18 flower petals cascading across the idol
    const newPetals: FlowerPetal[] = Array.from({ length: 18 }, () => {
      nextId.current += 1;
      return {
        id: nextId.current,
        x: Math.random() * 80 + 10, // 10% to 90% horizontal range
        y: Math.random() * -20 - 10, // starting above
        rotation: Math.random() * 360,
        size: Math.random() * 12 + 14,
        colorType: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 0.4,
        duration: Math.random() * 1.2 + 1.6,
      };
    });

    setPetals((prev) => [...prev.slice(-30), ...newPetals]);

    setTimeout(() => {
      setIsShowering(false);
    }, 2800);
  };

  // Hyperrealistic idol image priority
  const mahavirImageSrc =
    customMahavirSwamiImage ||
    '/bhagwan-mahavir-pic.png';

  return (
    <div className={`w-full max-w-md mx-auto my-6 text-center ${className}`}>
      {/* Devotional Header */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="h-[1px] w-8" style={{ backgroundColor: `${colors.accentGold}60` }} />
        <span 
          className="text-xs uppercase font-cinzel tracking-widest font-semibold"
          style={{ color: appliedSubtextColor }}
        >
          {t.flowerSectionBadge}
        </span>
        <span className="h-[1px] w-8" style={{ backgroundColor: `${colors.accentGold}60` }} />
      </div>

      <h3 
        className="font-hindi text-base sm:text-lg font-bold tracking-wider mb-1"
        style={{ color: colors.accentGold }}
      >
        {t.flowerTitle}
      </h3>
      <p 
        className="text-xs font-cormorant italic mb-3"
        style={{ color: appliedSubtextColor }}
      >
        {t.flowerInstruction}
      </p>

      {/* Main Temple Sanctum with Hyperrealistic Idol */}
      <div 
        className="relative rounded-3xl p-5 border-2 shadow-xl overflow-hidden flex flex-col items-center select-none"
        style={{
          background: template.id === 'divya' 
            ? 'radial-gradient(circle at 50% 30%, #152744 0%, #0D1B2A 70%, #070E18 100%)' 
            : template.id === 'sukoon'
            ? 'radial-gradient(circle at 50% 30%, #F5FAF6 0%, #EAF3EC 70%, #D8E8DC 100%)'
            : template.id === 'rajwada'
            ? 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #FAF0DE 60%, #F0DFBF 100%)'
            : 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FAF8F5 60%, #F0EDE5 100%)',
          borderColor: template?.colors.sectionBorder || `${colors.accentGold}80`,
        }}
      >
        {/* Ornate Arch Frame inside */}
        <div 
          className="absolute inset-2.5 rounded-2xl border pointer-events-none"
          style={{ borderColor: `${colors.accentGold}40` }}
        />

        {/* Ambient Divine Radiance Halo behind the Idol */}
        <div 
          className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full blur-2xl pointer-events-none top-6"
          style={{
            background: `radial-gradient(circle, ${colors.accentGold} 0%, rgba(255, 235, 160, 0.4) 40%, transparent 70%)`,
          }}
        />

        {/* HYPERREALISTIC LORD MAHAVEER SWAMI IDOL */}
        <div className="relative z-10 w-44 h-56 sm:w-52 sm:h-64 flex items-center justify-center my-1">
          <img
            src={mahavirImageSrc}
            alt="Lord Mahaveer Swami Hyperrealistic Idol"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(212,175,55,0.45)] transition-transform duration-300"
            referrerPolicy="no-referrer"
           
          />

          {/* Falling Flower Petals Animation Overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {petals.map((petal) => {
              let petalBg = 'linear-gradient(135deg, #FF9900, #FF5500)'; // Marigold
              if (petal.colorType === 'rose') {
                petalBg = 'linear-gradient(135deg, #FF1744, #C2185B)'; // Rose
              } else if (petal.colorType === 'jasmine') {
                petalBg = 'linear-gradient(135deg, #FFFFFF, #FFF9C4)'; // Jasmine
              } else if (petal.colorType === 'goldPetal') {
                petalBg = 'linear-gradient(135deg, #FFE082, #FFB300)'; // Gold petal
              }

              return (
                <div
                  key={petal.id}
                  className="absolute rounded-full shadow-xs"
                  style={{
                    left: `${petal.x}%`,
                    top: `-15px`,
                    width: `${petal.size}px`,
                    height: `${petal.size * 0.75}px`,
                    background: petalBg,
                    border: petal.colorType === 'jasmine' ? '1px solid #FFE082' : 'none',
                    borderRadius: '70% 30% 70% 30% / 50% 50% 50% 50%',
                    transform: `rotate(${petal.rotation}deg)`,
                    animation: `fallPetal ${petal.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                    animationDelay: `${petal.delay}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Auspicious Footing Inscription */}
        <div className="relative z-10 mt-2 mb-3">
          <span 
            className="font-hindi text-xs sm:text-sm font-semibold tracking-widest block"
            style={{ color: colors.accentGold }}
          >
            {t.footingMantra}
          </span>
          <span className="text-[10px] uppercase font-cinzel tracking-wider text-stone-500 font-medium">
            {t.footingSubtitle}
          </span>
        </div>

        {/* INTERACTIVE FLOWER DEVOTION BUTTON */}
        <button
          type="button"
          onClick={handleDevoteFlowers}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs sm:text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border"
          style={{
            background: 'linear-gradient(135deg, #E6AF2E 0%, #F5D77F 45%, #C29B38 100%)',
            color: '#382504',
            borderColor: '#9C7416',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.35)',
          }}
        >
          <span className="text-base animate-bounce">🌸</span>
          <span>{t.devoteFlowersBtn}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#6E4B07]" />
        </button>

        {/* Flower Count Tracker Badge */}
        {flowerCount > 0 && (
          <div className="relative z-10 mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full animate-in fade-in">
            <Heart className="w-3 h-3 fill-emerald-500 text-emerald-500" />
            <span>{t.offeredCountText(flowerCount)}</span>
          </div>
        )}
      </div>

      {/* Keyframe animation for falling flower petals */}
      <style>{`
        @keyframes fallPetal {
          0% {
            opacity: 0;
            transform: translateY(0px) rotate(0deg) scale(0.6);
          }
          15% {
            opacity: 1;
            transform: translateY(35px) rotate(45deg) scale(1);
          }
          60% {
            opacity: 0.95;
            transform: translateY(140px) rotate(180deg) scale(0.95);
          }
          90% {
            opacity: 0.9;
            transform: translateY(220px) rotate(270deg) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translateY(260px) rotate(360deg) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

