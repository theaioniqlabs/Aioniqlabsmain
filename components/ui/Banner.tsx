'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

export interface BannerProps {
  images: string[]
  alt: string
  className?: string
  priority?: boolean
  autoPlayInterval?: number // in milliseconds, default 5000
}

/**
 * Sliding Banner component - Auto-playing carousel with horizontal slide transitions
 * Used above hero section, cycles through multiple images
 * Respects prefers-reduced-motion (disables auto-play if reduced motion is preferred)
 * Supports mouse drag and touch swipe for manual navigation
 */
export const Banner: React.FC<BannerProps> = ({
  images,
  alt,
  className = '',
  priority = false,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOffsetRef = useRef(0) // Ref to track current drag offset for useEffect

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Auto-play functionality (pauses when user manually navigates)
  useEffect(() => {
    if (prefersReducedMotion || images.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [images.length, autoPlayInterval, prefersReducedMotion, isPaused])

  // Resume auto-play after pause period
  useEffect(() => {
    if (!isPaused) return

    const timer = setTimeout(() => {
      setIsPaused(false)
    }, 10000) // Resume after 10 seconds

    return () => clearTimeout(timer)
  }, [isPaused])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (images.length <= 1) return
    e.preventDefault()
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragOffset(0)
  }

  // Global mouse move handler (attached to document for better drag experience)
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const offset = e.clientX - dragStartX
      dragOffsetRef.current = offset
      setDragOffset(offset)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return
      
      const threshold = 50 // Minimum drag distance to trigger navigation
      const dragDistance = Math.abs(dragOffsetRef.current)
      
      if (dragDistance > threshold) {
        if (dragOffsetRef.current > 0) {
          // Dragged right - go to previous
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        } else {
          // Dragged left - go to next
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }
        setIsPaused(true) // Pause auto-play
      }
      
      setIsDragging(false)
      setDragOffset(0)
      dragOffsetRef.current = 0
    }

    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStartX, images.length])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault() // Prevent page scrolling during swipe
    const offset = e.touches[0].clientX - dragStartX
    setDragOffset(offset)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const threshold = 50 // Minimum swipe distance to trigger navigation
    const swipeDistance = Math.abs(dragOffset)
    
    if (swipeDistance > threshold) {
      if (dragOffset > 0) {
        // Swiped right - go to previous
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      } else {
        // Swiped left - go to next
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }
      setIsPaused(true) // Pause auto-play
    }
    
    setIsDragging(false)
    setDragOffset(0)
  }

  const renderImage = useCallback(
    (imageSrc: string, index: number) => {
      // Handle placeholder (gray solid color)
      if (imageSrc === 'placeholder') {
        return (
          <div
            key={`placeholder-${index}`}
            className="relative flex-shrink-0 w-full h-full"
            style={{
              backgroundColor: '#9CA3AF', // gray-400
              minWidth: '100%',
            }}
            aria-hidden={index !== currentIndex}
          />
        )
      }

      return (
        <div
          key={imageSrc}
          className="relative flex-shrink-0 w-full h-full"
          style={{ minWidth: '100%' }}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={imageSrc}
            alt={`${alt} - Slide ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1120px"
            className="object-cover"
            priority={priority && index === 0}
          />
        </div>
      )
    },
    [alt, currentIndex, priority]
  )

  // Calculate transform with drag offset (convert pixels to percentage)
  const containerWidth = containerRef.current?.offsetWidth || 1
  const transformX = -currentIndex * 100 + (dragOffset / containerWidth) * 100

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        borderRadius: 'inherit', // Inherit border radius from parent card
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      aria-label={`${alt} - Carousel with ${images.length} images`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(${transformX}%)`,
          transition: prefersReducedMotion || isDragging
            ? 'none'
            : 'transform 0.5s ease-in-out',
        }}
      >
        {images.map((imageSrc, index) => renderImage(imageSrc, index))}
      </div>

      {/* Navigation dots */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
          role="tablist"
          aria-label="Banner navigation"
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              onClick={() => {
                setCurrentIndex(index)
                setIsPaused(true) // Pause auto-play on manual navigation
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              style={{
                transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

