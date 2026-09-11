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
      targetUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else if (directUrl) {
      targetUrl = directUrl;
    } else {
      res.status(400).send('Missing id or url parameter');
      return;
    }

    const cacheKey = fileId || targetUrl;

    // Serve from in-memory cache if available
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Content-Length', cached.buffer.length.toString());
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.send(cached.buffer);
      return;
    }

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        res.status(response.status).send(`Failed to fetch audio from source: ${response.statusText}`);
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = 'audio/mpeg';

      // Store in memory cache for subsequent instant playback
      audioCache.set(cacheKey, { buffer, contentType });

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', buffer.length.toString());
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.send(buffer);
    } catch (err) {
      console.error('Audio proxy error:', err);
      res.status(500).send('Failed to proxy audio file');
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
