const fs = require('fs');
let file = fs.readFileSync('src/components/InviteOHero.tsx', 'utf8');

const bgElements = `
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FAF8EE]">
      
      {/* Pink & Gold Swoosh Background */}
      <div className="absolute top-0 inset-x-0 h-40 pointer-events-none z-0">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 C360,120 1080,120 1440,0 L1440,0 L0,0 Z" fill="#FCE4EC" />
          <path d="M0,0 C360,110 1080,110 1440,0" fill="none" stroke="#F48FB1" strokeWidth="2" />
          <path d="M0,10 C360,130 1080,130 1440,10" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M0,20 C360,150 1080,150 1440,20" fill="none" stroke="#F48FB1" strokeWidth="4" strokeOpacity="0.4" />
        </svg>
        {/* Decorative Floating Dots */}
        <div className="absolute top-16 left-[10%] w-8 h-8 rounded-full border border-pink-300 bg-pink-100 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <div className="absolute top-24 right-[15%] w-10 h-10 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="absolute top-10 right-[35%] w-3 h-4 rounded-b-full bg-pink-400 opacity-60" />
      </div>

`;

file = file.replace(/<section className="relative overflow-hidden pt-8 pb-16 lg:py-20">/, bgElements);

fs.writeFileSync('src/components/InviteOHero.tsx', file);
console.log("Patched Hero Background");
