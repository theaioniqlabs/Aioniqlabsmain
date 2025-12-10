'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/Button'

export interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

interface NavigationProps {
  logo?: React.ReactNode
  navItems?: NavItem[]
  rightActions?: React.ReactNode
}

/**
 * Navigation component with GSAP animations
 * Matches screenshot design: white rounded bar with shadow, 80px height
 */
export const Navigation: React.FC<NavigationProps> = ({
  logo,
  navItems = [
    { label: 'Home', href: '#', active: true },
    { label: 'What', href: '#' },
    { label: 'Why', href: '#' },
    { label: 'How', href: '#' },
    { label: 'Who', href: '#' },
    { label: 'Where', href: '#' },
  ],
  rightActions,
}) => {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const rightActionsRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Animate navigation on mount
  useEffect(() => {
    if (!navRef.current) return

    const ctx = gsap.context(() => {
      // Animate nav bar entrance
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Stagger nav items animation
      if (navItemsRef.current) {
        gsap.from(navItemsRef.current.children, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        })
      }

      // Animate logo
      if (logoRef.current) {
        gsap.from(logoRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: 0.1,
          ease: 'back.out(1.7)',
        })
      }

      // Animate right actions
      if (rightActionsRef.current) {
        gsap.from(rightActionsRef.current.children, {
          x: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        })
      }
    }, navRef)

    return () => ctx.revert()
  }, [])

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
        if (navRef.current) {
          gsap.to(navRef.current, {
            boxShadow: scrolled
              ? '0 4px 20px rgba(0, 0, 0, 0.1)'
              : '0 2px 10px rgba(0, 0, 0, 0.05)',
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const handleNavItemHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleNavItemLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-4 right-4 z-50 bg-white"
      style={{
        height: 'var(--spacing-nav-height)', // 80px
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      }}
      aria-label="Main navigation"
    >
      <div
        className="nav-container mx-auto h-full flex items-center justify-between"
        style={{
          maxWidth: 'var(--marketing-max)',
        }}
      >
        {/* Left - Logo */}
        <div ref={logoRef} className="flex items-center">
          {logo || (
            <a
              href="/"
              className="flex items-center"
              aria-label="AIONIQ Labs Home"
              onMouseEnter={(e) => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power2.out',
                  })
                }
              }}
              onMouseLeave={(e) => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out',
                  })
                }
              }}
            >
              <Image
                src="/assets/aioniq-logo.svg"
                alt="AIONIQ Labs"
                width={135}
                height={38}
                style={{
                  height: '40px',
                  width: 'auto',
                }}
                priority
              />
            </a>
          )}
        </div>

        {/* Center - Navigation Items */}
        <div
          ref={navItemsRef}
          className="hidden md:flex items-center gap-1"
          role="navigation"
          aria-label="Main menu"
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              style={{
                fontSize: 'var(--typography-body-default-size-desktop)',
                fontWeight: item.active ? 600 : 500,
                color: item.active
                  ? '#FFFFFF'
                  : 'var(--color-text-secondary)',
                backgroundColor: item.active ? '#000000' : 'transparent',
              }}
              onMouseEnter={handleNavItemHover}
              onMouseLeave={handleNavItemLeave}
              onClick={handleNavItemClick}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </div>

        {/* Right - Actions */}
        <div ref={rightActionsRef} className="flex items-center gap-3">
          {rightActions || (
            <>
              {/* Circular Icon Button */}
              <button
                className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#F3F4F6',
                  color: 'var(--color-text-secondary)',
                }}
                aria-label="Toggle theme"
                onMouseEnter={(e) => {
                  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gsap.to(e.currentTarget, {
                      scale: 1.1,
                      rotation: 180,
                      duration: 0.3,
                      ease: 'power2.out',
                    })
                  }
                }}
                onMouseLeave={(e) => {
                  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      rotation: 0,
                      duration: 0.3,
                      ease: 'power2.out',
                    })
                  }
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>

              {/* Client Portal Button */}
              <Button variant="default" asChild>
                <a href="#">
                  Client Portal
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

