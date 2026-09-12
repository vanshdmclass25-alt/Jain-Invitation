const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/components/InvitationForm.tsx', 'utf8');

// 1. Remove Mahavir Swami section
const startMahavir = "{/* SECTION C: BHAGWAN MAHAVIR SWAMI IMAGE */}";
const endMahavir = "{/* SECTION D: TAPASYA TYPE */}";

if (content.includes(startMahavir) && content.includes(endMahavir)) {
  const sIndex = content.indexOf(startMahavir);
  const eIndex = content.indexOf(endMahavir);
  content = content.substring(0, sIndex) + endMahavir + content.substring(eIndex + endMahavir.length);
  console.log("Removed Mahavir Swami Image upload section.");
}

// 2. Remove Yearly Journey section
const startYearly = `<div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8B6E28]" />
            <span className="text-sm font-semibold text-stone-900">
              Yearly Journey Photos (One Line Chart Timeline)`;

const endYearly = "{/* SECTION I: SCRATCHABLE BOX (HIDDEN MESSAGE) */}";

if (content.includes(startYearly) && content.includes(endYearly)) {
  const sIndex = content.indexOf(startYearly);
  const eIndex = content.indexOf(endYearly);
  content = content.substring(0, sIndex) + endYearly + content.substring(eIndex + endYearly.length);
  console.log("Removed Yearly Journey Photos section.");
}

// 3. Remove yearly handlers
const startHandlers = "// Yearly Milestone handlers";
const endHandlers = "// Event Schedule handlers";

if (content.includes(startHandlers) && content.includes(endHandlers)) {
  const sIndex = content.indexOf(startHandlers);
  const eIndex = content.indexOf(endHandlers);
  content = content.substring(0, sIndex) + endHandlers + content.substring(eIndex + endHandlers.length);
  console.log("Removed yearly milestone handlers.");
}

writeFileSync('src/components/InvitationForm.tsx', content);
