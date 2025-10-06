#!/usr/bin/env node

/**
 * Generate placeholder PWA icons from SVG
 * 
 * Usage: node scripts/generate-icons.js
 * 
 * For production, use a proper tool like:
 * npx @pwa/asset-generator icons/icon.svg icons/ --background "#EAF6FF"
 */

const fs = require('fs');
const path = require('path');

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const ICONS_DIR = path.join(__dirname, '..', 'icons');

// Create a simple data URI PNG as placeholder
function createPlaceholderPNG(size) {
  // This is a tiny 1x1 transparent PNG
  const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(base64, 'base64');
}

console.log('🎨 Generating placeholder PWA icons...');
console.log('');
console.log('⚠️  NOTE: These are placeholder images!');
console.log('   For production, generate proper icons using:');
console.log('   npx @pwa/asset-generator icons/icon.svg icons/ --background "#EAF6FF"');
console.log('');

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Generate placeholder icons
ICON_SIZES.forEach(size => {
  const filename = `icon-${size}.png`;
  const filepath = path.join(ICONS_DIR, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`✓ ${filename} already exists`);
    return;
  }
  
  // Write placeholder
  fs.writeFileSync(filepath, createPlaceholderPNG(size));
  console.log(`✓ Generated ${filename} (placeholder)`);
});

// Generate maskable icons
['192', '512'].forEach(size => {
  const filename = `icon-maskable-${size}.png`;
  const filepath = path.join(ICONS_DIR, filename);
  
  if (fs.existsSync(filepath)) {
    console.log(`✓ ${filename} already exists`);
    return;
  }
  
  fs.writeFileSync(filepath, createPlaceholderPNG(size));
  console.log(`✓ Generated ${filename} (placeholder)`);
});

console.log('');
console.log('✨ Done! Remember to generate proper icons before deploying to production.');

