'use client'

import React from 'react'
import { AboutHero } from './AboutHero'
import { FounderSection } from './FounderSection'
import { MissionVisionSection } from './MissionVisionSection'
import { StatsGrid } from './StatsGrid'
import { StartupProgramSection } from './StartupProgramSection'
import { HowWeWorkSection } from './HowWeWorkSection'
import { AboutCTA } from './AboutCTA'
import { PageContainer } from '@/components/ui/PageContainer'

export function AboutSection() {
  return (
    <div
      className="w-full"
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
      }}
    >
      <PageContainer mode="marketing">
        <AboutHero />
        <FounderSection />
        <MissionVisionSection />
        <StatsGrid />
        <StartupProgramSection />
        <HowWeWorkSection />
        <AboutCTA />
      </PageContainer>
    </div>
  )
}

