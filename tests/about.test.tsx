import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AboutBento } from '@/components/about/AboutBento'
import { FounderCard } from '@/components/about/FounderCard'
import { MissionCard } from '@/components/about/MissionCard'
import { VisionCard } from '@/components/about/VisionCard'
import { StatCard } from '@/components/about/StatCard'
import { StartupProgramCard } from '@/components/about/StartupProgramCard'

/**
 * About Section Tests
 * Verifies rendering, accessibility, and token usage
 */

describe('AboutBento', () => {
  it('should render the main AboutBento component', () => {
    const { container } = render(<AboutBento />)
    expect(container.querySelector('.about-bento-section')).toBeInTheDocument()
  })

  it('should have semantic section element', () => {
    const { container } = render(<AboutBento />)
    const section = container.querySelector('section.about-bento-section')
    expect(section).toBeInTheDocument()
  })

  it('should use token-based spacing', () => {
    const { container } = render(<AboutBento />)
    const section = container.querySelector('.about-bento-section')
    expect(section).toHaveStyle({
      paddingTop: 'var(--spacing-section-vertical-desktop)',
    })
  })
})

describe('FounderCard', () => {
  it('should render with required props', () => {
    render(
      <FounderCard
        headline="Test Headline"
        narrative="Test narrative text"
        portraitAlt="Test portrait"
      />
    )
    expect(screen.getByText('Test Headline')).toBeInTheDocument()
    expect(screen.getByText('Test narrative text')).toBeInTheDocument()
  })

  it('should have accessible link with aria-label', () => {
    render(
      <FounderCard
        headline="Test"
        narrative="Test"
        ctaText="Learn more"
        ctaHref="/who"
      />
    )
    const link = screen.getByLabelText('Learn more about the founder')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/who')
  })

  it('should show placeholder when no image provided', () => {
    render(
      <FounderCard
        headline="Test"
        narrative="Test"
        portraitAlt="Founder"
      />
    )
    expect(screen.getByText(/TODO: Replace with founder portrait/i)).toBeInTheDocument()
  })
})

describe('MissionCard', () => {
  it('should render headline and bullets', () => {
    render(
      <MissionCard
        headline="Our Mission"
        bullets={['Bullet 1', 'Bullet 2']}
      />
    )
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText('Bullet 1')).toBeInTheDocument()
    expect(screen.getByText('Bullet 2')).toBeInTheDocument()
  })

  it('should use semantic article element', () => {
    const { container } = render(
      <MissionCard headline="Test" bullets={['Test']} />
    )
    expect(container.querySelector('article')).toBeInTheDocument()
  })
})

describe('VisionCard', () => {
  it('should render headline and bullets', () => {
    render(
      <VisionCard
        headline="Our Vision"
        bullets={['Vision 1', 'Vision 2']}
      />
    )
    expect(screen.getByText('Our Vision')).toBeInTheDocument()
    expect(screen.getByText('Vision 1')).toBeInTheDocument()
    expect(screen.getByText('Vision 2')).toBeInTheDocument()
  })
})

describe('StatCard', () => {
  it('should render value and label', () => {
    render(<StatCard value="100+" label="Projects" />)
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('should render supporting text when provided', () => {
    render(
      <StatCard
        value="100+"
        label="Projects"
        supportingText="Completed"
      />
    )
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('should use semantic article element', () => {
    const { container } = render(<StatCard value="100" label="Test" />)
    expect(container.querySelector('article')).toBeInTheDocument()
  })
})

describe('StartupProgramCard', () => {
  it('should render title, bullets, and CTA button', () => {
    render(
      <StartupProgramCard
        title="Startup Program"
        bullets={['Benefit 1', 'Benefit 2']}
        ctaText="Apply Now"
      />
    )
    expect(screen.getByText('Startup Program')).toBeInTheDocument()
    expect(screen.getByText('Benefit 1')).toBeInTheDocument()
    expect(screen.getByText('Benefit 2')).toBeInTheDocument()
    expect(screen.getByText('Apply Now')).toBeInTheDocument()
  })

  it('should have accessible CTA button', () => {
    render(
      <StartupProgramCard
        title="Test"
        bullets={['Test']}
        ctaText="Apply"
        ctaHref="/apply"
      />
    )
    const button = screen.getByLabelText('Apply to Startup Program')
    expect(button).toBeInTheDocument()
  })
})

describe('Accessibility', () => {
  it('should have proper heading hierarchy', () => {
    const { container } = render(<AboutBento />)
    const h2 = container.querySelector('h2')
    const h3 = container.querySelectorAll('h3')
    expect(h2).toBeInTheDocument()
    expect(h3.length).toBeGreaterThan(0)
  })

  it('should have alt text for images', () => {
    render(
      <FounderCard
        headline="Test"
        narrative="Test"
        portraitSrc="/test.jpg"
        portraitAlt="Founder portrait"
      />
    )
    const img = screen.getByAltText('Founder portrait')
    expect(img).toBeInTheDocument()
  })
})

