# Typography System Documentation

**Authoritative Reference**: `./docs/BEST_FONT_SYSTEM.md`  
**Implementation**: Option B - Hybrid (System Body + Inter Headings)

---

## Overview

This typography system follows the hybrid approach recommended in `BEST_FONT_SYSTEM.md`:
- **Body text**: System fonts (0ms load, 0 KB)
- **Headings**: Inter variable font (50-100ms load, 70 KB)

**Performance Targets:**
- Lighthouse score: 90+
- First Contentful Paint: < 2.0s
- Font load time: 50-100ms (headings only)
- Zero layout shifts

---

## Font Families

### Body Font Stack (System Fonts)
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
  'Helvetica Neue', Arial, sans-serif;
```

**What this does:**
- **Mac/iOS**: San Francisco (Apple's system font)
- **Windows**: Segoe UI (Microsoft's system font)
- **Android**: Roboto (Google's system font)
- **Linux**: Arial or system default

**Performance:** 0ms load, 0 KB, 0 requests

### Heading Font Stack (Inter)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Implementation:**
- Self-hosted Inter variable font (WOFF2 format)
- Location: `/public/fonts/inter-var.woff2`
- Variable font: All weights (100-900) in one file (~70 KB)
- `font-display: swap` for zero layout shifts

**Performance:** 50-100ms load, 70 KB, 1 request

---

## Typography Scale

### Headings

| Element | Desktop | Tablet | Mobile | Line Height | Weight |
|---------|---------|--------|--------|-------------|--------|
| H1 (Headline) | 64px | 56px | 40px | 1.125 | 700 |
| H2 | 48px | 42px | 32px | 1.167 | 600 |
| H3 | 36px | 32px | 28px | 1.167 | 600 |
| H4 | 28px | 26px | 24px | 1.286 | 600 |

**Usage:**
```tsx
<h1 className="text-headline">Main Headline</h1>
<h2 className="text-h2">Section Title</h2>
<h3 className="text-h3">Subsection</h3>
<h4 className="text-h4">Minor Heading</h4>
```

### Body Text

| Variant | Desktop | Tablet | Mobile | Line Height | Weight |
|---------|---------|--------|--------|-------------|--------|
| Body Large | 18px | 18px | 16px | 1.556 | 400 |
| Body Default | 16px | 16px | 14px | 1.6 | 400 |
| Body Small | 14px | 14px | 12px | 1.5 | 400 |

**Usage:**
```tsx
<p className="text-body-large">Large body text</p>
<p className="text-body">Default body text</p>
<p className="text-body-small">Small body text</p>
```

### Navigation

| Element | Desktop | Tablet | Mobile | Line Height | Weight |
|---------|---------|--------|--------|-------------|--------|
| Nav Title | 24px | 24px | 24px | 1.333 | 600 |
| Nav Label | 18px | 20px | 18px | 1.333 | 400 |
| Nav Link | 15px | 16px | 15px | 1.333 | 400 |

**Usage:**
```tsx
<div className="text-nav-label">Navigation Label</div>
<a className="text-nav-link">Navigation Link</a>
```

### Subtle Typography Scale (for Hero, Content Sections)

A refined, subtle typography scale for hero sections and content areas that require a more refined, understated appearance.

| Element | Desktop | Tablet | Mobile | Line Height | Weight |
|---------|---------|--------|--------|-------------|--------|
| H1 Subtle | 28px | 26px | 24px | 1.143 | 700 |
| H2 Subtle | 24px | 22px | 20px | 1.167 | 600 |
| H3 Subtle | 18px | 17px | 16px | 1.333 | 600 |
| Body Subtle | 15px | 15px | 14px | 1.467 | 400 |
| Small Subtle | 13px | 13px | 12px | 1.385 | 400 |

**Usage:**
```tsx
<h1 className="text-h1-subtle">Hero Headline</h1>
<h2 className="text-h2-subtle">Section Title</h2>
<h3 className="text-h3-subtle">Subsection</h3>
<p className="text-body-subtle">Body text</p>
<span className="text-small-subtle">Small text</span>
```

**When to Use:**
- ✅ Hero sections (main landing page hero)
- ✅ Content sections requiring refined typography
- ✅ Areas where standard scale feels too large

**When NOT to Use:**
- ❌ Navigation components (use standard scale)
- ❌ UI elements (buttons, badges, etc.)
- ❌ Large display areas (use standard headline scale)

### UI Elements

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| Button | 16px | 1.5 | 600 |
| Button Small | 14px | 1.5 | 600 |
| Badge | 14px | 1.4 | 500 |
| Caption | 12px | 1.333 | 400 |
| Overline | 10px | 1.4 | 600 |

---

## CSS Variables

All typography values are available as CSS variables:

```css
/* Font Families */
--typography-font-family-body
--typography-font-family-heading

