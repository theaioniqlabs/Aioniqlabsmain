import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MainNav } from '@/components/navigation/MainNav'
import { CardNav } from '@/components/ui/CardNav/CardNav'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    context: vi.fn((callback) => {
      callback()
      return { revert: vi.fn() }
    }),
    from: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
    set: vi.fn((target, props) => {
      if (target && typeof target === 'object' && 'style' in target) {
        Object.assign(target.style, props)
      }
    }),
    timeline: vi.fn(() => ({
      paused: true,
      play: vi.fn(),
      reverse: vi.fn(),
      kill: vi.fn(),
      progress: vi.fn(),
      eventCallback: vi.fn((event, callback) => {
        if (event === 'onReverseComplete' && callback) {
          setTimeout(callback, 0)
        }
      }),
    })),
  },
}))

describe('MainNav Component', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders header with hamburger, logo, and CTA', () => {
    render(<MainNav />)

    // Check hamburger button - use getByRole to avoid duplicate aria-label issue
    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    expect(hamburger).toBeInTheDocument()

    // Check logo
    const logo = screen.getByLabelText('AIONIQ Labs Home')
    expect(logo).toBeInTheDocument()

    // Check CTA button
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('opens CardNav overlay when hamburger is clicked', async () => {
    render(<MainNav />)

    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(hamburger)

    await waitFor(() => {
      expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument()
    })
  })

  it('closes CardNav overlay when close button is clicked', async () => {
    render(<MainNav />)

    // Open menu
    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(hamburger)

    await waitFor(() => {
      expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument()
    })

    // Close menu - get the close button from the overlay (CardNav), not the header
    const overlay = screen.getByLabelText('Navigation menu')
    const closeButtons = screen.getAllByRole('button', { name: 'Close menu' })
    const cardNavCloseButton = closeButtons.find(btn => overlay.contains(btn))
    expect(cardNavCloseButton).toBeInTheDocument()
    fireEvent.click(cardNavCloseButton!)

    await waitFor(() => {
      expect(screen.queryByLabelText('Navigation menu')).not.toBeInTheDocument()
    })
  })

  it('closes CardNav overlay when ESC key is pressed', async () => {
    render(<MainNav />)

    // Open menu
    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(hamburger)

    await waitFor(() => {
      expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument()
    })

    // Press ESC
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByLabelText('Navigation menu')).not.toBeInTheDocument()
    })
  })

  it('changes hamburger to close icon when menu is open', async () => {
    render(<MainNav />)

    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(hamburger)

    await waitFor(() => {
      // The hamburger button in the header should change to close
      const headerButtons = screen.getAllByRole('button')
      const headerCloseButton = headerButtons.find(btn => 
        btn.getAttribute('aria-label') === 'Close menu' && 
        btn.closest('header') !== null
      )
      expect(headerCloseButton).toBeInTheDocument()
    })
  })

  it('prevents body scroll when overlay is open', async () => {
    render(<MainNav />)

    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(hamburger)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  it('restores body scroll when overlay is closed', async () => {
    render(<MainNav />)

    const hamburger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(hamburger)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })

    // Close menu - get the close button from the overlay (CardNav)
    const overlay = screen.getByLabelText('Navigation menu')
    const closeButtons = screen.getAllByRole('button', { name: 'Close menu' })
    const cardNavCloseButton = closeButtons.find(btn => overlay.contains(btn))
    expect(cardNavCloseButton).toBeInTheDocument()
    fireEvent.click(cardNavCloseButton!)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })
})

describe('CardNav Component', () => {
  const mockSections = [
    {
      title: 'About',
      items: [
        { label: 'Company', href: '#', active: false },
        { label: 'Careers', href: '#', active: false },
      ],
    },
    {
      title: 'Projects',
      items: [
        { label: 'Featured', href: '#', active: true },
        { label: 'Case Studies', href: '#', active: false },
      ],
    },
  ]

  it('renders when isOpen is true', () => {
    render(
      <CardNav
        sections={mockSections}
        isOpen={true}
        onClose={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <CardNav
        sections={mockSections}
        isOpen={false}
        onClose={vi.fn()}
      />
    )

    expect(screen.queryByLabelText('Navigation menu')).not.toBeInTheDocument()
  })

  it('renders all card items', () => {
    render(
      <CardNav
        sections={mockSections}
        isOpen={true}
        onClose={vi.fn()}
      />
    )

    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Careers')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
  })

  it('marks active items with aria-current', () => {
    render(
      <CardNav
        sections={mockSections}
        isOpen={true}
        onClose={vi.fn()}
      />
    )

    const featuredLink = screen.getByText('Featured').closest('a')
    expect(featuredLink).toHaveAttribute('aria-current', 'page')
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <CardNav
        sections={mockSections}
        isOpen={true}
        onClose={onClose}
      />
    )

    const closeButton = screen.getByRole('button', { name: 'Close menu' })
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when ESC key is pressed', () => {
    const onClose = vi.fn()
    render(
      <CardNav
        sections={mockSections}
        isOpen={true}
        onClose={onClose}
      />
    )

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking overlay background', () => {
    const onClose = vi.fn()
    const { container } = render(
      <CardNav
        sections={mockSections}
        isOpen={true}
        onClose={onClose}
      />
    )

    const overlay = container.querySelector('[role="dialog"]')
    if (overlay) {
      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  })
})

