const fs = require('fs');
let file = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const banner = `
      {/* Sacred Invocation Banner */}
      <div className="w-full bg-[#FAF8F3] border-t border-b border-[#D4AF37]/30 py-1.5 flex justify-center">
        <span className="font-hindi text-[11px] text-[#C08B46] tracking-widest font-medium">॥ श्री महावीराय नमः ॥</span>
      </div>
    </header>
`;

file = file.replace(/<\/header>/, banner);

fs.writeFileSync('src/components/Navbar.tsx', file);
console.log("Patched Navbar");
