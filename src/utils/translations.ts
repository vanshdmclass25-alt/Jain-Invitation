export type SupportedLanguage = 'gu' | 'hi' | 'en';

export interface TranslationDictionary {
  // Mantras & Top Headers
  topMantra: string;
  jaiJinendra: string;
  eventHeadingDefault: string;
  welcomeHeadlineDefault: string;
  tapasviVandanBadge: string;
  celebratingJourneyBadge: string;
  defaultTapasyaName: string;
  hostedByPrefix: string;

  // Heartfelt section
  heartfeltTitle: string;
  heartfeltSubtitle: string;
  heartfeltDefaultMessage: string;

  // Schedule strip
  eventLabel: string;
  dateLabel: string;
  timeLabel: string;
  defaultTime: string;

  // Venue & Maps
  locationLabel: string;
  openMapsBtn: string;

  // Yearly Timeline
  timelineTitle: string;
  timelineSubtitle: string;
  timelineYearLabel: string;
  timelineMemoryDefault: string;

  // Pushpanjali / Flower devotion
  flowerSectionBadge: string;
  flowerTitle: string;
  flowerInstruction: string;
  footingMantra: string;
  footingSubtitle: string;
  devoteFlowersBtn: string;
  offeredCountText: (count: number) => string;

  // Scratch card
  scratchBadge: string;
  scratchDefaultTitle: string;
  scratchFoilInstruction1: string;
  scratchFoilInstruction2: string;
  scratchRevealBtn: string;
  scratchRevealedStatus: string;
  scratchDefaultMessage: string;

  // Family section
  familyBadge: string;
  familyHostedBy: (hosts: string) => string;

  // Additional info
  additionalInfoTitle: string;

  // Closing
  closingMantra: string;
  closingWish: string;
  craftedBy: string;

  // Door reveal
  doorSacredAwaits: string;
  doorTapToEnter: string;
  doorEnterTemple: string;
  doorShubhLabhLeft: string;
  doorShubhLabhRight: string;
  doorCeremonyHeader: string;
  doorSkipAnimation: string;

  // Auto-scroll & Navigation
  autoScrollActive: string;
  autoScrollTapToPause: string;
  autoScrollResume: string;
  autoScrollPause: string;
  scrollToTop: string;
  jumpToSection: string;

  // Modular sections
  eventScheduleTitle: string;
  eventLocationTitle: string;
  eventLocationSubtitle: string;
  mangalMuhuratTitle: string;
  mangalMuhuratSubtitle: string;
  mangalMuhuratDay: string;
  mangalMuhuratBtnCal: string;
  mangalMuhuratBtnDir: string;
  familyHostsSuperTitle: string;
  familyHostsTitle: string;
  memoriesSuperTitle: string;
  memoriesTitle: string;
  memoriesSubtitle: string;

  // Quick nav items
  navDarshan: string;
  navHeartfelt: string;
  navSchedule: string;
  navVenue: string;
  navTimeline: string;
  navPushpanjali: string;
  navBlessing: string;

  // Action buttons
  shareWhatsApp: string;
  shareLink: string;
  saveImage: string;
  editDetails: string;
  changeDesign: string;
}

