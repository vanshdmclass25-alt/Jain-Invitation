const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

const newSection1 = `
        {/* SECTION 1: DARSHAN & TITLE */}
        <div 
          id="preview-darshan"
          className="relative w-full aspect-[9/16] min-h-[700px] flex flex-col items-center justify-center text-center overflow-hidden"
        >
          {/* Custom Template Background (User's Uploaded Design) */}
          {data.mahavirSwamiImage ? (
            <img 
              src={data.mahavirSwamiImage} 
              alt="Template Background" 
              className="absolute inset-0 w-full h-full object-cover z-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div 
              className="absolute inset-0 w-full h-full z-0"
              style={{
                background: isDarkBg
                  ? \`radial-gradient(circle at 50% 20%, \${colors.primary} 0%, \${colors.bg} 100%)\`
                  : \`radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, \${colors.bg || '#F5ECDD'} 100%)\`
              }}
            >
              <JainTempleAccents templateId={template.id} color={colors.border} accentColor={colors.accentGold} />
            </div>
          )}
          
          {/* Dark Overlay for Text Readability if needed (optional, keeping very light for their cream background) */}
          <div className="absolute inset-0 bg-white/10 z-0"></div>

          {/* Content Wrapper positioned in the center/blank space of their background */}
          <div className="relative z-10 w-full px-6 flex flex-col items-center mt-32">
            
            {/* Parna Utsav Badge */}
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-xl border border-[#D4AF37]/50 flex items-center gap-2 mb-6">
              <span className="text-[#D4AF37] text-xs">🏮</span>
              <span className="font-hindi text-[12px] font-bold text-[#1F3C2C]">પાવન પારણા ઉત્સવ</span>
              <span className="text-[#D4AF37] text-xs">🏮</span>
            </div>
          
            {/* Mahaveer Namah Badge */}
            <div className="bg-[#FAF6EB]/90 backdrop-blur-sm border border-[#D4AF37]/40 rounded-full px-4 py-1.5 inline-flex items-center gap-2 shadow-sm mb-4">
              <span className="text-[#C08B46] text-sm">✨</span>
              <span className="font-hindi text-[12px] font-bold text-[#C08B46] tracking-wide">॥ श्री महावीराय नमः ॥</span>
              <span className="text-[#C08B46] text-sm">✨</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-cormorant font-bold text-[#352516] mb-3 leading-tight drop-shadow-sm">
              Tapasya Pārna<br/>Mahotsav
            </h1>
            <p className="font-cormorant italic text-base text-[#6F4E37] max-w-[280px] mx-auto leading-relaxed drop-shadow-sm font-semibold">
              Auspicious celebration of spiritual penance and soul purification
            </p>
          </div>
        </div>
`;

// Replace SECTION 1
file = file.replace(/{\/\* SECTION 1: DARSHAN & TITLE \*\/}[\s\S]*?{\/\* SECTION 2: TAPASVI VANDAN \*\//, newSection1 + '\n\n        {/* SECTION 2: TAPASVI VANDAN */');

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched Section 1 to support full background image");
