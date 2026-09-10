const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  /className="text-\[11px\] font-cormorant italic mt-1 max-w-xs mx-auto"\n\s*style=\{\{ color: colors.subtext \}\}/,
  'className="text-[11px] font-cormorant italic mt-1 max-w-xs mx-auto"\n            style={{ color: canvasSubtextColor }}'
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched footer subtext");
