# AiONIQ Labs - Hero Section

A pixel-perfect Hero section implementation for AiONIQ Labs, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Pixel-perfect recreation from screenshot
- ✅ Design token system for consistent spacing, typography, colors, and radii
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Accessibility compliant (ARIA labels, keyboard navigation, semantic HTML)
- ✅ Performance optimized (lazy loading, WebP support, prefers-reduced-motion)
- ✅ Comprehensive test suite

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with global styles
│   └── page.tsx            # Home page with Hero component
├── components/
│   ├── hero/
│   │   └── Hero.tsx        # Main Hero component
│   └── ui/
│       ├── AvatarGroup.tsx # Avatar group with fallbacks
│       └── ImagePlaceholder.tsx # Image placeholder with WebP support
├── design/
│   └── tokens.ts           # Design token system
├── styles/
│   └── globals.css         # Global styles with CSS variables
├── tests/
│   ├── setup.ts            # Vitest setup
│   └── hero.test.tsx       # Hero component tests
├── public/
│   └── assets/
│       └── placeholders/   # Placeholder images
└── mnt/data/
    └── references.json     # Reference data and screenshot path
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Generate placeholder images (optional, requires sharp)
pnpm add sharp
node scripts/generate-placeholders.js
```

### Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run linter
pnpm lint
```

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Design Tokens

All design values are tokenized in `/design/tokens.ts` and exposed as CSS variables in `/styles/globals.css`. This ensures:

- Consistent spacing, typography, colors, and radii
- Easy theme customization
- Type-safe token usage

## Screenshot Reference

The Hero section is based on the screenshot at:
`/mnt/data/9309a2b0-3a7c-4372-8cbc-3030a29cc646.png`

All measurements and design decisions were derived from pixel analysis of this screenshot.

## Component Usage

```tsx
import { Hero } from '@/components/hero/Hero'

<Hero
  badge="Creative Technology Studio"
  headline="A Human-first Intelligent Design Systems"
  highlightedWord="Intelligent"
  subtext="with 40000000+ reach and start getting feedbacks right now"
  avatars={[
    { alt: 'Team member 1', name: 'John Doe' },
    { alt: 'Team member 2', name: 'Jane Smith' },
  ]}
  ctas={[
    { label: 'Start Project', href: '#', variant: 'primary' },
    { label: 'View Our Work', href: '#', variant: 'secondary' },
  ]}
/>
```

## Testing

The test suite covers:
- Component rendering
- Accessibility attributes
- Keyboard navigation
- Highlighted word styling
- Avatar rendering and fallbacks
- Button variants

Run tests with:
```bash
pnpm test
```

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for all images
- Respects `prefers-reduced-motion`

## Performance

- Lazy loading for images
- WebP image format support
- CSS variable-based theming (no runtime calculations)
- Optimized bundle size

## License

Private - AiONIQ Labs

