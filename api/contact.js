/*
  Serverless function to accept contact form submissions and send an email via SMTP (nodemailer).
  It can optionally generate a wa.me link if a WHATSAPP number is set in the environment.

  Environment variables required:
    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

  Optional:
    WHATSAPP_NUMBER (e.g. +229XXXXXXXX) - if set, the response will include a wa.me link

  Notes:
  - Place this file in `api/contact.js` for Vercel/Netlify functions or adapt for your backend.
  - For production, add rate-limiting and reCAPTCHA verification.
*/

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const { nom, email, telephone, sujet, message, hp } = req.body || {};

  // Honeypot
  if (hp) {
    return res.status(400).json({ error: 'Spam détecté' });
  }

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!host || !user || !pass || !to || !from) {
    console.error('SMTP configuration missing');
    return res.status(500).json({ error: 'Configuration serveur manquante' });
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass
    }
  });

  const subject = sujet && sujet.length ? `Contact BRIC GROUP: ${sujet}` : 'Nouveau message depuis le formulaire de contact';

  // Optionally generate a wa.me link if a WhatsApp number is configured
  const waNumber = process.env.WHATSAPP_NUMBER || null;
  let waLink = null;
  if (waNumber) {
    const encoded = encodeURIComponent(`Nouveau message de ${nom} (${email})\n\n${message}`);
    const normalized = waNumber.replace(/[^0-9]/g, '');
    waLink = `https://wa.me/${normalized}?text=${encoded}`;
  }

  const html = `
    <h2>Nouveau message depuis le site</h2>
    <p><strong>Nom:</strong> ${escapeHtml(nom)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone:</strong> ${escapeHtml(telephone || '-')}</p>
    <p><strong>Sujet:</strong> ${escapeHtml(sujet || '-')}</p>
    <hr />
    <p>${escapeHtml(message)}</p>
    ${waLink ? `<hr /><p><strong>WhatsApp:</strong> <a href="${waLink}">${waLink}</a></p>` : ''}
  `;

  const mailOptions = {
    from,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ ok: true, waLink });
  } catch (err) {
    console.error('Nodemailer error:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
};

function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
