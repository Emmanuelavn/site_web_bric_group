const fs = require('fs');
const path = require('path');
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
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const body = req.body || {};
  // expected fields: firstName, lastName, email, phone, country, city, projectTypes (array), buildingType, message
  const { firstName, lastName, email, phone, country, city, projectTypes, buildingType, message, hp } = body;

  // simple honeypot
  if (hp) return res.status(400).json({ error: 'Spam détecté' });

  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  // create ids and folders
  const id = `devis_${Date.now()}`;
  const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads', id);
  try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) {}

  // handle attachments if provided as base64 array: [{ filename, contentType, data }]
  // handle attachments if provided as base64 array: [{ filename, contentType, data }]
  const attachments = []; // URLs stored in the record for reference
  const savedFiles = []; // detailed info for email attachments
  if (Array.isArray(body.attachments)) {
    body.attachments.forEach((att, idx) => {
      try {
        const buf = Buffer.from(att.data || '', 'base64');
        const safeName = (att.filename || `file_${idx}`).replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const target = path.join(uploadsDir, safeName);
        fs.writeFileSync(target, buf);
        const url = `/uploads/${id}/${safeName}`;
        attachments.push(url);

        const isImage = (att.contentType || '').startsWith('image/');
        const cid = isImage ? `${id.replace(/[^a-zA-Z0-9]/g, '')}_${idx}@bric` : undefined;
        savedFiles.push({ filename: safeName, url, absPath: target, contentType: att.contentType || '', isImage, cid });
      } catch (e) {
        // ignore write errors for attachments
        console.error('Attachment write error', e && e.message);
      }
    });
  }

  // store submission in data/submissions/devis.json
  const submissionsDir = path.resolve(process.cwd(), 'data', 'submissions');
  try { fs.mkdirSync(submissionsDir, { recursive: true }); } catch (e) {}
  const submissionsFile = path.join(submissionsDir, 'devis.json');
  let list = [];
  try {
    if (fs.existsSync(submissionsFile)) {
      list = JSON.parse(fs.readFileSync(submissionsFile, 'utf8') || '[]');
    }
  } catch (e) {
    console.error('Failed to read submissions file', e && e.message);
    list = [];
  }

  const record = {
    id,
    createdAt: new Date().toISOString(),
    firstName, lastName, email, phone, country: country || '', city: city || '',
    projectTypes: Array.isArray(projectTypes) ? projectTypes : (projectTypes ? [projectTypes] : []),
    buildingType: buildingType || '',
    message: message || '',
    attachments,
    status: 'new'
  };

  list.push(record);
  try {
    fs.writeFileSync(submissionsFile, JSON.stringify(list, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write submissions file', e && e.message);
    return res.status(500).json({ error: 'Impossible de sauvegarder la soumission' });
  }

  // send notification email using nodemailer
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL || process.env.CONTACT_TO || null;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_FROM || process.env.CONTACT_FROM || user;

  if (host && user && pass && to && from) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(port),
        secure: Number(port) === 465,
        auth: { user, pass }
      });

      // Build email HTML and attachments array for nodemailer
      const emailAttachments = savedFiles.map((f) => {
        const att = { filename: f.filename, path: f.absPath };
        if (f.isImage && f.cid) att.cid = f.cid;
        return att;
      });

      // Construct HTML: inline images (cid) and links for other files
      const attachmentsHtml = savedFiles.length ? (`<hr /><div><strong>Pièces jointes:</strong><div style="margin-top:8px;">${savedFiles.map((f) => {
        if (f.isImage && f.cid) {
          return `<div style="display:inline-block;margin:4px;"><img src=\"cid:${f.cid}\" style=\"max-width:220px;max-height:160px;border-radius:6px;\" alt=\"${escapeHtml(f.filename)}\" /></div>`;
        }
        return `<div><a href=\"${f.url}\">${escapeHtml(f.filename)}</a></div>`;
      }).join('')}</div></div>`) : '';

      const html = `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Nom:</strong> ${escapeHtml(firstName + ' ' + lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Pays / Ville:</strong> ${escapeHtml(country || '')} / ${escapeHtml(city || '')}</p>
        <p><strong>Type de projet:</strong> ${escapeHtml((record.projectTypes || []).join(', '))}</p>
        <p><strong>Type bâtiment:</strong> ${escapeHtml(record.buildingType || '')}</p>
        <hr />
        <p>${escapeHtml(record.message || '')}</p>
        ${attachmentsHtml}
      `;

      await transporter.sendMail({ from, to, subject: 'Demande de devis (sans engagement)', html, attachments: emailAttachments });
    } catch (e) {
      console.error('Email send failed:', e && e.message);
      // don't fail the request if email fails
    }
  }

  return res.status(200).json({ ok: true, id });
};

function escapeHtml(unsafe) {
  return String(unsafe || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
