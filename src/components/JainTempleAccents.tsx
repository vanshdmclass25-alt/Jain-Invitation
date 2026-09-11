import React from 'react';
import { TemplateId } from '../types';

interface JainTempleAccentsProps {
  templateId: TemplateId;
  color: string;
  accentColor: string;
}

/**
 * Ashtamangala - The 8 Auspicious Symbols of Jain Tradition
 * Swastik, Shrivatsa, Nandyavarta, Vardhamanaka, Kalash, Matsya, Darpana, Bhadrasana
 */
export const AshtamangalaRow: React.FC<{ color?: string; className?: string }> = React.memo(({
  color = '#D4AF37',
  className = 'w-full',
}) => {
  return (
    <div className={`flex items-center justify-around py-1.5 opacity-90 ${className}`}>
      {/* 1. Swastik (Four states of existence & infinite bliss) */}
      <span className="text-xs sm:text-sm font-bold" style={{ color }} title="Swastik">卐</span>
      
      {/* 2. Shrivatsa (Mark of infinite compassion on chest) */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill={color} className="opacity-90">
        <polygon points="12,2 16,8 14,8 18,14 12,10 6,14 10,8 8,8" />
        <circle cx="12" cy="18" r="3" />
      </svg>

      {/* 3. Nandyavarta (Nine-pointed holy labyrinth) */}
      <span className="text-xs font-serif font-bold" style={{ color }} title="Nandyavarta">❋</span>

      {/* 4. Vardhamanaka (Twin nested shallow plates/diyas) */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <ellipse cx="12" cy="8" rx="7" ry="3" />
        <ellipse cx="12" cy="15" rx="9" ry="4" />
      </svg>

      {/* 5. Kalash (Sacred vessel of auspicious nectar) */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="7" r="2" fill={color} />
        <path d="M7 11 C7 11 8 9 12 9 C16 9 17 11 17 11 L19 14 C20 18 17 21 12 21 C7 21 4 18 5 14 Z" fill={color} fillOpacity="0.2" />
        <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" />
      </svg>

      {/* 6. Matsya Yugala (Twin fish of serenity) */}
      <span className="text-xs font-serif" style={{ color }} title="Matsya Yugala">࿊</span>

      {/* 7. Darpana (Auspicious mirror of self-reflection) */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="9" r="6" />
        <line x1="12" y1="15" x2="12" y2="22" />
        <line x1="9" y1="22" x2="15" y2="22" />
      </svg>

      {/* 8. Bhadrasana (Sacred spiritual throne) */}
      <span className="text-xs font-bold" style={{ color }} title="Bhadrasana">卐</span>
    </div>
  );
});

/**
 * Hanging Temple Bells with Auspicious Mango Leaf (Aso Palav) Garlands
 */
export const TempleBellHanging: React.FC<{ color?: string; side?: 'left' | 'right' }> = React.memo(({
  color = '#D4AF37',
  side = 'left',
}) => {
  return (
    <div className={`flex flex-col items-center select-none ${side === 'right' ? 'items-end' : 'items-start'}`}>
      {/* Hanging Chain */}
      <div className="w-[1px] h-6 sm:h-8" style={{ backgroundColor: `${color}80` }} />
      {/* Bell Dome */}
      <div className="relative flex flex-col items-center">
        <svg width="18" height="20" viewBox="0 0 24 26" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M12 2 C7 2 5 7 5 14 L3 19 L21 19 L19 14 C19 7 17 2 12 2 Z" fill={color} fillOpacity="0.25" />
          <circle cx="12" cy="22" r="2.5" fill={color} />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </div>
    </div>
  );
});

/**
 * Ornate Template-Specific Frame & Motifs
 * Completely differentiates the 4 templates visually
 */
export const JainTempleAccents: React.FC<JainTempleAccentsProps> = React.memo(({
  templateId,
  color,
  accentColor,
}) => {
  if (templateId === 'parnaUtsav') {
    // 1. RAJWADA: Jaipur Haveli & Royal Patan Sandstone, Vermilion Kumkum Accents, Grand Scalloped Jharokha
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Top Royal Haveli Drapes & Scalloped Arch */}
        <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#8B1828]/25 via-[#D4AF37]/15 to-transparent flex items-start justify-between px-4 pt-1.5">
          <TempleBellHanging color={accentColor} side="left" />
          <div className="flex-1 max-w-xs mx-auto">
            <AshtamangalaRow color={accentColor} />
          </div>
          <TempleBellHanging color={accentColor} side="right" />
        </div>

        {/* Regal Kundan Gold & Kumkum Corner Medallions */}
        <div className="absolute top-2.5 left-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#D4AF37] bg-[#8B1828]/15 text-[10px] text-[#D4AF37]">
          ❖
        </div>
        <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#D4AF37] bg-[#8B1828]/15 text-[10px] text-[#D4AF37]">
          ❖
        </div>
        <div className="absolute bottom-2.5 left-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#D4AF37] bg-[#8B1828]/15 text-[10px] text-[#D4AF37]">
          ❖
        </div>
        <div className="absolute bottom-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#D4AF37] bg-[#8B1828]/15 text-[10px] text-[#D4AF37]">
          ❖
        </div>

        {/* Double Gold Leaf Haveli Arch Border */}
        <div
          className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: `${accentColor}80` }}
        />
        <div
          className="absolute inset-3.5 sm:inset-5 rounded-lg sm:rounded-xl border pointer-events-none"
          style={{ borderColor: `${color}40`, borderStyle: 'solid' }}
        />
      </div>
    );
  }

  if (templateId === 'shwet') {
    // 2. SHWET: Pure Makrana White Marble, Geometric Derasar Jali, Platinum Filigree, Lotus Serenity
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Subtle Derasar Marble Jali Lattice Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Makrana Marble Sanctuary Arch Frame */}
        <div
          className="absolute inset-2.5 sm:inset-3.5 rounded-xl sm:rounded-2xl border pointer-events-none"
          style={{ borderColor: `${accentColor}50` }}
        />
        <div
          className="absolute inset-4 sm:inset-5 rounded-lg sm:rounded-xl border pointer-events-none"
          style={{ borderColor: `${accentColor}25` }}
        />

        {/* Minimalist Sacred Lotus Corner Filigree */}
        <div className="absolute top-4 left-4 opacity-70">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none" stroke={accentColor} strokeWidth="1">
            <path d="M20 5 C15 15, 5 15, 5 25 C15 35, 25 35, 35 25 C35 15, 25 15, 20 5 Z" />
            <circle cx="20" cy="22" r="3" fill={accentColor} />
          </svg>
        </div>
        <div className="absolute top-4 right-4 opacity-70 scale-x-[-1]">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none" stroke={accentColor} strokeWidth="1">
            <path d="M20 5 C15 15, 5 15, 5 25 C15 35, 25 35, 35 25 C35 15, 25 15, 20 5 Z" />
            <circle cx="20" cy="22" r="3" fill={accentColor} />
          </svg>
        </div>
      </div>
    );
  }

  if (templateId === 'sukoon') {
    // 3. SUKOON: Pistachio Silk, Sacred Sandalwood Chandan, Delicate Pink Lotus Buds & Botanical Serenity
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Soft Pistachio Silk & Chandan Hairline */}
        <div
          className="absolute inset-2.5 sm:inset-3.5 rounded-xl sm:rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: `${color}40` }}
        />
        <div
          className="absolute inset-4 sm:inset-5 rounded-lg sm:rounded-xl border pointer-events-none"
          style={{ borderColor: `${accentColor}35` }}
        />

        {/* Blooming Pink Lotus Corners with Soft Watercolor Leaves */}
        <div className="absolute top-3 left-3 opacity-90">
          <svg width="34" height="34" viewBox="0 0 50 50" fill="none">
            <path d="M25 42 C16 30, 10 16, 25 6 C40 16, 34 30, 25 42 Z" fill="#FCE7EC" stroke="#D1758B" strokeWidth="1.2" />
            <path d="M15 35 C8 26, 8 16, 20 14" stroke="#D1758B" strokeWidth="1" />
            <path d="M35 35 C42 26, 42 16, 30 14" stroke="#D1758B" strokeWidth="1" />
            <circle cx="25" cy="22" r="3.5" fill="#C86D7C" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 opacity-90 scale-x-[-1]">
          <svg width="34" height="34" viewBox="0 0 50 50" fill="none">
            <path d="M25 42 C16 30, 10 16, 25 6 C40 16, 34 30, 25 42 Z" fill="#FCE7EC" stroke="#D1758B" strokeWidth="1.2" />
            <path d="M15 35 C8 26, 8 16, 20 14" stroke="#D1758B" strokeWidth="1" />
            <path d="M35 35 C42 26, 42 16, 30 14" stroke="#D1758B" strokeWidth="1" />
            <circle cx="25" cy="22" r="3.5" fill="#C86D7C" />
          </svg>
        </div>
        <div className="absolute bottom-3 left-3 opacity-75 scale-y-[-1]">
          <svg width="28" height="28" viewBox="0 0 50 50" fill="none">
            <path d="M25 42 C16 30, 10 16, 25 6 C40 16, 34 30, 25 42 Z" fill="#FCE7EC" stroke="#D1758B" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 opacity-75 scale-[-1]">
          <svg width="28" height="28" viewBox="0 0 50 50" fill="none">
            <path d="M25 42 C16 30, 10 16, 25 6 C40 16, 34 30, 25 42 Z" fill="#FCE7EC" stroke="#D1758B" strokeWidth="1" />
          </svg>
        </div>
      </div>
    );
  }

  if (templateId === 'aura') {
    // 5. AURA (Gen Z Aesthetic): Editorial oat milk minimalism, delicate blush arch, contemporary aesthetics
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Soft Aesthetic Frosted Border */}
        <div
          className="absolute inset-2.5 sm:inset-3.5 rounded-2xl border pointer-events-none"
          style={{ borderColor: `${accentColor}40` }}
        />
        <div
          className="absolute inset-4 sm:inset-5 rounded-xl border pointer-events-none"
          style={{ borderColor: '#E8998D35' }}
        />

        {/* Gen Z Contemporary Minimalist Floral Corners */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1 opacity-80">
          <span className="text-[#E8998D] text-xs">✿</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76D]/60 inline-block"></span>
        </div>
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 opacity-80 flex-row-reverse">
          <span className="text-[#E8998D] text-xs">✿</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76D]/60 inline-block"></span>
        </div>
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 opacity-80">
          <span className="text-[#E8998D] text-xs">✿</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76D]/60 inline-block"></span>
        </div>
        <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 opacity-80 flex-row-reverse">
          <span className="text-[#E8998D] text-xs">✿</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76D]/60 inline-block"></span>
        </div>
      </div>
    );
  }

  if (templateId === 'param') {
    // 6. PARAM (Mid-Age Sophisticated Luxury): Rich Espresso Mocha, Architectural Pinstripes & 24K Bronze
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Precision Bronze Tailored Double Inlay */}
        <div
          className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: `${accentColor}75` }}
        />
        <div
          className="absolute inset-3.5 sm:inset-4.5 rounded-lg sm:rounded-xl border pointer-events-none"
          style={{ borderColor: `${color}35` }}
        />

        {/* Sophisticated Architectural Corner Brackets */}
        <div className="absolute top-3 left-3 text-[11px] font-mono tracking-widest text-[#C59B4B] opacity-90">
          ┌
        </div>
        <div className="absolute top-3 right-3 text-[11px] font-mono tracking-widest text-[#C59B4B] opacity-90">
          ┐
        </div>
        <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-widest text-[#C59B4B] opacity-90">
          └
        </div>
        <div className="absolute bottom-3 right-3 text-[11px] font-mono tracking-widest text-[#C59B4B] opacity-90">
          ┘
        </div>

        {/* Subtle center chevron crest */}
        <div className="absolute top-2 inset-x-0 flex justify-center opacity-70">
          <span className="text-[10px] tracking-widest text-[#C59B4B]">━ ◈ ━</span>
        </div>
      </div>
    );
  }

  if (templateId === 'mangalam') {
    // 7. MANGALAM (Elders Traditional): Auspicious Saffron Marigold Toran, Ashtamangala, Bells & Swastik
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Sacred Saffron & Chandan Top Toran Festoon */}
        <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#B33C00]/25 via-[#C88719]/15 to-transparent flex items-start justify-between px-4 pt-1.5">
          <TempleBellHanging color={accentColor} side="left" />
          <div className="flex-1 max-w-xs mx-auto">
            <AshtamangalaRow color={accentColor} />
          </div>
          <TempleBellHanging color={accentColor} side="right" />
        </div>

        {/* Sacred Auspicious Swastik / Om Corner Crests */}
        <div className="absolute top-2.5 left-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#C88719] bg-[#FFF8E6] text-[10px] font-bold text-[#B33C00]">
          卐
        </div>
        <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#C88719] bg-[#FFF8E6] text-[10px] font-bold text-[#B33C00]">
          卐
        </div>
        <div className="absolute bottom-2.5 left-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#C88719] bg-[#FFF8E6] text-[10px] font-bold text-[#B33C00]">
          卐
        </div>
        <div className="absolute bottom-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full border border-[#C88719] bg-[#FFF8E6] text-[10px] font-bold text-[#B33C00]">
          卐
        </div>

        {/* Auspicious Double Brass Gold Border */}
        <div
          className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: `${accentColor}80` }}
        />
        <div
          className="absolute inset-3.5 sm:inset-5 rounded-lg sm:rounded-xl border pointer-events-none"
          style={{ borderColor: `${color}40`, borderStyle: 'solid' }}
        />
      </div>
    );
  }

  // 4. DIVYA: Midnight Celestial Ratnatraya Aarti & 24K Gold Filigree
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Twinkling Celestial Night Stars */}
      <div className="absolute top-6 left-8 text-[#F5D061] opacity-70 text-xs animate-pulse">✦</div>
      <div className="absolute top-14 right-10 text-[#F5D061] opacity-50 text-sm animate-pulse">✧</div>
      <div className="absolute top-44 left-6 text-[#F5D061] opacity-40 text-xs">✦</div>
      <div className="absolute top-80 right-8 text-[#F5D061] opacity-60 text-xs animate-pulse">✧</div>
      <div className="absolute bottom-28 left-8 text-[#F5D061] opacity-50 text-xs">✦</div>
      <div className="absolute bottom-12 right-12 text-[#F5D061] opacity-60 text-xs animate-pulse">✧</div>

      {/* Polished 24K Gold Foil Borders */}
      <div
        className="absolute inset-2.5 sm:inset-3.5 rounded-xl sm:rounded-2xl border-2 pointer-events-none"
        style={{ borderColor: `${accentColor}80`, boxShadow: `inset 0 0 15px ${accentColor}20` }}
      />
      <div
        className="absolute inset-4 sm:inset-5 rounded-lg sm:rounded-xl border pointer-events-none"
        style={{ borderColor: `${accentColor}40` }}
      />

      {/* Ornate Gold Sunburst / Star Corner Accents */}
      <div className="absolute top-3 left-3 text-sm font-bold text-[#F5D061] opacity-90">❖</div>
      <div className="absolute top-3 right-3 text-sm font-bold text-[#F5D061] opacity-90">❖</div>
      <div className="absolute bottom-3 left-3 text-sm font-bold text-[#F5D061] opacity-90">❖</div>
      <div className="absolute bottom-3 right-3 text-sm font-bold text-[#F5D061] opacity-90">❖</div>
    </div>
  );
});
