// Production server: serves React build and mounts API endpoints
// Usage: set environment variables (or use .env.local), run `npm run serve` which builds then starts this server

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const contactHandler = require('./api/contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Mount API endpoints
app.options('/api/contact', (req, res) => res.sendStatus(200));
app.post('/api/contact', (req, res) => contactHandler(req, res));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Serve static React build
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// All other requests serve index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
