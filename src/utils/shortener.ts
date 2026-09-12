import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { InvitationData } from '../types';
import { generateShareableUrl } from './storage';
import { compressDataUrl } from './image';

// In-memory cache for ultra-fast response
const shortUrlCache = new Map<string, string>();

/**
 * Robust clipboard copy function working across all desktop and mobile browsers
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Navigator clipboard API failed, attempting fallback:', err);
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback execCommand copy failed:', err);
    return false;
  }
}

/**
 * Generates the deterministic short ID based on the old hash algorithm for backward compatibility
 */
export function generateLegacyShortId(data: InvitationData): string {
  const content = `${data.name || ''}_${data.tapasyaType || ''}_${data.date || ''}_${data.selectedTemplate || ''}_${data.hostNames || ''}`;
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = (hash << 5) - hash + content.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash).toString(36);
  return (positive + '7x9k2p').substring(0, 7);
}

/**
 * Gets or creates a unique ID for this device's invitation.
 */
export function getOrCreateInvitationId(data: InvitationData): string {
  if (typeof window === 'undefined') return 'preview_mode';
  
  let existingId = localStorage.getItem('my_invitation_short_id');
  if (existingId) return existingId;
  
  let newId;
  if (data && data.name) {
    newId = generateLegacyShortId(data);
  } else {
    newId = Math.random().toString(36).substring(2, 9);
  }
  
  localStorage.setItem('my_invitation_short_id', newId);
  return newId;
}

/**
 * Creates a clean short invitation URL by saving payload to Firestore under a unique ID.
 */
export async function getOrGenerateShortUrl(data: InvitationData): Promise<string> {
  if (typeof window === 'undefined') return '';

  const shortId = getOrCreateInvitationId(data);
  
  const origin = window.location.origin;
  const cacheBuster = Date.now().toString(36);
  const directShortUrl = `${origin}/?id=${shortId}&v=${cacheBuster}`;

  // Aggressively compress images before pushing to Firestore to prevent 1MB limit errors
  // Tuned to 800px / 0.8 quality to preserve clarity while ensuring small file size
  const compressedData = { ...data };
  if (compressedData.profileImage && compressedData.profileImage.length > 50000) {
    compressedData.profileImage = await compressDataUrl(compressedData.profileImage, 800, 0.8);
  }
  if (compressedData.mahavirSwamiImage && compressedData.mahavirSwamiImage.length > 50000) {
    compressedData.mahavirSwamiImage = await compressDataUrl(compressedData.mahavirSwamiImage, 800, 0.8);
  }
  if (compressedData.familyPhoto && compressedData.familyPhoto.length > 50000) {
    compressedData.familyPhoto = await compressDataUrl(compressedData.familyPhoto, 800, 0.8);
  }
  if (compressedData.familyPhotos && compressedData.familyPhotos.length > 0) {
    compressedData.familyPhotos = await Promise.all(compressedData.familyPhotos.map(async (url) => {
      return (url && url.length > 50000) ? await compressDataUrl(url, 800, 0.8) : url;
    }));
  }
  if (compressedData.yearlyPhotos && compressedData.yearlyPhotos.length > 0) {
    compressedData.yearlyPhotos = await Promise.all(compressedData.yearlyPhotos.map(async (m) => {
      return (m.photoUrl && m.photoUrl.length > 50000) ? { ...m, photoUrl: await compressDataUrl(m.photoUrl, 800, 0.8) } : m;
    }));
  }
  
  // Strip custom audio from Firestore payload (it breaks the 1MB limit easily)
  if (compressedData.customAudioUrl && compressedData.customAudioUrl.startsWith('data:')) {
    compressedData.customAudioUrl = '';
  }
  if (compressedData.songAudioUrls) {
    compressedData.songAudioUrls = { ...compressedData.songAudioUrls };
    Object.keys(compressedData.songAudioUrls).forEach(key => {
      if (compressedData.songAudioUrls![key]?.startsWith('data:')) {
        compressedData.songAudioUrls![key] = '';
      }
    });
  }

  try {
    const docRef = doc(db, 'invitations', shortId);
    await setDoc(docRef, {
      data: compressedData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore short document save notice:', err);
    throw err;
  }

  return directShortUrl;
}

/**
 * Fetches invitation data from Firestore using a short ID
 */
export async function fetchInvitationById(id: string): Promise<InvitationData | null> {
  if (!id) return null;
  try {
    const docRef = doc(db, 'invitations', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      if (docData && docData.data) {
        return docData.data as InvitationData;
      }
    }
  } catch (err) {
    console.error('Failed to load invitation by ID from Firestore:', err);
  }
  return null;
}
