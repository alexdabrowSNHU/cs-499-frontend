const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'staticwebapp.config.json');
const destDir = path.resolve(__dirname, '..', 'dist');
const dest = path.join(destDir, 'staticwebapp.config.json');

if (!fs.existsSync(src)) {
  console.error('Source staticwebapp.config.json not found at', src);
  process.exitCode = 1;
} else {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('Copied', src, '->', dest);
}
