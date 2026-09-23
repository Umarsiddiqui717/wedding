import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // API to upload and save wedding-intro.mp4 directly to public folder and src/assets
  app.post('/api/upload-video', (req, res) => {
    const publicDir = path.resolve(__dirname, 'public');
    const assetsDir = path.resolve(__dirname, 'src', 'assets');
    const distDir = path.resolve(__dirname, 'dist');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const publicTarget = path.join(publicDir, 'wedding-intro.mp4');
    const assetsTarget = path.join(assetsDir, 'wedding-intro.mp4');
    const writeStream = fs.createWriteStream(publicTarget);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('Successfully saved wedding-intro.mp4 to public folder');
      try {
        fs.copyFileSync(publicTarget, assetsTarget);
      } catch (e) {
        console.error('Error copying to src/assets:', e);
      }

      if (fs.existsSync(distDir)) {
        try {
          fs.copyFileSync(publicTarget, path.join(distDir, 'wedding-intro.mp4'));
          const distAssets = path.join(distDir, 'assets');
          if (fs.existsSync(distAssets)) {
            const files = fs.readdirSync(distAssets);
            for (const file of files) {
              if (file.startsWith('wedding-intro') && file.endsWith('.mp4')) {
                fs.copyFileSync(publicTarget, path.join(distAssets, file));
              }
            }
          }
        } catch {
          // ignore
        }
      }

      // Rebuild in background to ensure bundled hash is fresh
      exec('npm run build', (err) => {
        if (err) console.error('Build background update error:', err);
        else console.log('Successfully updated build with new video!');
      });

      res.json({ success: true, message: 'Video saved and updated across project!' });
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
