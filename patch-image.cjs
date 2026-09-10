const fs = require('fs');

function replaceInFile(filePath) {
  let file = fs.readFileSync(filePath, 'utf8');
  file = file.replace(/\/assets\/mahavir-bhagwan-darshan\.jpeg/g, '/assets/mahavir-golden.jpg');
  fs.writeFileSync(filePath, file);
  console.log('Updated ' + filePath);
}

replaceInFile('src/components/FlowerDevotion.tsx');
replaceInFile('src/components/InviteODesigns.tsx');
replaceInFile('src/components/MahavirSwamiImage.tsx');
replaceInFile('src/config/templates.ts');
