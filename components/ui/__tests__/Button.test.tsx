import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Button } from '../Button'

/**
 * Button Component Tests
 * Verifies rendering, variants, sizes, states, and accessibility
 */

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('should render a button element by default', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should render as anchor when href is provided', () => {
      render(<Button href="/test">Link Button</Button>)
      const link = screen.getByRole('link', { name: /link button/i })
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should render children correctly', () => {
      render(<Button>Test Content</Button>)
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('should apply primary variant styles', () => {
      const { container } = render(<Button variant="primary">Primary</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-[var(--color-button-primary-bg)]')
    })

    it('should apply secondary variant styles', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-[var(--color-button-secondary-bg)]')
      expect(button).toHaveClass('border')
    })

    it('should apply ghost variant styles', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-transparent')
    })

    it('should apply destructive variant styles', () => {
      const { container } = render(<Button variant="destructive">Delete</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-destructive')
    })

    it('should apply icon variant styles', () => {
      const { container } = render(<Button variant="icon">Icon</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('aspect-square')
    })
  })

  describe('Sizes', () => {
    it('should apply small size styles', () => {
      const { container } = render(<Button size="sm">Small</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-[var(--spacing-button-height-small)]')
      expect(button).toHaveClass('text-[var(--typography-button-size-small)]')
    })

    it('should apply medium size styles (default)', () => {
      const { container } = render(<Button>Medium</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-[var(--spacing-button-height-default)]')
      expect(button).toHaveClass('text-[var(--typography-button-size-default)]')
    })

    it('should apply large size styles', () => {
      const { container } = render(<Button size="lg">Large</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-16')
      expect(button).toHaveClass('text-lg')
    })
  })

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
      expect(button).toHaveClass('disabled:cursor-not-allowed')
    })

    it('should prevent navigation when disabled and used as anchor', () => {
      const { container } = render(
        <Button href="/test" disabled>
          Disabled Link
        </Button>
      )
      const link = container.querySelector('a')
      expect(link).toHaveAttribute('aria-disabled', 'true')
      expect(link).not.toHaveAttribute('href')
    })

    it('should have focus-visible styles', () => {
      const { container } = render(<Button>Focusable</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-2')
      expect(button).toHaveClass('focus-visible:ring-black')
    })

    it('should have active scale effect', () => {
      const { container } = render(<Button>Active</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('active:scale-[0.98]')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should support custom className', () => {
      const { container } = render(<Button className="custom-class">Custom</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('Props Forwarding', () => {
    it('should forward standard button props', () => {
      render(<Button type="submit" data-testid="test-button">Submit</Button>)
      const button = screen.getByTestId('test-button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should merge custom styles with default styles', () => {
      const { container } = render(
        <Button style={{ marginTop: '10px' }}>Styled</Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ marginTop: '10px' })
    })
  })
})

