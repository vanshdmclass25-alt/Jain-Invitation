const fs = require('fs');
let file = fs.readFileSync('src/components/InviteODesigns.tsx', 'utf8');

const newArray = `
  const allTemplatesList = [
    {
      ...TEMPLATES.sukoon,
      badge: TEMPLATES.sukoon.audienceBadge,
      subtitle: TEMPLATES.sukoon.description,
      bgPreview: 'bg-gradient-to-b from-[#EBF3ED] via-[#F8FBF8] to-[#EBF3ED]',
      textColor: 'text-[#183325]',
    },
    {
      ...TEMPLATES.parnaUtsav,
      badge: TEMPLATES.parnaUtsav.audienceBadge,
      subtitle: TEMPLATES.parnaUtsav.description,
      bgPreview: 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EA] to-[#F5ECDD]',
      textColor: 'text-[#352516]',
    },
    {
      ...TEMPLATES.shwet,
      badge: TEMPLATES.shwet.audienceBadge,
      subtitle: TEMPLATES.shwet.description,
      bgPreview: 'bg-gradient-to-b from-[#E5E5EB] via-[#FFFFFF] to-[#E5E5EB]',
      textColor: 'text-[#22201D]',
    }
  ];
`;

file = file.replace(/const allTemplatesList = \[[\s\S]*?\];/m, newArray);
fs.writeFileSync('src/components/InviteODesigns.tsx', file);
console.log("Patched allTemplatesList");
