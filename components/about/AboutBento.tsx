'use client'

import React from 'react'
import { FounderCard } from './FounderCard'
import { MissionCard } from './MissionCard'
import { VisionCard } from './VisionCard'
import { StatCard } from './StatCard'
import { StartupProgramCard } from './StartupProgramCard'

/**
 * About Bento Grid Section
 * Responsive bento-grid layout with Founder Story, Mission & Vision, Stats, and Startup Program
 */
export function AboutBento() {
  // Default content - can be made configurable via props later
  const founderData = {
    portraitSrc: '',
    portraitAlt: 'Founder portrait',
    headline: 'Founder Story',
    narrative:
      'Our journey began with a vision to bridge the gap between creative thinking and intelligent technology. We believe in human-first design that empowers rather than overwhelms.',
    ctaText: 'Learn more about the founder',
    ctaHref: '/who',
  }

  const missionData = {
    headline: 'Our Mission',
    bullets: [
      'Create digital products that feel effortless and work beautifully',
      'Combine strategic thinking with elegant design',
      'Empower businesses through intelligent design systems',
    ],
  }

  const visionData = {
    headline: 'Our Vision',
    bullets: [
      'A future where technology amplifies human creativity',
      'Design systems that adapt and evolve with user needs',
      'Building lasting partnerships through exceptional work',
    ],
  }

  const stats = [
    { value: '4000', label: 'Reach', supportingText: 'Global audience' },
    { value: '150+', label: 'Projects', supportingText: 'Completed successfully' },
    { value: '50+', label: 'Clients', supportingText: 'Trusted partners' },
    { value: '10+', label: 'Years', supportingText: 'Industry experience' },
  ]

  const startupProgramData = {
    title: 'Startup Program',
    bullets: [
      'Early-stage startups get premium design at accessible rates',
      'Dedicated support and mentorship throughout your journey',
      'Flexible payment plans tailored to your growth stage',
    ],
    ctaText: 'Apply to Startup Program',
    ctaHref: '#',
  }

  return (
    <section
      className="about-bento-section w-full"
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
        paddingLeft: 'var(--spacing-container-padding-desktop)',
        paddingRight: 'var(--spacing-container-padding-desktop)',
      }}
    >
      <div
        className="about-bento-grid mx-auto"
        style={{
          maxWidth: 'var(--spacing-container-max-width-xl)',
        }}
      >
        {/* Desktop Layout: Founder (60% left) + Mission/Vision (40% right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Founder Card - 60% width on desktop */}
          <div className="lg:col-span-7">
            <FounderCard {...founderData} />
          </div>

          {/* Mission & Vision - 40% width on desktop, stacked */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <MissionCard {...missionData} />
            <VisionCard {...visionData} />
          </div>
        </div>

        {/* Stats Grid - 2x2 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Startup Program - Full width */}
        <div className="w-full">
          <StartupProgramCard {...startupProgramData} />
        </div>
      </div>
    </section>
  )
}

