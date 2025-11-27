// Local dev server to expose /api/contact so CRA can call it during development
// Reads .env.local via dotenv and mounts the existing serverless handler from ./api/contact.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const contactHandler = require('./api/contact');

const app = express();
const PORT = process.env.DEV_API_PORT || 5000;

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

// CORS for CRA dev server (optional more restrictive origin can be set)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Mount the contact handler at /api/contact
app.options('/api/contact', (req, res) => {
  res.sendStatus(200);
});

app.post('/api/contact', (req, res) => {
  // our serverless handler expects (req, res)
  return contactHandler(req, res);
});

// Mount the devis handler at /api/devis
try {
  const devisHandler = require('./api/devis');
  app.options('/api/devis', (req, res) => {
    res.sendStatus(200);
  });
  app.post('/api/devis', (req, res) => {
    return devisHandler(req, res);
  });
} catch (e) {
  console.warn('No api/devis.js found - skip mounting /api/devis');
}

// Mount the inscription handler at /api/inscription_pach
try {
  const inscriptionHandler = require('./api/inscription_pach');
  app.options('/api/inscription_pach', (req, res) => { res.sendStatus(200); });
  app.post('/api/inscription_pach', (req, res) => { return inscriptionHandler(req, res); });
} catch (e) {
  console.warn('No api/inscription_pach.js found - skip mounting /api/inscription_pach');
}

// admin endpoints removed: admin UI disabled per user request

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Dev API server running on http://localhost:${PORT}`);
  console.log('Contact endpoint: POST http://localhost:' + PORT + '/api/contact');
});
