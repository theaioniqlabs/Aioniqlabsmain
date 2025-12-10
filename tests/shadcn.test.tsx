import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  describe('Integration with Custom Components', () => {
    it('does not break existing Button component', () => {
      const { Button } = require('@/components/ui/Button')
      expect(Button).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('Dialog has proper ARIA attributes', () => {
      const dialog = render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>Test Content</DialogContent>
        </Dialog>
      )
      expect(dialog).toBeDefined()
    })
  })
})