// Convert numbers to Gujarati or Hindi numerals if needed
export function formatNumberInLanguage(num: number, lang: SupportedLanguage): string {
  const gujaratiDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  const str = String(num);
  if (lang === 'gu') {
    return str.replace(/\d/g, (d) => gujaratiDigits[parseInt(d, 10)] || d);
  }
  if (lang === 'hi') {
    return str.replace(/\d/g, (d) => hindiDigits[parseInt(d, 10)] || d);
  }
  return str;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  gu: {
    topMantra: '॥ શ્રી મહાવીરાય નમઃ ॥',
    jaiJinendra: '॥ જય જિનેન્દ્ર ॥',
    eventHeadingDefault: 'પાવન તપસ્યા પારણા મહોત્સવ',
    welcomeHeadlineDefault: 'તપસ્યા પારણા મહોત્સવમાં આપનું હાર્દિક સ્વાગત છે',
    tapasviVandanBadge: 'તપસ્વી વંદન',
    celebratingJourneyBadge: 'પાવન તપસ્યાની અનુમોદના',
    defaultTapasyaName: 'અઠ્ઠાઈ તપસ્યા (૮ ઉપવાસ)',
    hostedByPrefix: 'પરિવાર વતી સસ્નેહ નિમંત્રણ:',

    heartfeltTitle: 'ભાવભર્યું આમંત્રણ',
    heartfeltSubtitle: 'હૃદયપૂર્વકનું સ્નેહ નિમંત્રણ',
    heartfeltDefaultMessage:
      'શ્રી મહાવીર સ્વામી ભગવાનની પરમ કૃપા અને પૂજ્ય વડીલોના આશીર્વાદથી, અમારા પ્રિય તપસ્વીના પાવન પારણા મહોત્સવ પ્રસંગે આપશ્રીને સપરિવાર હાર્દિક આમંત્રણ પાઠવીએ છીએ. આપની મંગલ ઉપસ્થિતિ આ આધ્યાત્મિક મહોત્સવની શોભા વધારશે.',

    eventLabel: 'પ્રસંગ',
    dateLabel: 'શુભ તારીખ',
    timeLabel: 'શુભ મુહૂર્ત',
    defaultTime: 'સવારે ૮:૩૦ વાગ્યાથી',

    locationLabel: 'સમારોહ સ્થળ અને સરનામું',
    openMapsBtn: 'ગૂગલ મેપ્સમાં જુઓ (દિશા-નિર્દેશ)',

    timelineTitle: 'વાર્ષિક તપસ્યા યાત્રા',
    timelineSubtitle: 'વર્ષ દર વર્ષની સાધના અને ભક્તિના પાવન સંસ્મરણો',
    timelineYearLabel: 'વર્ષ',
    timelineMemoryDefault: 'તપસ્યા સંસ્મરણ',

    flowerSectionBadge: 'પાવન દર્શન અને પુષ્પાંજલિ',
    flowerTitle: 'શ્રી મહાવીર સ્વામી દર્શન',
    flowerInstruction: 'પ્રભુ મહાવીર સ્વામીના પાવન ચરણોમાં શ્રદ્ધાપૂર્વક પુષ્પો અર્પણ કરો',
    footingMantra: '॥ ૐ નમો જિણાણં • ત્રિશલાનંદન વીર ॥',
    footingSubtitle: 'અનંત કરુણા • સર્વોચ્ચ અહિંસા',
    devoteFlowersBtn: 'પુષ્પાંજલિ અર્પણ કરો',
    offeredCountText: (count: number) =>
      `શ્રદ્ધાપૂર્વક ${formatNumberInLanguage(count, 'gu')} વાર પુષ્પાંજલિ અર્પણ કરી!`,

    scratchBadge: 'અંગત આશીર્વાદ',
    scratchDefaultTitle: 'આપના માટે ખાસ આશીર્વાદ સંદેશ',
    scratchFoilInstruction1: '✨ અહીં હળવેથી સ્ક્રેચ કરો ✨',
    scratchFoilInstruction2: 'આંગળી ઘસીને છૂપો સંદેશ ખોલો',
    scratchRevealBtn: 'સંદેશ જુઓ',
    scratchRevealedStatus: 'સંદેશ ખુલી ગયો!',
    scratchDefaultMessage:
      '🌸 પાવન મિચ્છામિ દુક્કડં! આપની પધરામણી અમારા પરિવાર માટે અતિ હર્ષદાયક રહેશે. સવારે ૯:૦૦ વાગ્યે મંગળિક આરતી અને ત્યારબાદ સ્વામી વાત્સલ્ય (સાધર્મિક ભક્તિ) માં અવશ્ય પધારશો.',

    familyBadge: 'પરિવાર વંદન અને આશીર્વાદ',
    familyHostedBy: (hosts: string) => `${hosts} પરિવાર વતી સસ્નેહ નિમંત્રણ`,

    additionalInfoTitle: 'વિશેષ માહિતી અને સમારોહ વિગત',

    closingMantra: 'મિચ્છામિ દુક્કડં • સુખ સાતામાં રહેવું',
    closingWish:
      'આ પુણ્યશાળી તપસ્યા આત્માની શુદ્ધિ, અનંત શાંતિ અને સદ્ગતિ આપે તેવી મંગલ કામના.',
    craftedBy: 'તત્વ દ્વારા ભક્તિભાવપૂર્વક નિર્મિત',

    doorSacredAwaits: 'પાવન યાત્રા આપની પ્રતીક્ષા કરે છે…',
    doorTapToEnter: 'દરવાજા ખોલવા સ્પર્શ કરો',
    doorEnterTemple: 'પ્રવેશ કરો',
    doorShubhLabhLeft: 'શુભ',
    doorShubhLabhRight: 'લાભ',
    doorCeremonyHeader: 'પાવન તપસ્યા પારણા મહોત્સવ',
    doorSkipAnimation: 'એનિમેશન છોડો (Skip)',

    autoScrollActive: 'ઓટો-સ્ક્રોલ ચાલુ છે…',
    autoScrollTapToPause: 'ઓટો-સ્ક્રોલ ચાલુ છે (થોભાવવા અડો)',
    autoScrollResume: 'ઓટો-સ્ક્રોલ શરૂ કરો',
    autoScrollPause: 'થોભો',
    scrollToTop: 'ઉપર જાઓ',
    jumpToSection: 'વિભાગ પર જાઓ',

    eventScheduleTitle: 'ઉત્સવનો મંગલ પ્રવાસ',
    eventLocationTitle: 'કાર્યક્રમ સ્થળ',
    eventLocationSubtitle: 'ભગવાનના દર્શન માટે આપનું સ્વાગત છે',
    mangalMuhuratTitle: 'મંગળ મુહૂર્ત',
    mangalMuhuratSubtitle: 'શુભ મુહૂર્ત - તારીખ સાચવી લો',
    mangalMuhuratDay: 'સોમવાર',
    mangalMuhuratBtnCal: 'કેલેન્ડરમાં ઉમેરો',
    mangalMuhuratBtnDir: 'રસ્તો જુઓ',
    familyHostsSuperTitle: 'સપ્રેમ નિમંત્રક',
    familyHostsTitle: 'સપ્રેમ આમંત્રણ',
    memoriesSuperTitle: 'યાદો',
    memoriesTitle: 'ગત વર્ષોના દર્શન',
    memoriesSubtitle: 'પાછલા વર્ષોની સ્મૃતિઓ',

    navDarshan: 'દર્શન',
    navHeartfelt: 'આમંત્રણ',
    navSchedule: 'સમય-તારીખ',
    navVenue: 'સ્થળ',
    navTimeline: 'યાત્રા',
    navPushpanjali: 'પુષ્પાંજલિ',
    navBlessing: 'સંદેશ',

    shareWhatsApp: 'વોટ્સએપ પર શેર કરો',
    shareLink: 'લિંક શેર કરો',
    saveImage: 'આમંત્રણ સાચવો',
    editDetails: 'વિગતો સંપાદિત કરો',
    changeDesign: 'ડિઝાઇન બદલો',
  },

  hi: {
    topMantra: '॥ श्री महावीराय नमः ॥',
    jaiJinendra: '॥ जय जिनेन्द्र ॥',
    eventHeadingDefault: 'पावन तपस्या पारणा महोत्सव',
    welcomeHeadlineDefault: 'तपस्या पारणा महोत्सव में आपका हार्दिक स्वागत है',
    tapasviVandanBadge: 'तपस्वी वंदन',
    celebratingJourneyBadge: 'पावन तपस्या की अनुमोदना',
    defaultTapasyaName: 'अट्ठाई तपस्या (८ उपवास)',
    hostedByPrefix: 'निमंत्रक परिवार:',

    heartfeltTitle: 'हार्दिक आमंत्रण',
    heartfeltSubtitle: 'हृदयपूर्वक स्नेह निमंत्रण',
    heartfeltDefaultMessage:
      'परम पूज्य भगवान महावीर स्वामी की असीम अनुकंपा एवं पूज्य बुजुर्गों के शुभाशीर्वाद से, हमारे प्रिय तपस्वी के पावन पारणा महोत्सव के शुभ अवसर पर आप सभी को सपरिवार सादर आमंत्रित करते हैं। आपकी मंगलमयी उपस्थिति से इस आध्यात्मिक उत्सव की शोभा द्विगुणित होगी।',

    eventLabel: 'प्रसंग',
    dateLabel: 'शुभ तिथि',
    timeLabel: 'शुभ मुहूर्त',
    defaultTime: 'प्रातः ८:३० बजे से',

    locationLabel: 'समारोह स्थल एवं पता',
    openMapsBtn: 'गूगल मैप्स में देखें (दिशा-निर्देश)',

    timelineTitle: 'वार्षिक तपस्या यात्रा',
    timelineSubtitle: 'वर्ष दर वर्ष की साधना एवं समर्पण के संस्मरण',
    timelineYearLabel: 'वर्ष',
    timelineMemoryDefault: 'तपस्या संस्मरण',

    flowerSectionBadge: 'पावन दर्शन एवं पुष्पांजलि',
    flowerTitle: 'श्री महावीर स्वामी दर्शन',
    flowerInstruction: 'प्रभु महावीर स्वामी के पावन चरणों में श्रद्धापूर्वक पुष्प अर्पित करें',
    footingMantra: '॥ ॐ नमो जिणाणं • त्रिशलानंदन वीर ॥',
    footingSubtitle: 'अनंत करुणा • सर्वोच्च अहिंसा',
    devoteFlowersBtn: 'पुष्पांजलि अर्पित करें',
    offeredCountText: (count: number) =>
      `श्रद्धापूर्वक ${formatNumberInLanguage(count, 'hi')} बार पुष्पांजलि अर्पित की!`,

    scratchBadge: 'विशेष आशीर्वाद',
    scratchDefaultTitle: 'आपके लिए विशेष आशीर्वाद संदेश',
    scratchFoilInstruction1: '✨ यहाँ धीरे से स्क्रैच करें ✨',
    scratchFoilInstruction2: 'उंगली फेरकर गुप्त संदेश खोलें',
    scratchRevealBtn: 'संदेश देखें',
    scratchRevealedStatus: 'संदेश खुल गया!',
    scratchDefaultMessage:
      '🌸 पावन मिच्छामि दुक्कड़म्! आपकी गरिमामयी उपस्थिति हमारे परिवार के लिए असीम आनंद का स्रोत है। प्रातः ९:०० बजे मांगलिक आरती एवं तत्पश्चात स्वामी वात्सल्य में सपरिवार पधारें।',

    familyBadge: 'परिवार वंदन एवं आशीर्वाद',
    familyHostedBy: (hosts: string) => `${hosts} परिवार की ओर से सस्नेह निमंत्रण`,

    additionalInfoTitle: 'विशेष जानकारी एवं समारोह विवरण',

    closingMantra: 'मिच्छामि दुक्कड़म् • सुख साता में रहें',
    closingWish:
      'यह पावन तपस्या आत्म-शुद्धि, अनंत शांति एवं सद्गति प्रदान करे, यही मंगल कामना।',
    craftedBy: 'तत्व द्वारा भक्तिभाव से निर्मित',

    doorSacredAwaits: 'पावन यात्रा आपकी प्रतीक्षा कर रही है…',
    doorTapToEnter: 'द्वार खोलने के लिए स्पर्श करें',
    doorEnterTemple: 'प्रवेश करें',
    doorShubhLabhLeft: 'शुभ',
    doorShubhLabhRight: 'लाभ',
    doorCeremonyHeader: 'पावन तपस्या पारणा महोत्सव',
    doorSkipAnimation: 'एनीमेशन छोड़ें (Skip)',

    autoScrollActive: 'ऑटो-स्क्रॉल जारी है…',
    autoScrollTapToPause: 'ऑटो-स्क्रॉल जारी है (रोकने हेतु टैप करें)',
    autoScrollResume: 'ऑटो-स्क्रॉल शुरू करें',
    autoScrollPause: 'रोकें',
    scrollToTop: 'शीर्ष पर जाएं',
    jumpToSection: 'अनुभाग चुनें',

    eventScheduleTitle: 'उत्सव का मंगल प्रवास',
    eventLocationTitle: 'कार्यक्रम स्थल',
    eventLocationSubtitle: 'भगवान के दर्शन के लिए आपका सहर्ष स्वागत है',
    mangalMuhuratTitle: 'मंगल मुहूर्त',
    mangalMuhuratSubtitle: 'शुभ मुहूर्त - तारीख सहेज लें',
    mangalMuhuratDay: 'सोमवार',
    mangalMuhuratBtnCal: 'कैलेंडर में जोड़ें',
    mangalMuhuratBtnDir: 'रास्ता दिखाएँ',
    familyHostsSuperTitle: 'सप्रेम निमंत्रक',
    familyHostsTitle: 'सप्रेम आमंत्रण',
    memoriesSuperTitle: 'यादें',
    memoriesTitle: 'पिछले वर्षों के दर्शन',
    memoriesSubtitle: 'पिछले वर्षों की स्मृतियाँ',

    navDarshan: 'दर्शन',
    navHeartfelt: 'निमंत्रण',
    navSchedule: 'समय-तारीख',
    navVenue: 'स्थान',
    navTimeline: 'यात्रा',
    navPushpanjali: 'पुष्पांजलि',
    navBlessing: 'आशीर्वाद',

    shareWhatsApp: 'व्हाट्सएप पर शेयर करें',
    shareLink: 'लिंक शेयर करें',
    saveImage: 'निमंत्रण सहेजें',
    editDetails: 'विवरण संपादित करें',
    changeDesign: 'डिज़ाइन बदलें',
  },

  en: {
    topMantra: '॥ Shri Mahaviraya Namah ॥',
    jaiJinendra: '॥ Jai Jinendra ॥',
    eventHeadingDefault: 'Sacred Tapasya Pārna Mahotsav',
    welcomeHeadlineDefault: 'Welcome to the Sacred Pārna of',
    tapasviVandanBadge: 'Tapasvi Vandan',
    celebratingJourneyBadge: 'Celebrating the Sacred Journey of',
    defaultTapasyaName: 'Atthai Tapasya (8 Upvas)',
    hostedByPrefix: 'Graciously hosted by',

    heartfeltTitle: 'Heartfelt Invitation',
    heartfeltSubtitle: 'Auspicious Invitation',
    heartfeltDefaultMessage:
      'With the supreme grace of Bhagwan Mahavir Swami and the affectionate blessings of our revered elders, we cordially invite you with deep reverence and joyful hearts to celebrate the sacred Pārna of our beloved Tapasvi. Your auspicious presence will truly magnify the spiritual aura of this holy occasion.',

    eventLabel: 'Event',
    dateLabel: 'Auspicious Date',
    timeLabel: 'Auspicious Timing',
    defaultTime: '8:30 AM onwards',

    locationLabel: 'Event Location & Venue',
    openMapsBtn: 'Open in Google Maps (Directions)',

    timelineTitle: 'Sacred Tapasya Journey',
    timelineSubtitle: 'Milestones of spiritual penance, faith, and devotion over the years',
    timelineYearLabel: 'Year',
    timelineMemoryDefault: 'Tapasya Milestone',

    flowerSectionBadge: 'Sacred Darshan & Pushpanjali',
    flowerTitle: 'Bhagwan Mahavir Swami Darshan',
    flowerInstruction: 'Touch to offer fresh flowers at the sacred feet of Lord Mahaveer Swami',
    footingMantra: '॥ Om Namo Jinanam • Trishalanandana Veera ॥',
    footingSubtitle: 'Infinite Compassion • Universal Ahimsa',
    devoteFlowersBtn: 'Offer Pushpanjali Flowers',
    offeredCountText: (count: number) =>
      `Offered with reverence ${count} ${count === 1 ? 'time' : 'times'}!`,

    scratchBadge: 'Secret Blessing',
    scratchDefaultTitle: 'Special Blessing for You',
    scratchFoilInstruction1: '✨ Gently Scratch Here ✨',
    scratchFoilInstruction2: 'Scratch with finger to reveal secret message',
    scratchRevealBtn: 'Reveal Message',
    scratchRevealedStatus: 'Message Revealed!',
    scratchDefaultMessage:
      '🌸 Michhami Dukkadam! Your gracious presence brings pure joy to our family. Please join us for auspicious Manglik Aarti at 9:00 AM followed by Swami Vatsalya lunch!',

    familyBadge: 'Family Blessings & Parivar',
    familyHostedBy: (hosts: string) => `With Warm Blessings from ${hosts}`,

    additionalInfoTitle: 'Ceremony Notes & Special Details',

    closingMantra: 'Michhami Dukkadam • Sukh Satama Rahevu',
    closingWish:
      'May this noble tapasya inspire purity of soul, infinite peace, and joyful celebration.',
    craftedBy: 'Crafted with devotion by Tattva',

    doorSacredAwaits: 'A Sacred Journey Awaits…',
    doorTapToEnter: 'Tap Doors to Enter',
    doorEnterTemple: 'Enter Sanctum',
    doorShubhLabhLeft: 'Shubh',
    doorShubhLabhRight: 'Labh',
    doorCeremonyHeader: 'Sacred Tapasya Pārna Mahotsav',
    doorSkipAnimation: 'Skip Animation',

    autoScrollActive: 'Auto-scrolling invitation…',
    autoScrollTapToPause: 'Auto-scrolling (Tap to pause)',
    autoScrollResume: 'Resume Auto-scroll',
    autoScrollPause: 'Pause',
    scrollToTop: 'Scroll to Top',
    jumpToSection: 'Jump to Section',

    eventScheduleTitle: 'Utsav Ka Mangal Pravas',
    eventLocationTitle: 'Event Venue',
    eventLocationSubtitle: 'Welcome to seek blessings',
    mangalMuhuratTitle: 'Mangal Muhurat',
    mangalMuhuratSubtitle: 'Auspicious timing - Save the date',
    mangalMuhuratDay: 'Monday',
    mangalMuhuratBtnCal: 'Add to Calendar',
    mangalMuhuratBtnDir: 'Get Directions',
    familyHostsSuperTitle: 'Cordially Invited By',
    familyHostsTitle: 'Warm Invitation',
    memoriesSuperTitle: 'Memories',
    memoriesTitle: 'Darshan from Past Years',
    memoriesSubtitle: 'Memories from previous years',

    navDarshan: 'Darshan',
    navHeartfelt: 'Heartfelt',
    navSchedule: 'Schedule',
    navVenue: 'Location',
    navTimeline: 'Journey',
    navPushpanjali: 'Pushpanjali',
    navBlessing: 'Blessing',

    shareWhatsApp: 'Share on WhatsApp',
    shareLink: 'Share Link',
    saveImage: 'Save Image',
    editDetails: 'Edit Details',
    changeDesign: 'Change Design',
  },
};

