const fs = require('fs');
let file = fs.readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

// replace all usages of isDark with isDarkBg, except the one where it's passed as prop if it's explicitly isDark
// actually, let's just make `isDark` equal to `isDarkBg` and remove `isDarkBg` if possible, but ParnaVidhiGuide accepts `isDark`.
// Wait, ParnaVidhiGuide and AnumodnaAndRSVP both use `isDark` prop. They should be aware of `isDarkBg`.

file = file.replace(/const isDark = template\.id === 'divya';/, "const isDark = isDarkBg; // Changed to match isDarkBg");

fs.writeFileSync('src/components/LongInvitePreview.tsx', file);
console.log("Patched isDark");
