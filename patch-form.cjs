const fs = require('fs');
let file = fs.readFileSync('src/components/InvitationForm.tsx', 'utf8');

file = file.replace(
  /Bhagwan Mahavir Swami Sacred Image/g,
  'Template Background / Bhagwan Mahavir Image'
);

file = file.replace(
  /Custom Bhagwan Mahavir Swami Photo \(Optional\)/g,
  'Custom Background or Idol Photo (Optional)'
);

fs.writeFileSync('src/components/InvitationForm.tsx', file);
console.log("Patched InvitationForm labels");
