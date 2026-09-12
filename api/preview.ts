export default async function handler(req, res) {
  const shortId = req.query.id || req.query.i;
  const host = req.headers.host || 'jain-invitation.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  
  if (!shortId) {
    // Should not happen if vercel.json is correct, but fallback just in case
    return res.redirect('/');
  }

  // Default Fallbacks
  let title = 'Tattva — Paarna Invitations';
  let description = 'A premium, responsive interactive invitation platform for Jain Tapasya Pārna celebrations by Tattva, featuring luxury templates, Bhagwan Mahavir Swami darshan, and live WhatsApp sharing.';
  let ogImage = `${protocol}://${host}/logo.png`;

  try {
    const projectId = "gen-lang-client-0686532282";
    const databaseId = "ai-studio-remixjaintapasya-0fe58bd3-d32d-4c6e-a702-62dc5c7bca23";
    const apiKey = "AIzaSyCxfCVDV4s5hF3R-Gro1Xv_q6sNcE5nt6I";
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/invitations/${shortId}?key=${apiKey}`;
    
    const response = await fetch(url);
    if (response.ok) {
      const doc = await response.json();
      const dataFields = doc.fields?.data?.mapValue?.fields;
      
      if (dataFields) {
        const name = dataFields.name?.stringValue || 'our Tapasvi';
        const tapasyaType = dataFields.tapasyaType?.stringValue || 'Jain Tapasya';
        
        title = `✨ Invitation: ${name}'s ${tapasyaType} Pārna`;
        description = `You are warmly invited to the sacred Pārna Mahotsav of ${name}. Tap the link to view the complete invitation.`;
        
        if (dataFields.profileImage?.stringValue) {
          ogImage = `${protocol}://${host}/api/og-image?id=${shortId}`;
        }
      }
    }

    // Fetch the actual built HTML from the deployment
    const htmlRes = await fetch(`${protocol}://${host}/index.html`);
    let templateHtml = await htmlRes.text();

    // Inject meta tags safely
    let modifiedHtml = templateHtml
      .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${description}" />`)
      .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:image" content="${ogImage}" />`);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(modifiedHtml);
  } catch (err) {
    console.error('Error generating OG preview:', err);
    res.redirect('/');
  }
}
