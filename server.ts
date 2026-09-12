import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // In-memory audio cache for zero-latency audio playback
  const audioCache = new Map<string, { buffer: Buffer; contentType: string }>();

  // High-performance CORS-friendly Audio Proxy endpoint
  app.get('/api/audio-proxy', async (req, res) => {
    const fileId = req.query.id as string;
    const directUrl = req.query.url as string;
    const song = req.query.song as string;

    let targetUrl = '';
    if (song) {
      targetUrl = `https://tattva-parna-invitation.vercel.app/assets/audio/${song}.mp3`;
    } else if (fileId) {
      targetUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
    } else if (directUrl) {
      targetUrl = directUrl;
    } else {
      res.status(400).send('Missing id, url, or song parameter');
      return;
    }

    const cacheKey = song || fileId || targetUrl;

    try {
      let buffer: Buffer;
      let contentType = 'audio/mpeg';

      if (audioCache.has(cacheKey)) {
        buffer = audioCache.get(cacheKey)!.buffer;
      } else {
        let response = await fetch(targetUrl);
        if (!response.ok && fileId) {
          const fallbackUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
          response = await fetch(fallbackUrl);
        }

        if (!response.ok) {
          res.status(response.status).send(`Failed to fetch audio from source: ${response.statusText}`);
          return;
        }

        const arrayBuffer = await response.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
        audioCache.set(cacheKey, { buffer, contentType });
      }

      const totalSize = buffer.length;
      const range = req.headers.range;

      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
        const chunksize = end - start + 1;

        res.status(206);
        res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
        res.setHeader('Content-Length', chunksize.toString());
        res.setHeader('Content-Type', contentType);
        res.send(buffer.subarray(start, end + 1));
      } else {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', totalSize.toString());
        res.send(buffer);
      }
    } catch (err) {
      console.error('Audio proxy error:', err);
      res.status(500).send('Failed to proxy audio file');
    }
  });

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite and Static Serving with Dynamic Open Graph injection
  let vite: any = null;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
  }

  // High-performance Open Graph Image Proxy
  // Converts base64 profile images stored in Firestore into raw binary images for social media crawlers
  app.get('/api/og-image', async (req, res) => {
    const shortId = req.query.id as string;
    if (!shortId) {
      return res.redirect('/logo.png');
    }
    
    try {
      const projectId = "gen-lang-client-0686532282";
      const databaseId = "ai-studio-remixjaintapasya-0fe58bd3-d32d-4c6e-a702-62dc5c7bca23";
      const apiKey = "AIzaSyCxfCVDV4s5hF3R-Gro1Xv_q6sNcE5nt6I";
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/invitations/${shortId}?key=${apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
         return res.redirect('/logo.png');
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
      
      res.redirect('/logo.png');
    } catch (err) {
      console.error('Error serving og-image:', err);
      res.redirect('/logo.png');
    }
  });

  // Dynamic Open Graph preview route (must come BEFORE vite.middlewares or express.static)
  app.get(['/', '/index.html'], async (req, res, next) => {
    const shortId = (req.query.id || req.query.i) as string;
    
    // If no ID, fallback to regular serving
    if (!shortId) {
      return next();
    }

    try {
      // 1. Fetch document from Firestore REST API
      const projectId = "gen-lang-client-0686532282";
      const databaseId = "ai-studio-remixjaintapasya-0fe58bd3-d32d-4c6e-a702-62dc5c7bca23";
      const apiKey = "AIzaSyCxfCVDV4s5hF3R-Gro1Xv_q6sNcE5nt6I";
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/invitations/${shortId}?key=${apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        return next(); 
      }

      const doc = await response.json();
      
      const dataFields = doc.fields?.data?.mapValue?.fields;
      let name = 'our Tapasvi';
      let tapasyaType = 'Jain Tapasya';
      let profileImage = `https://${req.get('host')}/logo.png`; 
      
      if (dataFields) {
        name = dataFields.name?.stringValue || name;
        tapasyaType = dataFields.tapasyaType?.stringValue || tapasyaType;
        
        // If they uploaded a profile image, use the dynamic proxy to serve it to WhatsApp
        if (dataFields.profileImage?.stringValue) {
          profileImage = `https://${req.get('host')}/api/og-image?id=${shortId}`;
        }
      }

      const title = `✨ Invitation: ${name}'s ${tapasyaType} Pārna`;
      const description = `You are warmly invited to the sacred Pārna Mahotsav of ${name}. Tap the link to view the complete invitation.`;
      
      let templateHtml = '';
      const fs = await import('fs/promises');

      if (vite) {
        templateHtml = await fs.readFile(path.join(process.cwd(), 'index.html'), 'utf-8');
      } else {
        templateHtml = await fs.readFile(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8');
      }

      // Inject meta tags safely
      let modifiedHtml = templateHtml
        .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
        .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${description}" />`)
        .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:image" content="${profileImage}" />`);

      if (vite) {
        modifiedHtml = await vite.transformIndexHtml(req.originalUrl, modifiedHtml);
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(modifiedHtml);
    } catch (err) {
      console.error('Error generating OG preview:', err);
      next(); // fallback on error
    }
  });

  if (vite) {
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-Stack Audio Server running on http://localhost:${PORT}`);
  });
}

startServer();
