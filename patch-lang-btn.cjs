const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  /color: activeLang === lang \? colors\.secondary : colors\.text,/,
  'color: activeLang === lang ? colors.secondary : canvasTextColor,'
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched language button colors");
