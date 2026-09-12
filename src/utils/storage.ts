import { InvitationData } from '../types';
import { DEFAULT_INVITATION_DATA } from '../config/templates';

const STORAGE_KEY = 'jain_parna_invitation_data_v1';

export function loadSavedInvitation(): InvitationData {
  if (typeof window === 'undefined') return DEFAULT_INVITATION_DATA;
  try {
    const params = new URLSearchParams(window.location.search);
    
    // If viewing a shared link by ID, DO NOT load from local storage
    // otherwise the guest's own local draft will contaminate the viewed invitation!
    if (params.get('id') || params.get('i')) {
      return DEFAULT_INVITATION_DATA;
    }

    // 1. Check URL parameters first (allows shared URLs like ?name=...&tapasya=...)
    const urlData = params.get('invitation');
    if (urlData) {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(urlData))));
      return { ...DEFAULT_INVITATION_DATA, ...decoded };
    }

    // 2. Check individual query params
    if (params.get('name')) {
      return {
        ...DEFAULT_INVITATION_DATA,
        name: params.get('name') || DEFAULT_INVITATION_DATA.name,
        tapasyaType: params.get('tapasya') || DEFAULT_INVITATION_DATA.tapasyaType,
        date: params.get('date') || DEFAULT_INVITATION_DATA.date,
        location: params.get('loc') || DEFAULT_INVITATION_DATA.location,
        selectedTemplate: (params.get('t') as any) || DEFAULT_INVITATION_DATA.selectedTemplate,
      };
    }

    // 3. Check LocalStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_INVITATION_DATA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read saved invitation from storage or URL:', e);
  }
  return DEFAULT_INVITATION_DATA;
}

export function saveInvitation(data: InvitationData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage quota or storage issue:', e);
  }
}

export function generateShareableUrl(data: InvitationData): string {
  if (typeof window === 'undefined') return '';
  try {
    // Keep payload lightweight for URL (omit large base64 images if too long, or encode text fields)
    const cleanYearlyPhotos = data.yearlyPhotos?.map(m => ({
      ...m,
      photoUrl: m.photoUrl?.startsWith('data:') ? '' : m.photoUrl
    }));
    
    const cleanFamilyPhotos = data.familyPhotos?.map(url => 
      url?.startsWith('data:') ? '' : url
    ).filter(Boolean) as string[];

    const cleanSongAudioUrls = { ...data.songAudioUrls };
    if (cleanSongAudioUrls) {
      Object.keys(cleanSongAudioUrls).forEach((key) => {
        if (cleanSongAudioUrls[key]?.startsWith('data:')) {
          delete cleanSongAudioUrls[key];
        }
      });
    }

    const shareableFields = {
      name: data.name,
      headline: data.headline,
      eventName: data.eventName,
      language: data.language,
      invitationMessage: data.invitationMessage,
      tapasyaType: data.tapasyaType,
      date: data.date,
      time: data.time,
      location: data.location,
      googleMapsUrl: data.googleMapsUrl,
      scratchMessage: data.scratchMessage,
      scratchTitle: data.scratchTitle,
      yearlyPhotos: cleanYearlyPhotos,
      familyPhotos: cleanFamilyPhotos,
      familyPhoto: data.familyPhoto?.startsWith('data:') ? '' : data.familyPhoto,
      mahavirSwamiImage: data.mahavirSwamiImage?.startsWith('data:') ? '' : data.mahavirSwamiImage,
      additionalInformation: data.additionalInformation,
      selectedTemplate: data.selectedTemplate,
      selectedSongId: data.selectedSongId,
      customAudioUrl: data.customAudioUrl?.startsWith('data:') ? '' : data.customAudioUrl,
      songAudioUrls: cleanSongAudioUrls,
      hostNames: data.hostNames,
      profileImage: data.profileImage?.startsWith('data:') ? '' : data.profileImage,
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(shareableFields))));
    const url = new URL(window.location.href);
    url.searchParams.set('invitation', encoded);
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function formatDatePretty(dateString: string): string {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return dateString;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
