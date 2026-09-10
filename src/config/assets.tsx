/**
 * Centralized Asset Management System
 * Jain Tapasya Pārna Invitation Platform
 * 
 * Instructions to replace images:
 * - Update paths in this file or drop your custom images into /public/assets/
 * - Supports JPG, PNG, SVG, WebP, and Base64 Data URLs
 */

import React from 'react';

export const ASSET_PATHS = {
  doors: {
    rajwada: '/assets/doors/door-rajwada.svg',
    shwet: '/assets/doors/door-shwet.svg',
    sukoon: '/assets/doors/door-sukoon.svg',
    divya: '/assets/doors/door-divya.svg',
  },
  templates: {
    rajwada: {
      heroBg: '/assets/template-1/bg-rajwada.svg',
      archBorder: '/assets/template-1/arch-rajwada.svg',
      divider: '/assets/template-1/divider-gold.svg',
    },
    shwet: {
      heroBg: '/assets/template-2/bg-shwet.svg',
      archBorder: '/assets/template-2/arch-shwet.svg',
      divider: '/assets/template-2/divider-minimal.svg',
    },
    sukoon: {
      heroBg: '/assets/template-3/bg-sukoon.svg',
      archBorder: '/assets/template-3/arch-sukoon.svg',
      divider: '/assets/template-3/divider-botanical.svg',
    },
    divya: {
      heroBg: '/assets/template-4/bg-divya.svg',
      archBorder: '/assets/template-4/arch-divya.svg',
      divider: '/assets/template-4/divider-celestial.svg',
    },
  },
  textures: {
    paperMuted: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="%23d4af37" fill-opacity="0.04"><circle cx="20" cy="20" r="1"/></g></svg>',
    goldGrid: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="%23d4af37" stroke-width="0.5" stroke-opacity="0.1"/></svg>',
  },
  defaults: {
    // Elegant portrait for default preview
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    familyPhotos: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    ],
  },
};

/**
 * Jain Lotus with Anjali Mudra (Praying Hands)
 * Inspired directly by Jain Tapasya spiritual reverence and peaceful devotion
 */
export const JainLotusPrayer = ({ className = "w-16 h-16", color = "#D4AF37" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Praying Hands (Anjali Mudra) */}
    <path
      d="M96 28 C96 20, 104 20, 104 28 L104 68 C104 74, 96 74, 96 68 Z"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M91 38 C88 32, 94 30, 96 36 L96 66"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M109 38 C112 32, 106 30, 104 36 L104 66"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Central Lotus Petals */}
    <path
      d="M100 62 C85 75, 76 95, 74 116 C88 126, 112 126, 126 116 C124 95, 115 75, 100 62 Z"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
    />
    {/* Middle Left Petal */}
    <path
      d="M80 82 C62 90, 50 108, 48 124 C64 128, 82 124, 90 114 C86 102, 83 92, 80 82 Z"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
    {/* Middle Right Petal */}
    <path
      d="M120 82 C138 90, 150 108, 152 124 C136 128, 118 124, 110 114 C114 102, 117 92, 120 82 Z"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
    {/* Outer Flank Left Petal */}
    <path
      d="M58 98 C38 104, 26 118, 22 132 C38 135, 56 132, 68 124 C62 114, 60 106, 58 98 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeOpacity="0.85"
    />
    {/* Outer Flank Right Petal */}
    <path
      d="M142 98 C162 104, 174 118, 178 132 C162 135, 144 132, 132 124 C138 114, 140 106, 142 98 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeOpacity="0.85"
    />
    {/* Bottom Lotus Base / Padmasana */}
    <path
      d="M70 126 C85 136, 115 136, 130 126 C120 142, 80 142, 70 126 Z"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

/**
 * Bhagwan Mahavir Swami - Sacred Tirthankara Centerpiece Figure
 * Portrayed in serene Dhyana Mudra (Padmasana) under the 3-tiered Chhatra
 * with a luminous Bhamandala (aura) and ornate Kamalasana (lotus throne).
 */
