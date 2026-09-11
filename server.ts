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

    let targetUrl = '';
    if (fileId) {
      targetUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
    } else if (directUrl) {
      targetUrl = directUrl;
    } else {
      res.status(400).send('Missing id or url parameter');
      return;
    }

    const cacheKey = fileId || targetUrl;

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

  // High-performance URL shortener proxy endpoint
  app.post('/api/shorten-url', async (req, res) => {
    const { url } = req.body || {};
    if (!url) {
      res.status(400).json({ error: 'URL is required' });
      return;
    }
    try {
      // 1. Try is.gd API (returns clean short JSON)
      const isGdRes = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
      if (isGdRes.ok) {
        const data = (await isGdRes.json()) as { shorturl?: string };
        if (data.shorturl) {
          res.json({ shortUrl: data.shorturl });
          return;
        }
      }

      // 2. Fallback to TinyURL API
      const tinyRes = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      if (tinyRes.ok) {
        const shortUrl = await tinyRes.text();
        if (shortUrl && shortUrl.startsWith('http')) {
          res.json({ shortUrl: shortUrl.trim() });
          return;
        }
      }

      res.json({ shortUrl: url });
    } catch (err) {
      console.warn('URL shortener error:', err);
      res.json({ shortUrl: url });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
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
