import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/hero/Hero'
import { Banner } from '@/components/ui/Banner'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('Hero Banner Integration', () => {
  const mockHeroProps = {
    headline: 'A Human-first Intelligent Design Systems',
    highlightedWord: 'Intelligent',
    subtext: 'with 40000000+ reach and start getting feedbacks right now',
    ctas: [
      { label: 'Start Project', href: '#', variant: 'primary' as const },
      { label: 'View Our Work', href: '#', variant: 'secondary' as const },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders banner above hero content when banner prop is provided', () => {
    const banner = {
      src: '/assets/banner.jpg',
      alt: 'Hero banner image',
    }

    render(<Hero {...mockHeroProps} banner={banner} />)

    // Check that banner is rendered
    const bannerElement = screen.getByAltText('Hero banner image')
    expect(bannerElement).toBeInTheDocument()

    // Check that hero content is still rendered
    const headline = screen.getByRole('heading', { level: 1 })
    expect(headline).toBeInTheDocument()
  })

  it('uses placeholder when banner asset is missing', () => {
    const banner = {
      alt: 'Hero banner image',
    }

    render(<Hero {...mockHeroProps} banner={banner} />)

    const bannerImg = screen.getByAltText('Hero banner image')
    expect(bannerImg).toBeInTheDocument()
    // Should fallback to placeholder
    expect(bannerImg).toHaveAttribute('src', expect.stringContaining('hero_banner_placeholder'))
  })

  it('renders banner with srcSet when provided', () => {
    const banner = {
      srcSet: {
        '1x': '/assets/banner@1x.webp',
        '2x': '/assets/banner@2x.webp',
      },
      alt: 'Hero banner image',
    }

    render(<Hero {...mockHeroProps} banner={banner} />)

    const bannerImg = screen.getByAltText('Hero banner image')
    expect(bannerImg).toBeInTheDocument()
  })

  it('does not render banner when banner prop is not provided', () => {
    render(<Hero {...mockHeroProps} />)

    // Banner should not be present
    const banners = screen.queryAllByAltText(/banner/i)
    expect(banners.length).toBe(0)

    // Hero content should still render
    const headline = screen.getByRole('heading', { level: 1 })
    expect(headline).toBeInTheDocument()
  })

  it('headline renders with highlighted word and correct color token', () => {
    render(<Hero {...mockHeroProps} />)

    const headline = screen.getByRole('heading', { level: 1 })
    expect(headline).toBeInTheDocument()
    expect(headline.textContent).toContain('Intelligent')

    // Check that highlighted word has correct styling
    const highlightedSpan = headline.querySelector('span[style*="color"]')
    expect(highlightedSpan).toBeInTheDocument()
  })

  it('banner has correct accessibility attributes', () => {
    const banner = {
      alt: 'Hero banner image',
    }

    render(<Hero {...mockHeroProps} banner={banner} />)

    const bannerImg = screen.getByAltText('Hero banner image')
    expect(bannerImg).toHaveAttribute('alt', 'Hero banner image')
  })

  it('CTAs are unaffected by banner presence', () => {
    const banner = {
      alt: 'Hero banner image',
    }

    render(<Hero {...mockHeroProps} banner={banner} />)

    // Check that CTAs are still accessible
    expect(screen.getByText('Start Project')).toBeInTheDocument()
    expect(screen.getByText('View Our Work')).toBeInTheDocument()
  })
})

describe('Banner Component', () => {
  it('renders with src prop', () => {
    render(<Banner src="/assets/banner.jpg" alt="Test banner" />)

    const banner = screen.getByAltText('Test banner')
    expect(banner).toBeInTheDocument()
  })

  it('falls back to placeholder when src is missing', () => {
    render(<Banner alt="Test banner" />)

    const bannerImg = screen.getByAltText('Test banner')
    expect(bannerImg).toHaveAttribute('src', expect.stringContaining('hero_banner_placeholder'))
  })

  it('uses srcSet when provided', () => {
    render(
      <Banner
        srcSet={{
          '1x': '/assets/banner@1x.webp',
          '2x': '/assets/banner@2x.webp',
        }}
        alt="Test banner"
      />
    )

    const banner = screen.getByAltText('Test banner')
    expect(banner).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<Banner alt="Test banner" />)

    const banner = screen.getByAltText('Test banner')
    expect(banner).toHaveAttribute('alt', 'Test banner')
  })
})

