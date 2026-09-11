export type TemplateId = 'parnaUtsav' | 'shwet' | 'sukoon';

export type AudienceGroup = 'all' | 'genz' | 'midage' | 'elders';

export interface TapasyaSong {
  id: string;
  titleGu: string;
  titleEn: string;
  singer: string;
  lyricistMusic?: string;
  tag: string;
  key: string;
  ragaStyle: string;
  audioUrl?: string;
}

export interface YearlyPhotoMilestone {
  id: string;
  year: string;
  photoUrl: string;
  caption: string;
}

export interface EventSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
}

export interface InvitationData {
  name: string;
  profileImage: string;
  mahavirSwamiImage?: string;
  tapasyaType: string;
  headline?: string;
  eventName?: string;
  language?: 'gu' | 'hi' | 'en';
  invitationMessage?: string;
  date: string;
  time: string;
  location: string;
  googleMapsUrl: string;
  events?: EventSchedule[];
  familyPhotos: string[];
  familyPhoto?: string;
  yearlyPhotos?: YearlyPhotoMilestone[];
  scratchMessage?: string;
  scratchTitle?: string;
  additionalInformation: string;
  selectedTemplate: TemplateId;
  selectedSongId?: string;
  customAudioUrl?: string;
  songAudioUrls?: Record<string, string>;
  hostNames?: string;
}

export interface TemplateColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  accentGold: string;
  bg: string;
  cardBg: string;
  text: string;
  subtext: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  glow: string;
  sectionBg: string;
  sectionBorder: string;
  outerBgGradient: string;
  doorWallGradient: string;
  doorWoodGradient: string;
  doorTrimGold: string;
  doorKnockerColor: string;
  foilGradient: [string, string, string, string];
  particleTheme: 'rajwada' | 'shwet' | 'sukoon' | 'divya' | 'aura' | 'param' | 'mangalam';
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  colorPaletteName: string;
  targetAudience?: string;
  audienceGroup?: AudienceGroup;
  audienceBadge?: string;
  colors: TemplateColors;
  swatches: string[];
  doorWoodGradient: string;
  doorTrimGold: string;
  doorKnockerColor: string;
  ambientLight: string;
  archType: 'royal' | 'minimal' | 'botanical' | 'celestial' | 'modern' | 'tailored' | 'traditional';
  fontHeading: string;
  fontAccent: string;
}
