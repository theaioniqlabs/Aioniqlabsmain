'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Globe, MapPin, Phone } from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'

// CardSlider Component - Sliding carousel for mobile, side-by-side for desktop
const CardSlider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cards = React.Children.toArray(children)
  const autoPlayInterval = 4000 // 4 seconds for slow auto-slide

  // Auto-play functionality
  useEffect(() => {
    if (cards.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [cards.length, isPaused])

  // Resume auto-play after pause
  useEffect(() => {
    if (!isPaused) return

    const timer = setTimeout(() => {
      setIsPaused(false)
    }, 8000) // Resume after 8 seconds

    return () => clearTimeout(timer)
  }, [isPaused])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setIsPaused(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const diff = currentX - dragStartX
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const threshold = 50 // Minimum swipe distance
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (dragOffset < 0 && currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setIsPaused(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const currentX = e.clientX
    const diff = currentX - dragStartX
    setDragOffset(diff)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const threshold = 50
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (dragOffset < 0 && currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
  }

  // Calculate transform
  const transformX = -(currentIndex * 100) + (dragOffset / (containerRef.current?.offsetWidth || 1)) * 100

  return (
    <div className="lg:col-span-2">
      {/* Desktop: Side by side */}
      <div className="hidden lg:flex lg:flex-row" style={{ gap: 'var(--spacing-5)' }}>
        {cards}
      </div>

      {/* Mobile/Tablet: Sliding carousel */}
      <div
        ref={containerRef}
        className="lg:hidden relative w-full overflow-hidden"
        style={{
          borderRadius: 'var(--radii-card-default)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex w-full"
          style={{
            transform: `translateX(${transformX}%)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="min-w-full flex-shrink-0">
              {card}
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        {cards.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {cards.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setCurrentIndex(index)
                  setIsPaused(true)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * TeamGrid Component - Design 10
 * Bento-style grid layout with team content, decorative elements, and CTAs
 * Responsive: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
 */
export const TeamGrid: React.FC = () => {
  return (
    <section
      className="w-full"
      style={{
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
      }}
    >
      <PageContainer mode="visual">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--spacing-5)' }}>
          {/* Card 1: Hero Card - "Teams Together" (2x2 on desktop) */}
          <div className="lg:row-span-2 lg:col-span-2 bg-black text-white p-10 md:p-12 flex flex-col justify-between" style={{ minHeight: 'var(--spacing-image-height-team)', borderRadius: 'var(--radii-card-default)' }}>
            <div>
              <p className="text-sm opacity-80 mb-6">Teams Together</p>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
                A Human-first Intelligent Design Systems
              </h2>
              <p className="text-sm opacity-70 mb-8 max-w-xs">
                Teams, systems, and ideas aligned to build what matters.
              </p>
            </div>
          </div>

          {/* Card 2: Video */}
          <div className="lg:col-span-2 relative overflow-hidden" style={{ backgroundColor: 'var(--color-gray-lighter)', minHeight: 'var(--spacing-image-height-card-lg)', borderRadius: 'var(--radii-card-default)' }}>
            <video
              src="/assets/Video/Final Render.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          {/* Cards 3 & 4: Sliding carousel on mobile, side-by-side on desktop */}
          <CardSlider>
            {/* Card 3: Black Card */}
            <div className="lg:flex-1 bg-black text-white p-8 flex flex-col justify-end group hover:opacity-90 transition-all duration-200 cursor-pointer" style={{ minHeight: 'var(--spacing-image-height-hero)', borderRadius: 'var(--radii-card-default)' }}>
              <div className="flex justify-end">
                <ArrowUpRight
                  className="w-5 h-5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Card 4: Team Profile Card - Sarah Mitchell */}
            <div className="lg:flex-1 bg-black text-white p-8 flex flex-col justify-between group hover:opacity-90 transition-all duration-200 cursor-pointer" style={{ minHeight: 'var(--spacing-image-height-hero)', borderRadius: 'var(--radii-card-default)' }}>
              <div>
                <p className="text-sm opacity-70 mb-6">
                  Our <span className="text-orange-400">Team</span>
                </p>
                <h3 className="text-2xl mb-2">Sarah Mitchell</h3>
                <p className="text-sm opacity-80">UX Designer</p>
              </div>
              <div className="flex justify-end">
                <ArrowUpRight
                  className="w-5 h-5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150"
                  aria-hidden="true"
                />
              </div>
            </div>
          </CardSlider>

          {/* Card 6: AIONIQ Services Card - Design 11 */}
          <div className="lg:col-span-2 p-6 flex flex-col justify-between group hover:opacity-90 transition-all duration-200" style={{ backgroundColor: 'var(--color-gray-lightest)', minHeight: 'var(--spacing-image-height-card-lg)', borderRadius: 'var(--radii-card-default)' }}>
            <div>
              <h4 className="mb-4 text-black" style={{ fontSize: 'var(--typography-h4-size-desktop)', fontWeight: 'var(--typography-h4-weight)' }}>
                AIONIQ Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {['AI Systems', 'Automations', 'UI/UX', 'Branding', 'Web Development', 'Consulting', 'Digital Products', 'Content Creation', 'Growth Marketing', 'Video Production', 'Creative Tech', 'Print Media', 'Advertisements'].map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors duration-150 cursor-pointer"
                    style={{
                      borderColor: 'transparent',
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                <span>Explore Services</span>
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Card 7: Visiting Card - Design 14.1 */}
          <div className="lg:col-span-2 relative bg-background overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-200" style={{ minHeight: 'var(--spacing-image-height-hero)', borderRadius: 'var(--radii-card-default)' }}>
            <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] h-full" style={{ minHeight: 'var(--spacing-image-height-hero)' }}>
              {/* Left Column - Dark Gradient */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: 'var(--spacing-image-height-card)' }}>
                {/* Diagonal Stripe Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      `repeating-linear-gradient(45deg, transparent, transparent var(--gradient-pattern-spacing), var(--color-text-primary-30) var(--gradient-pattern-spacing), var(--color-text-primary-30) var(--gradient-pattern-spacing-double))`,
                  }}
                ></div>

                {/* Heading and Subtitle */}
                <div className="relative z-10 text-center px-2">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider text-red-600 dark:text-red-500 mb-1 sm:mb-1.5 md:mb-2 font-heading">
                    AIONIQ LABS
                  </h2>
                  <p className="text-xs sm:text-sm md:text-sm text-white/70 tracking-wide font-body">
                    Intelligent Systems Studio
                  </p>
                </div>

                {/* Blur Effect at Bottom */}
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-red-600/10 rounded-full blur-3xl"></div>
              </div>

              {/* Right Column - Light Card */}
              <div className="relative bg-card p-6 sm:p-8 md:p-10 flex flex-col justify-center" style={{ minHeight: 'var(--spacing-image-height-hero)' }}>
                {/* Red Vertical Gradient Bar */}
                <div className="absolute top-0 right-0 w-1.5 sm:w-2 md:w-3 h-full bg-gradient-to-b from-red-600 to-red-700"></div>

                {/* Contact Information */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5">
                  {/* Email */}
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-sm text-foreground font-body break-words">hello@aioniq.com</p>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm md:text-sm text-foreground font-body break-words">Innovation District, Street #42</p>
                      <p className="text-xs sm:text-sm md:text-sm text-foreground font-body break-words">San Francisco, CA 94103</p>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-sm text-foreground font-body break-words">Mobile +1 (415) 890 1234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

