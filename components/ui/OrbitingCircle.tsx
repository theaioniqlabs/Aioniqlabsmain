'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface OrbitingCircleProps {
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * OrbitingCircle Component
 * Creates a circular orbiting animation for child elements
 * Based on the Svelte Orbiting Circles implementation
 */
export const OrbitingCircle: React.FC<OrbitingCircleProps> = ({
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 50,
  path = true,
  className = '',
  children,
}) => {
  return (
    <>
      {path && (
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
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}
      <div
        style={{
          '--delay': delay,
          '--duration': duration,
          '--radius': `${radius}px`,
        } as React.CSSProperties}
        className={cn(
          'absolute flex h-full w-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10',
          reverse && '[animation-direction:reverse]',
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

