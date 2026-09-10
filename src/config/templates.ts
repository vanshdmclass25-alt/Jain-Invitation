import { TemplateDefinition, TemplateId, InvitationData } from '../types';

export const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
  parnaUtsav: {
    id: 'parnaUtsav',
    name: 'Pārna Utsav',
    tagline: 'Jaipur Haveli & Royal Sandstone',
    description: 'Magnificent royal Patan sandstone, regal vermilion kumkum red, warm 24k Kundan gold leaf, and grand carved Jharokha scalloped arches.',
    colorPaletteName: 'Royal Sandstone & Vermilion Gold',
    targetAudience: 'Heritage Royal • Grand Celebrations',
    audienceGroup: 'all',
    audienceBadge: 'HERITAGE ROYAL',
    colors: {
      primary: '#8B1828',       // Regal Vermilion Kumkum Crimson
      primaryLight: '#AC2338',
      secondary: '#FFFDF9',     // Royal Ivory Silk
      accentGold: '#D4AF37',    // 24k Kundan Gold
      bg: '#520D1A',            // Deep Palace Vermilion Canvas
      cardBg: '#FFFDF7',        // Warm Ivory Silk with Royal Crimson & Gold Jali
      text: '#2B080F',          // High-contrast Royal Mahogany
      subtext: '#6B1B29',
      border: '#D4AF37',        // Polished Kundan Gold Border
      badgeBg: '#8B1828',
      badgeText: '#FFF1C5',
      glow: 'rgba(212, 175, 55, 0.45)',
      sectionBg: '#FFF8EE',     // Warm Sandstone Silk Cards
      sectionBorder: '#E8C87A',
      outerBgGradient: 'radial-gradient(circle at 50% 20%, #7A1927 0%, #4D0C17 60%, #2A040B 100%)',
      doorWallGradient: 'linear-gradient(180deg, #F5E9D5 0%, #EAD5B7 60%, #D8BE9A 100%)',
      doorWoodGradient: 'linear-gradient(135deg, #702616 0%, #4E180E 50%, #702616 100%)',
      doorTrimGold: '#D4AF37',
      doorKnockerColor: '#FCD670',
      foilGradient: ['#8B1828', '#F5D061', '#FFF4CE', '#8B1828'],
      particleTheme: 'rajwada',
    },
    swatches: ['#8B1828', '#D4AF37', '#FFFDF9', '#F5E9D5'],
    doorWoodGradient: 'linear-gradient(135deg, #702616 0%, #4E180E 50%, #702616 100%)',
    doorTrimGold: '#D4AF37',
    doorKnockerColor: '#FCD670',
    ambientLight: 'rgba(212, 175, 55, 0.55)',
    archType: 'royal',
    fontHeading: 'font-cinzel',
    fontAccent: 'font-cormorant',
  },
  sukoon: {
    id: 'sukoon',
    name: 'Sukoon',
    tagline: 'Tranquil Pistachio Silk & Sacred Lotus',
    description: 'Serene morning pistachio silk, delicate blush pink lotus blossoms, and chandan gold celebrating deep inner peace and sacred tapasya.',
    colorPaletteName: 'Pistachio Silk & Blush Lotus',
    targetAudience: 'Tranquil Serenity • Universal Appeal',
    audienceGroup: 'all',
    audienceBadge: 'MOST POPULAR',
    colors: {
      primary: '#264A38',       // Tranquil Deep Matcha Sage
      primaryLight: '#37654E',
      secondary: '#F7FAF8',     // Silky Lotus Milk Ivory
      accentGold: '#C29B38',    // Sacred Chandan Gold
      bg: '#EBF3ED',            // Airy Serene Soft Jade Outer Canvas
      cardBg: '#F8FBF8',        // Luminous Pistachio Silk
      text: '#183325',          // Tranquil Forest Jade Text
      subtext: '#3B604E',
      border: '#3B6650',        // Serene Jade Hairline
      badgeBg: '#264A38',
      badgeText: '#F0F9F3',
      glow: 'rgba(194, 155, 56, 0.35)',
      sectionBg: '#F1F7F3',     // Matcha Alabaster Cards
      sectionBorder: '#A7C8B4',
      outerBgGradient: 'linear-gradient(180deg, #F0F6F2 0%, #E3EFE7 50%, #D4E5DA 100%)',
      doorWallGradient: 'linear-gradient(180deg, #EDF5F0 0%, #DFECE3 60%, #CFDFD4 100%)',
      doorWoodGradient: 'linear-gradient(135deg, #446C56 0%, #2A4838 50%, #446C56 100%)',
      doorTrimGold: '#C29B38',
      doorKnockerColor: '#F0D488',
      foilGradient: ['#264A38', '#E69AB0', '#F7FAF8', '#C29B38'],
      particleTheme: 'sukoon',
    },
    swatches: ['#264A38', '#F7FAF8', '#C29B38', '#E69AB0'],
    doorWoodGradient: 'linear-gradient(135deg, #446C56 0%, #2A4838 50%, #446C56 100%)',
    doorTrimGold: '#C29B38',
    doorKnockerColor: '#F0D488',
    ambientLight: 'rgba(194, 155, 56, 0.45)',
    archType: 'botanical',
    fontHeading: 'font-marcellus',
    fontAccent: 'font-cormorant',
  },
  shwet: {
    id: 'shwet',
    name: 'Shwet',
    tagline: 'Minimalist Jain Purity & Ahimsa',
    description: 'Pristine Makrana white marble, subtle platinum filigree, and serene jasmine blossoms celebrating sacred Ahimsa.',
    colorPaletteName: 'Pure Marble & Champagne',
    targetAudience: 'Minimalist Ahimsa • Pure Elegance',
    audienceGroup: 'all',
    audienceBadge: 'JAIN PURITY',
    colors: {
      primary: '#22201D',       // Charcoal Noir for crisp editorial contrast
      primaryLight: '#45423D',
      secondary: '#FFFFFF',     // Pure White
      accentGold: '#B89758',    // Soft Champagne Gold
      bg: '#E5E5EB',            // Palitana Silver Marble Outer Canvas
      cardBg: '#FFFFFF',        // Pristine White Marble
      text: '#1F1E1C',          // High contrast Charcoal Text
      subtext: '#615E58',
      border: '#C4AB80',        // Champagne Gold Hairline
      badgeBg: '#F5F2EB',
      badgeText: '#4E4230',
      glow: 'rgba(184, 151, 88, 0.3)',
      sectionBg: '#FAF8F5',     // Frosted Alabaster White Cards
      sectionBorder: '#E2DCD2',
      outerBgGradient: 'linear-gradient(180deg, #EBEBEF 0%, #DFDFE5 50%, #D5D5DC 100%)',
      doorWallGradient: 'linear-gradient(180deg, #F5F3EE 0%, #E2DDD3 60%, #D0CAC0 100%)',
      doorWoodGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E8E5DD 50%, #FAF8F5 100%)',
      doorTrimGold: '#C4AB80',
      doorKnockerColor: '#D4B87E',
      foilGradient: ['#A8AEB5', '#FFFFFF', '#D2D7DE', '#9CA3AD'],
      particleTheme: 'shwet',
    },
    swatches: ['#FFFFFF', '#B89758', '#E2DCD2', '#1F1E1C'],
    doorWoodGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E8E5DD 50%, #FAF8F5 100%)',
    doorTrimGold: '#C4AB80',
    doorKnockerColor: '#D4B87E',
    ambientLight: 'rgba(255, 255, 255, 0.7)',
    archType: 'minimal',
    fontHeading: 'font-cinzel',
    fontAccent: 'font-cormorant',
  },
};