/* Headline */
--typography-headline-size-desktop
--typography-headline-size-tablet
--typography-headline-size-mobile
--typography-headline-line-height-desktop
--typography-headline-line-height-tablet
--typography-headline-line-height-mobile
--typography-headline-weight

/* H2, H3, H4 (similar pattern) */
--typography-h2-size-desktop
--typography-h3-size-desktop
--typography-h4-size-desktop
/* ... */

/* Body */
--typography-body-large-size-desktop
--typography-body-default-size-desktop
--typography-body-small-size-desktop
/* ... */

/* Navigation */
--typography-nav-title-size
--typography-nav-label-size-desktop
--typography-nav-link-size-desktop
/* ... */
```

---

## Usage in Components

### Using CSS Variables (Recommended)

```tsx
<div
  style={{
    fontSize: 'var(--typography-headline-size-desktop)',
    lineHeight: 'var(--typography-headline-line-height-desktop)',
    fontWeight: 'var(--typography-headline-weight)',
    fontFamily: 'var(--typography-font-family-heading)',
  }}
>
  Headline
</div>
```

### Using Utility Classes

```tsx
<h1 className="text-headline">Headline</h1>
<p className="text-body-large">Large body text</p>
<div className="text-nav-label">Nav Label</div>
```

### Using Font Family Classes

```tsx
<div className="font-heading">Uses Inter</div>
<div className="font-body">Uses System Font</div>
```

---

## Design Tokens (TypeScript)

Access typography tokens programmatically:

```tsx
import { tokens } from '@/design/tokens'

const headlineSize = tokens.typography.headline.size.desktop // '64px'
const bodyFont = tokens.typography.fontFamily.body
const headingFont = tokens.typography.fontFamily.heading
```

---

## Responsive Typography

Typography automatically scales across breakpoints:

- **Desktop** (≥1024px): Full size
- **Tablet** (768px-1023px): Slightly reduced
- **Mobile** (<768px): Optimized for small screens

Utility classes handle responsive sizing automatically.

---

## Inter Font Setup

### Required File
- `/public/fonts/inter-var.woff2` - Inter variable font (all weights 100-900)

### Font Loading
The font is loaded via `@font-face` in `styles/globals.css`:
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
```

### Preload (Optional but Recommended)
Font preload is configured in `app/layout.tsx`:
```tsx
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### Fallback Behavior
If Inter font is not available, headings gracefully fallback to the system font stack with appropriate weights.

---

## Performance Optimization

### Best Practices
1. ✅ **Self-host fonts** (20-30% faster than CDN)
2. ✅ **Use WOFF2 format** (30% smaller than WOFF)
3. ✅ **Variable fonts** (one file = all weights, ~70 KB vs ~250 KB)
4. ✅ **font-display: swap** (zero layout shifts)
5. ✅ **Preload critical fonts** (reduces FOUT)
6. ✅ **System fonts for body** (0ms load, 0 KB)

### File Size Targets
- Inter variable font: ~70 KB (WOFF2)
- Total font requests: 1 (headings only)
- Body text: 0 KB (system fonts)

---

## Readability Standards

### Line Length
- **Optimal**: 50-75 characters per line
- **Implementation**: Use `max-width: 65ch` or `max-width: 720px`

### Line Height
- **Body text**: 1.6 (optimal for readability)
- **Headings**: 1.2 (tighter, more compact)

### Font Size
- **Body minimum**: 16px (prevents mobile zoom)
- **Desktop body**: 16-18px
- **Mobile body**: Never below 16px

---

## Migration Guide

### Replacing Hard-coded Values

**Before:**
```tsx
<div className="text-[18px]">Text</div>
<div style={{ fontSize: '16px' }}>Text</div>
```

**After:**
```tsx
<div className="text-nav-label">Text</div>
<div style={{ fontSize: 'var(--typography-body-default-size-desktop)' }}>Text</div>
```

### Replacing Font Families

**Before:**
```css
font-family: Arial, sans-serif;
```

**After:**
```css
font-family: var(--typography-font-family-body);
```

---

## Testing

Run typography tests:
```bash
pnpm test tests/typography.test.tsx
```

Test coverage includes:
- Font family application
- Responsive typography scaling
- CSS variable usage
- Utility class rendering

---

## References

- **Authoritative Guide**: `./docs/BEST_FONT_SYSTEM.md`
- **Design Tokens**: `./design/tokens.ts`
- **Global Styles**: `./styles/globals.css`

---

## Support

For questions or issues with the typography system, refer to:
1. `./docs/BEST_FONT_SYSTEM.md` - Complete font system guide
2. `./design/tokens.ts` - All typography tokens
3. `./styles/globals.css` - CSS implementation

