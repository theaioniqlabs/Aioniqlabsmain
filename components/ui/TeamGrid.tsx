'use client'

import React from 'react'
import { ArrowUpRight, Globe, MapPin, Phone } from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'
import { Banner } from '@/components/ui/Banner'

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Hero Card - "Teams Together" (2x2 on desktop) */}
          <div className="lg:row-span-2 lg:col-span-2 bg-black text-white rounded-3xl p-10 md:p-12 flex flex-col justify-between min-h-[500px]">
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

          {/* Card 2: Sliding Banners */}
          <div className="lg:col-span-2 rounded-3xl min-h-[240px] relative overflow-hidden" style={{ backgroundColor: '#eaeaea' }}>
            <Banner
              images={[
                '/assets/banners/banner-ceramix.png',
                '/assets/banners/banner-metal.png',
                '/assets/banners/banner-sikkim.png',
                '/assets/banners/banner-unesco.png',
              ]}
              alt="Project banners"
              className="h-full w-full"
            />
          </div>

          {/* Cards 3 & 4: Wrapped in flex container for width adjustment */}
          <div className="lg:col-span-2 flex flex-col lg:flex-row gap-4">
            {/* Card 3: Black Card */}
            <div className="lg:flex-1 bg-black text-white rounded-3xl min-h-[280px] group hover:opacity-90 transition-all duration-300"></div>

            {/* Card 4: Team Profile Card - Sarah Mitchell */}
            <div className="lg:flex-1 bg-black text-white rounded-3xl p-8 flex flex-col justify-between min-h-[280px] group hover:opacity-90 transition-all duration-300 cursor-pointer">
              <div>
                <p className="text-sm opacity-70 mb-6">
                  Our <span className="text-orange-400">Team</span>
                </p>
                <h3 className="text-2xl mb-2">Sarah Mitchell</h3>
                <p className="text-sm opacity-80">UX Designer</p>
              </div>
              <div className="flex justify-end">
                <ArrowUpRight
                  className="w-5 h-5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Card 6: AIONIQ Services Card - Design 11 */}
          <div className="lg:col-span-2 rounded-3xl p-6 flex flex-col justify-between min-h-[240px] group hover:opacity-90 transition-all duration-300" style={{ backgroundColor: '#f2f2f2' }}>
            <div>
              <h4 className="mb-4 text-black" style={{ fontSize: 'var(--typography-h4-size-desktop)', fontWeight: 'var(--typography-h4-weight)' }}>
                AIONIQ Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {['AI Systems', 'Automations', 'UI/UX', 'Branding', 'Web Development', 'Consulting', 'Digital Products', 'Content Creation', 'Growth Marketing', 'Video Production', 'Creative Tech', 'Print Media', 'Advertisements'].map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors cursor-pointer"
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
          <div className="lg:col-span-2 relative bg-background rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 min-h-[280px] md:min-h-[320px]">
            <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] h-full min-h-[280px] md:min-h-[320px]">
              {/* Left Column - Dark Gradient */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center overflow-hidden min-h-[200px] md:min-h-auto">
                {/* Diagonal Stripe Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.3) 10px, rgba(0, 0, 0, 0.3) 20px)',
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
              <div className="relative bg-card p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[280px] md:min-h-auto">
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

