const fs = require('fs');
let code = fs.readFileSync('src/utils/translations.ts', 'utf8');

if (!code.includes('eventScheduleTitle: \'Utsav Ka Mangal Pravas\'')) {
  // It seems the english/hindi/gujarati replacements didn't hit properly for all?
  // Let's check where the errors are coming from. The errors say english and another language are missing the fields.
}

console.log(code.match(/eventScheduleTitle/g));
