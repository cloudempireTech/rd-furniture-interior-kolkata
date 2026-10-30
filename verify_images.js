const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/dasan/.gemini/antigravity/scratch/rd-furniture-interior-kolkata';
const htmlFiles = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

let totalRefs = 0;
let missing = [];

htmlFiles.forEach(file => {
  const filePath = path.join(projectDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Match img src
  const imgMatches = content.matchAll(/<img[^>]+src=["']([^"']+)["']/g);
  for (const match of imgMatches) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    totalRefs++;
    const fullPath = path.join(projectDir, src);
    if (!fs.existsSync(fullPath)) {
      missing.push({ file, src, fullPath });
    }
  }

  // Match video poster
  const posterMatches = content.matchAll(/poster=["']([^"']+)["']/g);
  for (const match of posterMatches) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    totalRefs++;
    const fullPath = path.join(projectDir, src);
    if (!fs.existsSync(fullPath)) {
      missing.push({ file, src, fullPath });
    }
  }

  // Match source src
  const sourceMatches = content.matchAll(/<source[^>]+src=["']([^"']+)["']/g);
  for (const match of sourceMatches) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    totalRefs++;
    const fullPath = path.join(projectDir, src);
    if (!fs.existsSync(fullPath)) {
      missing.push({ file, src, fullPath });
    }
  }
});

console.log(`Scanned ${htmlFiles.length} HTML pages.`);
console.log(`Total local asset references checked: ${totalRefs}`);

if (missing.length > 0) {
  console.error(`ERROR: Found ${missing.length} missing asset references!`);
  console.error(JSON.stringify(missing, null, 2));
  process.exit(1);
} else {
  console.log('SUCCESS: All asset references exist cleanly on disk (0 missing assets)!');
  process.exit(0);
}
