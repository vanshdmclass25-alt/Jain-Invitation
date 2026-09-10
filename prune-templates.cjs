const fs = require('fs');
let file = fs.readFileSync('src/config/templates.ts', 'utf8');

// The file has a structure like:
// export const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
//   parnaUtsav: { ... },
//   sukoon: { ... },
//   shwet: { ... },
//   divya: { ... },
//   ...
// };
// Let's use regex or string manipulation to remove the extras.
// Instead of complex regex, let's just find the index of "divya:" and cut it until the end of the object, then add "};"
const divyaIndex = file.indexOf('  divya: {');
if (divyaIndex > -1) {
  const prefix = file.substring(0, divyaIndex);
  
  // Find where the default data starts, which is after TEMPLATES object
  const defaultDataIndex = file.indexOf('export const DEFAULT_INVITATION_DATA');
  
  if (defaultDataIndex > -1) {
    const suffix = file.substring(defaultDataIndex);
    fs.writeFileSync('src/config/templates.ts', prefix + '};\n\n' + suffix);
  }
}
