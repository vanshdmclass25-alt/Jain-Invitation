import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  User, 
  Sparkles, 
  Info, 
  RotateCcw,
  Palette,
  Clock,
  Heart,
  Plus,
  Trash2,
  Lock,
  Gift,
  Languages,
  Image as ImageIcon
} from 'lucide-react';
import { InvitationData, TemplateId, YearlyPhotoMilestone, EventSchedule } from '../types';
import { TEMPLATES, DEFAULT_INVITATION_DATA } from '../config/templates';
import { ImageUploader } from './ImageUploader';
import { FamilyPhotosUploader } from './FamilyPhotosUploader';
import { YearlyMilestoneUploader } from './YearlyMilestoneUploader';
import { SongSelector } from './SongSelector';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';

interface InvitationFormProps {
  data: InvitationData;
  onChange: (data: InvitationData) => void;
  onSelectTemplateModal: () => void;
  onPreviewPhoto?: (url: string) => void;
}

const TAPASYA_PRESETS = [
  'Atthai (8 Upvas)',
  '16 Upvas',
  'Masakshaman (30 Upvas)',
  'Ayambil Oli',
  'Varshitap',
  'Siddhitap',
  'Navkarsi',
  'Updhyan Tap',
];

export const InvitationForm: React.FC<InvitationFormProps> = ({
  data,
  onChange,
  onSelectTemplateModal,
  onPreviewPhoto,
}) => {
  const currentTemplate = TEMPLATES[data.selectedTemplate] || TEMPLATES.sukoon;
  const [showYearlySection, setShowYearlySection] = useState(
    Boolean(data.yearlyPhotos && data.yearlyPhotos.length > 0)
  );

  const [showLocationSection, setShowLocationSection] = useState(
    Boolean(data.location) || Boolean(data.googleMapsUrl)
  );

  const handleToggleLocation = () => {
    if (showLocationSection) {
      // Removing location
      setShowLocationSection(false);
      onChange({
        ...data,
        location: '',
        googleMapsUrl: '',
      });
    } else {
      setShowLocationSection(true);
    }
  };

  const updateField = <K extends keyof InvitationData>(field: K, value: InvitationData[K]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const currentLang: SupportedLanguage = data.language === 'hi' ? 'hi' : data.language === 'en' ? 'en' : 'gu';

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    const t = TRANSLATIONS[newLang];
    // Check if texts are empty or default to auto-adapt them
    const isDefaultHeadline = !data.headline || Object.values(TRANSLATIONS).some(tr => tr.welcomeHeadlineDefault === data.headline) || data.headline === 'Welcome to the Sacred Pārna of';
    const isDefaultEventName = !data.eventName || Object.values(TRANSLATIONS).some(tr => tr.eventHeadingDefault === data.eventName) || data.eventName === 'Atthai Tapasya Pārna Mahotsav';
    const isDefaultMessage = !data.invitationMessage || Object.values(TRANSLATIONS).some(tr => tr.heartfeltDefaultMessage === data.invitationMessage);
    const isDefaultTapasya = !data.tapasyaType || Object.values(TRANSLATIONS).some(tr => tr.defaultTapasyaName === data.tapasyaType) || data.tapasyaType === 'Atthai (8 Upvas)';

    onChange({
      ...data,
      language: newLang,
      headline: isDefaultHeadline ? t.welcomeHeadlineDefault : data.headline,
      eventName: isDefaultEventName ? t.eventHeadingDefault : data.eventName,
      invitationMessage: isDefaultMessage ? t.heartfeltDefaultMessage : data.invitationMessage,
      tapasyaType: isDefaultTapasya ? t.defaultTapasyaName : data.tapasyaType,
    });
  };

  const handleApplyLanguageDefaults = () => {
    const t = TRANSLATIONS[currentLang];
    onChange({
      ...data,
      headline: t.welcomeHeadlineDefault,
      eventName: t.eventHeadingDefault,
      invitationMessage: t.heartfeltDefaultMessage,
      tapasyaType: t.defaultTapasyaName,
      scratchTitle: t.scratchDefaultTitle,
      scratchMessage: t.scratchDefaultMessage,
    });
  };

  const handleResetSample = () => {
    if (confirm('Load sample demonstration details? Any custom changes will be overwritten with the sample.')) {
      onChange({
        ...DEFAULT_INVITATION_DATA,
        selectedTemplate: data.selectedTemplate,
      });
    }
  };

  // Auto generate Google Maps link if user enters address
  const handleGenerateMapsUrl = () => {
    if (!data.location) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`;
    updateField('googleMapsUrl', url);
  };

  // Event Schedule handlers
  const handleAddEvent = (title = '', date = '', time = '') => {
    const newEvent: EventSchedule = {
      id: String(Date.now() + Math.random()),
      title: title || 'મંગલ પ્રવાહ વિધિ',
      date: date || '18 ઓક્ટોબર 2026',
      time: time || 'સવારે ૯:૦૦ કલાકે',
    };
    const updated = [...(data.events || []), newEvent];
    updateField('events', updated);
  };

  const handleUpdateEvent = (index: number, key: keyof EventSchedule, value: string) => {
    const list = [...(data.events || [])];
    if (list[index]) {
      list[index] = { ...list[index], [key]: value };
      updateField('events', list);
    }
  };

  const handleRemoveEvent = (index: number) => {
    const list = (data.events || []).filter((_, i) => i !== index);
    updateField('events', list);
  };

  const handleMoveEvent = (index: number, direction: 'up' | 'down') => {
    const list = [...(data.events || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < list.length) {
      const temp = list[index];
      list[index] = list[targetIdx];
      list[targetIdx] = temp;
      updateField('events', list);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7 space-y-7">
      {/* Form Header */}
      <div className="border-b border-stone-100 pb-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs uppercase font-cinzel font-semibold tracking-widest text-[#8B6E28]">
              Ceremony Customization
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Personalize Your Invitation
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Customize headline, heartfelt message, event sequence, timeline photos, and secret scratch card.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            title="Reload default preview values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Sample</span>
          </button>
        </div>

        {/* Current Active Template Banner */}
        <div className="mt-4 p-3 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/35 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
              style={{ backgroundColor: currentTemplate?.colors.primary }}
            />
            <div>
              <p className="text-xs font-semibold text-stone-800">
                Design Theme: <span className="font-cinzel text-[#8B6E28]">{currentTemplate?.name}</span>
              </p>
              <p className="text-[11px] text-stone-500">{currentTemplate.colorPaletteName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onSelectTemplateModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 hover:border-[#D4AF37] text-stone-800 shadow-2xs transition cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-[#8B6E28]" />
            <span>Switch Theme</span>
          </button>
        </div>

        {/* INVITATION LANGUAGE SELECTOR */}
        <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-r from-[#FAF6EE] to-[#FDFBF7] border border-[#D4AF37]/50 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#8B6E28]" />
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Invitation Language • આમંત્રણની ભાષા
              </label>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Full card adapts to this language
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gu', label: 'ગુજરાતી', sub: 'Gujarati' },
              { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
              { id: 'en', label: 'English', sub: 'English' },
            ].map((lang) => {
              const isSelected = currentLang === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => handleLanguageChange(lang.id as SupportedLanguage)}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8B6E28] text-white border-[#8B6E28] shadow-sm scale-[1.02]'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-[#D4AF37] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className="block text-xs font-bold">{lang.label}</span>
                  <span className={`block text-[10px] ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                    {lang.sub}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between">
            <span className="text-[10.5px] text-stone-500">
              Want authentic wording?
            </span>
            <button
              type="button"
              onClick={handleApplyLanguageDefaults}
              className="text-[10.5px] font-semibold text-[#8B6E28] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Load standard {currentLang === 'gu' ? 'ગુજરાતી' : currentLang === 'hi' ? 'हिन्दी' : 'English'} wording</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION A: HEADLINE & TAPASVI NAME */}
      <div className="space-y-4">
        {/* Main Headline */}
        <div className="space-y-1.5">
          <label htmlFor="invitation-headline-input" className="block text-sm font-semibold text-stone-800">
            Main Top Headline
          </label>
          <input
            id="invitation-headline-input"
            type="text"
            value={data.headline || ''}
            onChange={(e) => updateField('headline', e.target.value)}
            placeholder="e.g. Welcome to the Sacred Pārna of or તપસ્યા પારણા મહોત્સવ"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
          />
          <p className="text-[11px] text-stone-400">
            Appears right under Lord Mahaveer at the opening of the invitation.
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="invitation-name-input" className="block text-sm font-semibold text-stone-800">
            Tapasvi's Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="invitation-name-input"
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter the name (e.g. Riya Shah)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
            />
          </div>
        </div>

        {/* Event Name */}
        <div className="space-y-1.5">
          <label htmlFor="invitation-eventname-input" className="block text-sm font-semibold text-stone-800">
            Full Event Name
          </label>
          <input
            id="invitation-eventname-input"
            type="text"
            value={data.eventName || ''}
            onChange={(e) => updateField('eventName', e.target.value)}
            placeholder="e.g. Atthai Tapasya Pārna Mahotsav"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
          />
        </div>
      </div>

      {/* SECTION B: TAPASVI PORTRAIT */}
      <ImageUploader
        label="Tapasvi Portrait Photo"
        image={data.profileImage}
        onChange={(url) => updateField('profileImage', url)}
        helperText="Upload a clear portrait of the Tapasvi (JPG, PNG, WebP)"
      />

      {/* SECTION B2: BACKGROUND SONG / STOTRA SELECTOR */}
      <SongSelector
        selectedSongId={data.selectedSongId || 'reAavyaTapashvi'}
        customAudioUrl={data.customAudioUrl || ''}
        songAudioUrls={data.songAudioUrls || {}}
        onSelectSong={(songId) => updateField('selectedSongId', songId)}
        onUpdateCustomAudioUrl={(url) => updateField('customAudioUrl', url || '')}
        onUpdateSongAudioUrl={(songId, url) => {
          const currentUrls = data.songAudioUrls || {};
          if (url) {
            updateField('songAudioUrls', { ...currentUrls, [songId]: url });
          } else {
            const copy = { ...currentUrls };
            delete copy[songId];
            updateField('songAudioUrls', copy);
          }
        }}
      />

      {/* SECTION D: TAPASYA TYPE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="invitation-tapasya-input" className="block text-sm font-semibold text-stone-800">
            Type of Tapasya <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-stone-400">Type freely or choose below</span>
        </div>

        <input
          id="invitation-tapasya-input"
          type="text"
          value={data.tapasyaType}
          onChange={(e) => updateField('tapasyaType', e.target.value)}
          placeholder="e.g. Atthai Tapasya (8 Upvas), 16 Upvas, Masakshaman"
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
        />

        <div className="flex flex-wrap gap-1.5 pt-1">
          {TAPASYA_PRESETS.map((tap) => (
            <button
              key={tap}
              type="button"
              onClick={() => updateField('tapasyaType', tap)}
              className={`text-xs px-2.5 py-1 rounded-full border transition cursor-pointer ${
                data.tapasyaType === tap
                  ? 'bg-[#FAF3DF] border-[#D4AF37] text-[#85631E] font-medium'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              {tap}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION E: HEARTFELT INVITATION SECTION & LANGUAGE */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C98A3E]" />
            <label className="text-sm font-semibold text-stone-900">
              Heartfelt Invitation Section
            </label>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-stone-400" />
            {(['gu', 'hi', 'en'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => updateField('language', lang)}
                className={`px-2 py-0.5 rounded-md text-xs font-medium border cursor-pointer ${
                  (data.language || 'gu') === lang
                    ? 'bg-[#8B6E28] text-white border-[#8B6E28]'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {lang === 'gu' ? 'ગુજરાતી' : lang === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-stone-500">
          This displays "ભાવભર્યું આમંત્રણ" (or chosen language) followed by your custom heartfelt message.
        </p>

        <textarea
          rows={3}
          value={data.invitationMessage || ''}
          onChange={(e) => updateField('invitationMessage', e.target.value)}
          placeholder="With the supreme grace of Bhagwan Mahavir Swami and the affectionate blessings of our revered elders, we cordially invite you with deep reverence and joyful hearts..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm leading-relaxed transition"
        />
      </div>

      {/* SECTION F: DATE & TIME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="invitation-date-input" className="block text-sm font-semibold text-stone-800">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              id="invitation-date-input"
              type="date"
              value={data.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="invitation-time-input" className="block text-sm font-semibold text-stone-800">
            Auspicious Timing (Muhurat)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Clock className="w-4 h-4" />
            </div>
            <input
              id="invitation-time-input"
              type="text"
              value={data.time}
              onChange={(e) => updateField('time', e.target.value)}
              placeholder="e.g. 8:30 AM onwards"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
            />
          </div>
        </div>
      </div>

      {/* SECTION G: LOCATION & GOOGLE MAPS */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8B6E28]" />
            <span className="text-sm font-semibold text-stone-900">
              Event Location / Venue (Optional)
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleLocation}
            className="text-xs text-red-600 font-medium hover:underline cursor-pointer flex items-center gap-1"
          >
            {showLocationSection ? (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#8B6E28]" />
                <span className="text-[#8B6E28]">Add Location</span>
              </>
            )}
          </button>
        </div>

        {showLocationSection && (
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <label htmlFor="invitation-location-input" className="block text-sm font-semibold text-stone-800">
                Location / Venue <span className="text-stone-400 font-normal">(Required if section added)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  id="invitation-location-input"
                  type="text"
                  value={data.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  onBlur={handleGenerateMapsUrl}
                  placeholder="e.g. Shree Parshwanath Jain Derasar, Borivali West, Mumbai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="invitation-maps-input" className="block text-sm font-semibold text-stone-800">
                  Google Maps Direct Link
                </label>
                {data.googleMapsUrl && (
                  <a
                    href={data.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#8B6E28] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  id="invitation-maps-input"
                  type="url"
                  value={data.googleMapsUrl}
                  onChange={(e) => updateField('googleMapsUrl', e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
                />
              </div>
              <p className="text-[11px] text-stone-400">
                When reader taps the venue, direct Google Maps opens to that exact location.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: EVENT SCHEDULE TIMELINE (ઉત્સવનો મંગલ પ્રવાસ - 100% EDITABLE) */}
      <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#E0A458]/40 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C98A3E]" />
            <span className="text-sm font-semibold text-stone-900">
              ઉત્સવનો મંગલ પ્રવાસ (Event Schedule Timeline)
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#F9F3EA] text-[#8B6E28] px-2 py-0.5 rounded-full border border-[#E5C07B]/40">
            100% Editable
          </span>
        </div>

        <p className="text-xs text-stone-500">
          Customize the section header title and edit every event item (Title, Date, Time) shown in the card timeline.
        </p>

        {/* Section Header Title Input */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-stone-700">
            Section Header Title (ઉત્સવનો મંગલ પ્રવાસ / Event Schedule Heading)
          </label>
          <input
            type="text"
            value={data.eventScheduleTitle !== undefined ? data.eventScheduleTitle : 'ઉત્સવનો મંગલ પ્રવાસ'}
            onChange={(e) => updateField('eventScheduleTitle', e.target.value)}
            placeholder="e.g. ઉત્સવનો મંગલ પ્રવાસ / મંગલ કાર્યક્રમ"
            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-[#8B6E28] text-xs font-semibold text-stone-800"
          />
        </div>

        {/* Quick Add Presets */}
        <div className="space-y-1 pt-1">
          <span className="block text-[11px] font-semibold text-stone-600">Quick-Add Jain Event Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { title: 'વરઘોડા (Varghoda)', date: '17 ઓક્ટોબર 2026', time: 'સાંજે ૪:૦૦ કલાકે' },
              { title: 'આરતી & મંગલ દીવો', date: '17 ઓક્ટોબર 2026', time: 'સાંજે ૭:૩૦ કલાકે' },
              { title: 'પારણા પાવન વિધિ', date: '18 ઓક્ટોબર 2026', time: 'સવારે ૮:૩૦ કલાકે' },
              { title: 'સ્વામિવાત્સલ્ય (Sadharmik Bhakti)', date: '18 ઓક્ટોબર 2026', time: 'સવારે ૧૧:૩૦ કલાકે' },
              { title: 'સંઘ પૂજન & બહુમાન', date: '18 ઓક્ટોબર 2026', time: 'બપોરે ૧:૦૦ કલાકે' },
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddEvent(preset.title, preset.date, preset.time)}
                className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-[#F9F3EA] text-stone-700 hover:text-[#8B6E28] text-[11px] font-medium border border-stone-200 transition cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#8B6E28]" />
                <span>{preset.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* List of Events */}
        <div className="space-y-3 pt-2">
          {(data.events || []).length === 0 ? (
            <div className="text-center py-4 text-xs text-stone-400 bg-white rounded-lg border border-dashed border-stone-200">
              No schedule items added yet. Click "+ Add Event Schedule Item" below.
            </div>
          ) : (
            (data.events || []).map((eventItem, idx) => (
              <div key={eventItem.id || idx} className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2 relative group">
                <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                  <span className="text-xs font-bold text-[#8B6E28]">Event #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveEvent(idx, 'up')}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === (data.events || []).length - 1}
                      onClick={() => handleMoveEvent(idx, 'down')}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveEvent(idx)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-stone-500 mb-0.5">Event Name</label>
                    <input
                      type="text"
                      value={eventItem.title}
                      onChange={(e) => handleUpdateEvent(idx, 'title', e.target.value)}
                      placeholder="e.g. પારણા વિધિ"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 focus:border-[#8B6E28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-stone-500 mb-0.5">Date</label>
                    <input
                      type="text"
                      value={eventItem.date}
                      onChange={(e) => handleUpdateEvent(idx, 'date', e.target.value)}
                      placeholder="e.g. 18 ઓક્ટોબર 2026"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 focus:border-[#8B6E28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-stone-500 mb-0.5">Time</label>
                    <input
                      type="text"
                      value={eventItem.time}
                      onChange={(e) => handleUpdateEvent(idx, 'time', e.target.value)}
                      placeholder="e.g. સવારે ૮:૩૦ કલાકે"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 focus:border-[#8B6E28]"
                    />
                  </div>
                </div>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={() => handleAddEvent()}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-[#E0A458]/50 hover:border-[#8B6E28] text-xs font-semibold text-[#8B6E28] flex items-center justify-center gap-1.5 transition cursor-pointer bg-white"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event Schedule Item (+ મંગલ પ્રસંગ ઉમેરો)</span>
          </button>
        </div>
      </div>

      {/* SECTION H: OPTIONAL PHOTOS PER YEAR (ONE LINE CHART TIMELINE) */}
      {/* SECTION I: SCRATCHABLE BOX (HIDDEN MESSAGE) */}
      <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#E0A458]/40 space-y-3">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#C98A3E]" />
          <label className="text-sm font-semibold text-stone-900">
            Scratchable Box (Hidden Message for Reader)
          </label>
        </div>

        <p className="text-xs text-stone-500">
          The person sharing can add a hidden message. Readers softly scratch the gold coating with their finger on mobile to reveal this message!
        </p>

        <div className="space-y-2">
          <input
            type="text"
            value={data.scratchTitle || ''}
            onChange={(e) => updateField('scratchTitle', e.target.value)}
            placeholder="Scratch Card Title (e.g. Special Blessing for You • અંગત આશીર્વાદ સંદેશ)"
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800"
          />

          <textarea
            rows={3}
            value={data.scratchMessage || ''}
            onChange={(e) => updateField('scratchMessage', e.target.value)}
            placeholder="Hidden message to be scratched and revealed... (e.g. 🌸 પાવન મિચ્છામિ દુક્કડં! Please join us for special Manglik Aarti at 9:00 AM)"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm leading-relaxed transition"
          />
        </div>
      </div>

      {/* SECTION J: FAMILY PHOTO */}
      <FamilyPhotosUploader
        photos={data.familyPhotos && data.familyPhotos.length > 0 ? data.familyPhotos : (data.familyPhoto ? [data.familyPhoto] : [])}
        onChange={(photos) => {
          onChange({
            ...data,
            familyPhotos: photos,
            familyPhoto: photos[0] || '',
          });
        }}
        onPreviewPhoto={onPreviewPhoto}
      />

      {/* Host Family Names */}
      <div className="space-y-1.5">
        <label htmlFor="invitation-hosts-input" className="block text-sm font-semibold text-stone-800">
          Invited By / Host Family Names
        </label>
        <input
          id="invitation-hosts-input"
          type="text"
          value={data.hostNames || ''}
          onChange={(e) => updateField('hostNames', e.target.value)}
          placeholder="e.g. Kamlesh & Hansa Shah and Family"
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-medium transition"
        />
      </div>

      {/* SECTION K: ADDITIONAL INFORMATION */}
      <div className="space-y-1.5">
        <label htmlFor="invitation-extra-input" className="block text-sm font-semibold text-stone-800">
          Additional Information & Ceremony Notes
        </label>
        <textarea
          id="invitation-extra-input"
          rows={3}
          value={data.additionalInformation}
          onChange={(e) => updateField('additionalInformation', e.target.value)}
          placeholder="e.g. Pārna Timing: 8:30 AM to 10:30 AM followed by Swami Vatsalya at 11:30 AM. Traditional Indian dress code."
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#8B6E28] focus:ring-2 focus:ring-[#8B6E28]/15 text-stone-900 text-sm font-normal leading-relaxed transition"
        />
      </div>
    </div>
  );
};