export const BhagwanMahavirSwamiFigure = ({
  className = "w-40 h-48",
  primaryColor = "#D4AF37",
  accentColor = "#AA771C",
  glowColor = "#FDF6E2",
}: {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
  glowColor?: string;
}) => (
  <svg
    viewBox="0 0 200 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Bhagwan Mahavir Swami"
  >
    <defs>
      {/* Radiant golden gradients */}
      <radialGradient id="auraGlow" cx="50%" cy="42%" r="45%">
        <stop offset="0%" stopColor={glowColor} stopOpacity="0.9" />
        <stop offset="40%" stopColor={primaryColor} stopOpacity="0.35" />
        <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="30%" stopColor={primaryColor} />
        <stop offset="70%" stopColor={accentColor} />
        <stop offset="100%" stopColor="#8C6214" />
      </linearGradient>
      <linearGradient id="chhatraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF5CC" />
        <stop offset="60%" stopColor={primaryColor} />
        <stop offset="100%" stopColor={accentColor} />
      </linearGradient>
    </defs>

    {/* Background Radiant Aura Bloom */}
    <circle cx="100" cy="98" r="75" fill="url(#auraGlow)" />

    {/* ================= 1. THREE-TIERED CHHATRA (CHHATRATRAYI) ================= */}
    {/* Topmost Kalash Finial */}
    <path
      d="M100 8 L103 15 L97 15 Z"
      fill="url(#chhatraGrad)"
      stroke={accentColor}
      strokeWidth="0.8"
    />
    <circle cx="100" cy="6" r="2" fill={primaryColor} />

    {/* Top Chhatra (Smallest) */}
    <path
      d="M80 22 C80 16, 120 16, 120 22 C115 24, 85 24, 80 22 Z"
      fill="url(#chhatraGrad)"
      stroke={accentColor}
      strokeWidth="1.2"
    />
    {/* Decorative fringe drops */}
    <circle cx="85" cy="24" r="1" fill={primaryColor} />
    <circle cx="100" cy="25" r="1.2" fill={primaryColor} />
    <circle cx="115" cy="24" r="1" fill={primaryColor} />

    {/* Middle Chhatra */}
    <path
      d="M72 32 C72 24, 128 24, 128 32 C120 35, 80 35, 72 32 Z"
      fill="url(#chhatraGrad)"
      stroke={accentColor}
      strokeWidth="1.2"
    />
    <circle cx="78" cy="35" r="1" fill={primaryColor} />
    <circle cx="90" cy="36" r="1.2" fill={primaryColor} />
    <circle cx="100" cy="36.5" r="1.3" fill={primaryColor} />
    <circle cx="110" cy="36" r="1.2" fill={primaryColor} />
    <circle cx="122" cy="35" r="1" fill={primaryColor} />

    {/* Bottom Chhatra (Largest Tier) */}
    <path
      d="M62 44 C62 34, 138 34, 138 44 C128 48, 72 48, 62 44 Z"
      fill="url(#chhatraGrad)"
      stroke={accentColor}
      strokeWidth="1.4"
    />
    {/* Scallop edge and pearl garland beads */}
    <path
      d="M65 46 Q70 49, 75 46 Q80 49, 85 46 Q90 49, 95 46 Q100 49, 105 46 Q110 49, 115 46 Q120 49, 125 46 Q130 49, 135 46"
      stroke={primaryColor}
      strokeWidth="1"
      fill="none"
    />

    {/* Central Pillar supporting Chhatra */}
    <line x1="100" y1="14" x2="100" y2="60" stroke={accentColor} strokeWidth="1.5" />

    {/* ================= 2. BHAMANDALA (DIVINE AURA RING) ================= */}
    <g>
      {/* Outer Lotus Petal Halo Rim */}
      <circle
        cx="100"
        cy="96"
        r="44"
        stroke={primaryColor}
        strokeWidth="1"
        strokeDasharray="4 3"
        strokeOpacity="0.85"
      />
      {/* Middle Golden Band */}
      <circle
        cx="100"
        cy="96"
        r="40"
        stroke="url(#goldGradient)"
        strokeWidth="2"
      />
      {/* Radiating Sunburst Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 26;
        const y1 = 96 + Math.sin(rad) * 26;
        const x2 = 100 + Math.cos(rad) * 38;
        const y2 = 96 + Math.sin(rad) * 38;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={primaryColor}
            strokeWidth="0.9"
            strokeOpacity="0.75"
          />
        );
      })}
      {/* Inner Radiant Disc */}
      <circle
        cx="100"
        cy="96"
        r="24"
        fill="#FFFBF0"
        fillOpacity="0.8"
        stroke={primaryColor}
        strokeWidth="1"
      />
    </g>

    {/* ================= 3. BHAGWAN MAHAVIR SWAMI MURTI ================= */}
    {/* Ushnisha & Hair Curls */}
    <path
      d="M97 68 C97 64, 103 64, 103 68 C105 70, 95 70, 97 68 Z"
      fill={primaryColor}
    />
    <circle cx="100" cy="65" r="3" fill="url(#goldGradient)" />

    {/* Divine Face & Peaceful Countenance */}
    <path
      d="M91 76 C91 69, 109 69, 109 76 C109 84, 104 88, 100 88 C96 88, 91 84, 91 76 Z"
      fill="#FFFBF0"
      stroke={accentColor}
      strokeWidth="1.6"
    />
    {/* Elongated Earlobes (Mahapurusha Lakshan) */}
    <path d="M90 75 C88 78, 88 83, 90 85" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M110 75 C112 78, 112 83, 110 85" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" />

    {/* Meditative Peaceful Eyes (Half-closed, self-absorbed inward vision) */}
    <path d="M94 77 Q96 79, 98 77" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M102 77 Q104 79, 106 77" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
    {/* Tilak / Bindi */}
    <circle cx="100" cy="73" r="1" fill={primaryColor} />
    {/* Gentle Peaceful Smile */}
    <path d="M98 83 Q100 84.5, 102 83" stroke={accentColor} strokeWidth="1" strokeLinecap="round" />

    {/* Slender Neck with Tri-rekha (three auspicious lines) */}
    <line x1="97" y1="89" x2="103" y2="89" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" />
    <line x1="96" y1="91" x2="104" y2="91" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" />

    {/* Torso in Yogic Posture */}
    <path
      d="M84 94 C80 96, 75 106, 75 120 L80 134 C80 138, 120 138, 120 134 L125 120 C125 106, 120 96, 116 94 Z"
      fill="#FFFDF5"
      stroke={accentColor}
      strokeWidth="1.8"
    />

    {/* Auspicious Shrivatsa Mark on the Chest */}
    <g transform="translate(100, 104) scale(0.9)">
      <polygon
        points="0,-4 3,-1 1,-1 4,2 0,0 -4,2 -1,-1 -3,-1"
        fill={primaryColor}
        stroke={accentColor}
        strokeWidth="0.5"
      />
    </g>

    {/* Arms descending peacefully into lap */}
    {/* Left Arm */}
    <path
      d="M75 104 C72 116, 72 130, 84 138 C90 142, 98 142, 102 140"
      stroke={accentColor}
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right Arm */}
    <path
      d="M125 104 C128 116, 128 130, 116 138 C110 142, 102 142, 98 140"
      stroke={accentColor}
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Hands in DHYANA MUDRA (Right hand resting in Left hand, palms up in the lap) */}
    <g>
      {/* Lower (left) hand */}
      <ellipse cx="100" cy="140" rx="11" ry="4" fill="#FFFBF0" stroke={accentColor} strokeWidth="1.5" />
      {/* Upper (right) hand */}
      <ellipse cx="100" cy="138" rx="9" ry="3.5" fill="#FFFDF5" stroke={accentColor} strokeWidth="1.5" />
      {/* Thumbs touching gently */}
      <line x1="97" y1="137" x2="103" y2="137" stroke={primaryColor} strokeWidth="1" />
    </g>

    {/* Full Lotus Pose (Padmasana) Legs Crossed */}
    <path
      d="M58 150 C56 138, 76 136, 100 138 C124 136, 144 138, 142 150 C140 162, 60 162, 58 150 Z"
      fill="#FFFDF5"
      stroke={accentColor}
      strokeWidth="2"
    />

    {/* Upward Facing Soles of Lotus Feet */}
    <ellipse cx="72" cy="151" rx="6.5" ry="3.5" fill="#FFF8E7" stroke={primaryColor} strokeWidth="1.2" />
    <ellipse cx="128" cy="151" rx="6.5" ry="3.5" fill="#FFF8E7" stroke={primaryColor} strokeWidth="1.2" />

    {/* ================= 4. ORNATE KAMALASANA (LOTUS THRONE) ================= */}
    <g>
      {/* Top Lotus Petal Layer (Upper tier) */}
      <path
        d="M62 162 Q72 154, 82 162 Q91 153, 100 162 Q109 153, 118 162 Q128 154, 138 162"
        fill="url(#goldGradient)"
        stroke={accentColor}
        strokeWidth="1.3"
      />
      {/* Center Main Blooming Petals */}
      <path
        d="M100 155 C93 162, 88 174, 88 182 C96 186, 104 186, 112 182 C112 174, 107 162, 100 155 Z"
        fill="#FFF9EB"
        stroke={primaryColor}
        strokeWidth="1.4"
      />
      {/* Flank Petals Left */}
      <path
        d="M86 160 C76 166, 70 176, 70 184 C79 187, 88 185, 93 178 C91 170, 88 165, 86 160 Z"
        fill="#FFF4DB"
        stroke={primaryColor}
        strokeWidth="1.3"
      />
      <path
        d="M68 164 C56 170, 52 178, 52 184 C62 187, 72 185, 76 178"
        fill="#FFEEC4"
        stroke={accentColor}
        strokeWidth="1.2"
      />
      {/* Flank Petals Right */}
      <path
        d="M114 160 C124 166, 130 176, 130 184 C121 187, 112 185, 107 178 C109 170, 112 165, 114 160 Z"
        fill="#FFF4DB"
        stroke={primaryColor}
        strokeWidth="1.3"
      />
      <path
        d="M132 164 C144 170, 148 178, 148 184 C138 187, 128 185, 124 178"
        fill="#FFEEC4"
        stroke={accentColor}
        strokeWidth="1.2"
      />

      {/* Carved Simhasana Throne Base */}
      {/* Upper Molding */}
      <path
        d="M48 186 L152 186 L156 192 L44 192 Z"
        fill="url(#goldGradient)"
        stroke={accentColor}
        strokeWidth="1.2"
      />
      {/* Middle Carved Panel with Auspicious Motifs */}
      <rect
        x="46"
        y="192"
        width="108"
        height="12"
        fill="#FAF5E8"
        stroke={accentColor}
        strokeWidth="1.2"
      />
      {/* Central Dharmachakra / Lion Motifs in Base */}
      <circle cx="100" cy="198" r="4.5" stroke={primaryColor} strokeWidth="1.2" />
      <circle cx="100" cy="198" r="1.5" fill={accentColor} />
      <line x1="56" y1="198" x2="88" y2="198" stroke={primaryColor} strokeWidth="1" strokeDasharray="3 2" />
      <line x1="112" y1="198" x2="144" y2="198" stroke={primaryColor} strokeWidth="1" strokeDasharray="3 2" />

      {/* Base Plinth */}
      <path
        d="M42 204 L158 204 L162 210 L38 210 Z"
        fill="url(#goldGradient)"
        stroke={accentColor}
        strokeWidth="1.4"
      />
    </g>
  </svg>
);

