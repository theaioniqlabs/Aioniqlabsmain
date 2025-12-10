'use client'

import React from 'react'
import { Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/ui/PageContainer'

export interface Design7HeroProps {
  badge?: string
  headline: string
  ctaLabel?: string
  ctaHref?: string
  description?: string
  features?: string[]
  metricTitle?: string
  metricValue?: string
  metricDescription?: string
  className?: string
}

/**
 * Design7Hero component - FinTech product hero section
 * Based on Design 7 from Figma archive
 * Features: version badge, headline with emoji, user avatars, feature checklist, gradient metric card
 */
export const Design7Hero: React.FC<Design7HeroProps> = ({
  badge = 'Version 2.0 is here',
  headline,
  ctaLabel = 'Get Started',
  ctaHref = '#',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
  features = [
    'Funds are safe by your data security',
    'Privacy of the most transaction',
  ],
  metricTitle = 'AI Growth Rate',
  metricValue = '90x',
  metricDescription = 'faster',
  className = '',
}) => {

  return (
    <section
      className={`w-full ${className}`}
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
      }}
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div>
            {/* Version Badge */}
            {badge && (
              <div
                className="inline-flex items-center gap-2 rounded-full mb-6"
                style={{
                  paddingLeft: 'var(--spacing-stack-gap-xs)',
                  paddingRight: 'var(--spacing-stack-gap-xs)',
                  paddingTop: 'var(--spacing-stack-gap-xs)',
                  paddingBottom: 'var(--spacing-stack-gap-xs)',
                  backgroundColor: 'var(--color-brand-primary-05)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                <Sparkles
                  size={16}
                  style={{
                    color: 'var(--color-brand-primary)',
                  }}
                  aria-hidden="true"
                />
                <span
                  className="text-sm"
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                  }}
                >
                  {badge}
                </span>
              </div>
            )}

            {/* Headline with Ai powered text */}
            <h1
              className="mb-6 font-heading tracking-tight"
              style={{
                marginBottom: 'var(--spacing-stack-gap-md)',
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                lineHeight: 'var(--typography-display-tight-alt-line-height)',
                fontWeight: 'var(--typography-h1-weight)',
                color: 'var(--color-text-primary)',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  whiteSpace: 'pre-line',
                }}
              >
                Ai powered {headline}
              </span>
            </h1>

            {/* CTA Button */}
            <Button
              asChild
              variant="default"
              style={{
                marginBottom: 'var(--spacing-stack-gap-lg)',
              }}
            >
              <a href={ctaHref}>
                {ctaLabel}
              </a>
            </Button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Description */}
            <p
              className="font-body"
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--typography-body-default-size-desktop)',
                lineHeight: 'var(--typography-body-default-line-height)',
              }}
            >
              {description}
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--color-brand-primary-10)',
                    }}
                  >
                    <Check
                      size={12}
                      style={{
                        color: 'var(--color-brand-primary)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontSize: 'var(--typography-body-small-size-desktop)',
                      lineHeight: 'var(--typography-body-small-line-height)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Gradient Metric Card */}
            <div
              className="relative overflow-hidden rounded-2xl p-8 mt-8"
              style={{
                background: 'linear-gradient(to bottom right, var(--color-accent-orange), var(--color-accent-purple), var(--color-accent-blue))',
              }}
            >
              {/* Blur Effects */}
              <div
                className="absolute top-0 right-0 rounded-full pointer-events-none"
                style={{
                  width: 'var(--spacing-blur-effect-small)',
                  height: 'var(--spacing-blur-effect-small)',
                  backgroundColor: 'var(--color-text-inverse-10)',
                  filter: 'blur(64px)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 rounded-full pointer-events-none"
                style={{
                  width: 'var(--spacing-blur-effect-medium)',
                  height: 'var(--spacing-blur-effect-medium)',
                  backgroundColor: 'var(--color-text-inverse-10)',
                  filter: 'blur(96px)',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className="text-white/80 text-sm mb-2"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    color: 'var(--color-text-inverse-80)',
                  }}
                >
                  {metricTitle}
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div
                    className="text-white"
                    style={{
                      fontSize: 'clamp(3rem, 5vw, 3.75rem)',
                      lineHeight: 'var(--typography-display-tight-line-height)',
                      fontWeight: 'var(--typography-headline-weight)',
                    }}
                  >
                    {metricValue}
                  </div>
                  <div
                    className="text-white/80"
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      lineHeight: 'var(--typography-display-tight-line-height)',
                      color: 'var(--color-text-inverse-80)',
                    }}
                  >
                    {metricDescription}
                  </div>
                </div>
                <p
                  className="text-white/90 text-sm"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    color: 'var(--color-text-inverse-90)',
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

export default Design7Hero

