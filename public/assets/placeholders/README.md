# Placeholder Assets

This directory contains placeholder images for the Hero section.

## Required Placeholders

- `hero_placeholder@1x.webp` - 640x260px WebP image (1x resolution, matches screenshot)
- `hero_placeholder@2x.webp` - 1280x520px WebP image (2x resolution)

## Generation Instructions

If you have `sharp` installed, you can generate these placeholders using:

```bash
pnpm add sharp
node scripts/generate-placeholders.js
```

Alternatively, you can:
1. Use an online tool to generate WebP images
2. Export from design tools (Figma, Sketch, etc.)
3. Use ImageMagick: `convert -size 1280x720 xc:#F3F4F6 hero_placeholder@1x.webp`

## Fallback

The `ImagePlaceholder` component will automatically fall back to a CSS gradient if these files are missing.

