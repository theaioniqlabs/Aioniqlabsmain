'use client'

import React from 'react'
import Link from 'next/link'
import { Tilt } from '@/components/ui/Tilt'

interface FounderCardProps {
  portraitSrc?: string
  portraitAlt?: string
  headline: string
  narrative: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

/**
 * Large founder story card with portrait, headline, narrative, and CTA
 * Desktop: ~60% width, left column
 */
export function FounderCard({
  portraitSrc,
  portraitAlt = 'Founder portrait',
  headline,
  narrative,
  ctaText = 'Learn more about the founder',
  ctaHref = '/who',
  className = '',
}: FounderCardProps) {
  const hasImage = portraitSrc && portraitSrc !== ''

  return (
    <Tilt maxRotate={3} className={`card-item ${className}`}>
      <article className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="text-h2 font-heading">{headline}</h2>
          <p className="text-body-large font-body">{narrative}</p>
        </div>
        
        <Link
          href={ctaHref}
          className="text-body font-body transition-colors duration-300 underline"
          style={{ color: 'var(--color-text-primary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          aria-label={ctaText}
        >
          {ctaText} →
        </Link>
      </article>
    </Tilt>
  )
}

