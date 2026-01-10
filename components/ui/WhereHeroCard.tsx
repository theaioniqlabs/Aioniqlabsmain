import React from 'react'
import Link from 'next/link'
import { PageContainer } from '@/components/ui/PageContainer'

/**
 * WhereHeroCard Component - Design 15
 * Card Hero section with "Where" heading, "Product design meets perfection" subheading,
 * decorative element, CTA button, and video content.
 * Uses design tokens for spacing, typography, colors, and radii.
 */
export const WhereHeroCard: React.FC = () => {
  return (
    <section className="w-full mt-4">
      <PageContainer mode="visual">
        <div className="bg-secondary rounded-[20px] p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Column: Typography and CTA */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              <div className="relative">
                <h1 className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight text-foreground">
                  A Human-first Intelligent
                </h1>
                <div className="mt-2">
                  <h2 className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight text-foreground tracking-tight">
                    Design System
                  </h2>
                </div>
                {/* Decorative Element - Conditional rendering if image exists */}
                {/* Note: If /images/img_6625065aaabd00c.svg exists, uncomment below */}
                {/* <img
                  alt="Design Element"
                  loading="lazy"
                  width={146}
                  height={54}
                  decoding="async"
                  className="absolute top-4 right-0 w-24 sm:w-32 md:w-36 h-auto"
                  src="/images/img_6625065aaabd00c.svg"
                /> */}
              </div>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90 h-10 text-xl rounded-full px-8 py-6"
              >
                Let&apos;s Connect
              </Link>
            </div>

            {/* Right Column: Video */}
            <div className="w-full lg:w-1/2 flex gap-4 sm:gap-6">
              <div className="w-full rounded-3xl overflow-hidden">
                <video
                  src="/assets/Video/Final Render.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover rounded-3xl"
                  aria-label="Product design showcase video"
                />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

export default WhereHeroCard
