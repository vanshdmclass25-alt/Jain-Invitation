import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { InvitationData } from '../types';
import { generateShareableUrl } from './storage';

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
 * Generates a deterministic short 7-character alphanumeric ID based on invitation content
 */
export function generateShortId(data: InvitationData): string {
  const content = `${data.name || ''}_${data.tapasyaType || ''}_${data.date || ''}_${data.selectedTemplate || ''}_${data.hostNames || ''}`;
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = (hash << 5) - hash + content.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash).toString(36);
  // Pad or trim to 6-7 chars
  return (positive + '7x9k2p').substring(0, 7);
}

/**
 * Creates a clean short invitation URL by saving payload to Firestore under a short ID.
 */
export async function getOrGenerateShortUrl(data: InvitationData): Promise<string> {
  if (typeof window === 'undefined') return '';

  const shortId = generateShortId(data);

  // Check cache first
  if (shortUrlCache.has(shortId)) {
    return shortUrlCache.get(shortId)!;
  }

  const origin = window.location.origin;
  const directShortUrl = `${origin}/?id=${shortId}`;

  // 1. Save payload to Firestore under 'invitations' collection with shortId as key
  try {
    const docRef = doc(db, 'invitations', shortId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        data,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn('Firestore short document save notice:', err);
  }

  // 2. Shorten via backend API (is.gd / tinyurl)
  let finalShortUrl = directShortUrl;
  try {
    const res = await fetch('/api/shorten-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: directShortUrl }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.shortUrl && json.shortUrl.startsWith('http')) {
        finalShortUrl = json.shortUrl;
      }
    }
  } catch (err) {
    console.warn('Shortener service fetch notice:', err);
  }

  shortUrlCache.set(shortId, finalShortUrl);
  return finalShortUrl;
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

