const fs = require('fs');
let file = fs.readFileSync('src/config/templates.ts', 'utf8');

// Replace rajwada with parna-utsav
file = file.replace(/rajwada:/g, 'parnaUtsav:');
file = file.replace(/id: 'rajwada'/g, "id: 'parnaUtsav'");
file = file.replace(/name: 'Rajwada'/g, "name: 'Pārna Utsav'");
file = file.replace(/audienceBadge: 'Royal Heritage'/g, "audienceBadge: 'HERITAGE ROYAL'");

// Sukoon badge
file = file.replace(/audienceBadge: 'Most Loved'/g, "audienceBadge: 'MOST POPULAR'");

// Shwet badge
file = file.replace(/audienceBadge: 'Pure Ahimsa'/g, "audienceBadge: 'JAIN PURITY'");

fs.writeFileSync('src/config/templates.ts', file);
