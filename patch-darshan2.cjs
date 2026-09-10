const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  /background:\s*isDark\s*\?\s*'radial-gradient\(circle at 50% 20%, #152744 0%, #0D1B2A 60%, #0A121E 100%\)'\s*:\s*'radial-gradient\(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, #F5ECDD 100%\)'/,
  "background: isDarkBg\n              ? `radial-gradient(circle at 50% 20%, ${colors.primary} 0%, ${colors.bg} 100%)`\n              : `radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, ${colors.bg || '#F5ECDD'} 100%)`"
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched darshan background 2");
