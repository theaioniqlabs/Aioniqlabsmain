'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Home, Layers, Cpu, Mail } from 'lucide-react'
import { MenuBar } from '@/components/ui/glow-menu'

export interface GlowNavProps {
  logo?: string
  logoAlt?: string
  className?: string
}

/**
 * Glow Menu Navbar - Replaces Design5Nav with animated glow menu
 * Features 3D flip animations and glow effects
 */
export const GlowNav: React.FC<GlowNavProps> = ({
  logo = '/assets/aioniq-logo.svg',
  logoAlt = 'AIONIQ Labs',
  className = '',
}) => {
  const pathname = usePathname()

  // Menu items with gradients and colors
  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      gradient:
        'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
      iconColor: 'text-blue-500',
    },
    {
      icon: Layers,
      label: 'Projects',
      href: '/what',
      gradient:
        'radial-gradient(circle, rgba(155,123,255,0.15) 0%, rgba(139,92,246,0.06) 50%, rgba(124,58,237,0) 100%)', // AiONIQ brand purple
      iconColor: 'text-purple-500',
    },
    {
      icon: Cpu,
      label: 'About',
      href: '/how',
      gradient:
        'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
      iconColor: 'text-green-500',
    },
    {
      icon: Mail,
      label: 'Contact',
      href: '/where',
      gradient:
        'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
      iconColor: 'text-orange-500',
    },
  ]

  // Determine active item based on pathname
  const getActiveItem = () => {
    if (pathname === '/') return 'Home'
    if (pathname === '/what') return 'Projects'
    if (pathname === '/how') return 'About'
    if (pathname === '/where') return 'Contact'
    return undefined
  }

  const activeItem = getActiveItem()

  const handleItemClick = (label: string) => {
    // Navigation is handled by Next.js Link, this is just for state if needed
  }

  return (
    <nav
      className={`flex items-center justify-center nav-container mx-auto py-3 sm:py-4 ${className}`}
      style={{
        maxWidth: 'var(--visual-max)',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#FFFFFF',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Glow Menu - Centered on all screen sizes */}
      <MenuBar
        items={menuItems}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        className="scale-90 sm:scale-95 lg:scale-100" // Slightly smaller on mobile/tablet
      />
    </nav>
  )
}

