const fs = require('fs');
const path = require('path');

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
  // accept fields similar to devis: firstName,lastName,email,phone,country,city,projectTypes,buildingType,message,attachments
  const { firstName, lastName, email, phone, country, city, projectTypes, buildingType, message, hp } = body;

  if (hp) return res.status(400).json({ error: 'Spam détecté' });

  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  const id = `inscription_${Date.now()}`;
  const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads', id);
  try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) {}

  // handle attachments if provided as base64 array: [{ filename, contentType, data }]
  const attachments = [];
  const savedFiles = [];
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
        console.error('Attachment write error', e && e.message);
      }
    });
  }

  const submissionsDir = path.resolve(process.cwd(), 'data', 'submissions');
  try { fs.mkdirSync(submissionsDir, { recursive: true }); } catch (e) {}
  const submissionsFile = path.join(submissionsDir, 'inscriptions_pach.json');
  let list = [];
  try {
    if (fs.existsSync(submissionsFile)) {
      list = JSON.parse(fs.readFileSync(submissionsFile, 'utf8') || '[]');
    }
  } catch (e) {
    list = [];
  }

  const record = {
    id,
    createdAt: new Date().toISOString(),
    firstName: String(firstName || ''),
    lastName: String(lastName || ''),
    email: String(email || ''),
    phone: String(phone || ''),
    country: String(country || ''),
    city: String(city || ''),
    projectTypes: Array.isArray(projectTypes) ? projectTypes : (projectTypes ? [projectTypes] : []),
    buildingType: String(buildingType || ''),
    selectedOffer: String(body.selectedOffer || ''),
    paymentMethod: String(body.paymentMethod || ''),
    paymentFrequency: String(body.paymentFrequency || ''),
    rib: String(body.rib || ''),
    guarantorName: String(body.guarantorName || ''),
    guarantorPhone: String(body.guarantorPhone || ''),
    fraisInscriptionPaye: !!body.fraisInscriptionPaye,
    message: String(message || ''),
    attachments,
    status: 'new'
  };

  list.push(record);
  try {
    fs.writeFileSync(submissionsFile, JSON.stringify(list, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write inscriptions file', e && e.message);
    return res.status(500).json({ error: 'Impossible de sauvegarder l’inscription' });
  }

  // attach payment proof urls into record for easier lookup
  try {
    const paymentProofs = savedFiles.filter(f => f.filename && f.filename.startsWith('PAYMENT_PROOF_')).map(f => f.url);
    if (paymentProofs && paymentProofs.length) {
      // update the last record we just pushed
      list[list.length - 1].paymentProof = paymentProofs;
      // rewrite file with the extra info
      fs.writeFileSync(submissionsFile, JSON.stringify(list, null, 2), 'utf8');
    }
  } catch (e) {
    // non-fatal
    console.error('Could not attach payment proof info', e && e.message);
  }

  // Note: no email by default for this handler. Keep simple for dev.

  return res.status(200).json({ ok: true, id });
};
