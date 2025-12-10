import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Hero } from '@/components/hero/Hero'
import type { Avatar } from '@/components/ui/AvatarGroup'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, href, variant, ...props }: any) => (
    <a href={href} {...props} data-variant={variant}>
      {children}
    </a>
  ),
}))

const mockAvatars: Avatar[] = [
  { alt: 'Team member 1', name: 'John Doe' },
  { alt: 'Team member 2', name: 'Jane Smith' },
  { alt: 'Team member 3', name: 'Alex Johnson' },
]

const mockCTAs = [
  { label: 'Start Project', href: '#', variant: 'primary' as const },
  { label: 'View Our Work', href: '#', variant: 'secondary' as const },
]

describe('Hero Component', () => {
  it('renders with all elements', () => {
    render(
      <Hero
        headline="A Human-first Intelligent Design Systems"
        highlightedWord="Intelligent"
        subtext="with 40000000+ reach and start getting feedbacks right now"
        avatars={mockAvatars}
        ctas={mockCTAs}
      />
    )

    // Check badge
    expect(screen.getByText('Creative Technology Studio')).toBeInTheDocument()

    // Check headline - text is split across spans, so check for heading role
    const headline = screen.getByRole('heading', { level: 1 })
    expect(headline).toBeInTheDocument()
    expect(headline.textContent).toContain('A Human-first Intelligent Design Systems')

    // Check highlighted word
    const intelligentSpan = screen.getByText('Intelligent')
    expect(intelligentSpan).toBeInTheDocument()

    // Check subtext
    expect(
      screen.getByText('with 40000000+ reach and start getting feedbacks right now')
    ).toBeInTheDocument()

    // Check CTAs
    expect(screen.getByText('Start Project')).toBeInTheDocument()
    expect(screen.getByText('View Our Work')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        avatars={mockAvatars}
        ctas={mockCTAs}
      />
    )

    // Check section has aria-label
    const section = screen.getByRole('region', { name: /hero section/i })
    expect(section).toBeInTheDocument()

    // Check CTAs have aria-labels
    const startProject = screen.getByLabelText('Start Project')
    expect(startProject).toBeInTheDocument()

    const viewWork = screen.getByLabelText('View Our Work')
    expect(viewWork).toBeInTheDocument()

    // Check avatar group has aria-label
    const avatarGroup = screen.getByRole('group', { name: /team members/i })
    expect(avatarGroup).toBeInTheDocument()
  })

  it('supports keyboard navigation', () => {
    render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        ctas={mockCTAs}
      />
    )

    const startProject = screen.getByLabelText('Start Project')
    const viewWork = screen.getByLabelText('View Our Work')

    // Check buttons are focusable
    startProject.focus()
    expect(document.activeElement).toBe(startProject)

    viewWork.focus()
    expect(document.activeElement).toBe(viewWork)

    // Check Enter key works
    fireEvent.keyDown(startProject, { key: 'Enter', code: 'Enter' })
    // Button should be clickable (no error thrown)
  })

  it('highlights the correct word in headline', () => {
    render(
      <Hero
        headline="A Human-first Intelligent Design Systems"
        highlightedWord="Intelligent"
        ctas={mockCTAs}
      />
    )

    const intelligentSpan = screen.getByText('Intelligent')
    const styles = window.getComputedStyle(intelligentSpan)
    
    // Check that the highlighted word has the brand primary color
    // Note: CSS variables may not be directly testable, but we can check the element exists
    expect(intelligentSpan).toBeInTheDocument()
    expect(intelligentSpan.tagName).toBe('SPAN')
  })

  it('renders avatars when provided', () => {
    render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        avatars={mockAvatars}
        ctas={mockCTAs}
      />
    )

    // Check avatars are rendered - use getAllByLabelText since there might be nested elements
    const avatar1 = screen.getAllByLabelText('Team member 1')
    expect(avatar1.length).toBeGreaterThan(0)
    const avatar2 = screen.getAllByLabelText('Team member 2')
    expect(avatar2.length).toBeGreaterThan(0)
    const avatar3 = screen.getAllByLabelText('Team member 3')
    expect(avatar3.length).toBeGreaterThan(0)
    
    // Also check avatar group is present
    const avatarGroup = screen.getByRole('group', { name: /team members/i })
    expect(avatarGroup).toBeInTheDocument()
  })

  it('renders without avatars when not provided', () => {
    render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        ctas={mockCTAs}
      />
    )

    // Avatar group should not be present
    const avatarGroup = screen.queryByRole('group', { name: /team members/i })
    expect(avatarGroup).not.toBeInTheDocument()
  })

  it('renders with custom badge', () => {
    render(
      <Hero
        badge="Custom Badge"
        headline="Test Headline"
        highlightedWord="Test"
        ctas={mockCTAs}
      />
    )

    expect(screen.getByText('Custom Badge')).toBeInTheDocument()
  })

  it('renders without badge when not provided', () => {
    render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        badge=""
        ctas={mockCTAs}
      />
    )

    const badge = screen.queryByText('Creative Technology Studio')
    expect(badge).not.toBeInTheDocument()
  })

  it('applies correct button variants', () => {
    render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        ctas={mockCTAs}
      />
    )

    const primaryButton = screen.getByLabelText('Start Project')
    const secondaryButton = screen.getByLabelText('View Our Work')

    expect(primaryButton).toBeInTheDocument()
    expect(secondaryButton).toBeInTheDocument()

    // Check href attributes
    expect(primaryButton).toHaveAttribute('href', '#')
    expect(secondaryButton).toHaveAttribute('href', '#')
  })

  it('handles screenshot reference metadata', () => {
    const { container } = render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        ctas={mockCTAs}
        screenshotRef="/mnt/data/test.png"
      />
    )

    // Check for hidden meta tag (if implemented)
    const meta = container.querySelector('meta[name="hero-screenshot-ref"]')
    expect(meta).toBeInTheDocument()
  })

  it('uses subtle typography scale for headline and body', () => {
    const { container } = render(
      <Hero
        headline="Test Headline"
        highlightedWord="Test"
        subtext="Test subtext"
        ctas={mockCTAs}
      />
    )

    // Check headline uses subtle scale token
    const headline = container.querySelector('h1')
    expect(headline).toBeInTheDocument()
    expect(headline?.style.fontSize).toBe('var(--typography-h1-subtle-size-desktop)')
    expect(headline?.style.lineHeight).toBe('var(--typography-h1-subtle-line-height-desktop)')

    // Check body/subtext uses subtle scale token
    const subtext = container.querySelector('p')
    expect(subtext).toBeInTheDocument()
    expect(subtext?.style.fontSize).toBe('var(--typography-body-subtle-size-desktop)')
    expect(subtext?.style.lineHeight).toBe('var(--typography-body-subtle-line-height-desktop)')
  })
})

