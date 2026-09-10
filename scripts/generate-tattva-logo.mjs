import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

// Read wiki_mahavira image to embed if needed
const mahaviraBase64 = fs.readFileSync('public/assets/wiki_mahavira.jpg').toString('base64');

// High-fidelity SVG recreation of the user's uploaded "Tattva PAARNA INVITATIONS" brand logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Background subtle gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="70%" stop-color="#FAF5EB" />
      <stop offset="100%" stop-color="#F3EAD7" />
    </radialGradient>

    <!-- Metallic Gold Gradient for Borders & Halo -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D5A24B" />
      <stop offset="25%" stop-color="#F2D288" />
      <stop offset="50%" stop-color="#C28F38" />
      <stop offset="75%" stop-color="#F9E2A8" />
      <stop offset="100%" stop-color="#B27E2B" />
    </linearGradient>

    <!-- Bronze/Gold Metallic Gradient for Tattva Typography -->
    <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#4E270F" />
      <stop offset="35%" stop-color="#723E1A" />
      <stop offset="70%" stop-color="#552C12" />
      <stop offset="100%" stop-color="#3A1C0A" />
    </linearGradient>

    <!-- Radiant Sunburst Halo Gradient -->
    <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF8E7" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#F5D78E" stop-opacity="0.75" />
      <stop offset="85%" stop-color="#DFAC4D" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#B88226" stop-opacity="1" />
    </radialGradient>

    <!-- Circular clip for Bhagwan image -->
    <clipPath id="mahaviraCircle">
      <circle cx="400" cy="300" r="145" />
    </clipPath>
    <clipPath id="innerCircleClip">
      <circle cx="400" cy="400" r="380" />
    </clipPath>
  </defs>

  <!-- Outer Double Gold Ring Borders -->
  <circle cx="400" cy="400" r="382" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="7" />
  <circle cx="400" cy="400" r="366" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" />

  <!-- Inner Content Group -->
  <g clip-path="url(#innerCircleClip)">

    <!-- Halo / Bhamandala Behind Bhagwan -->
    <g transform="translate(400, 260)">
      <!-- Outer beaded halo -->
      <circle cx="0" cy="0" r="96" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="2, 4" opacity="0.85" />
      <circle cx="0" cy="0" r="90" fill="url(#haloGrad)" stroke="url(#goldGrad)" stroke-width="3.5" />
      <circle cx="0" cy="0" r="76" fill="none" stroke="#D5A24B" stroke-width="1.5" stroke-dasharray="4, 3" />
      <!-- Radiant rays -->
      ${Array.from({ length: 36 }).map((_, i) => {
        const deg = i * 10;
        return `<line x1="0" y1="-76" x2="0" y2="-90" stroke="#C28F38" stroke-width="1.5" transform="rotate(${deg})" />`;
      }).join('\n      ')}
    </g>

    <!-- Chhatra (Three-tiered Golden Canopy / Umbrella) Above Bhagwan -->
    <g transform="translate(400, 135)">
      <!-- Top finial / kalash -->
      <path d="M-4,0 Q0,-14 4,0 Z" fill="url(#goldGrad)" />
      <circle cx="0" cy="-14" r="3" fill="#F9E2A8" stroke="#B27E2B" stroke-width="1" />
      
      <!-- Tier 1 (Small top dome) -->
      <path d="M-32,6 Q0,-8 32,6 Q0,10 -32,6 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.5" />
      <!-- Tier 2 (Middle dome) -->
      <path d="M-58,16 Q0,-2 58,16 Q0,22 -58,16 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.5" />
      <!-- Tier 3 (Main lower wide umbrella) -->
      <path d="M-88,28 Q0,6 88,28 C80,36 -80,36 -88,28 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="2" />
      <!-- Hanging Pearl/Bell Fringe Tassels -->
      ${[-80, -64, -48, -32, -16, 0, 16, 32, 48, 64, 80].map(x => `
        <line x1="${x}" y1="34" x2="${x}" y2="44" stroke="#C28F38" stroke-width="1.2" />
        <circle cx="${x}" cy="46" r="2.2" fill="#FAF5EB" stroke="#B27E2B" stroke-width="1" />
      `).join('')}
    </g>

    <!-- Golden Laurel / Olive Leaf Sprigs Flanking Bhagwan -->
    <!-- Left Leaf Sprig -->
    <g transform="translate(265, 330) rotate(-15)">
      <path d="M0,70 Q-15,30 20,-40" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" />
      <path d="M-2,60 Q-28,52 -20,40 Q-8,46 -2,60 Z" fill="url(#goldGrad)" />
      <path d="M3,40 Q-22,25 -10,12 Q-1,22 3,40 Z" fill="url(#goldGrad)" />
      <path d="M9,20 Q-12,5 2,-8 Q8,5 9,20 Z" fill="url(#goldGrad)" />
      <path d="M16,-5 Q5,-22 18,-35 Q22,-20 16,-5 Z" fill="url(#goldGrad)" />
      <path d="M-1,50 Q18,42 12,30 Q3,38 -1,50 Z" fill="url(#goldGrad)" />
      <path d="M5,28 Q24,18 18,6 Q8,16 5,28 Z" fill="url(#goldGrad)" />
    </g>
    <!-- Right Leaf Sprig -->
    <g transform="translate(535, 330) scale(-1, 1) rotate(-15)">
      <path d="M0,70 Q-15,30 20,-40" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" />
      <path d="M-2,60 Q-28,52 -20,40 Q-8,46 -2,60 Z" fill="url(#goldGrad)" />
      <path d="M3,40 Q-22,25 -10,12 Q-1,22 3,40 Z" fill="url(#goldGrad)" />
      <path d="M9,20 Q-12,5 2,-8 Q8,5 9,20 Z" fill="url(#goldGrad)" />
      <path d="M16,-5 Q5,-22 18,-35 Q22,-20 16,-5 Z" fill="url(#goldGrad)" />
      <path d="M-1,50 Q18,42 12,30 Q3,38 -1,50 Z" fill="url(#goldGrad)" />
      <path d="M5,28 Q24,18 18,6 Q8,16 5,28 Z" fill="url(#goldGrad)" />
    </g>

    <!-- Bhagwan Mahavir Swami Meditative Figure in Padmasana -->
    <!-- Embedded high-resolution classic Tirthankar image with soft mask blending -->
    <g transform="translate(290, 185)">
      <image href="data:image/jpeg;base64,${mahaviraBase64}" x="0" y="0" width="220" height="250" preserveAspectRatio="xMidYMid slice" />
    </g>

    <!-- Golden Lotus Throne (Kamalasana) Below Bhagwan -->
    <g transform="translate(400, 442)">
      <!-- Central base pedestal -->
      <path d="M-135,10 C-110,-5 -50,-15 0,-15 C50,-15 110,-5 135,10 C100,20 -100,20 -135,10 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.5" />
      <!-- Center Upward Lotus Petals -->
      <path d="M0,-24 Q-22,-4 0,10 Q22,-4 0,-24 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
      <path d="M-30,-20 Q-52,0 -24,12 Q-6,-2 -30,-20 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
      <path d="M30,-20 Q52,0 24,12 Q6,-2 30,-20 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
      <path d="M-65,-14 Q-90,4 -55,14 Q-40,2 -65,-14 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
      <path d="M65,-14 Q90,4 55,14 Q40,2 65,-14 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
      <path d="M-105,-8 Q-128,8 -90,14 Q-80,4 -105,-8 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
      <path d="M105,-8 Q128,8 90,14 Q80,4 105,-8 Z" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="1.2" />
    </g>

    <!-- Fine Golden Divider with Center Diamond -->
    <g transform="translate(400, 464)">
      <line x1="-160" y1="0" x2="-14" y2="0" stroke="url(#goldGrad)" stroke-width="1.8" />
      <polygon points="0,-4 4,0 0,4 -4,0" fill="url(#goldGrad)" stroke="#B27E2B" stroke-width="0.8" />
      <line x1="14" y1="0" x2="160" y2="0" stroke="url(#goldGrad)" stroke-width="1.8" />
    </g>

    <!-- BRAND TITLE: Tattva -->
    <g transform="translate(400, 580)">
      <!-- Main Brand Name 'Tattva' in elegant serif -->
      <text x="0" y="0" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', 'Georgia', serif" font-size="124" font-weight="700" fill="url(#bronzeGrad)" letter-spacing="2">
        Tattva
      </text>

      <!-- Organic leaf embellishment over the 'v' -->
      <g transform="translate(100, -68) rotate(35)">
        <path d="M0,0 Q-16,-18 0,-34 Q16,-18 0,0 Z" fill="url(#goldGrad)" stroke="#96631E" stroke-width="1" />
        <line x1="0" y1="0" x2="0" y2="-28" stroke="#723E1A" stroke-width="1" />
      </g>
    </g>

    <!-- Divider Line Above Subtitle with 3-petal Lotus -->
    <g transform="translate(400, 614)">
      <line x1="-200" y1="0" x2="-22" y2="0" stroke="url(#goldGrad)" stroke-width="1.5" />
      <!-- 3-Petal Lotus / Leaf Ornament -->
      <path d="M0,-8 C-4,-4 -4,2 0,4 C4,2 4,-4 0,-8 Z" fill="url(#goldGrad)" />
      <path d="M-6,-4 C-10,-1 -7,4 -2,3 C-4,1 -4,-2 -6,-4 Z" fill="url(#goldGrad)" />
      <path d="M6,-4 C10,-1 7,4 2,3 C4,1 4,-2 6,-4 Z" fill="url(#goldGrad)" />
      <line x1="22" y1="0" x2="200" y2="0" stroke="url(#goldGrad)" stroke-width="1.5" />
    </g>

    <!-- SUBTITLE: PAARNA INVITATIONS -->
    <text x="400" y="652" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', 'Georgia', serif" font-size="30" font-weight="600" fill="url(#bronzeGrad)" letter-spacing="9">
      PAARNA INVITATIONS
    </text>

    <!-- Divider Line Below Subtitle with 3-petal Lotus and Dot Accents -->
    <g transform="translate(400, 674)">
      <line x1="-120" y1="0" x2="-22" y2="0" stroke="url(#goldGrad)" stroke-width="1.5" />
      <circle cx="-130" cy="0" r="2.5" fill="url(#goldGrad)" />
      <!-- 3-Petal Lotus / Leaf Ornament -->
      <path d="M0,-8 C-4,-4 -4,2 0,4 C4,2 4,-4 0,-8 Z" fill="url(#goldGrad)" />
      <path d="M-6,-4 C-10,-1 -7,4 -2,3 C-4,1 -4,-2 -6,-4 Z" fill="url(#goldGrad)" />
      <path d="M6,-4 C10,-1 7,4 2,3 C4,1 4,-2 6,-4 Z" fill="url(#goldGrad)" />
      <circle cx="130" cy="0" r="2.5" fill="url(#goldGrad)" />
      <line x1="22" y1="0" x2="120" y2="0" stroke="url(#goldGrad)" stroke-width="1.5" />
    </g>

  </g>
</svg>`;

// Save SVG
fs.writeFileSync('public/logo.svg', svgContent);
fs.writeFileSync('public/assets/tattva-logo.svg', svgContent);

// Render to PNG with Resvg
try {
  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: 'width',
      value: 1024,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  
  fs.writeFileSync('public/logo.png', pngBuffer);
  fs.writeFileSync('public/assets/tattva-logo.png', pngBuffer);
  fs.writeFileSync('public/assets/brand-logo.png', pngBuffer);
  console.log('Successfully generated public/logo.svg and public/logo.png (1024x1024)!');
} catch (err) {
  console.error('Error rendering PNG:', err);
}