/**
 * Sacred Jain Dhyana (Meditation) Silhouette with Chhatra
 * Symbolizing profound equanimity, self-discipline & tapasya
 */
export const JainDhyanaSymbol = ({ className = "w-12 h-12", color = "#D4AF37" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Three-tiered Chhatra (Umbrella of spiritual sovereignty) */}
    <path d="M35 12 C35 7, 65 7, 65 12 Z" stroke={color} strokeWidth="1.5" />
    <path d="M30 16 C30 11, 70 11, 70 16 Z" stroke={color} strokeWidth="1.5" />
    <path d="M24 21 C24 15, 76 15, 76 21 Z" stroke={color} strokeWidth="1.5" />
    <line x1="50" y1="5" x2="50" y2="28" stroke={color} strokeWidth="1.5" />
    
    {/* Radiant Halo (Bhamandala) */}
    <circle cx="50" cy="38" r="14" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7" />
    
    {/* Head & Ushnisha */}
    <circle cx="50" cy="38" r="7" stroke={color} strokeWidth="1.8" />
    <circle cx="50" cy="30" r="2" fill={color} />
    
    {/* Seated Body in Padmasana */}
    <path
      d="M38 52 C38 46, 62 46, 62 52 L64 68 C64 74, 36 74, 36 68 Z"
      stroke={color}
      strokeWidth="1.8"
    />
    {/* Folded Hands in Dhyana Mudra in Lap */}
    <ellipse cx="50" cy="70" rx="8" ry="3.5" stroke={color} strokeWidth="1.5" />
    {/* Crossed Legs (Lotus Pose) */}
    <path
      d="M26 80 C26 73, 40 73, 50 75 C60 73, 74 73, 74 80 C74 86, 26 86, 26 80 Z"
      stroke={color}
      strokeWidth="1.8"
    />
    {/* Base Seat */}
    <rect x="22" y="87" width="56" height="4" rx="2" stroke={color} strokeWidth="1.2" />
  </svg>
);

/**
 * Traditional Royal Indian Arch SVG Frame
 */
export const OrnateArchBorder = ({ className = "w-full", color = "#D4AF37" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
    <path
      d="M 10 55 L 10 30 C 10 20, 25 15, 45 15 C 65 15, 90 24, 115 24 C 140 24, 160 12, 185 8 C 193 6, 198 3, 200 0 C 202 3, 207 6, 215 8 C 240 12, 260 24, 285 24 C 310 24, 335 15, 355 15 C 375 15, 390 20, 390 30 L 390 55"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <circle cx="200" cy="9" r="3" fill={color} />
    <circle cx="115" cy="24" r="2.5" fill={color} />
    <circle cx="285" cy="24" r="2.5" fill={color} />
  </svg>
);

/**
 * Golden Ornamental Divider
 */
export const GoldDivider = ({ className = "w-36 h-4", color = "#D4AF37" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <line x1="10" y1="12" x2="80" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
    <line x1="120" y1="12" x2="190" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
    <circle cx="100" cy="12" r="4" fill={color} />
    <circle cx="88" cy="12" r="2" fill={color} strokeOpacity="0.7" />
    <circle cx="112" cy="12" r="2" fill={color} strokeOpacity="0.7" />
  </svg>
);
