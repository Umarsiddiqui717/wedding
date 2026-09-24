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

  // Serve static files from public directory with Range request support for videos
  const publicDir = path.resolve(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  app.use(express.static(publicDir));

  // GET video info endpoint
  app.get('/api/video-info', (_req, res) => {
    const videoPath = path.join(publicDir, 'wedding-intro.mp4');
    const metaPath = path.join(publicDir, 'video-meta.json');
    let hasVideo = false;
    let updatedAt = Date.now();

    if (fs.existsSync(videoPath)) {
      try {
        const stat = fs.statSync(videoPath);
        if (stat.size > 1000) {
          hasVideo = true;
          updatedAt = Math.floor(stat.mtimeMs);
        }
      } catch {
        hasVideo = false;
      }
    }

    if (fs.existsSync(metaPath)) {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        if (meta.hasVideo === false) {
          hasVideo = false;
        }
      } catch {
        // ignore
      }
    }

    res.json({
      hasVideo,
      videoUrl: hasVideo ? `/wedding-intro.mp4?t=${updatedAt}` : null,
      posterUrl: hasVideo ? `/video-poster.webp?t=${updatedAt}` : null,
      updatedAt,
    });
  });

  // POST upload video endpoint
  app.post('/api/upload-video', (req, res) => {
    const assetsDir = path.resolve(__dirname, 'src', 'assets');
    const distDir = path.resolve(__dirname, 'dist');

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const tempUploadPath = path.join(publicDir, 'temp-upload.mp4');
    const publicTarget = path.join(publicDir, 'wedding-intro.mp4');
    const writeStream = fs.createWriteStream(tempUploadPath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('Upload finished, processing video with ffmpeg...');

      // Strip audio (guaranteeing silence as requested) and optimize container
      const stripAudioCmd = `ffmpeg -y -i "${tempUploadPath}" -c:v copy -an "${publicTarget}" && rm -f "${tempUploadPath}"`;

      exec(stripAudioCmd, (ffmpegErr) => {
        if (ffmpegErr) {
          console.warn('ffmpeg strip audio failed, keeping original:', ffmpegErr);
          try {
            fs.renameSync(tempUploadPath, publicTarget);
          } catch (e) {
            console.error('Rename failed:', e);
          }
        }

        // Generate first-frame poster images
        const posterJpg = path.join(publicDir, 'video-poster.jpg');
        const posterWebp = path.join(publicDir, 'video-poster.webp');
        const posterCmd = `ffmpeg -y -ss 00:00:00.000 -i "${publicTarget}" -vframes 1 -q:v 2 "${posterJpg}" && ffmpeg -y -i "${posterJpg}" -q:v 85 "${posterWebp}"`;

        exec(posterCmd, (posterErr) => {
          if (posterErr) {
            console.warn('Poster generation error:', posterErr);
          } else {
            console.log('Successfully generated video poster images');
          }

          // Sync to dist if present
          if (fs.existsSync(distDir)) {
            try {
              fs.copyFileSync(publicTarget, path.join(distDir, 'wedding-intro.mp4'));
              if (fs.existsSync(posterWebp)) {
                fs.copyFileSync(posterWebp, path.join(distDir, 'video-poster.webp'));
              }
              if (fs.existsSync(posterJpg)) {
                fs.copyFileSync(posterJpg, path.join(distDir, 'video-poster.jpg'));
              }
            } catch (err) {
              console.error('Dist sync error:', err);
            }
          }

          // Update metadata
          const metaPath = path.join(publicDir, 'video-meta.json');
          const meta = { hasVideo: true, updatedAt: Date.now() };
          try {
            fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
          } catch (err) {
            console.error('Failed to write meta:', err);
          }

          res.json({
            success: true,
            hasVideo: true,
            videoUrl: `/wedding-intro.mp4?t=${meta.updatedAt}`,
            posterUrl: `/video-poster.webp?t=${meta.updatedAt}`,
            message: 'Video uploaded and published publicly for everyone!',
          });
        });
      });
    });

    writeStream.on('error', (err) => {
      console.error('Upload stream error:', err);
      res.status(500).json({ error: 'Failed to upload video' });
    });
  });

  // POST remove video endpoint
  app.post('/api/remove-video', (_req, res) => {
    const publicTarget = path.join(publicDir, 'wedding-intro.mp4');
    const posterJpg = path.join(publicDir, 'video-poster.jpg');
    const posterWebp = path.join(publicDir, 'video-poster.webp');
    const metaPath = path.join(publicDir, 'video-meta.json');
    const distDir = path.resolve(__dirname, 'dist');

    try {
      if (fs.existsSync(publicTarget)) fs.unlinkSync(publicTarget);
      if (fs.existsSync(posterJpg)) fs.unlinkSync(posterJpg);
      if (fs.existsSync(posterWebp)) fs.unlinkSync(posterWebp);

      if (fs.existsSync(distDir)) {
        const distTarget = path.join(distDir, 'wedding-intro.mp4');
        const distPosterWebp = path.join(distDir, 'video-poster.webp');
        const distPosterJpg = path.join(distDir, 'video-poster.jpg');
        if (fs.existsSync(distTarget)) fs.unlinkSync(distTarget);
        if (fs.existsSync(distPosterWebp)) fs.unlinkSync(distPosterWebp);
        if (fs.existsSync(distPosterJpg)) fs.unlinkSync(distPosterJpg);
      }

      fs.writeFileSync(metaPath, JSON.stringify({ hasVideo: false, updatedAt: Date.now() }, null, 2));
    } catch (err) {
      console.error('Error removing video:', err);
    }

    res.json({ success: true, message: 'Video removed. Invitation opens directly without video.' });
  });

  // GET card image info
  app.get('/api/card-image-info', (_req, res) => {
    const cardImagePath = path.join(publicDir, 'card-design.jpg');
    const hasCardImage = fs.existsSync(cardImagePath);
    let updatedAt = Date.now();
    if (hasCardImage) {
      try {
        updatedAt = fs.statSync(cardImagePath).mtimeMs;
      } catch (e) {
        console.error('Failed to stat card-design.jpg:', e);
      }
    }
    res.json({
      hasCardImage,
      imageUrl: hasCardImage ? `/card-design.jpg?t=${updatedAt}` : null,
    });
  });

  // POST upload card image endpoint
  app.post('/api/upload-card-image', (req, res) => {
    const distDir = path.resolve(__dirname, 'dist');
    const publicTarget = path.join(publicDir, 'card-design.jpg');
    const distTarget = path.join(distDir, 'card-design.jpg');
    const writeStream = fs.createWriteStream(publicTarget);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      if (fs.existsSync(distDir)) {
        try {
          fs.copyFileSync(publicTarget, distTarget);
        } catch (e) {
          console.warn('Failed to copy to dist:', e);
        }
      }
      res.json({ success: true, imageUrl: `/card-design.jpg?t=${Date.now()}` });
    });

    writeStream.on('error', (err) => {
      console.error('Card image write error:', err);
      res.status(500).json({ error: 'Failed to write card image' });
    });
  });

  // Explicit route to serve /card-design.jpg reliably
  app.get('/card-design.jpg', (_req, res) => {
    const pub = path.join(publicDir, 'card-design.jpg');
    const dist = path.join(__dirname, 'dist', 'card-design.jpg');
    if (fs.existsSync(pub)) return res.sendFile(pub);
    if (fs.existsSync(dist)) return res.sendFile(dist);
    res.status(404).send('Card image not found');
  });

  // Legacy route compatibility
  app.get('/api/has-intro-video', (_req, res) => {
    const publicFile = path.resolve(__dirname, 'public', 'wedding-intro.mp4');
    const exists = fs.existsSync(publicFile);
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
