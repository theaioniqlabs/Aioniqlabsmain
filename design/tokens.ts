/**
 * Design Tokens - Single source of truth for spacing, typography, colors, and radii
 * Mapped from screenshot analysis of Hero section
 */

export const tokens = {
  spacing: {
    container: {
      maxWidth: {
        xl: '1280px',
        lg: '1024px',
        md: '768px',
      },
      padding: {
        desktop: '80px',
        tablet: '40px',
        mobile: '24px',
      },
    },
    section: {
      vertical: {
        desktop: '80px',
        tablet: '80px',
        mobile: '60px',
      },
    },
    nav: {
      height: '80px',
      paddingX: {
        mobile: '24px',
        desktop: '80px',
      },
      logo: {
        height: '40px',
      },
      overlay: {
        paddingTop: '120px',
      },
      header: {
        gap: 'auto',
      },
    },
    icon: {
      size: {
        default: '24px',
        small: '12px',
      },
    },
    card: {
      padding: '32px',
      paddingX: '32px',
      paddingY: '32px',
      nav: {
        gap: '48px',
      },
    },
    hero: {
      image: {
        height: '260px',
      },
    },
    banner: {
      height: {
        desktop: '200px',
        tablet: '180px',
        mobile: '150px',
      },
      gapTop: '32px', // nav → banner
      gapBottom: '48px', // banner → badge
    },
    stack: {
      gap: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '64px',
      },
    },
    button: {
      height: {
        default: '56px',
        small: '48px',
      },
      paddingX: {
        default: '32px',
        small: '24px',
      },
    },
    avatar: {
      size: {
        default: '48px',
        small: '40px',
      },
      gap: '-12px', // Negative for overlapping
    },
    badge: {
      height: '32px',
      padding: {
        x: '16px',
        y: '8px',
      },
    },
  },
  typography: {
    fontFamily: {
      body: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(', '),
      heading: [
        '"Inter"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(', '),
    },
    headline: {
      size: {
        desktop: '64px',
        tablet: '56px',
        mobile: '40px',
      },
      lineHeight: {
        desktop: '72px',
        tablet: '64px',
        mobile: '48px',
      },
      weight: '700',
    },
    h2: {
      size: {
        desktop: '48px',
        tablet: '42px',
        mobile: '32px',
      },
      lineHeight: {
        desktop: '56px',
        tablet: '50px',
        mobile: '40px',
      },
      weight: '600',
      subtle: {
        size: {
          desktop: '24px',
          tablet: '22px',
          mobile: '20px',
        },
        lineHeight: {
          desktop: '28px',
          tablet: '26px',
          mobile: '24px',
        },
        weight: '600',
      },
    },
    h3: {
      size: {
        desktop: '36px',
        tablet: '32px',
        mobile: '28px',
      },
      lineHeight: {
        desktop: '42px',
        tablet: '38px',
        mobile: '34px',
      },
      weight: '600',
      subtle: {
        size: {
          desktop: '18px',
          tablet: '17px',
          mobile: '16px',
        },
        lineHeight: {
          desktop: '24px',
          tablet: '22px',
          mobile: '20px',
        },
        weight: '600',
      },
    },
    h4: {
      size: {
        desktop: '28px',
        tablet: '26px',
        mobile: '24px',
      },
      lineHeight: {
        desktop: '36px',
        tablet: '34px',
        mobile: '32px',
      },
      weight: '600',
    },
    // Subtle Typography Scale (for Hero, content sections)
    h1: {
      subtle: {
        size: {
          desktop: '28px',
          tablet: '26px',
          mobile: '24px',
        },
        lineHeight: {
          desktop: '32px',
          tablet: '30px',
          mobile: '28px',
        },
        weight: '700',
      },
    },
    body: {
      subtle: {
        size: {
          desktop: '15px',
          tablet: '15px',
          mobile: '14px',
        },
        lineHeight: {
          desktop: '22px',
          tablet: '22px',
          mobile: '20px',
        },
        weight: '400',
      },
      large: {
        size: {
          desktop: '18px',
          tablet: '18px',
          mobile: '16px',
        },
        lineHeight: {
          desktop: '28px',
          tablet: '28px',
          mobile: '24px',
        },
        weight: '400',
      },
      default: {
        size: {
          desktop: '16px',
          tablet: '16px',
          mobile: '14px',
        },
        lineHeight: '1.6',
        weight: '400',
      },
      small: {
        size: {
          desktop: '14px',
          tablet: '14px',
          mobile: '12px',
        },
        lineHeight: '1.5',
        weight: '400',
      },
    },
    small: {
      subtle: {
        size: {
          desktop: '13px',
          tablet: '13px',
          mobile: '12px',
        },
        lineHeight: {
          desktop: '18px',
          tablet: '18px',
          mobile: '16px',
        },
        weight: '400',
      },
    },
    badge: {
      size: {
        desktop: '14px',
        tablet: '14px',
        mobile: '12px',
      },
      lineHeight: '1.4',
      weight: '500',
    },
    button: {
      size: {
        default: '16px',
        small: '14px',
      },
      lineHeight: '1.5',
      weight: '600',
    },
    nav: {
      title: {
        size: '24px',
        lineHeight: '32px',
        weight: '600',
      },
      label: {
        size: {
          desktop: '18px',
          tablet: '20px',
          mobile: '18px',
        },
        lineHeight: {
          desktop: '24px',
          tablet: '28px',
          mobile: '24px',
        },
        weight: '400',
      },
      link: {
        size: {
          desktop: '15px',
          tablet: '16px',
          mobile: '15px',
        },
        lineHeight: {
          desktop: '20px',
          tablet: '22px',
          mobile: '20px',
        },
        weight: '400',
      },
    },
    caption: {
      size: '12px',
      lineHeight: '16px',
      weight: '400',
    },
    overline: {
      size: '10px',
      lineHeight: '14px',
      weight: '600',
    },
  },
  colors: {
    brand: {
      primary: '#1F2937', // Dark gray brand color
      primaryDark: '#1F2937',
      primaryLight: '#1F2937',
    },
    text: {
      primary: '#1A1A1A', // Sampled from screenshot (was #000000)
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
    },
    card: {
      bg: '#EEF0F2',
    },
    button: {
      primary: {
        bg: '#1A1A1A', // Sampled from screenshot (was #000000)
        text: '#FFFFFF',
        hover: '#1F2937',
      },
      secondary: {
        bg: '#F3F4F6',
        text: '#1A1A1A', // Sampled from screenshot (was #000000)
        hover: '#E5E7EB',
        border: '#D1D5DB', // Sampled from screenshot (was #E5E7EB)
      },
    },
    badge: {
      bg: '#E5E7EB', // Sampled from screenshot (was #F3F4F6)
      text: '#1A1A1A', // Sampled from screenshot (was #000000)
    },
    avatar: {
      placeholder: '#FFDAB9', // Sampled from screenshot (AJ avatar)
    },
    nav: {
      overlay: {
        bg: '#1F2937', // Dark gray overlay background
      },
      card: {
        bg: '#1F2937', // Card background
        hover: '#1F2937', // Card hover state
      },
      shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
  },
  radii: {
    button: {
      pill: '9999px',
      default: '8px',
    },
    badge: {
      default: '9999px',
    },
    card: {
      default: '12px',
      nav: '16px', // CardNav card border radius
    },
    avatar: {
      circle: '50%',
    },
    banner: {
      default: '16px',
    },
  },
  shadows: {
    banner: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const

export type Tokens = typeof tokens

