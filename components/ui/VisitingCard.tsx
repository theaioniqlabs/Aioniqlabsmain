'use client'

import React from 'react'
import { PageContainer } from './PageContainer'
import { Globe, MapPin, Phone } from 'lucide-react'

/**
 * VisitingCard Component - Design 14.1
 * A two-column visiting card with dark left side and light right side
 * Displays AIONIQ Labs branding and contact information
 */
export const VisitingCard: React.FC = () => {
  return (
    <section
      className="w-full"
      style={{
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
      }}
    >
      <PageContainer>
        <div className="relative bg-background rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] min-h-[400px]">
            {/* Left Column - Dark Gradient */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black p-12 flex flex-col items-center justify-center overflow-hidden">
              {/* Diagonal Stripe Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.3) 10px, rgba(0, 0, 0, 0.3) 20px)',
                }}
              ></div>

              {/* Red Logo */}
              <div className="relative z-10 mb-8">
                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-red-600 dark:border-red-500 rotate-45 rounded-xl"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-red-600 dark:bg-red-500 rotate-45 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Heading and Subtitle */}
              <div className="relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl tracking-wider text-red-600 dark:text-red-500 mb-2 font-heading">
                  AIONIQ LABS
                </h2>
                <p className="text-sm text-white/70 tracking-wide font-body">
                  Intelligent Systems Studio
                </p>
              </div>

              {/* Blur Effect at Bottom */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right Column - Light Card */}
            <div className="relative bg-card p-12 flex flex-col justify-center">
              {/* Red Vertical Gradient Bar */}
              <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-b from-red-600 to-red-700"></div>

              {/* Name and Title */}
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl mb-2 font-heading">
                  <span className="text-foreground">YOUR </span>
                  <span className="text-red-600 dark:text-red-500">NAME</span>
                </h1>
                <p className="text-lg text-muted-foreground font-body">Founder & Creative Director</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Website and Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-foreground font-body">www.aioniq.com</p>
                    <p className="text-foreground font-body">hello@aioniq.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-foreground font-body">Innovation District, Street #42</p>
                    <p className="text-foreground font-body">San Francisco, CA 94103</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-foreground font-body">Phone +1 (415) 123 4567</p>
                    <p className="text-foreground font-body">Mobile +1 (415) 890 1234</p>
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

export default VisitingCard
