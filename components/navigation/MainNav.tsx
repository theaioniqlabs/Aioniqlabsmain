'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'

export type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

export interface MainNavProps {
  logo?: string
  logoAlt?: string
  items?: CardNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  ctaLabel?: string
  ctaHref?: string
}

/**
 * MainNav component - Collapsible Card Nav style navigation
 * Based on reference: /mnt/data/Nav Bar/Navbar ui.txt
 * Nav expands in place with cards below, not fullscreen overlay
 */
export const MainNav: React.FC<MainNavProps> = ({
  logo = '/assets/aioniq-logo.svg',
  logoAlt = 'AIONIQ Labs Logo',
  items = [
    {
      label: 'About',
      bgColor: '#1F2937',
      textColor: '#FFFFFF',
      links: [
        { label: 'Company', href: '#', ariaLabel: 'Go to Company page' },
        { label: 'Careers', href: '#', ariaLabel: 'Go to Careers page' },
      ],
    },
    {
      label: 'Projects',
      bgColor: '#1F2937',
      textColor: '#FFFFFF',
      links: [
        { label: 'Featured', href: '#', ariaLabel: 'Go to Featured projects' },
        { label: 'Case Studies', href: '#', ariaLabel: 'Go to Case Studies' },
      ],
    },
    {
      label: 'Contact',
      bgColor: '#1F2937',
      textColor: '#FFFFFF',
      links: [
        { label: 'Email', href: '#', ariaLabel: 'Contact via Email' },
        { label: 'Twitter', href: '#', ariaLabel: 'Follow on Twitter' },
        { label: 'LinkedIn', href: '#', ariaLabel: 'Connect on LinkedIn' },
      ],
    },
  ],
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  ctaLabel = 'Get Started',
  ctaHref = '#',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 60

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement
      if (contentEl) {
        const wasVisible = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = 'visible'
        contentEl.style.pointerEvents = 'auto'
        contentEl.style.position = 'static'
        contentEl.style.height = 'auto'

        // Force reflow
        contentEl.offsetHeight

        const topBar = 60
        const padding = 16
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVisible
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        return topBar + contentHeight + padding
      }
    }
    return 260
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cardElements = cardsRef.current.filter(Boolean) as HTMLElement[]

    // Set initial state
    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    if (cardElements.length > 0) {
      gsap.set(cardElements, { y: 50, opacity: 0 })
    }

    const tl = gsap.timeline({ paused: true })

    if (!prefersReducedMotion) {
      tl.to(navEl, {
        height: calculateHeight,
        duration: 0.4,
        ease,
      })

      if (cardElements.length > 0) {
        tl.to(
          cardElements,
          { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
          '-=0.1'
        )
      }
    } else {
      // Instant for reduced motion
      tl.set(navEl, { height: calculateHeight })
      if (cardElements.length > 0) {
        tl.set(cardElements, { y: 0, opacity: 1 })
      }
    }

    return tl
  }

  useLayoutEffect(() => {
    // Wait for cards to be rendered before creating timeline
    const timeoutId = setTimeout(() => {
      // Check if cards are actually in the DOM
      const cardElements = cardsRef.current.filter(Boolean)
      if (cardElements.length > 0 || items.length === 0) {
        const tl = createTimeline()
        if (tl) {
          tlRef.current = tl
        }
      }
    }, 50)

    return () => {
      clearTimeout(timeoutId)
      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items.length])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })

        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          tlRef.current = newTl
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  // Click outside to close menu
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Click is outside the navigation container, close menu
        const tl = tlRef.current
        if (tl) {
          setIsHamburgerOpen(false)
          tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
          tl.reverse()
        }
      }
    }

    // Use mousedown to catch clicks before they bubble and to avoid conflicts with link clicks
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const toggleMenu = () => {
    if (!isExpanded) {
      // Create timeline if it doesn't exist
      if (!tlRef.current) {
        const tl = createTimeline()
        if (tl) {
          tlRef.current = tl
        }
      }
      
      const tl = tlRef.current
      if (!tl) return
      
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      const tl = tlRef.current
      if (!tl) return
      
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el
  }

  return (
    <div
      ref={containerRef}
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleMenu()
              }
            }}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <Image
              src={logo}
              alt={logoAlt}
              width={135}
              height={38}
              className="logo h-[28px] w-auto"
              priority
            />
          </div>

          <a
            href={ctaHref}
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-colors duration-300 no-underline"
            style={{ backgroundColor: buttonBgColor || '#1A1A1A', color: buttonTextColor || '#FFFFFF' }}
          >
            {ctaLabel}
          </a>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
          style={{
            visibility: isExpanded ? 'visible' : 'hidden',
            pointerEvents: isExpanded ? 'auto' : 'none',
          }}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ 
                backgroundColor: item.bgColor, 
                color: item.textColor,
              }}
            >
              <div
                className="nav-card-label font-normal tracking-[-0.5px]"
                style={{
                  fontSize: 'var(--typography-nav-label-size-desktop)',
                  lineHeight: 'var(--typography-nav-label-line-height-desktop)',
                  fontWeight: 'var(--typography-nav-label-weight)',
                }}
              >
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75"
                    style={{
                      fontSize: 'var(--typography-nav-link-size-desktop)',
                      lineHeight: 'var(--typography-nav-link-line-height-desktop)',
                      fontWeight: 'var(--typography-nav-link-weight)',
                    }}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <Icon type="arrow" size="small" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
