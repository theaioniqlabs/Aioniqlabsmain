'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/ui/PageContainer'
import { OrbitingCirclesContainer } from '@/components/ui/OrbitingCirclesContainer'

export interface Design4HeroCTA {
  label: string
  href: string
  variant: 'default' | 'secondary'
}

export interface Design4HeroProps {
  badge?: string
  headline: string
  description: string
  ctas: Design4HeroCTA[]
  className?: string
}

/**
 * Design4Hero component - Hero section with badge, headline, description, and CTAs
 * Based on Design 4 from Figma archive
 * Uses AiONIQ design tokens for all styling
 */
export const Design4Hero: React.FC<Design4HeroProps> = ({
  badge = 'Creative Technology Studio',
  headline,
  description,
  ctas,
  className = '',
}) => {
  return (
    <section
      className={`w-full ${className}`}
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
        backgroundColor: '#FFFFFF', // White background
      }}
    >
      <PageContainer>
        <div
          className="grid grid-cols-1 lg:grid-cols-5 mx-auto"
          style={{
            gap: 'var(--spacing-stack-gap-md)',
            maxWidth: '100%',
          }}
        >
          {/* Left Column - 60% (3 columns) */}
          <div className="w-full lg:col-span-3 min-w-0">
            {/* Badge */}
            {badge && (
              <div
                className="inline-block rounded-full mb-6"
                style={{
                  paddingLeft: 'var(--spacing-stack-gap-md)',
                  paddingRight: 'var(--spacing-stack-gap-md)',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  backgroundColor: 'rgba(155, 123, 255, 0.05)', // primary/5
                  borderRadius: 'var(--radii-button-pill)',
                  marginBottom: 'var(--spacing-stack-gap-md)',
                }}
              >
                <span
                  className="font-body"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    fontWeight: 'var(--typography-body-small-weight)',
                    color: '#000000', // Black text
                  }}
                >
                  {badge}
                </span>
              </div>
            )}

            {/* Headline */}
            <h1
              className="mb-6 font-heading tracking-tight"
              style={{
                marginBottom: 'var(--spacing-stack-gap-md)',
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                lineHeight: '1.1',
                fontWeight: 'var(--typography-h1-weight)',
                color: '#000000', // Black text
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </h1>

            {/* CTA Buttons */}
            <div
              className="flex flex-row"
              style={{
                gap: 'var(--spacing-stack-gap-md)',
              }}
            >
              {ctas.map((cta, index) => (
                <Button
                  key={index}
                  asChild
                  variant={cta.variant || 'default'}
                  className="w-auto self-start"
                >
                  <a href={cta.href}>
                    {cta.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Column - 40% (2 columns) */}
          <div className="w-full lg:col-span-2 min-w-0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', padding: '0' }}>
            <OrbitingCirclesContainer height="400px" className="!p-0 !bg-transparent" />
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

export default Design4Hero

