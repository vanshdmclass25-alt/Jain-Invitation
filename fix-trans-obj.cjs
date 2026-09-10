const fs = require('fs');
let code = fs.readFileSync('src/utils/translations.ts', 'utf8');

code = code.replace(
    /jumpToSection: 'अनुभाग चुनें',/g,
    `jumpToSection: 'अनुभाग चुनें',\n\n    eventScheduleTitle: 'उत्सव का मंगल प्रवास',\n    eventLocationTitle: 'कार्यक्रम स्थल',\n    eventLocationSubtitle: 'भगवान के दर्शन के लिए आपका सहर्ष स्वागत है',\n    mangalMuhuratTitle: 'मंगल मुहूर्त',\n    mangalMuhuratSubtitle: 'शुभ मुहूर्त - तारीख सहेज लें',\n    mangalMuhuratDay: 'सोमवार',\n    mangalMuhuratBtnCal: 'कैलेंडर में जोड़ें',\n    mangalMuhuratBtnDir: 'रास्ता दिखाएँ',\n    familyHostsSuperTitle: 'सप्रेम निमंत्रक',\n    familyHostsTitle: 'सप्रेम आमंत्रण',\n    memoriesSuperTitle: 'यादें',\n    memoriesTitle: 'पिछले वर्षों के दर्शन',\n    memoriesSubtitle: 'पिछले वर्षों की स्मृतियाँ',`
  );
  
code = code.replace(
    /jumpToSection: 'Jump to Section',/g,
    `jumpToSection: 'Jump to Section',\n\n    eventScheduleTitle: 'Utsav Ka Mangal Pravas',\n    eventLocationTitle: 'Event Venue',\n    eventLocationSubtitle: 'Welcome to seek blessings',\n    mangalMuhuratTitle: 'Mangal Muhurat',\n    mangalMuhuratSubtitle: 'Auspicious timing - Save the date',\n    mangalMuhuratDay: 'Monday',\n    mangalMuhuratBtnCal: 'Add to Calendar',\n    mangalMuhuratBtnDir: 'Get Directions',\n    familyHostsSuperTitle: 'Cordially Invited By',\n    familyHostsTitle: 'Warm Invitation',\n    memoriesSuperTitle: 'Memories',\n    memoriesTitle: 'Darshan from Past Years',\n    memoriesSubtitle: 'Memories from previous years',`
  );

fs.writeFileSync('src/utils/translations.ts', code);