/**
 * Localizes a date string (YYYY-MM-DD) into Gujarati, Hindi, or English
 */
export function formatLocalizedDate(dateStr: string, lang: SupportedLanguage = 'gu'): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const guMonths = [
    'જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન',
    'જુલાઈ', 'ઓગસ્ટ', 'સપ્ટેમ્બર', 'ઓક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર'
  ];
  const guDays = [
    'રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'
  ];

  const hiMonths = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];
  const hiDays = [
    'रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'
  ];

  const dayOfMonth = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeekIdx = date.getDay();

  if (lang === 'gu') {
    const dayGu = guDays[dayOfWeekIdx];
    const monthGu = guMonths[monthIdx];
    const dayFormatted = formatNumberInLanguage(dayOfMonth, 'gu');
    const yearFormatted = formatNumberInLanguage(year, 'gu');
    return `${dayGu}, ${dayFormatted} ${monthGu} ${yearFormatted}`;
  }

  if (lang === 'hi') {
    const dayHi = hiDays[dayOfWeekIdx];
    const monthHi = hiMonths[monthIdx];
    const dayFormatted = formatNumberInLanguage(dayOfMonth, 'hi');
    const yearFormatted = formatNumberInLanguage(year, 'hi');
    return `${dayHi}, ${dayFormatted} ${monthHi} ${yearFormatted}`;
  }

  // English fallback
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Localizes time string if standard or returns formatted
 */
export function formatLocalizedTime(timeStr: string, lang: SupportedLanguage = 'gu'): string {
  if (!timeStr) return '';
  if (lang === 'en') return timeStr;

  // Convert numbers in timeStr to target script
  return formatNumberInLanguage(parseInt(timeStr, 10) || 0, lang) !== '0'
    ? timeStr.replace(/\d+/g, (m) => formatNumberInLanguage(Number(m), lang))
    : timeStr;
}
