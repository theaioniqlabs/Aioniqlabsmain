'use client'

import React from 'react'
import { Tilt } from '@/components/ui/Tilt'

interface VisionCardProps {
  headline: string
  bullets: string[]
  className?: string
}

/**
 * Vision card component
 * Equal width with Mission card (40% each on desktop)
 */
export function VisionCard({ headline, bullets, className = '' }: VisionCardProps) {
  return (
    <Tilt maxRotate={3} className={`card-item ${className}`}>
      <article className="flex flex-col gap-4 h-full" style={{ background: 'var(--color-background-secondary)' }}>
        <h3 className="text-h3 font-heading">{headline}</h3>
        <ul className="flex flex-col gap-3 list-none">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-body font-body flex items-start gap-2">
              <span className="mt-1" style={{ color: 'var(--color-brand-primary)' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </article>
    </Tilt>
  )
}

