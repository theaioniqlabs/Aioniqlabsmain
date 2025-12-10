'use client'

import React from 'react'
import { Zap, Activity, Calendar, Lightbulb, TrendingUp, Settings, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/ui/PageContainer'
import { DestinationCard } from '@/components/ui/card-21'
import { ArticleCard } from '@/components/ui/blog-post-card'
import { OnboardingChecklist } from '@/components/ui/onboarding-checklist'
import { TypewriterTestimonial } from '@/components/ui/typewriter-testimonial'

export interface ProductFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  iconColor?: string
  iconBgColor?: string
  gridSpan?: {
    mobile?: number
    tablet?: number
    desktop?: { col?: number; row?: number }
  }
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: 'default' | 'large-number' | 'percentage' | 'integrations' | 'wide'
  bannerImages?: string[]
  data?: {
    number?: string
    numberLabel?: string
    percentage?: string
    percentageSubtitle?: string
    percentageLabel?: string
    integrations?: Array<{ icon: React.ReactNode; color: string; bgColor: string }>
    integrationsCount?: string
    shortcuts?: string[]
  }
}

export interface ProductFeaturesProps {
  title?: string
  description?: string
  features?: ProductFeature[]
  className?: string
}

// Default features matching Design 3
const defaultFeatures: ProductFeature[] = [
  {
    id: 'zapier',
    title: 'Zapier Integration',
    description: 'Unlock effortless automation Your gateway to effortless automation connect your favourite apps, streamline workflows, and supercharge productivity with ease.',
    icon: <Zap className="w-6 h-6 text-white" aria-hidden="true" />,
    iconColor: 'orange',
    iconBgColor: 'bg-orange-500',
    gridSpan: { desktop: { row: 2 } },
    variant: 'default',
    action: {
      label: 'Configure',
      href: '#',
    },
  },
  {
    id: 'productivity',
    title: "Team's Productivity",
    description: "Boost your team's efficiency with our next-gen productivity solutions.",
    icon: <TrendingUp className="w-6 h-6" style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />,
    iconColor: 'primary',
    iconBgColor: 'bg-primary/10',
    variant: 'default',
  },
  {
    id: 'shortcuts',
    title: '',
    description: '',
    icon: null,
    gridSpan: { desktop: { col: 3 } },
    variant: 'wide',
    bannerImages: ['/assets/banners/banner-ceramix.png', '/assets/banners/banner-metal.png', '/assets/banners/banner-sikkim.png', '/assets/banners/banner-unesco.png'],
  },
]

/**
 * ProductFeatures component - Bento-style grid layout for product features
 * Uses AiONIQ design tokens for all styling
 */
