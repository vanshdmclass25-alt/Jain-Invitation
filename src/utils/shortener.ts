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
  
  // 1. Modern Navigator Clipboard API
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Navigator clipboard API failed, attempting fallback:', err);
  }

  // 2. ExecCommand Fallback (works in iFrames & non-HTTPS HTTP environments)
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
 * This ensures the user's shared link stays the same, and they don't overwrite others.
 */
export function getOrCreateInvitationId(data: InvitationData): string {
  if (typeof window === 'undefined') return 'preview_mode';
  
  let existingId = localStorage.getItem('my_invitation_short_id');
  if (existingId) return existingId;
  
  // Backward compatibility: If they are an existing user who already created an invite,
  // we want to recover their old hash so they can update their existing link!
  // If their name is already filled out, assume they are an existing user.
  let newId;
  if (data && data.name) {
    newId = generateLegacyShortId(data);
  } else {
    // Brand new user, generate random
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
  const compressedData = { ...data };
  if (compressedData.profileImage && compressedData.profileImage.length > 50000) {
    compressedData.profileImage = await compressDataUrl(compressedData.profileImage, 400, 0.6);
  }
  if (compressedData.mahavirSwamiImage && compressedData.mahavirSwamiImage.length > 50000) {
    compressedData.mahavirSwamiImage = await compressDataUrl(compressedData.mahavirSwamiImage, 400, 0.6);
  }
  if (compressedData.familyPhoto && compressedData.familyPhoto.length > 50000) {
    compressedData.familyPhoto = await compressDataUrl(compressedData.familyPhoto, 400, 0.6);
  }
  if (compressedData.familyPhotos && compressedData.familyPhotos.length > 0) {
    compressedData.familyPhotos = await Promise.all(compressedData.familyPhotos.map(async (url) => {
      return (url && url.length > 50000) ? await compressDataUrl(url, 400, 0.6) : url;
    }));
  }
  if (compressedData.yearlyPhotos && compressedData.yearlyPhotos.length > 0) {
    compressedData.yearlyPhotos = await Promise.all(compressedData.yearlyPhotos.map(async (m) => {
      return (m.photoUrl && m.photoUrl.length > 50000) ? { ...m, photoUrl: await compressDataUrl(m.photoUrl, 400, 0.6) } : m;
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
    // CRITICAL: We MUST throw here! If Firestore fails (e.g. payload > 1MB even after compression),
    // returning the directShortUrl will point to an empty document, breaking the link!
    // By throwing, the share handler will automatically fall back to the long base64 URL which ALWAYS works.
    throw err;
  }

  // Return our own branded short URL (e.g. https://domain.com/?id=abcde)
  // We no longer use external shorteners (like is.gd/tinyurl) because:
  // 1. Our ID is already very short (7 chars)
  // 2. Using our own domain is more trustworthy for guests
  // 3. Social media crawlers (WhatsApp) fetch Open Graph tags much more reliably without redirects
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

