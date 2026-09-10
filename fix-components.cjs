const fs = require('fs');

const filesToUpdate = [
  {
    path: 'src/components/EventScheduleTimeline.tsx',
    replaces: [
      {
        find: "language === 'hi' ? 'उत्सव का मंगल प्रवास' : 'Utsav Ka Mangal Pravas'",
        replace: "TRANSLATIONS[language]?.eventScheduleTitle || 'Utsav Ka Mangal Pravas'"
      },
      {
        find: "import { SupportedLanguage } from '../utils/translations';",
        replace: "import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';"
      }
    ]
  },
  {
    path: 'src/components/EventLocation.tsx',
    replaces: [
      {
        find: "language === 'hi' ? 'कार्यक्रम स्थल' : 'Karyakram Sthal'",
        replace: "TRANSLATIONS[language]?.eventLocationTitle || 'Event Venue'"
      },
      {
        find: "language === 'hi' ? 'भगवान के दर्शन के लिए आपका सहर्ष स्वागत है' : 'Welcome to seek blessings'",
        replace: "TRANSLATIONS[language]?.eventLocationSubtitle || 'Welcome to seek blessings'"
      },
      {
        find: "language === 'hi' ? 'मैप खोलें' : 'Open Map'",
        replace: "TRANSLATIONS[language]?.openMapsBtn || 'Open Map'"
      },
      {
        find: "import { SupportedLanguage } from '../utils/translations';",
        replace: "import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';"
      }
    ]
  },
  {
    path: 'src/components/MangalMuhurat.tsx',
    replaces: [
      {
        find: "language === 'hi' ? 'मंगल मुहूर्त' : 'Mangal Muhurat'",
        replace: "TRANSLATIONS[language]?.mangalMuhuratTitle || 'Mangal Muhurat'"
      },
      {
        find: "language === 'hi' ? 'गणराय की स्थापना का शुभ मुहूर्त - तारीख सहेज लें' : 'Auspicious timing - Save the date'",
        replace: "TRANSLATIONS[language]?.mangalMuhuratSubtitle || 'Auspicious timing - Save the date'"
      },
      {
        find: ">सोमवार<",
        replace: ">{TRANSLATIONS[language]?.mangalMuhuratDay || 'Monday'}<"
      },
      {
        find: "language === 'hi' ? 'कैलेंडर में जोड़ें' : 'Add to Calendar'",
        replace: "TRANSLATIONS[language]?.mangalMuhuratBtnCal || 'Add to Calendar'"
      },
      {
        find: "language === 'hi' ? 'रास्ता दिखाएँ' : 'Get Directions'",
        replace: "TRANSLATIONS[language]?.mangalMuhuratBtnDir || 'Get Directions'"
      },
      {
        find: "import { SupportedLanguage } from '../utils/translations';",
        replace: "import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';"
      }
    ]
  },
  {
    path: 'src/components/FamilyHosts.tsx',
    replaces: [
      {
        find: "language === 'hi' ? 'सप्रेम निमंत्रक' : 'Suprem Nimantrak'",
        replace: "TRANSLATIONS[language]?.familyHostsSuperTitle || 'Cordially Invited By'"
      },
      {
        find: "language === 'hi' ? 'सप्रेम आमंत्रण' : 'Suprem Aamantran'",
        replace: "TRANSLATIONS[language]?.familyHostsTitle || 'Warm Invitation'"
      },
      {
        find: "import { SupportedLanguage } from '../utils/translations';",
        replace: "import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';"
      }
    ]
  },
  {
    path: 'src/components/YearlyJourneyTimeline.tsx',
    replaces: [
      {
        find: "language === 'hi' ? 'यादें' : 'Memories'",
        replace: "TRANSLATIONS[language]?.memoriesSuperTitle || 'Memories'"
      },
      {
        find: "language === 'hi' ? 'पिछले वर्षों के दर्शन' : 'Past Years Darshan'",
        replace: "TRANSLATIONS[language]?.memoriesTitle || 'Darshan from Past Years'"
      },
      {
        find: "language === 'hi' ? 'हमारे घर हर साल विराजमान भगवान' : 'Divine presence in our home over the years'",
        replace: "TRANSLATIONS[language]?.memoriesSubtitle || 'Memories from previous years'"
      },
      {
        find: "import { SupportedLanguage } from '../utils/translations';",
        replace: "import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';"
      }
    ]
  }
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file.path)) {
    let content = fs.readFileSync(file.path, 'utf8');
    file.replaces.forEach(replace => {
      content = content.replace(replace.find, replace.replace);
    });
    fs.writeFileSync(file.path, content);
    console.log(`Updated ${file.path}`);
  }
});