export const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  title = 'Product Features',
  description = 'Organize, prioritize and control track your tasks more efficiently in our trusted platform',
  features = defaultFeatures,
  className = '',
}) => {
  const renderFeatureCard = (feature: ProductFeature) => {
    const gridClasses = [
      'bg-card border border-border rounded-xl transition-all duration-300',
      'hover:shadow-md hover:border-primary/20',
    ]

    // Apply grid spans using conditional classes
    if (feature.gridSpan?.desktop?.row === 2) {
      gridClasses.push('lg:row-span-2')
    }
    if (feature.gridSpan?.desktop?.col === 2) {
      gridClasses.push('lg:col-span-2')
    }
    if (feature.gridSpan?.desktop?.col === 3) {
      gridClasses.push('lg:col-span-3')
    }

    const cardStyle: React.CSSProperties = {
      padding: 'var(--card-padding)',
      borderRadius: 'var(--radii-card-default)',
      borderColor: 'var(--color-button-secondary-border)',
      backgroundColor: 'var(--color-background-primary)',
        }

    switch (feature.variant) {
      case 'large-number':
        return (
          <div key={feature.id} className={gridClasses.join(' ')} style={cardStyle}>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="mb-4 font-heading"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 8rem)',
                    lineHeight: 'var(--typography-display-tight-line-height)',
                    fontWeight: 'var(--typography-h1-weight)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {feature.data?.number}
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    fontWeight: 'var(--typography-body-small-weight)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {feature.data?.numberLabel}
                </p>
              </div>
            </div>
          </div>
        )

      case 'percentage':
        
        return (
          <div key={feature.id} className={gridClasses.join(' ')} style={cardStyle}>
            <div className="flex items-end justify-between">
              <div>
                <h3
                  className="mb-1 font-heading"
                  style={{
                    fontSize: 'var(--typography-h4-size-desktop)',
                    lineHeight: 'var(--typography-h4-line-height-desktop)',
                    fontWeight: 'var(--typography-h4-weight)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mb-4 font-body"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    fontWeight: 'var(--typography-body-small-weight)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {feature.description}
                </p>
                <div
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    lineHeight: 'var(--typography-display-tight-line-height)',
                    fontWeight: 'var(--typography-h1-weight)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {feature.data?.percentage}
                </div>
              </div>
              <div className="text-right">
                <p
                  className="mb-1 font-body"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    fontWeight: 'var(--typography-body-small-weight)',
                    color: 'var(--color-accent-orange)',
                  }}
                >
                  {feature.data?.percentageSubtitle}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    fontWeight: 'var(--typography-body-small-weight)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {feature.data?.percentageLabel}
                </p>
              </div>
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div key={feature.id} className={gridClasses.join(' ')} style={cardStyle}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="mb-1 font-heading"
                  style={{
                    fontSize: 'var(--typography-h4-size-desktop)',
                    lineHeight: 'var(--typography-h4-line-height-desktop)',
                    fontWeight: 'var(--typography-h4-weight)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--typography-body-small-size-desktop)',
                    lineHeight: 'var(--typography-body-small-line-height)',
                    fontWeight: 'var(--typography-body-small-weight)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {feature.data?.integrationsCount}
                </p>
              </div>
              <div className="flex gap-2">
                {feature.data?.integrations?.map((integration, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 ${integration.bgColor} rounded flex items-center justify-center`}
                  >
                    {integration.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'wide':
        // Special case: Replace shortcuts card with OnboardingChecklist
        if (feature.id === 'shortcuts') {
          return (
            <div key={feature.id} className={gridClasses.join(' ')} style={cardStyle}>
              <OnboardingChecklist
                title="Get Started - It only takes 10 minutes"
                description="Please keep these documents and details ready for a smooth sign-up"
                items={[
                  { id: 1, text: "PAN card" },
                  { id: 2, text: "GST number, if applicable" },
                  {
                    id: 3,
                    text: "FSSAI license",
                    helperText: "Don't have a FSSAI license?",
                    helperLink: { href: "#", text: "Apply here" },
                  },
                  {
                    id: 4,
                    text: "Menu & profile food image",
                    helperText: "What is profile food image?",
                    helperLink: { href: "#", text: "Refer here" },
                  },
                ]}
                videoThumbnailUrl="https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1887"
                videoUrl="https://www.youtube.com/embed/3yBgLxgwS1U?si=_MZFE2nm9fevcj76&t=30"
                className="h-full"
              />
            </div>
          )
        }
        
        // Render the default wide variant content (banner removed, container card kept)
        return (
          <div key={feature.id} className={gridClasses.join(' ')} style={cardStyle}>
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${feature.iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    className="mb-1 font-heading"
                    style={{
                      fontSize: 'var(--typography-h4-size-desktop)',
                      lineHeight: 'var(--typography-h4-line-height-desktop)',
                      fontWeight: 'var(--typography-h4-weight)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      fontSize: 'var(--typography-body-small-size-desktop)',
                      lineHeight: 'var(--typography-body-small-line-height)',
                      fontWeight: 'var(--typography-body-small-weight)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
              {feature.data?.shortcuts && (
                <div className="hidden md:flex items-center gap-2">
                  {feature.data.shortcuts.map((key, index) => (
                    <kbd
                      key={index}
                      className="px-3 py-1.5 bg-accent border border-border rounded text-sm"
                      style={{
                        backgroundColor: 'var(--color-background-secondary)',
                        borderColor: 'var(--color-button-secondary-border)',
                        borderRadius: 'var(--radii-button-default)',
                        fontSize: 'var(--typography-body-small-size-desktop)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      default:
        // Special case: Replace Zapier Integration with DestinationCard
        if (feature.id === 'zapier') {
          return (
            <div key={feature.id} className={gridClasses.join(' ')} style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
              <DestinationCard
                imageUrl="https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1887"
                location="Portfolio"
                flag=""
                stats=""
                href={feature.action?.href || '#'}
                themeColor="250 50% 30%"
                className="h-full"
              />
            </div>
          )
        }
        
        // Special case: Team's Productivity card with white text
        if (feature.id === 'productivity') {
          return (
            <div key={feature.id} className={gridClasses.join(' ')} style={{ ...cardStyle, padding: '0', overflow: 'hidden', backgroundColor: 'var(--color-brand-primary)' }}>
              <div style={{ padding: 'var(--card-padding)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                <div>
                  <h3
                    className="mb-3 font-heading"
                    style={{
                      fontSize: 'var(--typography-h4-size-desktop)',
                      lineHeight: 'var(--typography-h4-line-height-desktop)',
                      fontWeight: 'var(--typography-h4-weight)',
                      color: 'var(--color-text-inverse)',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      fontSize: 'var(--typography-body-size-desktop)',
                      lineHeight: 'var(--typography-body-line-height-desktop)',
                      fontWeight: 'var(--typography-body-weight)',
                      color: 'var(--color-text-inverse)',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="secondary"
                  className="w-auto self-start mt-8 flex items-center gap-2"
                  style={{
                    marginTop: 'var(--spacing-stack-gap-md)',
                  }}
                >
                  <a href="#">
                    <span>Explore Now</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          )
        }
        
        return (
          <div key={feature.id} className={gridClasses.join(' ')} style={cardStyle}>
            <div className="flex flex-col justify-between h-full">
              <div>
                {feature.icon && (
                  <div
                    className={`w-12 h-12 ${feature.iconBgColor || 'bg-primary/10'} rounded-xl flex items-center justify-center mb-6`}
                    style={{
                      borderRadius: 'var(--radii-button-default)',
                    }}
                  >
                    {feature.icon}
                  </div>
                )}
                <h3
                  className="mb-3 font-heading"
                  style={{
                    fontSize: 'var(--typography-h4-size-desktop)',
                    lineHeight: 'var(--typography-h4-line-height-desktop)',
                    fontWeight: 'var(--typography-h4-weight)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--typography-body-size-desktop)',
                    lineHeight: 'var(--typography-body-line-height-desktop)',
                    fontWeight: 'var(--typography-body-weight)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {feature.description}
                </p>
              </div>
              {feature.action && (
                <Button
                  asChild={!!feature.action.href}
                  variant="ghost"
                  size="sm"
                  className="mt-6 w-fit flex items-center gap-2"
                  style={{
                    marginTop: 'var(--spacing-stack-gap-md)',
                  }}
                  onClick={!feature.action.href ? feature.action.onClick : undefined}
                >
                  {feature.action.href ? (
                    <a 
                      href={feature.action.href} 
                      onClick={(e) => {
                        // If onClick is provided, call it but allow navigation
                        if (feature.action?.onClick) {
                          feature.action.onClick()
                        }
                        // If onClick prevents default, respect that
                        // Otherwise, allow normal anchor navigation
                      }}
                    >
                      {feature.action.label === 'Configure' && (
                        <Settings className="w-4 h-4 text-orange-500" aria-hidden="true" />
                      )}
                      {feature.action.label}
                    </a>
                  ) : (
                    <>
                      {feature.action.label === 'Configure' && (
                        <Settings className="w-4 h-4 text-orange-500" aria-hidden="true" />
                      )}
                      {feature.action.label}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <section
      className={`w-full border-t border-border ${className}`}
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
        borderTopColor: 'var(--color-button-secondary-border)',
      }}
    >
      <PageContainer>
        {/* Features Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: 'var(--spacing-stack-gap-md)',
          }}
        >
          {features.map((feature) => renderFeatureCard(feature))}
        </div>
      </PageContainer>
    </section>
  )
}

export default ProductFeatures

