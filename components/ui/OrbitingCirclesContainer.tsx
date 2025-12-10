'use client'

import React from 'react'
import { OrbitingCircle } from './OrbitingCircle'
import { PageContainer } from './PageContainer'
import { Palette, Target, BarChart } from 'lucide-react'

export interface OrbitingCirclesContainerProps {
  className?: string
  height?: string
}

/**
 * OrbitingCirclesContainer Component
 * Main container with double orbits (inner and outer) featuring service icons
 * Icons: Design, Strategy, Analytics
 */
export const OrbitingCirclesContainer: React.FC<OrbitingCirclesContainerProps> = ({
  className = '',
  height = '400px',
}) => {
  // If used inside another container (like Design4Hero), render just the orbiting circles
  const isNested = className.includes('!p-0') || className.includes('!bg-transparent')
  
  if (isNested) {
    return (
      <div
        className="relative flex w-full h-full items-center justify-center overflow-hidden"
        style={{ height }}
      >
          {/* Inner Orbit Path */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r={80}
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Outer Orbit Path */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r={160}
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Inner Orbit - 3 icons with radius 80px */}
          <OrbitingCircle
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            radius={80}
            delay={0}
            path={false}
          >
            <Palette className="h-6 w-6 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            radius={80}
            delay={-6.67}
            path={false}
          >
            <Target className="h-6 w-6 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            radius={80}
            delay={-13.33}
            path={false}
          >
            <BarChart className="h-6 w-6 text-primary" />
          </OrbitingCircle>

          {/* Outer Orbit - 3 icons with radius 160px (reverse direction) */}
          <OrbitingCircle
            className="h-[45px] w-[45px] border-none bg-transparent"
            radius={160}
            duration={20}
            delay={0}
            reverse
            path={false}
          >
            <Palette className="h-8 w-8 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[45px] w-[45px] border-none bg-transparent"
            radius={160}
            duration={20}
            delay={-6.67}
            reverse
            path={false}
          >
            <Target className="h-8 w-8 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[45px] w-[45px] border-none bg-transparent"
            radius={160}
            duration={20}
            delay={-13.33}
            reverse
            path={false}
          >
            <BarChart className="h-8 w-8 text-primary" />
          </OrbitingCircle>
        </div>
      )
    }

  return (
    <section
      className={`w-full ${className}`}
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
        backgroundColor: '#FFFFFF',
      }}
    >
      <PageContainer mode="visual">
        <div
          className="relative flex w-full max-w-[26rem] mx-auto items-center justify-center overflow-hidden rounded-xl border bg-background md:shadow-xl"
          style={{ height }}
        >
          {/* Inner Orbit Path */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r={80}
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Outer Orbit Path */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r={160}
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Inner Orbit - 3 icons with radius 80px */}
          <OrbitingCircle
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            radius={80}
            delay={0}
            path={false}
          >
            <Palette className="h-6 w-6 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            radius={80}
            delay={-6.67}
            path={false}
          >
            <Target className="h-6 w-6 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            radius={80}
            delay={-13.33}
            path={false}
          >
            <BarChart className="h-6 w-6 text-primary" />
          </OrbitingCircle>

          {/* Outer Orbit - 3 icons with radius 160px (reverse direction) */}
          <OrbitingCircle
            className="h-[45px] w-[45px] border-none bg-transparent"
            radius={160}
            duration={20}
            delay={0}
            reverse
            path={false}
          >
            <Palette className="h-8 w-8 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[45px] w-[45px] border-none bg-transparent"
            radius={160}
            duration={20}
            delay={-6.67}
            reverse
            path={false}
          >
            <Target className="h-8 w-8 text-primary" />
          </OrbitingCircle>

          <OrbitingCircle
            className="h-[45px] w-[45px] border-none bg-transparent"
            radius={160}
            duration={20}
            delay={-13.33}
            reverse
            path={false}
          >
            <BarChart className="h-8 w-8 text-primary" />
          </OrbitingCircle>
        </div>
      </PageContainer>
    </section>
  )
}

