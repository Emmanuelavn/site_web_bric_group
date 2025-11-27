#!/usr/bin/env node
/*
 * Scan `public/images/projets/<type>/<project>/` and generate a JSON manifest
 * consumable by the frontend at `src/entites/projets_auto.json`.
 *
 * Usage:
 *  node scripts/ingest_projets.js --src ./public/images/projets --out ./src/entites/projets_auto.json --publicBase /images/projets
 *
 * Behavior:
 *  - For each type folder (residentiel, renovation, commercial, infrastructure):
 *      - if the type folder contains subfolders, each subfolder becomes one project
 *        (slug = <type>/<projectFolder>). All image files inside the subfolder are
 *        collected.
 *      - if the type folder contains image files directly (no subfolders), a single
 *        project is created with slug = <type> and all images collected.
 */

const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/ingest_projets.js --src <sourceDir> --out <outJson> [--publicBase <urlBase>]');
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

function makeWebUrl(absPath) {
  // If publicBase provided and path contains 'public', produce a web-friendly URL
  const parts = absPath.split(path.sep);
  const pubIdx = parts.lastIndexOf('public');
  if (publicBase && pubIdx !== -1) {
    const rel = parts.slice(pubIdx + 1).join('/');
    return `/${rel}`;
  }
  // fallback: convert to forward slashes relative to cwd
  return path.relative(process.cwd(), absPath).split(path.sep).join('/');
}

const typeFolders = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isDirectory());

const projects = [];

typeFolders.forEach(type => {
  const typePath = path.join(srcDir, type);
  const entries = fs.readdirSync(typePath);

  // find subfolders (projects)
  const subfolders = entries.filter(e => fs.statSync(path.join(typePath, e)).isDirectory());

  if (subfolders.length > 0) {
    subfolders.forEach(sub => {
      const folderPath = path.join(typePath, sub);
      let files = [];
      try { files = fs.readdirSync(folderPath).filter(f => isImageFile(f)); } catch (e) { files = []; }
      if (!files || files.length === 0) return;
      files = files.sort();
      const images = files.map(f => ({ url: makeWebUrl(path.join(folderPath, f)), filename: f }));
      projects.push({
        id: `${type}_${sub}`,
        slug: `${type}/${sub}`,
        type,
        title: sub,
        shortDesc: '',
        cover: images[0] ? images[0].url : null,
        images
      });
    });
  } else {
    // no subfolders: maybe images directly under the type folder
    const files = entries.filter(f => isImageFile(f));
    if (files.length > 0) {
      const imgs = files.sort().map(f => ({ url: makeWebUrl(path.join(typePath, f)), filename: f }));
      projects.push({
        id: `${type}`,
        slug: `${type}`,
        type,
        title: type,
        shortDesc: '',
        cover: imgs[0] ? imgs[0].url : null,
        images: imgs
      });
    }
  }
});

const out = { generatedAt: new Date().toISOString(), projects };

try {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', outFile, 'with', projects.length, 'projects');
} catch (e) {
  console.error('Failed to write output file', e && e.message);
  process.exit(3);
}
