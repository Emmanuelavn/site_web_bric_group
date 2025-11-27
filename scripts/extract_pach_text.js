const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.resolve(__dirname, '../public/pach.pdf');
const outPath = path.resolve(__dirname, '../tmp/pach_text.txt');

console.log('Reading', pdfPath);

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  fs.writeFileSync(outPath, data.text, 'utf8');
  console.log('Wrote extracted text to', outPath);
}).catch(err => {
  console.error('PDF parse error:', err);
  process.exit(1);
});
