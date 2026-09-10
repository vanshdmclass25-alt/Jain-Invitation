const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  /data\.mahavirSwamiImage\.includes\('blob'\)/g,
  "data.mahavirSwamiImage.startsWith('data:image/')"
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Fixed bg check for data URLs");
