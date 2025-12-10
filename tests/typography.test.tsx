import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

/**
 * Typography System Tests
 * Verifies font families, CSS variables, and utility classes
 */

describe('Typography System', () => {
  describe('Font Families', () => {
    it('should apply text-body utility class', () => {
      const { container } = render(<p className="text-body">Body text</p>)
      const element = container.querySelector('p')
      expect(element).toHaveClass('text-body')
    })

    it('should apply text-headline utility class', () => {
      const { container } = render(<h1 className="text-headline">Headline</h1>)
      const element = container.querySelector('h1')
      expect(element).toHaveClass('text-headline')
    })

    it('should use font-heading utility class', () => {
      const { container } = render(<div className="font-heading">Heading</div>)
      const element = container.querySelector('div')
      expect(element).toHaveClass('font-heading')
    })

    it('should use font-body utility class', () => {
      const { container } = render(<div className="font-body">Body</div>)
      const element = container.querySelector('div')
      expect(element).toHaveClass('font-body')
    })
  })

  describe('Typography Utility Classes', () => {
    it('should apply headline class', () => {
      const { container } = render(<h1 className="text-headline">Headline</h1>)
      const element = container.querySelector('h1')
      expect(element).toHaveClass('text-headline')
    })

    it('should apply h2 class', () => {
      const { container } = render(<h2 className="text-h2">H2</h2>)
      const element = container.querySelector('h2')
      expect(element).toHaveClass('text-h2')
    })

    it('should apply body-large class', () => {
      const { container } = render(<p className="text-body-large">Large body</p>)
      const element = container.querySelector('p')
      expect(element).toHaveClass('text-body-large')
    })

    it('should apply body class', () => {
      const { container } = render(<p className="text-body">Body</p>)
      const element = container.querySelector('p')
      expect(element).toHaveClass('text-body')
    })

    it('should apply nav-label class', () => {
      const { container } = render(<div className="text-nav-label">Nav Label</div>)
      const element = container.querySelector('div')
      expect(element).toHaveClass('text-nav-label')
    })

    it('should apply nav-link class', () => {
      const { container } = render(<a className="text-nav-link">Nav Link</a>)
      const element = container.querySelector('a')
      expect(element).toHaveClass('text-nav-link')
    })
  })

  describe('Design Tokens', () => {
    it('should export typography tokens', async () => {
      const { tokens } = await import('@/design/tokens')
      
      expect(tokens.typography).toBeDefined()
      expect(tokens.typography.fontFamily.body).toBeDefined()
      expect(tokens.typography.fontFamily.heading).toBeDefined()
      expect(tokens.typography.headline.size.desktop).toBe('64px')
      expect(tokens.typography.body.default.size.desktop).toBe('16px')
      expect(tokens.typography.h2.size.desktop).toBe('48px')
      expect(tokens.typography.h3.size.desktop).toBe('36px')
      expect(tokens.typography.h4.size.desktop).toBe('28px')
      expect(tokens.typography.nav.label.size.desktop).toBe('18px')
      expect(tokens.typography.nav.link.size.desktop).toBe('15px')
    })
  })
})

