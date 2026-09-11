import React from 'react';

interface LotusPranamArtworkProps {
  className?: string;
  variant?: 'full-frame' | 'bottom-pranam' | 'lotus-corner';
  strokeColor?: string;
}

/**
 * Inspired by User Reference 1:
 * - Scalloped multifold Jain/Rajasthani Arch
 * - Blooming pink lotuses with gold-veined green leaves
 * - Two hands folded in Anjali Mudra / Pranam emerging from an open blooming lotus
 */
export const LotusPranamArtwork: React.FC<LotusPranamArtworkProps> = React.memo(({
  className = 'w-full h-auto',
  variant = 'bottom-pranam',
  strokeColor = '#B8860B',
}) => {
  if (variant === 'bottom-pranam') {
    return (
      <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
        {/* Subtle glowing backlight */}
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-t from-pink-200/30 via-amber-200/20 to-transparent blur-xl pointer-events-none" />

        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-w-[280px] drop-shadow-xs"
        >
          <defs>
            <linearGradient id="pranamHandsGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9983E" />
              <stop offset="50%" stopColor="#E2BD6D" />
              <stop offset="100%" stopColor="#AA7828" />
            </linearGradient>

            <linearGradient id="lotusPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F7CAD0" />
              <stop offset="45%" stopColor="#DE829E" />
              <stop offset="100%" stopColor="#9C446E" />
            </linearGradient>

            <linearGradient id="leafGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41735C" />
              <stop offset="100%" stopColor="#254738" />
            </linearGradient>
          </defs>

          {/* BACKGROUND LOTUS LEAVES (KAMAL PATRA) WITH GOLD VEINS */}
          {/* Left Leaf */}
          <g opacity="0.95">
            <path
              d="M30 180 C15 140, 50 110, 85 130 C110 145, 95 185, 60 190 Z"
              fill="url(#leafGreenGrad)"
              stroke="#D4AF37"
              strokeWidth="1.2"
            />
            {/* Leaf Veins */}
            <path d="M55 160 C40 145, 30 135, 25 125" stroke="#F3E5AB" strokeWidth="0.8" opacity="0.75" />
            <path d="M60 165 C65 145, 75 135, 80 130" stroke="#F3E5AB" strokeWidth="0.8" opacity="0.75" />
            <path d="M55 170 C40 175, 30 180, 25 185" stroke="#F3E5AB" strokeWidth="0.8" opacity="0.75" />
          </g>

          {/* Right Leaf */}
          <g opacity="0.95">
            <path
              d="M290 180 C305 140, 270 110, 235 130 C210 145, 225 185, 260 190 Z"
              fill="url(#leafGreenGrad)"
              stroke="#D4AF37"
              strokeWidth="1.2"
            />
            {/* Leaf Veins */}
            <path d="M265 160 C280 145, 290 135, 295 125" stroke="#F3E5AB" strokeWidth="0.8" opacity="0.75" />
            <path d="M260 165 C255 145, 245 135, 240 130" stroke="#F3E5AB" strokeWidth="0.8" opacity="0.75" />
            <path d="M265 170 C280 175, 290 180, 295 185" stroke="#F3E5AB" strokeWidth="0.8" opacity="0.75" />
          </g>

          {/* SIDE PINK LOTUS BUDS */}
          {/* Left Pink Lotus */}
          <g transform="translate(10, 110) scale(0.65)">
            <path
              d="M40 80 C20 50, 20 20, 40 0 C60 20, 60 50, 40 80 Z"
              fill="url(#lotusPinkGrad)"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              d="M40 80 C10 60, 5 35, 20 15 C30 35, 35 60, 40 80 Z"
              fill="#D67595"
              opacity="0.8"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <path
              d="M40 80 C70 60, 75 35, 60 15 C50 35, 45 60, 40 80 Z"
              fill="#D67595"
              opacity="0.8"
              stroke="#D4AF37"
              strokeWidth="1"
            />
          </g>

          {/* Right Pink Lotus */}
          <g transform="translate(265, 110) scale(0.65)">
            <path
              d="M40 80 C20 50, 20 20, 40 0 C60 20, 60 50, 40 80 Z"
              fill="url(#lotusPinkGrad)"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path
              d="M40 80 C10 60, 5 35, 20 15 C30 35, 35 60, 40 80 Z"
              fill="#D67595"
              opacity="0.8"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <path
              d="M40 80 C70 60, 75 35, 60 15 C50 35, 45 60, 40 80 Z"
              fill="#D67595"
              opacity="0.8"
              stroke="#D4AF37"
              strokeWidth="1"
            />
          </g>

          {/* CENTRAL ANJALI MUDRA (PRAYING PRANAM HANDS) */}
          {/* Palms & Fingers rising out from Lotus */}
          <g>
            {/* Wrists / Forearms */}
            <path
              d="M136 150 L148 100 C150 90, 153 70, 155 45 C156 32, 160 30, 160 30 C160 30, 164 32, 165 45 C167 70, 170 90, 172 100 L184 150"
              fill="none"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Central Seam between Palms */}
            <path
              d="M160 32 L160 115"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Left Hand Fingers & Thumbs */}
            {/* Index & Middle contour */}
            <path
              d="M152 48 C150 56, 149 72, 150 82"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Ring & Little Finger */}
            <path
              d="M145 60 C143 70, 142 84, 144 95"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Thumb */}
            <path
              d="M155 92 C152 98, 146 104, 144 112 C146 116, 153 115, 156 108"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Left Bangles / Kangan */}
            <ellipse cx="146" cy="138" rx="14" ry="4" transform="rotate(-15 146 138)" stroke="url(#pranamHandsGold)" strokeWidth="1.8" fill="none" />
            <ellipse cx="144" cy="144" rx="14" ry="4" transform="rotate(-15 144 144)" stroke="url(#pranamHandsGold)" strokeWidth="1.5" fill="none" />

            {/* Right Hand Fingers & Thumbs */}
            {/* Index & Middle contour */}
            <path
              d="M168 48 C170 56, 171 72, 170 82"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Ring & Little Finger */}
            <path
              d="M175 60 C177 70, 178 84, 176 95"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Thumb */}
            <path
              d="M165 92 C168 98, 174 104, 176 112 C174 116, 167 115, 164 108"
              stroke="url(#pranamHandsGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Right Bangles / Kangan */}
            <ellipse cx="174" cy="138" rx="14" ry="4" transform="rotate(15 174 138)" stroke="url(#pranamHandsGold)" strokeWidth="1.8" fill="none" />
            <ellipse cx="176" cy="144" rx="14" ry="4" transform="rotate(15 176 144)" stroke="url(#pranamHandsGold)" strokeWidth="1.5" fill="none" />
          </g>

          {/* OPEN BLOOMING LOTUS PETALS AT BASE (EXACTLY AS IN USER REFERENCE 1) */}
          <g>
            {/* Central Heart Petal */}
            <path
              d="M160 110 C140 128, 134 150, 142 165 C150 172, 170 172, 178 165 C186 150, 180 128, 160 110 Z"
              fill="#FFF8E8"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2.2"
            />

            {/* Middle Left Petal */}
            <path
              d="M142 128 C115 135, 96 155, 96 172 C115 182, 138 178, 150 165 C142 152, 138 140, 142 128 Z"
              fill="#FFF8E8"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2.2"
            />

            {/* Middle Right Petal */}
            <path
              d="M178 128 C205 135, 224 155, 224 172 C205 182, 182 178, 170 165 C178 152, 182 140, 178 128 Z"
              fill="#FFF8E8"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2.2"
            />

            {/* Outer Left Petal */}
            <path
              d="M110 145 C80 152, 58 170, 58 185 C80 192, 108 188, 126 176 C116 166, 112 156, 110 145 Z"
              fill="#FFF8E8"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2"
            />

            {/* Outer Right Petal */}
            <path
              d="M210 145 C240 152, 262 170, 262 185 C240 192, 212 188, 194 176 C204 166, 208 156, 210 145 Z"
              fill="#FFF8E8"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2"
            />

            {/* Lowest Lotus Base Calyx */}
            <path
              d="M138 175 C146 190, 174 190, 182 175 C192 195, 128 195, 138 175 Z"
              fill="#EAC878"
              stroke="url(#pranamHandsGold)"
              strokeWidth="2"
            />
          </g>

          {/* Reverent Text Inscription */}
          <text
            x="160"
            y="210"
            textAnchor="middle"
            fill="#8F671E"
            fontSize="11"
            fontFamily="serif"
            letterSpacing="2"
            fontWeight="bold"
          >
            ॥ प्रणाम • सुख साता ॥
          </text>
        </svg>
      </div>
    );
  }

  // Full Frame Arch with Scalloped Top
  return (
    <svg
      viewBox="0 0 400 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="mandalaWatermark" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="30" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
          <circle cx="40" cy="40" r="16" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" />
          <path d="M40 10 L40 70 M10 40 L70 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.08" />
        </pattern>
      </defs>

      {/* Scalloped Arch Path (Jain / Rajasthani Multi-foil Arch) */}
      <path
        d="M30 620 L30 180 
           C30 130, 60 110, 80 110 
           C100 110, 110 85, 130 85 
           C150 85, 160 55, 180 55 
           C190 55, 195 40, 200 35 
           C205 40, 210 55, 220 55 
           C240 55, 250 85, 270 85 
           C290 85, 300 110, 320 110 
           C340 110, 370 130, 370 180 
           L370 620 Z"
        fill="#FCFBF7"
        stroke="#D4AF37"
        strokeWidth="2.5"
      />

      {/* Inner Fine Gold Inset Line */}
      <path
        d="M38 612 L38 184 
           C38 138, 66 118, 84 118 
           C103 118, 114 93, 132 93 
           C151 93, 162 63, 180 63 
           C190 63, 196 48, 200 44 
           C204 48, 210 63, 220 63 
           C238 63, 249 93, 268 93 
           C286 93, 297 118, 316 118 
           C334 118, 362 138, 362 184 
           L362 612 Z"
        fill="none"
        stroke="#E2BD6D"
        strokeWidth="1.2"
        strokeDasharray="4 2"
      />

      {/* Watermark Texture */}
      <rect x="40" y="45" width="320" height="565" fill="url(#mandalaWatermark)" />
    </svg>
  );
});
