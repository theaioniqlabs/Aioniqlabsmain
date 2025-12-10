'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  Layers,
  Lightbulb,
  Cpu,
  User,
  Mail,
} from 'lucide-react'

export interface Design9NavProps {
  logo?: string
  logoAlt?: string
  className?: string
}

/**
 * Design 9 Navbar - Fixed navbar with backdrop blur
 * Based on Design 9 from UI-Design-direct-code.md
 */
export const Design9Nav: React.FC<Design9NavProps> = ({
  logo = '/assets/aioniq-logo.svg',
  logoAlt = 'AIONIQ Labs',
  className = '',
}) => {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'What', href: '/what', icon: Layers },
    { label: 'Why', href: '/why', icon: Lightbulb },
    { label: 'How', href: '/how', icon: Cpu },
    { label: 'Who', href: '/who', icon: User },
    { label: 'Where', href: '/where', icon: Mail },
  ]

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile/tablet */}
      <nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="nav-container mx-auto"
          style={{
            maxWidth: 'var(--visual-max)',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 'var(--spacing-banner-height)', // 64px - matches banner height
          }}
        >
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
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
              {navItems.map((item) => {
                const IconComponent = item.icon
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-foreground/60 hover:text-foreground hover:bg-[var(--color-gray-light)]'
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
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav
        className={`flex lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-border ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around h-16 px-2 w-full">
          {navItems.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.label}
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
        </div>
      </nav>
    </>
  )
}

