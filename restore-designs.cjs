const fs = require('fs');
let file = fs.readFileSync('src/components/InviteODesigns.tsx', 'utf8');

// The file looks like: falseifalsemfalsepfalse...
let restored = '';
// Let's verify if it starts with false
if (file.startsWith('false')) {
  for (let i = 5; i < file.length; i += 6) {
    restored += file[i];
  }
  fs.writeFileSync('src/components/InviteODesigns.tsx', restored);
  console.log("Restored!");
} else {
  console.log("Does not start with false");
}
