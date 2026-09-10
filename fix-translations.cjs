const fs = require('fs');
let code = fs.readFileSync('src/utils/translations.ts', 'utf8');

if (!code.includes('eventScheduleTitle')) {
  // Add interface properties
  code = code.replace(
    '  jumpToSection: string;',
    `  jumpToSection: string;\n\n  // Modular sections\n  eventScheduleTitle: string;\n  eventLocationTitle: string;\n  eventLocationSubtitle: string;\n  mangalMuhuratTitle: string;\n  mangalMuhuratSubtitle: string;\n  mangalMuhuratDay: string;\n  mangalMuhuratBtnCal: string;\n  mangalMuhuratBtnDir: string;\n  familyHostsSuperTitle: string;\n  familyHostsTitle: string;\n  memoriesSuperTitle: string;\n  memoriesTitle: string;\n  memoriesSubtitle: string;`
  );
  
  // Update Gujarati
  code = code.replace(
    /jumpToSection: 'વિભાગ પર જાઓ',/g,
    `jumpToSection: 'વિભાગ પર જાઓ',\n\n    eventScheduleTitle: 'ઉત્સવનો મંગલ પ્રવાસ',\n    eventLocationTitle: 'કાર્યક્રમ સ્થળ',\n    eventLocationSubtitle: 'ભગવાનના દર્શન માટે આપનું સ્વાગત છે',\n    mangalMuhuratTitle: 'મંગળ મુહૂર્ત',\n    mangalMuhuratSubtitle: 'શુભ મુહૂર્ત - તારીખ સાચવી લો',\n    mangalMuhuratDay: 'સોમવાર',\n    mangalMuhuratBtnCal: 'કેલેન્ડરમાં ઉમેરો',\n    mangalMuhuratBtnDir: 'રસ્તો જુઓ',\n    familyHostsSuperTitle: 'સપ્રેમ નિમંત્રક',\n    familyHostsTitle: 'સપ્રેમ આમંત્રણ',\n    memoriesSuperTitle: 'યાદો',\n    memoriesTitle: 'ગત વર્ષોના દર્શન',\n    memoriesSubtitle: 'પાછલા વર્ષોની સ્મૃતિઓ',`
  );

  // Update Hindi
  code = code.replace(
    /jumpToSection: 'अनुभाग पर जाएँ',/g,
    `jumpToSection: 'अनुभाग पर जाएँ',\n\n    eventScheduleTitle: 'उत्सव का मंगल प्रवास',\n    eventLocationTitle: 'कार्यक्रम स्थल',\n    eventLocationSubtitle: 'भगवान के दर्शन के लिए आपका सहर्ष स्वागत है',\n    mangalMuhuratTitle: 'मंगल मुहूर्त',\n    mangalMuhuratSubtitle: 'शुभ मुहूर्त - तारीख सहेज लें',\n    mangalMuhuratDay: 'सोमवार',\n    mangalMuhuratBtnCal: 'कैलेंडर में जोड़ें',\n    mangalMuhuratBtnDir: 'रास्ता दिखाएँ',\n    familyHostsSuperTitle: 'सप्रेम निमंत्रक',\n    familyHostsTitle: 'सप्रेम आमंत्रण',\n    memoriesSuperTitle: 'यादें',\n    memoriesTitle: 'पिछले वर्षों के दर्शन',\n    memoriesSubtitle: 'पिछले वर्षों की स्मृतियाँ',`
  );
  
  // Update English
  code = code.replace(
    /jumpToSection: 'Jump to section',/g,
    `jumpToSection: 'Jump to section',\n\n    eventScheduleTitle: 'Utsav Ka Mangal Pravas',\n    eventLocationTitle: 'Event Venue',\n    eventLocationSubtitle: 'Welcome to seek blessings',\n    mangalMuhuratTitle: 'Mangal Muhurat',\n    mangalMuhuratSubtitle: 'Auspicious timing - Save the date',\n    mangalMuhuratDay: 'Monday',\n    mangalMuhuratBtnCal: 'Add to Calendar',\n    mangalMuhuratBtnDir: 'Get Directions',\n    familyHostsSuperTitle: 'Cordially Invited By',\n    familyHostsTitle: 'Warm Invitation',\n    memoriesSuperTitle: 'Memories',\n    memoriesTitle: 'Darshan from Past Years',\n    memoriesSubtitle: 'Memories from previous years',`
  );
  
  fs.writeFileSync('src/utils/translations.ts', code);
  console.log('Translations updated.');
} else {
  console.log('Translations already exist.');
}
