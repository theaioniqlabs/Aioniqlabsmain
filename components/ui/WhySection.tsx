'use client'

import React from 'react'
import { PageContainer } from './PageContainer'
import { Button } from './Button'
import { Sparkles, Target, Lightbulb, Users, Zap, Shield } from 'lucide-react'

export const WhySection: React.FC = () => {
  const principles = [
    {
      icon: Sparkles,
      title: 'Craft Over Convention',
      description: 'We believe every pixel matters. We don\'t use templates or follow trends blindly. Every project is a unique expression of the brand\'s vision and user needs.',
    },
    {
      icon: Target,
      title: 'Purpose-Driven Design',
      description: 'Beautiful design without strategy is decoration. We start with business goals and user problems, ensuring every decision serves a clear purpose.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation as Standard',
      description: 'We don\'t wait for technology to mature. We experiment, prototype, and push boundaries to give our clients a competitive edge in their markets.',
    },
    {
      icon: Users,
      title: 'Human-First Technology',
      description: 'Technology should feel invisible. We build interfaces that respect cognitive load, anticipate user needs, and create moments of delight.',
    },
    {
      icon: Zap,
      title: 'Speed Meets Quality',
      description: 'We\'ve perfected systems that deliver premium results in tight timelines. Our 90-day framework ensures quality without endless revisions.',
    },
    {
      icon: Shield,
      title: 'Built to Last',
      description: 'We don\'t just launch and leave. Every system is documented, scalable, and maintainable. Your team can grow it, or we can support it.',
    },
  ]

  const codeItems = [
    'We question everything, even our own assumptions',
    'We ship working products, not perfect presentations',
    'We measure impact, not hours worked',
    'We say no to projects we can\'t make exceptional',
    'We treat client success as our own',
    'We stay curious and never stop learning',
  ]

  return (
    <PageContainer>
      <div
        className="py-12 md:py-16 lg:py-20"
        style={{
          paddingTop: 'var(--spacing-section-vertical-desktop)',
          paddingBottom: 'var(--spacing-section-vertical-desktop)',
        }}
      >
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <h2
            className="mb-4 md:mb-6 font-heading tracking-tight"
            style={{
              fontSize: 'var(--typography-h2-size-desktop)',
              lineHeight: 'var(--typography-h2-line-height-desktop)',
              fontWeight: 'var(--typography-h2-weight)',
              color: 'var(--color-text-primary)',
            }}
          >
            Why AIONIQ
          </h2>
          <p
            className="text-muted-foreground max-w-2xl font-body"
            style={{
              fontSize: 'var(--typography-body-large-size-desktop)',
              lineHeight: 'var(--typography-body-large-line-height-desktop)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Our philosophy shapes everything we create. These are the principles that guide our work and define our relationships with clients.
          </p>
        </div>

        {/* Prime Principle Card */}
        <div
          className="mb-16 md:mb-20 p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="max-w-3xl">
            <p
              className="text-xs uppercase tracking-wider mb-4 md:mb-6 opacity-80 font-heading"
              style={{
                fontSize: 'var(--typography-body-small-size-desktop)',
                letterSpacing: '0.1em',
              }}
            >
              Our Prime Principle
            </p>
            <h2
              className="mb-6 md:mb-8 font-heading tracking-tight"
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                lineHeight: '1.15',
                fontWeight: 'var(--typography-h2-weight)',
              }}
            >
              Technology should elevate humans, not complicate their lives.
            </h2>
            <p
              className="text-lg md:text-xl opacity-90 font-body leading-relaxed"
              style={{
                fontSize: 'var(--typography-body-large-size-desktop)',
                lineHeight: 'var(--typography-body-large-line-height-desktop)',
              }}
            >
              This belief drives every decision we make—from the first wireframe to the final deployment. We create digital products that feel effortless because we handle all the complexity behind the scenes.
            </p>
          </div>
        </div>

        {/* Core Principles Section */}
        <div className="mb-16 md:mb-20">
          <h2
            className="mb-10 md:mb-12 font-heading tracking-tight"
            style={{
              fontSize: 'var(--typography-h2-size-desktop)',
              lineHeight: 'var(--typography-h2-line-height-desktop)',
              fontWeight: 'var(--typography-h2-weight)',
              color: 'var(--color-text-primary)',
            }}
          >
            Core Principles
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            style={{
              gap: 'var(--spacing-stack-gap-lg)',
            }}
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <div
                  key={index}
                  className="p-6 md:p-8 bg-card border border-border rounded-xl md:rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
                  style={{
                    borderColor: 'var(--color-button-secondary-border)',
                    backgroundColor: 'var(--color-background-primary)',
                    padding: 'var(--card-padding)',
                  }}
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors"
                    style={{
                      borderRadius: 'var(--radii-card-default)',
                    }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3
                    className="mb-3 md:mb-4 font-heading"
                    style={{
                      fontSize: 'var(--typography-h4-size-desktop)',
                      lineHeight: 'var(--typography-h4-line-height-desktop)',
                      fontWeight: 'var(--typography-h4-weight)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className="text-muted-foreground font-body leading-relaxed"
                    style={{
                      fontSize: 'var(--typography-body-default-size-desktop)',
                      lineHeight: 'var(--typography-body-default-line-height)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {principle.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* The AIONIQ Code Section */}
        <div
          className="mb-16 md:mb-20 p-8 md:p-12 lg:p-16 bg-accent rounded-2xl md:rounded-3xl"
          style={{
            padding: 'var(--card-padding)',
          }}
        >
          <h2
            className="mb-6 md:mb-8 font-heading tracking-tight"
            style={{
              fontSize: 'var(--typography-h2-size-desktop)',
              lineHeight: 'var(--typography-h2-line-height-desktop)',
              fontWeight: 'var(--typography-h2-weight)',
              color: 'var(--color-text-primary)',
            }}
          >
            The AIONIQ Code
          </h2>
          <p
            className="text-muted-foreground mb-8 md:mb-10 max-w-2xl font-body"
            style={{
              fontSize: 'var(--typography-body-large-size-desktop)',
              lineHeight: 'var(--typography-body-large-line-height-desktop)',
              color: 'var(--color-text-secondary)',
            }}
          >
            These are the operating principles we live by. Not aspirational values on a wall, but daily practices that define how we work.
          </p>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            style={{
              gap: 'var(--spacing-stack-gap-md)',
            }}
          >
            {codeItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                <div
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span
                    className="text-primary-foreground font-heading font-semibold"
                    style={{
                      fontSize: 'var(--typography-body-small-size-desktop)',
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
                <p
                  className="font-body leading-relaxed"
                  style={{
                    fontSize: 'var(--typography-body-default-size-desktop)',
                    lineHeight: 'var(--typography-body-default-line-height)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Essay Sections */}
        <div
          className="space-y-12 md:space-y-16 lg:space-y-20"
          style={{
            gap: 'var(--spacing-stack-gap-2xl)',
          }}
        >
          {[
            {
              title: 'On Simplicity',
              content:
                'Simplicity isn\'t about removing features—it\'s about removing friction. The best interfaces feel obvious in retrospect, but getting there requires deep understanding of user mental models and countless iterations. We obsess over the details that others overlook: the micro-interactions, the loading states, the error messages that actually help. Because complexity is easy; simplicity is hard work.',
            },
            {
              title: 'On Technology Choices',
              content:
                'We don\'t chase the latest JavaScript framework or AI buzzword. We choose tools based on project requirements, team capabilities, and long-term maintainability. Sometimes that means boring, battle-tested technology. Sometimes it means being early adopters. What matters is making informed decisions that serve the project, not our portfolio.',
            },
            {
              title: 'On Client Partnerships',
              content:
                'We don\'t do transactional work. When we take on a project, we\'re invested in your success. We\'ll challenge your assumptions, propose better approaches, and sometimes tell you what you don\'t want to hear. Because that\'s what partners do. We\'re building things that last, not checking boxes on a scope document.',
            },
          ].map((essay, index) => (
            <div key={index}>
              <div
                className="w-12 md:w-16 h-0.5 md:h-1 bg-primary mb-6 md:mb-8"
                style={{
                  borderRadius: '2px',
                }}
              />
              <h3
                className="mb-4 md:mb-6 font-heading tracking-tight"
                style={{
                  fontSize: 'var(--typography-h3-size-desktop)',
                  lineHeight: 'var(--typography-h3-line-height-desktop)',
                  fontWeight: 'var(--typography-h3-weight)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {essay.title}
              </h3>
              <p
                className="text-muted-foreground max-w-3xl font-body leading-relaxed"
                style={{
                  fontSize: 'var(--typography-body-large-size-desktop)',
                  lineHeight: 'var(--typography-body-large-line-height-desktop)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {essay.content}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="mt-16 md:mt-20 lg:mt-24 p-8 md:p-12 bg-primary/5 rounded-xl md:rounded-2xl text-center border border-primary/10"
          style={{
            padding: 'var(--card-padding)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3
            className="mb-4 md:mb-6 font-heading tracking-tight"
            style={{
              fontSize: 'var(--typography-h3-size-desktop)',
              lineHeight: 'var(--typography-h3-line-height-desktop)',
              fontWeight: 'var(--typography-h3-weight)',
              color: 'var(--color-text-primary)',
            }}
          >
            Does this resonate with you?
          </h3>
          <p
            className="text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto font-body leading-relaxed"
            style={{
              fontSize: 'var(--typography-body-large-size-desktop)',
              lineHeight: 'var(--typography-body-large-line-height-desktop)',
              color: 'var(--color-text-secondary)',
            }}
          >
            If you&apos;re looking for a partner who thinks deeply about digital products and isn&apos;t afraid to challenge the status quo, let&apos;s talk.
          </p>
          <Button
            asChild
            variant="default"
            className="px-6 py-3 md:px-8 md:py-4 rounded-lg hover:opacity-90 transition-opacity font-heading"
            style={{
              fontSize: 'var(--typography-body-default-size-desktop)',
            }}
          >
            <a href="/where">
              Start a Conversation
            </a>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default WhySection
