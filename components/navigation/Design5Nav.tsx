'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Home,
  Layers,
  Cpu,
  Mail,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<any>
  active?: boolean
}

export interface Design5NavProps {
  logo?: string
  logoAlt?: string
  navItems?: NavItem[]
  className?: string
}

/**
 * Design 5 Navbar - Responsive navigation with desktop horizontal nav and mobile bottom nav
 * Based on Design 5 from UI-Design-direct-code.md
 */
export const Design5Nav: React.FC<Design5NavProps> = ({
  logo = '/assets/aioniq-logo.svg',
  logoAlt = 'AIONIQ Labs',
  navItems,
  className = '',
}) => {

  // Default navigation items if not provided
  const defaultNavItems: NavItem[] = [
    { label: 'Home', href: '/', icon: Home, active: true },
    { label: 'Projects', href: '/what', icon: Layers },
    { label: 'About', href: '/how', icon: Cpu },
    { label: 'Where', href: '/where', icon: Mail },
  ]

  const items = navItems || defaultNavItems

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile/tablet */}
      <nav
        className={`hidden lg:block nav-container mx-auto ${className}`}
        style={{
          maxWidth: 'var(--visual-max)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
          className="flex items-center justify-between"
          style={{ height: 'var(--spacing-nav-height)' }} // 80px
        >
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center hover:opacity-70 transition-opacity"
            aria-label="AIONIQ Labs Home"
          >
            <Image
              src={logo}
              alt={logoAlt}
              width={135}
              height={38}
              className="h-[30px] w-auto"
              priority
            />
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {items.map((item, index) => {
              const IconComponent = item.icon
              const isActive = item.active

              return (
                <Link
                  key={`desktop-${item.label}-${index}`}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconComponent className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Bottom Navigation - Hidden on desktop */}
      <nav
        className={`fixed bottom-0 left-0 right-0 flex lg:hidden items-center justify-around px-2 bg-background border-t border-border z-50 ${className}`}
        style={{ height: 'var(--spacing-nav-height)' }} // 80px
        role="navigation"
        aria-label="Main navigation"
      >
        {items.map((item, index) => {
          const IconComponent = item.icon
          const isActive = item.active

          return (
            <Link
              key={`mobile-${item.label}-${index}`}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-2 rounded-lg transition-all ${
                isActive ? 'text-primary' : 'text-foreground/40'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <IconComponent
                className="w-5 h-5"
                aria-hidden="true"
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

