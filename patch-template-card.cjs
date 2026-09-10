const fs = require('fs');
let file = fs.readFileSync('src/components/TemplateCard.tsx', 'utf8');

file = file.replace(
  /color: template\.colors\.text,/,
  'color: [\'rajwada\', \'divya\', \'param\', \'mangalam\'].includes(template.id) ? template.colors.secondary : template.colors.text,'
);

fs.writeFileSync('src/components/TemplateCard.tsx', file);
console.log("Patched template card");
