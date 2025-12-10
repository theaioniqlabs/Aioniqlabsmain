/**
 * Script to generate placeholder WebP images
 * Requires: pnpm add sharp
 * Run: node scripts/generate-placeholders.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const outputDir = path.join(__dirname, '../public/assets/placeholders')

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Generate 1x placeholder (640x260) - matches screenshot measurements
sharp({
  create: {
    width: 640,
    height: 260,
    channels: 3,
    background: { r: 229, g: 231, b: 235 }, // #E5E7EB - matches screenshot
  },
})
  .webp({ quality: 80 })
  .toFile(path.join(outputDir, 'hero_placeholder@1x.webp'))
  .then(() => console.log('Generated hero_placeholder@1x.webp (640x260)'))
  .catch((err) => console.error('Error generating 1x:', err))

// Generate 2x placeholder (1280x520) - 2x resolution
sharp({
  create: {
    width: 1280,
    height: 520,
    channels: 3,
    background: { r: 229, g: 231, b: 235 }, // #E5E7EB - matches screenshot
  },
})
  .webp({ quality: 80 })
  .toFile(path.join(outputDir, 'hero_placeholder@2x.webp'))
  .then(() => console.log('Generated hero_placeholder@2x.webp (1280x520)'))
  .catch((err) => console.error('Error generating 2x:', err))

