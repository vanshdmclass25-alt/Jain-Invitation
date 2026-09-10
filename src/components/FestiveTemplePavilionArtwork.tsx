import React from 'react';

interface FestiveTemplePavilionArtworkProps {
  className?: string;
  variant?: 'top-drapes' | 'bottom-palace' | 'full';
}

/**
 * Inspired by User Reference 2:
 * - Top soft pink celebration drapery swags with hanging golden birdcages & jasmine
 * - White marble derasar jharokha pavilion with arched dome chhatri and balustrade railing
 * - Auspicious Kalash with blossoms, Dharma Chakra wheels on left, festive Dholak drums on right!
 */
export const FestiveTemplePavilionArtwork: React.FC<FestiveTemplePavilionArtworkProps> = ({
  className = 'w-full h-auto',
  variant = 'bottom-palace',
}) => {
  if (variant === 'top-drapes') {
    return (
      <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
        <svg viewBox="0 0 500 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="pinkDrapeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8D3DC" />
              <stop offset="40%" stopColor="#ECA5BA" />
              <stop offset="85%" stopColor="#D97E98" />
              <stop offset="100%" stopColor="#C45E7A" />
            </linearGradient>

            <linearGradient id="goldSwagTrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9983E" />
              <stop offset="50%" stopColor="#F5DC8C" />
              <stop offset="100%" stopColor="#AA7828" />
            </linearGradient>
          </defs>

          {/* Left Swag Drapes */}
          <path
            d="M-20 0 Q 75 90, 170 20 Q 250 85, 330 20 Q 425 90, 520 0 L520 0 L-20 0 Z"
            fill="url(#pinkDrapeGrad)"
            opacity="0.92"
            stroke="url(#goldSwagTrim)"
            strokeWidth="2.5"
          />

          {/* Overlapping Pleats */}
          <path d="M20 0 Q 85 70, 150 15" stroke="#FDE2E8" strokeWidth="1.5" opacity="0.8" fill="none" />
          <path d="M190 15 Q 250 68, 310 15" stroke="#FDE2E8" strokeWidth="1.5" opacity="0.8" fill="none" />
          <path d="M350 15 Q 415 70, 480 0" stroke="#FDE2E8" strokeWidth="1.5" opacity="0.8" fill="none" />

          {/* Golden Pearl / Tassel Fringe */}
          <g stroke="url(#goldSwagTrim)" strokeWidth="1.2">
            {[30, 60, 90, 120, 210, 240, 270, 300, 380, 410, 440, 470].map((x) => (
              <line key={x} x1={x} y1="35" x2={x} y2="45" strokeLinecap="round" />
            ))}
            {[30, 60, 90, 120, 210, 240, 270, 300, 380, 410, 440, 470].map((x) => (
              <circle key={`c-${x}`} cx={x} cy="48" r="2.2" fill="#E8C36A" />
            ))}
          </g>

          {/* Hanging Golden Birdcages / Lanterns with Flowers */}
          {/* Left Cage */}
          <g transform="translate(65, 5)">
            <line x1="20" y1="0" x2="20" y2="42" stroke="url(#goldSwagTrim)" strokeWidth="1.2" />
            <path
              d="M5 65 C5 48, 35 48, 35 65 L35 90 C35 93, 5 93, 5 90 Z"
              fill="#FFFBE8"
              fillOpacity="0.4"
              stroke="url(#goldSwagTrim)"
              strokeWidth="1.5"
            />
            <line x1="12" y1="52" x2="12" y2="90" stroke="url(#goldSwagTrim)" strokeWidth="0.8" />
            <line x1="20" y1="50" x2="20" y2="90" stroke="url(#goldSwagTrim)" strokeWidth="0.8" />
            <line x1="28" y1="52" x2="28" y2="90" stroke="url(#goldSwagTrim)" strokeWidth="0.8" />
            {/* Green sprig */}
            <circle cx="20" cy="94" r="3" fill="#4B7E58" />
            <circle cx="23" cy="96" r="2.5" fill="#E086A3" />
          </g>

          {/* Right Cage */}
          <g transform="translate(395, 5)">
            <line x1="20" y1="0" x2="20" y2="42" stroke="url(#goldSwagTrim)" strokeWidth="1.2" />
            <path
              d="M5 65 C5 48, 35 48, 35 65 L35 90 C35 93, 5 93, 5 90 Z"
              fill="#FFFBE8"
              fillOpacity="0.4"
              stroke="url(#goldSwagTrim)"
              strokeWidth="1.5"
            />
            <line x1="12" y1="52" x2="12" y2="90" stroke="url(#goldSwagTrim)" strokeWidth="0.8" />
            <line x1="20" y1="50" x2="20" y2="90" stroke="url(#goldSwagTrim)" strokeWidth="0.8" />
            <line x1="28" y1="52" x2="28" y2="90" stroke="url(#goldSwagTrim)" strokeWidth="0.8" />
            {/* Green sprig */}
            <circle cx="20" cy="94" r="3" fill="#4B7E58" />
            <circle cx="23" cy="96" r="2.5" fill="#E086A3" />
          </g>
        </svg>
      </div>
    );
  }

  // Bottom Palace Pavilion with Kalash, Wheels, Dholak & Marble Balustrade
  return (
    <div className={`relative w-full select-none ${className}`}>
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        <defs>
          <linearGradient id="marbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F6F3ED" />
            <stop offset="100%" stopColor="#E4DCD0" />
          </linearGradient>

          <linearGradient id="brassGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E092" />
            <stop offset="45%" stopColor="#D4A73E" />
            <stop offset="100%" stopColor="#8F6317" />
          </linearGradient>

          <linearGradient id="terracottaPot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D68759" />
            <stop offset="60%" stopColor="#A85732" />
            <stop offset="100%" stopColor="#753518" />
          </linearGradient>

          <linearGradient id="dholakWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A4822" />
            <stop offset="50%" stopColor="#D27E41" />
            <stop offset="100%" stopColor="#703616" />
          </linearGradient>

          <pattern id="carpetPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#F8EAD6" />
            <circle cx="10" cy="10" r="4" fill="#C98696" opacity="0.3" />
            <path d="M0 10 L20 10 M10 0 L10 20" stroke="#E2C29D" strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>

        {/* 1. PALACE BASE CARPET FLOOR */}
        <rect x="0" y="165" width="540" height="55" fill="url(#carpetPattern)" />
        <line x1="0" y1="165" x2="540" y2="165" stroke="#C9983E" strokeWidth="2.5" />

        {/* 2. WHITE MARBLE JHAROKHA / BALUSTRADE RAILING */}
        <g id="marble-balustrade">
          {/* Top Rail */}
          <rect x="130" y="130" width="280" height="7" rx="2" fill="url(#marbleGrad)" stroke="#B8A790" strokeWidth="0.8" />
          {/* Railing Pillars / Balusters */}
          {[145, 165, 185, 205, 225, 245, 265, 285, 305, 325, 345, 365, 385].map((x) => (
            <g key={x}>
              <path
                d={`M${x} 137 C${x - 2} 142, ${x - 4} 148, ${x - 1} 154 L${x + 5} 154 C${x + 8} 148, ${x + 6} 142, ${x + 4} 137 Z`}
                fill="url(#marbleGrad)"
                stroke="#C5B6A0"
                strokeWidth="0.6"
              />
            </g>
          ))}
          {/* Bottom Plinth */}
          <rect x="130" y="154" width="280" height="9" rx="1" fill="url(#marbleGrad)" stroke="#B8A790" strokeWidth="0.8" />
        </g>

        {/* 3. WHITE MARBLE TEMPLE PAVILION CHHATRI DOME (CENTER-RIGHT IN USER REF 2) */}
        <g id="marble-chhatri" transform="translate(340, 45)">
          {/* Arched Columns */}
          <rect x="20" y="55" width="6" height="35" fill="url(#marbleGrad)" stroke="#B8A790" strokeWidth="0.6" />
          <rect x="85" y="55" width="6" height="35" fill="url(#marbleGrad)" stroke="#B8A790" strokeWidth="0.6" />
          {/* Scalloped Arch */}
          <path
            d="M26 55 Q 55 42, 85 55"
            stroke="#B8A790"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Ornate Dome with Kalash Finial */}
          <path
            d="M15 55 C15 25, 55 12, 55 12 C55 12, 95 25, 95 55 Z"
            fill="url(#marbleGrad)"
            stroke="#B8A790"
            strokeWidth="1"
          />
          {/* Kalash on Dome */}
          <circle cx="55" cy="8" r="3.5" fill="url(#brassGoldGrad)" />
          <path d="M55 4 L55 0" stroke="url(#brassGoldGrad)" strokeWidth="1.5" />
        </g>

        {/* 4. LEFT FOREGROUND: DECORATED KALASH WITH FRESH FLOWERS & DHARMA CHAKRA WHEELS */}
        <g id="left-kalash-and-wheels" transform="translate(15, 65)">
          {/* Dharma Chakra / Cart Wheel 1 */}
          <g transform="translate(5, 5)">
            <circle cx="45" cy="45" r="38" fill="#FFF4DE" stroke="#A76034" strokeWidth="2.5" />
            <circle cx="45" cy="45" r="32" fill="none" stroke="#D4A73E" strokeWidth="1" strokeDasharray="3 2" />
            {/* Spokes */}
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <line
                key={deg}
                x1="45"
                y1="45"
                x2={45 + 38 * Math.cos((deg * Math.PI) / 180)}
                y2={45 + 38 * Math.sin((deg * Math.PI) / 180)}
                stroke="#C07242"
                strokeWidth="1.8"
              />
            ))}
            <circle cx="45" cy="45" r="8" fill="url(#brassGoldGrad)" stroke="#8F6317" strokeWidth="1" />
          </g>

          {/* Dharma Chakra / Cart Wheel 2 (Overlapping in background) */}
          <g transform="translate(55, 30) scale(0.8)">
            <circle cx="45" cy="45" r="38" fill="#FAF1DE" stroke="#8F6317" strokeWidth="2" />
            {[0, 45, 90, 135].map((deg) => (
              <line
                key={`s2-${deg}`}
                x1="45"
                y1="45"
                x2={45 + 38 * Math.cos((deg * Math.PI) / 180)}
                y2={45 + 38 * Math.sin((deg * Math.PI) / 180)}
                stroke="#B58133"
                strokeWidth="1.5"
              />
            ))}
            <circle cx="45" cy="45" r="7" fill="url(#brassGoldGrad)" />
          </g>

          {/* Mangal Kalash Pots (Authentic Clay / Brass Pot with Flowers) */}
          <g transform="translate(15, 45)">
            {/* Lower Pot */}
            <ellipse cx="65" cy="85" rx="26" ry="18" fill="url(#terracottaPot)" stroke="#5A240C" strokeWidth="1.2" />
            {/* Upper Spout / Neck */}
            <path d="M53 72 C53 66, 77 66, 77 72" stroke="#5A240C" strokeWidth="1.2" fill="none" />
            {/* Fresh Colorful Flowers spilling out */}
            <circle cx="50" cy="62" r="7" fill="#C95F87" />
            <circle cx="65" cy="55" r="8" fill="#885FB5" />
            <circle cx="78" cy="63" r="7" fill="#E89AB8" />
            <circle cx="65" cy="67" r="6" fill="#F4DC74" />
            <circle cx="65" cy="55" r="3" fill="#FFF" />
            {/* Green Mango Leaves */}
            <path d="M42 66 Q 30 55, 38 45 Q 48 55, 42 66 Z" fill="#4B885B" />
            <path d="M88 66 Q 100 55, 92 45 Q 82 55, 88 66 Z" fill="#4B885B" />
          </g>
        </g>

        {/* 5. RIGHT FOREGROUND: CELEBRATORY DHOLAK DRUMS WITH TASSELS & BANDS */}
        <g id="right-dholak-drums" transform="translate(370, 75)">
          {/* Standing Dholak (Vertical) */}
          <g transform="translate(70, 15)">
            <ellipse cx="28" cy="12" rx="22" ry="7" fill="#FDF8E8" stroke="#331A0B" strokeWidth="1" />
            {/* Drum Barrel */}
            <path
              d="M6 12 C0 35, 0 60, 6 85 C14 88, 42 88, 50 85 C56 60, 56 35, 50 12 Z"
              fill="url(#dholakWood)"
              stroke="#4A2610"
              strokeWidth="1.2"
            />
            {/* Decorative Colorful Festive Bands */}
            <rect x="4" y="32" width="48" height="8" fill="#3AA0DB" rx="1" />
            <rect x="4" y="55" width="48" height="8" fill="#E75D35" rx="1" />
            {/* Zig-Zag Tension Ropes */}
            <path
              d="M10 16 L28 85 L46 16 M18 85 L36 16 L48 85"
              stroke="#FFF"
              strokeWidth="0.8"
              opacity="0.7"
            />
          </g>

          {/* Tilted Resting Dholak (Horizontal foreground) */}
          <g transform="translate(10, 50) rotate(-12)">
            <ellipse cx="12" cy="30" rx="7" ry="18" fill="#FDF8E8" stroke="#331A0B" strokeWidth="1" />
            {/* Body */}
            <path
              d="M12 12 C35 6, 65 6, 88 12 C93 18, 93 42, 88 48 C65 54, 35 54, 12 48 Z"
              fill="url(#dholakWood)"
              stroke="#4A2610"
              strokeWidth="1.2"
            />
            <ellipse cx="88" cy="30" rx="6" ry="16" fill="#FDF8E8" stroke="#331A0B" strokeWidth="1" />
            {/* Colorful Middle Belt */}
            <path d="M44 8 C48 8, 48 52, 44 52 L56 52 C60 52, 60 8, 56 8 Z" fill="#EFA028" />
            {/* Tassels */}
            <circle cx="85" cy="46" r="3" fill="#2DA554" />
            <circle cx="92" cy="48" r="3" fill="#E23C63" />
          </g>
        </g>
      </svg>
    </div>
  );
};
