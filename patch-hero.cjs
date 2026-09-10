const fs = require('fs');
let file = fs.readFileSync('src/components/InviteOHero.tsx', 'utf8');

// Replace Main Headline
file = file.replace(
  /className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-\[3\.25rem\] font-bold text-\[#2A2018\] tracking-tight leading-\[1\.15\] mb-5"\s*>\s*Your own <span className="text-\[#C98A3E\] relative inline-block">[\s\S]*?<\/svg>\s*<\/span> invite website by <span className="font-cinzel text-\[#8C5D1F\]">Tattva<\/span> — ready in 2 minutes\s*<\/motion\.h1>/m,
  `className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-[#352516] tracking-tight leading-[1.1] mb-5"\n            >\n              Your own <span className="text-[#C08B46] italic relative inline-block underline decoration-1 underline-offset-8">Jain Tapasya Pārna</span> <br className="hidden lg:block"/> invite website by <span className="font-bold text-[#6F4E37]">Tattva</span> — <br className="hidden lg:block"/> ready in 2 minutes\n            </motion.h1>`
);

// Remove the door ceremony button and adjust the buttons to match the screenshot
file = file.replace(
  /<button\s*id="hero-door-ceremony-btn"[\s\S]*?<\/button>\s*<button\s*id="hero-create-btn"/m,
  '<button\n                id="hero-create-btn"'
);

// Update Create yours button color to match screenshot (dark brown)
file = file.replace(
  /bg-\[#2A2018\] hover:bg-\[#160F0A\] text-\[#FBF8EE\]/g,
  'bg-[#301E13] hover:bg-[#1A0F08] text-[#FBF8EE]'
);

fs.writeFileSync('src/components/InviteOHero.tsx', file);
console.log("Patched InviteOHero");
