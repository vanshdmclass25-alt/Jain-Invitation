import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { InvitationData } from '../types';
import { generateShareableUrl } from './storage';

// In-memory cache for ultra-fast response
const shortUrlCache = new Map<string, string>();

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
 * Creates a short invitation URL by saving payload to Firestore under a short ID,
 * then running it through an ultra-short link generator (is.gd / tinyurl).
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
    console.warn('Firestore short document save warning:', err);
    // If Firestore fails, fallback to standard encoded URL
    const fallbackUrl = generateShareableUrl(data);
    return fallbackUrl;
  }

  // 2. Shorten the clean direct short URL via backend API (is.gd / tinyurl)
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
    console.warn('Shortener service fetch warning:', err);
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
