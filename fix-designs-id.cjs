const fs = require('fs');
let file = fs.readFileSync('src/components/InviteODesigns.tsx', 'utf8');

file = file.replace(/tmpl.id === 'divya' || tmpl.id === 'param'/g, 'false');
file = file.replace(/tmpl.id === 'rajwada'/g, "tmpl.id === 'parnaUtsav'");

fs.writeFileSync('src/components/InviteODesigns.tsx', file);
console.log("Fixed hardcoded IDs");
