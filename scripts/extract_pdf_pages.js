const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const pdfPath = path.resolve(__dirname, '..', 'public', 'about_bric.pdf');
const outDir = path.resolve(__dirname, '..', 'tmp', 'pages');

async function run() {
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF not found:', pdfPath);
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjsLib.getDocument({ data });
  const doc = await loadingTask.promise;
  console.log('Number of pages:', doc.numPages);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');
    const renderContext = { canvasContext: context, viewport };
    await page.render(renderContext).promise;
    const outPath = path.join(outDir, `page-${i}.png`);
    const out = fs.createWriteStream(outPath);
    const stream = canvas.createPNGStream();
    await new Promise((resolve, reject) => {
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });
    console.log('Wrote', outPath);
  }
}

run().catch(err => {
  console.error('Error extracting pages:', err);
  process.exit(1);
});
