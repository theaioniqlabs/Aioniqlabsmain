/**
 * Script to generate banner placeholder WebP images
 * Requires: pnpm add sharp
 * Run: node scripts/generate-banner-placeholders.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const outputDir = path.join(__dirname, '../public/assets/placeholders')

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Generate 1x placeholder (1120x200) - matches container width minus padding
sharp({
  create: {
    width: 1120,
    height: 200,
    channels: 3,
    background: { r: 249, g: 250, b: 251 }, // #F9FAFB - light gray background
  },
})
  .webp({ quality: 80 })
  .toFile(path.join(outputDir, 'hero_banner_placeholder@1x.webp'))
  .then(() => console.log('Generated hero_banner_placeholder@1x.webp (1120x200)'))
  .catch((err) => console.error('Error generating 1x:', err))

// Generate 2x placeholder (2240x400) - 2x resolution
sharp({
  create: {
    width: 2240,
    height: 400,
    channels: 3,
    background: { r: 249, g: 250, b: 251 }, // #F9FAFB - light gray background
  },
})
  .webp({ quality: 80 })
  .toFile(path.join(outputDir, 'hero_banner_placeholder@2x.webp'))
  .then(() => console.log('Generated hero_banner_placeholder@2x.webp (2240x400)'))
  .catch((err) => console.error('Error generating 2x:', err))

