'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/ui/PageContainer'

export interface HeroSectionAnnouncement {
  text: string
  buttonText?: string
  buttonHref?: string
}

export interface HeroSectionCTA {
  label: string
  href: string
  variant: 'default' | 'secondary'
}

export interface HeroSectionProps {
  announcement?: HeroSectionAnnouncement
  headline: string
  description: string
  ctas: HeroSectionCTA[]
  backgroundImage?: string
  className?: string
}

/**
 * HeroSection component - Alternative hero section with announcement banner
 * Uses AiONIQ design tokens for all styling
 * Navigation is handled separately by MainNav component
 */
export default function HeroSection({
  announcement,
  headline,
  description,
  ctas,
  backgroundImage = 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png',
  className = ''
}: HeroSectionProps) {
  return (
    <section
      className={`w-full bg-no-repeat bg-cover bg-center relative ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        marginTop: '120px',
        paddingTop: '100px',
        paddingBottom: '150px',
      }}
    >
      <PageContainer mode="visual">
        {/* Headline */}
        <h1
          className="font-heading max-w-[850px] text-center mx-auto"
          style={{
            marginTop: 'var(--spacing-section-vertical-desktop)',
            fontSize: 'clamp(2.25rem, 4vw, 4.5rem)',
            lineHeight: '1.1',
            fontWeight: 'var(--typography-h1-weight)',
            color: 'var(--color-text-primary)',
          }}
        >
          {headline}
        </h1>

        {/* Description */}
        <p
          className="font-body mx-auto max-w-2xl text-center"
          style={{
            marginTop: 'var(--spacing-stack-gap-md)',
            fontSize: 'var(--typography-body-size-desktop)',
            lineHeight: 'var(--typography-body-line-height-desktop)',
            fontWeight: 'var(--typography-body-weight)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div
          className="mx-auto w-full flex items-center justify-center"
          style={{
            marginTop: 'var(--spacing-stack-gap-md)',
            gap: 'var(--spacing-stack-gap-md)',
          }}
        >
          {ctas.map((cta, index) => (
            <Button
              key={index}
                  asChild
                  variant={cta.variant}
                >
                  <a href={cta.href}>
            >
                    {cta.label}
                  </a>
                </Button>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}

