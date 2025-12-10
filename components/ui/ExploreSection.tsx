'use client'

import React from 'react'
import { Layers, Lightbulb, Cpu, User } from 'lucide-react'
import Link from 'next/link'
import { PageContainer } from './PageContainer'

export interface ExploreCard {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
}

const exploreCards: ExploreCard[] = [
  {
    title: 'Portfolio',
    description: 'Explore our creative work and case studies',
    icon: <Layers className="w-6 h-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }} aria-hidden="true" />,
    href: '#',
  },
  {
    title: 'Philosophy',
    description: 'The AIONIQ Code and our principles',
    icon: <Lightbulb className="w-6 h-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }} aria-hidden="true" />,
    href: '#',
  },
  {
    title: 'Process',
    description: 'Our 90-day framework and systems',
    icon: <Cpu className="w-6 h-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }} aria-hidden="true" />,
    href: '#',
  },
  {
    title: 'Founder',
    description: 'Meet the mind behind AIONIQ Labs',
    icon: <User className="w-6 h-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }} aria-hidden="true" />,
    href: '#',
  },
]

/**
 * Explore AIONIQ Section Component
 * Displays a grid of 4 interactive cards for exploring different sections
 * Matches Design 2 from UI-Design-direct-code.md
 */
export const ExploreSection: React.FC = () => {
  return (
    <section
      className="py-16"
      style={{
        paddingTop: 'var(--spacing-stack-gap-2xl)', // 64px
        paddingBottom: 'var(--spacing-stack-gap-2xl)', // 64px
      }}
      aria-label="Explore AIONIQ"
    >
      <PageContainer>
        <h2
          className="mb-8"
          style={{
            marginBottom: 'var(--spacing-stack-gap-lg)', // 32px
            fontSize: 'var(--typography-h2-subtle-size-desktop)', // 24px
            lineHeight: 'var(--typography-h2-subtle-line-height-desktop)', // 28px
            fontWeight: 'var(--typography-h2-subtle-weight)', // 600
            fontFamily: 'var(--typography-font-family-heading)',
            color: 'var(--color-text-primary)',
          }}
        >
          Explore AIONIQ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exploreCards.map((card, index) => (
            <Link
              key={index}
              href={card.href || '#'}
              className="group relative bg-card rounded-xl border border-border p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 text-left w-full"
              style={{
                padding: 'var(--spacing-stack-gap-md)', // 24px
                borderRadius: 'var(--radii-card-default)', // 12px
                borderColor: 'hsl(var(--border))',
                backgroundColor: 'hsl(var(--card))',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radii-button-default)', // 8px
                    backgroundColor: 'hsl(var(--primary) / 0.05)',
                  }}
                >
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h4
                    className="mb-1 text-foreground group-hover:text-primary transition-colors"
                    style={{
                      marginBottom: 'var(--spacing-stack-gap-xs)', // 8px
                      fontSize: 'var(--typography-h3-subtle-size-desktop)', // 18px
                      lineHeight: 'var(--typography-h3-subtle-line-height-desktop)', // 24px
                      fontWeight: 'var(--typography-h3-subtle-weight)', // 600
                      fontFamily: 'var(--typography-font-family-heading)',
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    className="text-sm text-muted-foreground"
                    style={{
                      fontSize: 'var(--typography-body-small-size-desktop)', // 14px
                      lineHeight: 'var(--typography-body-small-line-height)', // 1.5
                      color: 'hsl(var(--muted-foreground))',
                      fontFamily: 'var(--typography-font-family-body)',
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}

export default ExploreSection

