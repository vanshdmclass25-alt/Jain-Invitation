const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  /className="relative w-full aspect-\[9\/16\] min-h-\[700px\] flex flex-col items-center justify-center text-center overflow-hidden"/,
  'className="relative w-full aspect-[9/16] min-h-[700px] flex flex-col items-center justify-start text-center overflow-hidden"'
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Fixed flex justify to justify-start");
