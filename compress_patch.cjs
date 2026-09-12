const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/utils/shortener.ts', 'utf8');

// Add import
if (!content.includes("import { compressDataUrl }")) {
  content = content.replace("import { generateShareableUrl } from './storage';", "import { generateShareableUrl } from './storage';\nimport { compressDataUrl } from './image';");
}

// Modify getOrGenerateShortUrl
const oldFunc = `export async function getOrGenerateShortUrl(data: InvitationData): Promise<string> {
  if (typeof window === 'undefined') return '';

  const shortId = getOrCreateInvitationId(data);
  
  const origin = window.location.origin;
  // Use a cache-buster parameter (based on current time) so WhatsApp re-fetches the Open Graph image when users edit their invitation
  const cacheBuster = Date.now().toString(36);
  const directShortUrl = \`\${origin}/?id=\${shortId}&v=\${cacheBuster}\`;

  // 1. Save or Update payload to Firestore
  try {
    const docRef = doc(db, 'invitations', shortId);
    await setDoc(docRef, {
      data,
      updatedAt: new Date().toISOString(),
    }, { merge: true }); // Always merge/update the latest data
  } catch (err) {`;

const newFunc = `export async function getOrGenerateShortUrl(data: InvitationData): Promise<string> {
  if (typeof window === 'undefined') return '';

  const shortId = getOrCreateInvitationId(data);
  
  const origin = window.location.origin;
  const cacheBuster = Date.now().toString(36);
  const directShortUrl = \`\${origin}/?id=\${shortId}&v=\${cacheBuster}\`;

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
  } catch (err) {`;

content = content.replace(oldFunc, newFunc);
writeFileSync('src/utils/shortener.ts', content);
console.log('Patched');
