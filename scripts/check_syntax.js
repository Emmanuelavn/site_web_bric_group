const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

const file = path.resolve(__dirname, '..', 'src', 'pages', 'projects.jsx');
const code = fs.readFileSync(file, 'utf8');

try {
  parser.parse(code, { sourceType: 'module', plugins: ['jsx', 'classProperties', 'dynamicImport'] });
  console.log('Parsed ok');
} catch (e) {
  console.error('Parse error:');
  console.error(e.message);
  if (e.loc) console.error('Location:', e.loc.line + ':' + e.loc.column);
  // print surrounding lines for context
  const lines = code.split(/\r?\n/);
  const start = Math.max(0, (e.loc && e.loc.line ? e.loc.line - 6 : 230));
  const end = Math.min(lines.length, (e.loc && e.loc.line ? e.loc.line + 4 : 244));
  console.error('Context:');
  for (let i = start; i < end; i++) {
    const n = i + 1;
    const prefix = (e.loc && e.loc.line === n) ? '>>' : '  ';
    console.error(prefix + String(n).padStart(4, ' ') + ': ' + lines[i]);
  }
  process.exit(1);
}
