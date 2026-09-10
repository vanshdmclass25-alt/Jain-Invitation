const fs = require('fs');
let file = fs.readFileSync('src/components/YearlyJourneyTimeline.tsx', 'utf8');

file = file.replace(
  '<div className="w-full aspect-[4/5] bg-white p-2 sm:p-3 rounded-md shadow-lg border border-stone-100 transition-transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:rotate-1">',
  '<div className="w-full bg-white p-2 sm:p-3 rounded-md shadow-lg border border-stone-100 transition-transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:rotate-1">'
);

file = file.replace(
  '<div className="w-full h-full overflow-hidden bg-stone-100 mb-3 rounded-sm">',
  '<div className="w-full aspect-[4/5] overflow-hidden bg-stone-100 mb-2 sm:mb-3 rounded-sm">'
);

fs.writeFileSync('src/components/YearlyJourneyTimeline.tsx', file);
console.log("Patched YearlyJourneyTimeline");
