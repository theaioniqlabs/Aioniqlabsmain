# UI Components Directory

This directory contains both custom AiONIQ components and shadcn/ui primitives.

## Custom Components (Do NOT modify)

These are the original AiONIQ components that should remain unchanged:

- `Button.tsx` - Custom button component with AiONIQ design tokens
- `AvatarGroup.tsx` - Avatar group component
- `Banner.tsx` - Banner image component with responsive images
- `Icon.tsx` - Icon component for SVG icons
- `CardNav/` - Navigation card components
- `ImagePlaceholder.tsx` - Image placeholder component

## shadcn/ui Primitives

These are Radix UI-based primitives from shadcn/ui, customized to use AiONIQ design tokens:

- `dialog.tsx` - Dialog/Modal primitive
- `popover.tsx` - Popover primitive

### When to Use shadcn/ui Primitives

✅ **Use shadcn/ui primitives when:**
- Building new features that need accessible primitives
- Need complex interactions (dialogs, popovers, dropdowns, tooltips)
- Want to leverage Radix UI accessibility features
- Building components that benefit from headless UI patterns

### When to Use Custom Components

✅ **Use custom AiONIQ components when:**
- Building features that match existing AiONIQ design system exactly
- Using existing components (Button, AvatarGroup, Banner)
- Navigation components (MainNav, CardNav)
- Components that need specific AiONIQ styling not available in shadcn

## Token Mapping

shadcn/ui components use CSS variables that map to AiONIQ tokens:

### Colors
- `--background` → `--color-background-primary` (#FFFFFF)
- `--foreground` → `--color-text-primary` (#1A1A1A)
- `--primary` → `--color-brand-primary` (#1F2937)
- `--secondary` → `--color-background-secondary` (#F9FAFB)
- `--muted` → `--color-background-tertiary` (#F3F4F6)
- `--border` → `--color-button-secondary-border` (#D1D5DB)

### Typography
- shadcn components use `font-body` class (system fonts)
- Headings use `font-heading` class (Inter font)
- Typography sizes follow AiONIQ subtle scale

### Spacing
- Uses AiONIQ spacing tokens via CSS variables
- `--spacing-stack-gap-lg` (32px) for dialog padding
- `--spacing-stack-gap-md` (24px) for popover padding

### Radius
- Uses `--radii-card-default` (12px) for rounded corners
- Applied via CSS variables and Tailwind classes

## Usage Example

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button' // Custom AiONIQ button

export function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p className="text-body">Dialog content</p>
      </DialogContent>
    </Dialog>
  )
}
```

## Design Tokens Reference

For full token reference, see `/design/tokens.ts`.

All shadcn/ui components are customized to respect AiONIQ design tokens while maintaining Radix UI accessibility features.

