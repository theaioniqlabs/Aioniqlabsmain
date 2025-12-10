'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface TiltProps {
  children: React.ReactNode
  className?: string
  maxRotate?: number
  disabled?: boolean
}

/**
 * Lightweight tilt effect component
 * Respects prefers-reduced-motion
 * Max rotation: 3-5deg (subtle)
 */
export function Tilt({ children, className = '', maxRotate = 5, disabled = false }: TiltProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (disabled || reducedMotion || !elementRef.current) return

    const element = elementRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxRotate
      const rotateY = ((x - centerX) / centerX) * maxRotate

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.1,
        ease: 'power2.out',
        transformPerspective: 1000,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [disabled, reducedMotion, maxRotate])

  return (
    <div ref={elementRef} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

