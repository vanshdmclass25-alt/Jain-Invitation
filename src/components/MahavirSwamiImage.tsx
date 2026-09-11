import React from 'react';

interface MahavirSwamiImageProps {
  className?: string;
  customImageUrl?: string;
  showAura?: boolean;
}

export const MahavirSwamiImage: React.FC<MahavirSwamiImageProps> = React.memo(({
  className = 'w-48 h-56',
  customImageUrl,
  showAura = true,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const targetSrc = customImageUrl || '/bhagwan-mahavir-pic.png';

  if (!imageError && targetSrc) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {showAura && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 via-yellow-200/40 to-amber-300/25 blur-xl scale-110 pointer-events-none animate-pulse" />
        )}
        <img
          src={targetSrc}
          alt="Bhagwan Mahavir Swami"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain relative z-10 mix-blend-multiply drop-shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-transform"
          referrerPolicy="no-referrer"
         
        />
      </div>
    );
  }

  // Authentic representation of the uploaded Bhagwan Mahavir Swami figure
  // (Padmasana Dhyana Mudra, Golden Chhatra, Concentric Bhamandala Halo, Lion Singha Pedestal)
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {showAura && (
        <div 
          className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-400/25 via-yellow-200/35 to-amber-300/20 blur-lg pointer-events-none animate-pulse" 
          aria-hidden="true"
        />
      )}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain relative z-10 mix-blend-multiply drop-shadow-md"
      >
        <defs>
          <linearGradient id="umbrellaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="35%" stopColor="#E5B242" />
            <stop offset="70%" stopColor="#BA8323" />
            <stop offset="100%" stopColor="#E9C168" />
          </linearGradient>

          <radialGradient id="haloRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF2" />
            <stop offset="40%" stopColor="#FFE8A3" />
            <stop offset="75%" stopColor="#F5BF50" />
            <stop offset="100%" stopColor="#C98B20" />
          </radialGradient>

          <linearGradient id="bodySkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDEB5" />
            <stop offset="50%" stopColor="#F7B982" />
            <stop offset="100%" stopColor="#E59958" />
          </linearGradient>

          <linearGradient id="throneOrange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF7A" />
            <stop offset="50%" stopColor="#E28E3A" />
            <stop offset="100%" stopColor="#BE691C" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. GOLDEN CHHATRA (ROYAL CANOPY / PARASOL) OVERHEAD */}
        <g id="chhatra">
          {/* Canopy Dome */}
          <path
            d="M54 38 C54 12, 146 12, 146 38 C146 42, 54 42, 54 38 Z"
            fill="url(#umbrellaGold)"
            stroke="#986815"
            strokeWidth="1.5"
          />
          {/* Canopy Rim & Golden Bead Tassels */}
          <ellipse cx="100" cy="38" rx="46" ry="6" fill="#C98B20" />
          <ellipse cx="100" cy="37" rx="45" ry="5.5" fill="url(#umbrellaGold)" />
          
          {/* Hanging Golden/Pearl Fringe Droplets */}
          {[60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140].map((x, idx) => (
            <g key={idx}>
              <line x1={x} y1="41" x2={x} y2="47" stroke="#BA8323" strokeWidth="1" />
              <circle cx={x} cy="48" r="1.8" fill="#FFF4C4" stroke="#986815" strokeWidth="0.6" />
            </g>
          ))}
          
          {/* Kalash Spire Top */}
          <path d="M98 12 L102 12 L100 4 Z" fill="#FFE8A3" stroke="#BA8323" strokeWidth="1" />
          <circle cx="100" cy="4" r="2.2" fill="#FFFDF2" stroke="#BA8323" strokeWidth="0.8" />
        </g>

        {/* 2. CONCENTRIC BHAMANDALA (GLOWING RADIANT HALO) */}
        <g id="bhamandala" filter="url(#softGlow)">
          {/* Outer Sunburst Disk */}
          <circle cx="100" cy="85" r="42" fill="url(#haloRadial)" stroke="#BA8323" strokeWidth="2" />
          
          {/* Concentric Ornate Rings */}
          <circle cx="100" cy="85" r="37" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" />
          <circle cx="100" cy="85" r="33" stroke="#986815" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="100" cy="85" r="28" stroke="#FFE8A3" strokeWidth="1.5" strokeOpacity="0.9" />
          <circle cx="100" cy="85" r="23" stroke="#BA8323" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="100" cy="85" r="17" fill="#FFFDF5" fillOpacity="0.6" />
        </g>

        {/* 3. HEAD, SERENE FACE & RED-AMBER CURLED HAIR */}
        <g id="head">
          {/* Face Contour */}
          <path
            d="M84 76 C84 62, 116 62, 116 76 C116 93, 108 101, 100 102 C92 101, 84 93, 84 76 Z"
            fill="url(#bodySkin)"
            stroke="#D68644"
            strokeWidth="1.2"
          />

          {/* Ushnisha (Top Crown of Hair) */}
          <ellipse cx="100" cy="58" rx="10" ry="7" fill="#C55627" />
          <circle cx="100" cy="54" r="3.5" fill="#B04518" />

          {/* Curled Hair Covering */}
          <path
            d="M84 71 C84 57, 116 57, 116 71 C114 65, 86 65, 84 71 Z"
            fill="#B04518"
          />
          {/* Hair Curls Texture Dots */}
          {[
            [94, 59], [100, 58], [106, 59],
            [90, 63], [96, 62], [100, 62], [104, 62], [110, 63],
            [87, 67], [93, 66], [98, 66], [102, 66], [107, 66], [113, 67]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.6" fill="#8E330D" />
          ))}

          {/* Elongated Ears */}
          <path d="M83 75 C81 77, 81 87, 84 89 C85 88, 85 78, 84 75 Z" fill="#EEA36A" stroke="#C97532" strokeWidth="0.8" />
          <path d="M117 75 C119 77, 119 87, 116 89 C115 88, 115 78, 116 75 Z" fill="#EEA36A" stroke="#C97532" strokeWidth="0.8" />

          {/* Serene Closed Eyes in Dhyana */}
          <path d="M89 79 C91 82, 95 82, 97 79" stroke="#5E2C0C" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M103 79 C105 82, 109 82, 111 79" stroke="#5E2C0C" strokeWidth="1.4" strokeLinecap="round" />
          
          {/* Gentle Eyebrows */}
          <path d="M88 75 C91 74, 95 75, 97 76" stroke="#904B1D" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M103 76 C105 75, 109 74, 112 75" stroke="#904B1D" strokeWidth="1.1" strokeLinecap="round" />

          {/* Tilak / Urna */}
          <circle cx="100" cy="74" r="1" fill="#C55627" />

          {/* Nose */}
          <path d="M100 78 L99 85 L102 85" stroke="#C97532" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

          {/* Gentle Compassionate Smile */}
          <path d="M96 90 C98 92.5, 102 92.5, 104 90" stroke="#9A3B12" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* 4. MEDITATING TORSO & PADMASANA POSTURE */}
        <g id="torso">
          {/* Neck with Three Auspicious Lines (Tri-rekha) */}
          <path d="M93 100 L93 107 C93 108, 107 108, 107 107 L107 100 Z" fill="#F3AC74" />
          <line x1="95" y1="102" x2="105" y2="102" stroke="#D68644" strokeWidth="0.8" />
          <line x1="94" y1="104" x2="106" y2="104" stroke="#D68644" strokeWidth="0.8" />
          <line x1="96" y1="106" x2="104" y2="106" stroke="#D68644" strokeWidth="0.8" />

          {/* Broad Shoulders and Torso */}
          <path
            d="M93 105 C75 110, 68 126, 68 148 C68 165, 82 172, 100 172 C118 172, 132 165, 132 148 C132 126, 125 110, 107 105 Z"
            fill="url(#bodySkin)"
            stroke="#D68644"
            strokeWidth="1.4"
          />

          {/* Auspicious Shrivatsa Mark on Chest */}
          <g id="shrivatsa" transform="translate(100, 126)">
            <path
              d="M0 -5 L4 0 L0 5 L-4 0 Z"
              fill="#FFFDF2"
              stroke="#BA8323"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.5" fill="#E59958" />
          </g>

          {/* Calming Navel */}
          <circle cx="100" cy="152" r="1.8" fill="#BA692B" />

          {/* Meditative Arms & Dhyana Mudra Hands (Palms resting on lap) */}
          <path
            d="M68 144 C66 160, 78 174, 94 176 L106 176 C122 174, 134 160, 132 144 C128 152, 120 162, 108 166 L92 166 C80 162, 72 152, 68 144 Z"
            fill="#EEA36A"
            stroke="#D68644"
            strokeWidth="1"
          />
          {/* Hands Resting - Right Hand Placed Over Left Hand */}
          <ellipse cx="100" cy="172" rx="13" ry="5" fill="#FFDEB5" stroke="#C97532" strokeWidth="1" />
          <path d="M91 171 C95 174, 105 174, 109 171" stroke="#BA692B" strokeWidth="1" strokeLinecap="round" />

          {/* Crossed Legs in Padmasana (Full Lotus Position) */}
          <path
            d="M48 184 C48 168, 68 166, 100 166 C132 166, 152 168, 152 184 C152 195, 134 196, 100 196 C66 196, 48 195, 48 184 Z"
            fill="url(#bodySkin)"
            stroke="#D68644"
            strokeWidth="1.5"
          />
          {/* Soles of Feet Showing Upward (Auspicious Padmasana Marks) */}
          <ellipse cx="64" cy="180" rx="9" ry="5.5" fill="#FFDEB5" stroke="#C97532" strokeWidth="0.9" transform="rotate(-15 64 180)" />
          <ellipse cx="136" cy="180" rx="9" ry="5.5" fill="#FFDEB5" stroke="#C97532" strokeWidth="0.9" transform="rotate(15 136 180)" />
        </g>

        {/* 5. TIERED PEDESTAL WITH CARVED LION (SINGHA LAANCHHANA) */}
        <g id="pedestal">
          {/* Upper Pad / Throne Cushion */}
          <rect
            x="44"
            y="194"
            width="112"
            height="10"
            rx="5"
            fill="url(#throneOrange)"
            stroke="#9A4D10"
            strokeWidth="1.2"
          />

          {/* Middle Plinth / Base Block */}
          <rect
            x="46"
            y="204"
            width="108"
            height="22"
            rx="3"
            fill="url(#throneOrange)"
            stroke="#9A4D10"
            strokeWidth="1.4"
          />

          {/* Inset Golden Cartouche for Singha (Lion Emblem) */}
          <rect
            x="86"
            y="208"
            width="28"
            height="14"
            rx="2"
            fill="#FFF8E7"
            stroke="#9A4D10"
            strokeWidth="1"
          />

          {/* The Singha (Lion) Emblem of Bhagwan Mahavir Swami */}
          <g transform="translate(90, 210) scale(0.65)">
            {/* Lion Mane & Head */}
            <path
              d="M16 8 C16 4, 22 4, 23 7 C25 6, 28 8, 27 11 C28 13, 26 15, 23 15 C21 16, 17 15, 16 12 Z"
              fill="#D48324"
              stroke="#8B4D0B"
              strokeWidth="0.9"
            />
            {/* Lion Body & Legs */}
            <path
              d="M17 12 C14 11, 8 11, 6 15 L6 19 L9 19 L10 16 L17 16 L18 19 L21 19 L21 14 Z"
              fill="#D48324"
              stroke="#8B4D0B"
              strokeWidth="0.9"
            />
            {/* Curled Lion Tail */}
            <path
              d="M6 14 C4 11, 5 7, 7 6"
              fill="none"
              stroke="#8B4D0B"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* Bottom Footing Base */}
          <path
            d="M40 226 L160 226 L164 232 L36 232 Z"
            fill="#A8540E"
            stroke="#7C3B07"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
});
