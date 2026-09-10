const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  /backgroundColor: `\$\{colors.accentGold\}10`,\n\s*borderColor: `\$\{colors.accentGold\}40`,\n\s*color: colors.text,/,
  'backgroundColor: `${colors.accentGold}10`,\n                borderColor: `${colors.accentGold}40`,\n                color: canvasTextColor,'
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched footer text");
