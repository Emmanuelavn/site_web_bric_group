const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.resolve(__dirname, '..', 'public', 'about_bric.pdf');
const outDir = path.resolve(__dirname, '..', 'tmp');
const outTxt = path.join(outDir, 'about_bric.txt');

async function run() {
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF not found:', pdfPath);
    process.exit(1);
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  try {
    const data = await pdf(dataBuffer);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outTxt, data.text, 'utf8');
    console.log('Wrote', outTxt);
    // Also print a brief sample to stdout
    console.log('--- Sample start ---');
    console.log(data.text.slice(0, 2000));
    console.log('--- Sample end ---');
  } catch (err) {
    console.error('Error parsing PDF:', err);
    process.exit(1);
  }
}

run();