export const DEFAULT_INVITATION_DATA: InvitationData = {
  name: 'Riya Shah',
  profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
  mahavirSwamiImage: '/bhagwan-mahavir-pic.png',
  tapasyaType: 'Atthai Tapasya (8 Upvas)',
  headline: 'Welcome to the Sacred Pārna of',
  eventName: 'Atthai Tapasya Pārna Mahotsav',
  language: 'gu',
  invitationMessage: 'With the supreme grace of Bhagwan Mahavir Swami and the affectionate blessings of our revered elders, we cordially invite you with deep reverence and joyful hearts to celebrate the sacred Pārna of our beloved Tapasvi. Your auspicious presence will truly magnify the spiritual aura of this holy occasion.',
  date: '2026-10-18',
  time: '8:30 AM onwards',
  location: 'Shree Parshwanath Jain Derasar, Borivali West, Mumbai',
  googleMapsUrl: 'https://maps.google.com/?q=Jain+Derasar+Borivali+West+Mumbai',
  events: [
    { id: '1', title: 'Varghoda', date: '17 October 2026', time: '4:00 PM' },
    { id: '2', title: 'Aarti & Mangal Divo', date: '17 October 2026', time: '7:30 PM' },
    { id: '3', title: 'Parna Vidhi', date: '18 October 2026', time: '8:30 AM' },
    { id: '4', title: 'Swami Vatsalya', date: '18 October 2026', time: '11:30 AM' },
  ],
  familyPhotos: [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
  ],
  familyPhoto: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
  yearlyPhotos: [
    {
      id: '1',
      year: '2022',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      caption: 'Initial 3 Upvas & Tapasya Sankalp',
    },
    {
      id: '2',
      year: '2024',
      photoUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
      caption: 'Ayambil Oli & Navkarsi Sadhana',
    },
    {
      id: '3',
      year: '2026',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      caption: 'Grand Atthai Tapasya Pārna Mahotsav',
    },
  ],
  scratchTitle: 'Special Blessing for You • અંગત આશીર્વાદ સંદેશ',
  scratchMessage: '🌸 પાવન મિચ્છામિ દુક્કડં! Your gracious presence brings pure joy to our family. Please join us for special Manglik Aarti at 9:00 AM followed by Swami Vatsalya!',
  additionalInformation: 'Pārna Timing: 8:30 AM to 10:30 AM followed by Swami Vatsalya (Sadharmik Lunch) at 11:30 AM.\n\nDress code: Traditional Indian wear in peaceful light shades.',
  selectedTemplate: 'sukoon' as TemplateId,
  hostNames: 'Kamlesh & Hansa Shah and Family',
};
