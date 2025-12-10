import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Will be extended via CSS variables from tokens
        // shadcn/ui colors (mapped to CSS variables)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        // Extended spacing tokens from ui/tokens.json
        'image-hero': 'var(--spacing-image-height-hero)',
        'image-hero-md': 'var(--spacing-image-height-hero-md)',
        'image-gallery': 'var(--spacing-image-height-gallery)',
        'image-gallery-md': 'var(--spacing-image-height-gallery-md)',
        'image-card': 'var(--spacing-image-height-card)',
        'image-card-lg': 'var(--spacing-image-height-card-lg)',
        'image-team': 'var(--spacing-image-height-team)',
        'blur-small': 'var(--spacing-blur-effect-small)',
        'blur-medium': 'var(--spacing-blur-effect-medium)',
        'blur-large': 'var(--spacing-blur-effect-large)',
        'blur-xlarge': 'var(--spacing-blur-effect-xlarge)',
        // Base spacing tokens
        'token-4': 'var(--spacing-4)',
        'token-5': 'var(--spacing-5)',
        'token-8': 'var(--spacing-8)',
        'token-10': 'var(--spacing-10)',
        'token-12': 'var(--spacing-12)',
        // Stack gaps
        'stack-xs': 'var(--spacing-stack-gap-xs)',
        'stack-sm': 'var(--spacing-stack-gap-sm)',
        'stack-md': 'var(--spacing-stack-gap-md)',
        'stack-lg': 'var(--spacing-stack-gap-lg)',
        'stack-xl': 'var(--spacing-stack-gap-xl)',
        'stack-2xl': 'var(--spacing-stack-gap-2xl)',
        // Tooltip widths
        'tooltip-sm': 'var(--spacing-image-width-tooltip-small)',
        'tooltip': 'var(--spacing-image-width-tooltip-default)',
      },
      height: {
        'hero-default': 'var(--spacing-image-height-hero)',
        'hero-md': 'var(--spacing-image-height-hero-md)',
        'gallery-default': 'var(--spacing-image-height-gallery)',
        'gallery-md': 'var(--spacing-image-height-gallery-md)',
        'card-default': 'var(--spacing-image-height-card)',
        'card-md': 'var(--spacing-image-height-card-md)',
        'card-lg': 'var(--spacing-image-height-card-lg)',
        'team-default': 'var(--spacing-image-height-team-default)',
        'team-md': 'var(--spacing-image-height-team-md)',
        'team-lg': 'var(--spacing-image-height-team-lg)',
        'team-xl': 'var(--spacing-image-height-team-xl)',
      },
      maxWidth: {
        'tooltip-sm': 'var(--spacing-image-width-tooltip-small)',
        'tooltip': 'var(--spacing-image-width-tooltip-default)',
      },
      fontSize: {
        // Will be extended via CSS variables from tokens
      },
      fontFamily: {
        'sans': ['"Google Sans Flex"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'google-sans': ['"Google Sans Flex"', 'sans-serif'],
        'heading': ['"Google Sans Flex"', 'sans-serif'],
        'body': ['"Google Sans Flex"', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radii-card-default)', // 12px
        md: 'var(--radii-button-default)', // 8px
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: 'var(--radius)', // 12px from CSS variable
      },
      gridTemplateColumns: {
        // Mobile: 4-column implicit grid
        '4': 'repeat(4, minmax(0, 1fr))',
        // Desktop: 12-column implicit grid
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
        gradient: 'gradient 8s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateY(var(--radius)) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateY(var(--radius)) rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  // Flatten nested color objects
  const flattenColors = (colors: any, prefix = ''): Record<string, string> => {
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(colors)) {
      const newKey = prefix ? `${prefix}-${key}` : key
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenColors(value, newKey))
      } else {
        result[newKey] = value as string
      }
    }
    return result
  }

  const allColors = flattenColors(theme('colors'))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}

export default config

