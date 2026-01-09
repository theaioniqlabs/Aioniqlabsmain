'use client'

import { useEffect } from 'react'
import { initIntelligenceLayer } from '@/lib/intelligence-layer'

/**
 * IntelligenceLayer Provider
 * 
 * Initializes the human-first intelligence layer on the client side.
 * All effects are additive and can be disabled via feature flags or data attributes.
 */
export function IntelligenceLayer() {
  useEffect(() => {
    // Wait for next tick to ensure DOM is fully hydrated
    let cleanup: (() => void) | null = null
    const timer = setTimeout(() => {
      cleanup = initIntelligenceLayer()
    }, 0)
    
    return () => {
      clearTimeout(timer)
      if (cleanup) {
        cleanup()
      }
    }
  }, [])

  return null // No DOM output
}
