'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from '@/components/providers/ThemeProvider'

export interface TextBannerProps {
  logo?: string
  logoAlt?: string
  className?: string
}

/**
 * TextBanner component - Banner with centered logo
 * Matches navigation height (h-16 = 64px) and container constraints
 * Uses white background
 */
export const TextBanner: React.FC<TextBannerProps> = ({
  logo,
  logoAlt = 'AIONIQ Labs',
  className = '',
}) => {
  const { theme } = useTheme()
  
  // Use provided logo or theme-aware default
  const logoPath = logo || (theme === 'dark' ? '/assets/aioniq-logo-02.svg' : '/assets/aioniq-logo-01.svg')
  return (
    <section
      className={`w-full ${className}`}
      style={{
        height: 'var(--spacing-banner-height)', // 64px - matches navigation height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-text-inverse)', // White background
      }}
      role="banner"
      aria-label="Logo banner"
    >
      <div
        className="nav-container mx-auto w-full"
        style={{
          maxWidth: 'var(--visual-max)',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={logoPath}
          alt={logoAlt}
          width={135}
          height={38}
          className="w-auto"
          style={{
            height: 'var(--icon-size-default)',
          }}
          priority
        />
      </div>
    </section>
  )
}

export default TextBanner

