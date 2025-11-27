#!/usr/bin/env node
/*
 * Scan a directory of project folders (M1, M2, ...) and generate a JSON file
 * with project entries and image lists. Filenames are not assumed to follow any
 * naming convention; all image files in each folder are collected.
 *
 * Usage:
 *  node scripts/ingest_projects.js --src ./public/images/maisons --out ./src/entites/pach_projects_auto.json --publicBase /images/maisons
 */

const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/ingest_projects.js --src <sourceDir> --out <outJson> [--publicBase <urlBase>]');
  process.exit(1);
}

const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i += 2) {
  const k = args[i];
  const v = args[i+1];
  if (!k || !v) break;
  if (k === '--src') opts.src = v;
  if (k === '--out') opts.out = v;
  if (k === '--publicBase') opts.publicBase = v;
}

if (!opts.src || !opts.out) usage();

const srcDir = path.resolve(opts.src);
const outFile = path.resolve(opts.out);
const publicBase = opts.publicBase || null;

if (!fs.existsSync(srcDir)) {
  console.error('Source directory does not exist:', srcDir);
  process.exit(2);
}

function isImageFile(name) {
  const ext = path.extname(name).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'].includes(ext);
}

const entries = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isDirectory());

const projects = [];

entries.forEach(folder => {
  const folderPath = path.join(srcDir, folder);
  let files = [];
  try {
    files = fs.readdirSync(folderPath).filter(f => isImageFile(f));
  } catch (e) {
    return;
  }
  if (!files || files.length === 0) return;

  // sort files for determinism (by name)
  files = files.sort();

  const images = files.map(f => {
    const abs = path.join(folderPath, f);
    if (publicBase && srcDir.indexOf(path.sep + 'public') !== -1) {
      // produce web path starting after 'public'
      const parts = abs.split(path.sep);
      const idx = parts.lastIndexOf('public');
      const rel = parts.slice(idx + 1).join('/');
      return { url: `/${rel}` };
    }
    // fallback to relative path from project root
    return { url: abs };
  });

  projects.push({
    id: folder,
    titre: folder,
    localisation: '',
    description: '',
    superficie: '',
    duree: '',
    statut: 'termine',
    image_principale: images[0] ? images[0].url : null,
    images
  });
});

const out = { generatedAt: new Date().toISOString(), projects };

fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', outFile, 'with', projects.length, 'projects');
