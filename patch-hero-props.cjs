const fs = require('fs');
let file = fs.readFileSync('src/components/InviteOHero.tsx', 'utf8');

file = file.replace(
  /onOpenDoorCeremony: \(\) => void;/g,
  "onOpenDoorCeremony: () => void;\n  onSelectTemplate: (id: import('../types').TemplateId) => void;"
);

file = file.replace(
  /onOpenDoorCeremony,?\n}\) => {/g,
  "onOpenDoorCeremony,\n  onSelectTemplate,\n}) => {"
);

const pills = `
          {/* RIGHT: REAL LONG PHONE PREVIEW (LIKE INVITEO) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Floating Template Switcher */}
            <div className="mb-4 flex flex-wrap justify-center gap-2 z-10">
              <button 
                onClick={() => onSelectTemplate('sukoon')}
                className={\`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all \${template.id === 'sukoon' ? 'bg-[#264A38] text-white border-[#264A38]' : 'bg-white text-[#5C4E42] border-[#E0A458]/40 shadow-sm hover:shadow-md'}\`}
              >
                <span className="text-emerald-500">🍃</span> Sukoon
              </button>
              <button 
                onClick={() => onSelectTemplate('parnaUtsav')}
                className={\`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all \${template.id === 'parnaUtsav' ? 'bg-[#8B1828] text-white border-[#8B1828]' : 'bg-white text-[#5C4E42] border-[#E0A458]/40 shadow-sm hover:shadow-md'}\`}
              >
                <span className="text-pink-500">🌸</span> Pārna Utsav
              </button>
              <button 
                onClick={() => onSelectTemplate('shwet')}
                className={\`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all \${template.id === 'shwet' ? 'bg-stone-200 text-[#1F1711] border-stone-300' : 'bg-white text-[#5C4E42] border-[#E0A458]/40 shadow-sm hover:shadow-md'}\`}
              >
                <span className="text-stone-400">🤍</span> Shwet
              </button>
            </div>

            {/* Helpful indicator badge above phone */}
            <div className="mb-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E0A458]/40 shadow-xs text-xs text-[#5C4E42] z-10">
`;

file = file.replace(/{\/\* RIGHT: REAL LONG PHONE PREVIEW[\s\S]*?<div className="mb-2\.5 inline-flex/m, pills);

fs.writeFileSync('src/components/InviteOHero.tsx', file);
console.log("Patched Hero props and pills");
