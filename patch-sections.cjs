const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

const newSections = `
        {/* SECTION 1: DARSHAN & TITLE */}
        <div 
          id="preview-darshan"
          className="relative py-12 px-4 text-center overflow-hidden"
          style={{
            background: isDarkBg
              ? \`radial-gradient(circle at 50% 20%, \${colors.primary} 0%, \${colors.bg} 100%)\`
              : \`radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, \${colors.bg || '#F5ECDD'} 100%)\`
          }}
        >
          {/* Pink Canopy Background Approximation */}
          <div className="absolute top-0 left-0 w-full h-64 opacity-30 pointer-events-none flex justify-center">
            <div className="w-[120%] h-full bg-pink-200 rounded-b-full blur-2xl transform -translate-y-10" />
          </div>
          
          <JainTempleAccents templateId={template.id} color={colors.border} accentColor={colors.accentGold} />
          
          {/* Mahavir Swami Darshan with Badge */}
          <div className="relative flex justify-center my-6 z-10">
            <MahavirSwamiImage
              customImageUrl={data.mahavirSwamiImage}
              className="w-36 h-40 drop-shadow-2xl"
              showAura={true}
            />
            {/* Parna Utsav Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-xl border border-[#D4AF37]/50 flex items-center gap-2 z-20">
              <span className="text-[#D4AF37] text-xs">🏮</span>
              <span className="font-hindi text-[11px] font-bold text-[#1F3C2C]">પાવન પારણા ઉત્સવ</span>
              <span className="text-[#D4AF37] text-xs">🏮</span>
            </div>
          </div>
          
          {/* Mahaveer Namah Badge */}
          <div className="mt-12 mb-5 flex justify-center relative z-10">
            <div className="bg-[#FAF6EB] border border-[#D4AF37]/40 rounded-full px-4 py-1 inline-flex items-center gap-2 shadow-sm">
              <span className="text-[#C08B46] text-sm">✨</span>
              <span className="font-hindi text-[11px] font-bold text-[#C08B46] tracking-wide">॥ श्री महावीराय नमः ॥</span>
              <span className="text-[#C08B46] text-sm">✨</span>
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-cormorant font-bold text-[#1F3C2C] mb-3 leading-tight relative z-10">
            Tapasya Pārna Mahotsav
          </h1>
          <p className="font-cormorant italic text-sm text-stone-600 max-w-[260px] mx-auto leading-relaxed relative z-10">
            Auspicious celebration of spiritual penance and soul purification
          </p>
        </div>

        {/* SECTION 2: TAPASVI VANDAN */}
        <div className="relative py-12 px-4 text-center bg-[#FAF6EB] bg-grain border-t border-[#D4AF37]/20">
          <span className="font-hindi text-[11px] font-bold text-[#C08B46] tracking-wide mb-2 block">
            ॥ श्री महावीराय नमः ॥
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#352516] mb-1">
            Noble Tapasvi Vandan
          </h2>
          <p className="font-cormorant italic text-sm text-[#8C5D1F] mb-10">
            Tapasya Pārna Sacred Penance
          </p>
          
          {/* Tapasvi Elaborate Frame */}
          <div className="relative max-w-[220px] mx-auto z-10 mb-8">
            
            {/* Hanging Floral Elements (CSS approximated) */}
            {/* Left Lotus Stem */}
            <div className="absolute -left-10 bottom-2 w-8 h-48 border-r-2 border-emerald-600/60 rounded-tr-[50px] z-0 pointer-events-none" />
            <div className="absolute -left-12 top-20 w-4 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full rounded-bl-full transform -rotate-12 shadow-sm z-0 pointer-events-none" />
            <div className="absolute -left-16 bottom-0 w-8 h-12 bg-emerald-500/80 rounded-t-full rounded-br-full transform -rotate-45 z-0 pointer-events-none" />
            
            {/* Right Lotus Stem */}
            <div className="absolute -right-10 bottom-2 w-8 h-48 border-l-2 border-emerald-600/60 rounded-tl-[50px] z-0 pointer-events-none" />
            <div className="absolute -right-12 top-20 w-4 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full rounded-br-full transform rotate-12 shadow-sm z-0 pointer-events-none" />
            <div className="absolute -right-16 bottom-0 w-8 h-12 bg-emerald-500/80 rounded-t-full rounded-bl-full transform rotate-45 z-0 pointer-events-none" />
            
            {/* Top Lanterns */}
            <div className="absolute -top-6 left-0 w-6 h-10 border border-[#D4AF37] rounded-sm bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] opacity-80 z-20 pointer-events-none flex flex-col items-center justify-center shadow-md">
              <div className="w-4 h-6 border border-white/50 rounded-sm bg-white/20" />
            </div>
            <div className="absolute -top-6 right-0 w-6 h-10 border border-[#D4AF37] rounded-sm bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] opacity-80 z-20 pointer-events-none flex flex-col items-center justify-center shadow-md">
              <div className="w-4 h-6 border border-white/50 rounded-sm bg-white/20" />
            </div>

            {/* The Frame */}
            <div className="border border-[#D4AF37] p-1.5 bg-white shadow-xl relative z-10 rounded-sm">
              <div className="border border-[#D4AF37] rounded-lg p-2.5 relative overflow-visible bg-white">
                
                {/* Decorative Vine & Dots Overlay */}
                <div className="absolute inset-0 border border-emerald-700/50 rounded-lg transform scale-[1.04] z-20 pointer-events-none">
                  <div className="absolute -top-1 left-6 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute -top-1 right-6 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute top-12 -left-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute top-12 -right-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute bottom-1/3 -left-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute bottom-1/3 -right-1 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute -bottom-1 left-8 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                  <div className="absolute -bottom-1 right-8 w-2 h-2 bg-pink-400 rounded-full shadow-sm" />
                </div>
                
                {/* Tapasvi Photo */}
                <div className="w-full aspect-[3/4] bg-stone-100 rounded overflow-hidden shadow-inner">
                  {data.profileImage ? (
                    <img 
                      src={data.profileImage} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      alt="Tapasvi"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" 
                      className="w-full h-full object-cover opacity-80" 
                      alt="Tapasvi Placeholder"
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* TAPASVI Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2D4B3E] text-white text-[9.5px] font-bold tracking-[0.2em] px-5 py-1.5 rounded-full z-30 shadow-md">
              TAPASVI
            </div>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight mt-1 mb-1" style={{ color: canvasTextColor }}>
            {data.name || 'Tapasvi Name'}
          </h2>
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: colors.accentGold }}>
            {data.tapasyaType || t.defaultTapasyaName}
          </p>
          {data.hostNames && (
            <p className="text-xs font-cormorant italic" style={{ color: canvasSubtextColor }}>
              {t.familyHostedBy(data.hostNames)}
            </p>
          )}
        </div>
`;

file = file.replace(/{\/\* SECTION 1: STARTING - LORD MAHAVEER & HEADLINE \*\/}[\s\S]*?{\/\* SECTION 2: HEARTFELT INVITATION \(IN ALL AVAILABLE LANGUAGES\) \*\/}/, newSections + '\n\n        {/* SECTION 2: HEARTFELT INVITATION (IN ALL AVAILABLE LANGUAGES) */}');

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched LongInvitePreview");
