'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface StartupProgramCardProps {
  title: string
  bullets: string[]
  ctaText?: string
  ctaHref?: string
  className?: string
}

/**
 * Startup Program highlighted card
 * Full-width or large bento card with accent background and CTA
 */
export function StartupProgramCard({
  title,
  bullets,
  ctaText = 'Apply to Startup Program',
  ctaHref = '#',
  className = '',
}: StartupProgramCardProps) {
  return (
    <article
      className={`card-item ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--color-brand-primary-05) 0%, var(--color-brand-primary-05) 100%)',
        border: '1px solid var(--color-brand-primary-10)',
      }}
    >
      <div className="flex flex-col gap-6">
        <h3 className="text-h3 font-heading">{title}</h3>
        
        <ul className="flex flex-col gap-3 list-none">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-body font-body flex items-start gap-2">
              <span className="mt-1" style={{ color: 'var(--color-brand-primary)' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-2">
          <Button
            asChild
            variant="default"
            className="inline-flex items-center gap-2"
            aria-label={ctaText}
          >
            <a href={ctaHref}>
              {ctaText}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}

