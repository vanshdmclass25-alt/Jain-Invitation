const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

const revertedSection1 = `
        {/* SECTION 1: DARSHAN & TITLE */}
        <div 
          id="preview-darshan"
          className="relative w-full aspect-[9/16] min-h-[700px] flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            background: isDarkBg
              ? \`radial-gradient(circle at 50% 20%, \${colors.primary} 0%, \${colors.bg} 100%)\`
              : \`radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, \${colors.bg || '#F5ECDD'} 100%)\`
          }}
        >
          {/* Custom Template Background (User's Uploaded Design) */}
          {data.mahavirSwamiImage && data.mahavirSwamiImage.includes('blob') ? (
            <img 
              src={data.mahavirSwamiImage} 
              alt="Template Background" 
              className="absolute inset-0 w-full h-full object-cover z-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 z-0 flex flex-col items-center pt-24">
              <JainTempleAccents templateId={template.id} color={colors.border} accentColor={colors.accentGold} />
              
              {/* Mahavir Swami Darshan with Badge */}
              <div className="relative flex justify-center z-10 mb-8">
                <div className="relative">
                  <img
                    src={data.mahavirSwamiImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'}
                    alt="Mahavir Swami"
                    className="w-36 h-40 object-cover drop-shadow-2xl rounded-t-full border border-[#D4AF37]/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EA] via-transparent to-transparent opacity-80" />
                </div>
                {/* Parna Utsav Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-xl border border-[#D4AF37]/50 flex items-center gap-2 z-20">
                  <span className="text-[#D4AF37] text-xs">🏮</span>
                  <span className="font-hindi text-[11px] font-bold text-[#1F3C2C]">પાવન પારણા ઉત્સવ</span>
                  <span className="text-[#D4AF37] text-xs">🏮</span>
                </div>
              </div>
            </div>
          )}

          {/* Content Wrapper positioned in the center/blank space of their background */}
          <div className="relative z-10 w-full px-6 flex flex-col items-center mt-[280px]">
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

file = file.replace(/{\/\* SECTION 1: DARSHAN & TITLE \*\/}[\s\S]*?{\/\* SECTION 2: TAPASVI VANDAN \*\//, revertedSection1 + '\n\n        {/* SECTION 2: TAPASVI VANDAN */');

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Reverted Section 1 to support both default and full background image");
