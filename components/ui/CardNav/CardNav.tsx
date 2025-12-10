'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { CardItem, CardNavItem } from './CardItem'

export interface CardNavSection {
  title: string
  items: CardNavItem[]
}

export interface CardNavProps {
  sections: CardNavSection[]
  isOpen: boolean
  onClose: () => void
  className?: string
}

/**
 * CardNav container component with GSAP animations
 * Fullscreen overlay with card-based navigation
 */
export const CardNav: React.FC<CardNavProps> = ({
  sections,
  isOpen,
  onClose,
  className = '',
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // GSAP animations
  useEffect(() => {
    if (!overlayRef.current || !cardsRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isOpen) {
      const ctx = gsap.context(() => {
        // Animate overlay fade in
        gsap.fromTo(
          overlayRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: 'power2.out',
          }
        )

        // Stagger card animations
        if (cardsRef.current) {
          gsap.fromTo(
            cardsRef.current.children,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: prefersReducedMotion ? 0 : 0.5,
              stagger: 0.1,
              delay: 0.1,
              ease: 'power3.out',
            }
          )
        }

        // Animate logo if present
        if (logoRef.current) {
          gsap.fromTo(
            logoRef.current,
            {
              scale: 0.8,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: 0.2,
              ease: 'back.out(1.7)',
            }
          )
        }
      }, overlayRef)

      return () => ctx.revert()
    } else {
      // Animate out
      const ctx = gsap.context(() => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: prefersReducedMotion ? 0 : 0.2,
          ease: 'power2.in',
        })
      }, overlayRef)

      return () => ctx.revert()
    }
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return

    const focusableElements = overlayRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 ${className}`}
      style={{
        backgroundColor: 'var(--nav-overlay-bg)', // #1F2937
        paddingTop: 'var(--nav-overlay-padding-top)', // 120px
        paddingLeft: 'var(--spacing-container-padding-mobile)', // 24px
        paddingRight: 'var(--spacing-container-padding-mobile)', // 24px
        paddingBottom: 'var(--spacing-container-padding-mobile)', // 24px
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onClick={(e) => {
        // Close if clicking on overlay background
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
    >
      <div className="mx-auto h-full flex flex-col" style={{ maxWidth: 'var(--spacing-container-max-width-xl)' }}>
        {/* Header with Logo and Close Button */}
        <div
          className="flex items-center justify-between mb-12"
          style={{
            paddingLeft: 'var(--spacing-container-padding-desktop)',
            paddingRight: 'var(--spacing-container-padding-desktop)',
          }}
        >
          {/* Logo - Centered */}
          <div ref={logoRef} className="flex-1 flex justify-center">
            <Image
              src="/assets/aioniq-logo.svg"
              alt="AIONIQ Labs"
              width={135}
              height={38}
              style={{
                height: 'var(--nav-logo-height)', // 40px
                width: 'auto',
                filter: 'brightness(0) invert(1)', // Make logo white
              }}
              priority
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--color-text-inverse)',
            }}
            aria-label="Close menu"
          >
            <Icon type="close" size="default" />
          </button>
        </div>

        {/* Cards Container */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row flex-1 items-start justify-center"
          style={{
            gap: 'var(--card-nav-gap)', // 48px
          }}
        >
          {sections.map((section, index) => (
            <CardItem key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </div>
    </div>
  )
}

