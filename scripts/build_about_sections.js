const fs = require('fs');
const path = require('path');

const inTxt = path.resolve(__dirname, '..', 'tmp', 'about_bric.txt');
const outJson = path.resolve(__dirname, '..', 'tmp', 'about_bric_sections.json');

if (!fs.existsSync(inTxt)) {
  console.error('Input text not found:', inTxt);
  process.exit(1);
}

const raw = fs.readFileSync(inTxt, 'utf8');

// Split into paragraphs (double newlines) and filter
const paras = raw.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 20);

// Keywords to help classify
const sections = {
  presentation: [],
  mission: [],
  histoire: [],
  equipe: [],
  organigramme: [],
  chiffres: [],
  contacts: [],
  autres: []
};

const kw = {
  mission: ['mission', 'vision', 'valeur', 'valeurs', 'objectif'],
  histoire: ['histoire', 'fond', 'créé', 'création', 'depuis'],
  equipe: ['équipe', 'direction', 'responsable', 'chef', 'administration', 'personnel', 'staff'],
  organigramme: ['organigramme', 'organigramme'],
  chiffres: ['chiffre', 'chiffres', 'statistique', 'clients', 'projets', 'années'],
  contacts: ['contact', 'adresse', 'téléphone', 'email', 'e-mail', 'courriel']
};

function classify(p) {
  const low = p.toLowerCase();
  for (const k of Object.keys(kw)) {
    for (const w of kw[k]) {
      if (low.includes(w)) return k;
    }
  }
  // heuristics: paragraphs with many uppercase words may be headings
  if (/^[A-Z0-9\s\-]{4,}$/.test(p.replace(/[\n\r]/g, '').slice(0, 80))) return 'presentation';
  // fallback: longer paragraphs likely presentation
  if (p.length > 300) return 'presentation';
  return 'autres';
}

paras.forEach(p => {
  const cat = classify(p);
  if (sections[cat]) sections[cat].push(p);
  else sections.autres.push(p);
});

fs.writeFileSync(outJson, JSON.stringify(sections, null, 2), 'utf8');
console.log('Wrote sections to', outJson);
