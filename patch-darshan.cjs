const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

file = file.replace(
  "const isDark = template.id === 'divya';",
  "const isDark = template.id === 'divya';\n  const isDarkTheme = isDarkBg;"
);

// We need to replace the background gradient of preview-darshan
// It currently is:
// background: isDark
//   ? 'radial-gradient(circle at 50% 20%, #152744 0%, #0D1B2A 60%, #0A121E 100%)'
//   : 'radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, #F5ECDD 100%)'

file = file.replace(
  /background:\s*isDark\s*\?\s*'radial-gradient\([^']+'\)\s*:\s*'radial-gradient\([^']+'\)/,
  "background: isDarkBg ? `radial-gradient(circle at 50% 20%, ${colors.primary} 0%, ${colors.bg} 100%)` : `radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF5EA 60%, ${colors.bg || '#F5ECDD'} 100%)`"
);

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched darshan background");
