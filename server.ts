import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // API to upload and save wedding-intro.mp4 directly to public folder
  app.post('/api/upload-video', (req, res) => {
    const publicDir = path.resolve(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const targetFile = path.join(publicDir, 'wedding-intro.mp4');
    const writeStream = fs.createWriteStream(targetFile);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('Successfully saved wedding-intro.mp4 to public folder');
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        try {
          fs.copyFileSync(targetFile, path.join(distDir, 'wedding-intro.mp4'));
        } catch {
          // ignore
        }
      }
      res.json({ success: true, message: 'Video saved as /wedding-intro.mp4' });
    });

    writeStream.on('error', (err) => {
      console.error('Error saving video:', err);
      res.status(500).json({ error: 'Failed to save video' });
    });
  });

  // Check if wedding-intro.mp4 exists on disk
  app.get('/api/has-intro-video', (_req, res) => {
    const publicFile = path.resolve(__dirname, 'public', 'wedding-intro.mp4');
    const distFile = path.resolve(__dirname, 'dist', 'wedding-intro.mp4');
    const exists = fs.existsSync(publicFile) || fs.existsSync(distFile);
    res.json({ exists });
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
