export default async function handler(req, res) {
  const shortId = req.query.id;
  const host = req.headers.host || 'jain-invitation.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const defaultImage = `${protocol}://${host}/logo.png`;

  if (!shortId) {
    return res.redirect(defaultImage);
  }
  
  try {
    const projectId = "gen-lang-client-0686532282";
    const databaseId = "ai-studio-remixjaintapasya-0fe58bd3-d32d-4c6e-a702-62dc5c7bca23";
    const apiKey = "AIzaSyCxfCVDV4s5hF3R-Gro1Xv_q6sNcE5nt6I";
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/invitations/${shortId}?key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
       return res.redirect(defaultImage);
    }

    const doc = await response.json();
    const dataFields = doc.fields?.data?.mapValue?.fields;
    
    if (dataFields && dataFields.profileImage?.stringValue) {
      const base64Data = dataFields.profileImage.stringValue;
      const match = base64Data.match(/^data:(image\/\w+);base64,(.+)$/);
      if (match) {
        const contentType = match[1];
        const buffer = Buffer.from(match[2], 'base64');
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.send(buffer);
      }
    }
    
    res.redirect(defaultImage);
  } catch (err) {
    console.error('Error serving og-image:', err);
    res.redirect(defaultImage);
  }
}
