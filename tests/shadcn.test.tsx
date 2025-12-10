import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DialogExample } from '@/components/demo/DialogExample'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

// Mock window.matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('shadcn/ui Integration', () => {
  describe('Component Imports', () => {
    it('can import shadcn Dialog component', () => {
      expect(Dialog).toBeDefined()
      expect(DialogContent).toBeDefined()
      expect(DialogTrigger).toBeDefined()
    })

    it('can import shadcn Popover component', () => {
      expect(Popover).toBeDefined()
      expect(PopoverTrigger).toBeDefined()
      expect(PopoverContent).toBeDefined()
    })
  })

  describe('DialogExample Component', () => {
    it('renders DialogExample without errors', () => {
      render(<DialogExample />)
      expect(screen.getByText('Open Dialog')).toBeInTheDocument()
    })

    it('opens dialog when trigger is clicked', async () => {
      const user = userEvent.setup()
      render(<DialogExample />)
      
      const trigger = screen.getByText('Open Dialog')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('shadcn/ui Integration Test')).toBeInTheDocument()
      })
    })

    it('displays dialog content correctly', async () => {
      const user = userEvent.setup()
      render(<DialogExample />)
      
      const trigger = screen.getByText('Open Dialog')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText(/Dialog is working!/)).toBeInTheDocument()
        expect(screen.getByText(/AiONIQ typography tokens/)).toBeInTheDocument()
      })
    })

    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<DialogExample />)
      
      const trigger = screen.getByText('Open Dialog')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('shadcn/ui Integration Test')).toBeInTheDocument()
      })

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('shadcn/ui Integration Test')).not.toBeInTheDocument()
      })
    })
  })

  describe('Integration with Custom Components', () => {
    it('does not break existing Button component', () => {
      const { Button } = require('@/components/ui/Button')
      expect(Button).toBeDefined()
    })

    it('DialogExample uses custom Button component as trigger', () => {
      render(<DialogExample />)
      const button = screen.getByText('Open Dialog')
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })
  })

  describe('Accessibility', () => {
    it('Dialog has proper ARIA attributes', async () => {
      const user = userEvent.setup()
      render(<DialogExample />)
      
      const trigger = screen.getByText('Open Dialog')
      await user.click(trigger)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument()
      })
    })

    it('Dialog has close button with proper label', async () => {
      const user = userEvent.setup()
      render(<DialogExample />)
      
      const trigger = screen.getByText('Open Dialog')
      await user.click(trigger)

      await waitFor(() => {
        const closeButton = screen.getByLabelText('Close')
        expect(closeButton).toBeInTheDocument()
      })
    })
  })
})

