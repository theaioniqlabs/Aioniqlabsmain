'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'
import { MagicTextReveal } from '@/components/ui/magic-text-reveal'

/**
 * TestimonialsToolsSection Component - Design 16
 * Card Hero section with testimonials, software tools showcase, and experience stats.
 * Uses design tokens for spacing, typography, colors, and radii.
 */
export const TestimonialsToolsSection: React.FC = () => {
  // Responsive fontSize for MagicTextReveal (20% smaller)
  const [fontSize, setFontSize] = useState(35) // 44 * 0.8 = 35.2, rounded to 35
  
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 640) {
        setFontSize(26) // 32 * 0.8 = 25.6, rounded to 26
      } else if (window.innerWidth < 1024) {
        setFontSize(30) // 38 * 0.8 = 30.4, rounded to 30
      } else {
        setFontSize(35) // 44 * 0.8 = 35.2, rounded to 35
      }
    }
    
    updateFontSize()
    window.addEventListener('resize', updateFontSize)
    return () => window.removeEventListener('resize', updateFontSize)
  }, [])
  
  // Social media icons for tools grid
  const socialIcons = [
    { src: '/assets/Social Icons/aioniq linkedin.svg', alt: 'LinkedIn', href: '#' },
    { src: '/assets/Social Icons/aioniq facebook.svg', alt: 'Facebook', href: '#' },
    { src: '/assets/Social Icons/img_6625065aaabd00c_white_a700_24x24.svg', alt: 'Social', href: '#' },
    { src: '/assets/Social Icons/img_clip_path_group_black_900_24x24.svg', alt: 'Social', href: '#' },
  ]

  return (
    <section className="w-full mt-4">
      <PageContainer mode="visual">
        {/* Main 3-column grid - responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Card 1: Testimonial - Split 40/60 */}
          <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-4 sm:gap-6 lg:gap-8">
            {/* Top 40% - All content */}
            <div className="bg-secondary border border-border rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 lg:p-8 flex-[0.4]">
              <h3 className="font-medium text-xl sm:text-2xl lg:text-3xl text-foreground mb-3 sm:mb-4">
                What Clients say
              </h3>
              <p className="font-normal italic text-foreground/50 text-sm sm:text-base leading-6 sm:leading-7">
                Working with Jacob was transformative. He delivered an exceptional design and offered valuable suggestions. Highly recommend!
              </p>
            </div>
            
            {/* Bottom 60% - Magic Text Reveal */}
            <div className="bg-card dark:bg-black border border-border rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 lg:p-8 flex-[0.6] flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
              <MagicTextReveal
                text="Startups Build"
                color="hsl(var(--foreground))"
                fontSize={fontSize}
                fontFamily="var(--typography-font-family-heading)"
                fontWeight={600}
                spread={30}
                speed={0.5}
                density={4}
                resetOnMouseLeave={true}
                className="w-full h-full"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  backdropFilter: 'none',
                }}
              />
            </div>
          </div>

          {/* Card 2: AIONIQ Services */}
          <div className="md:col-span-1 lg:col-span-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-between group hover:opacity-90 transition-all duration-200 bg-card border border-border" style={{ minHeight: 'var(--spacing-image-height-card-lg)', borderRadius: 'var(--radii-card-default)' }}>
            <div>
              <h4 className="mb-3 sm:mb-4 text-card-foreground text-lg sm:text-xl lg:text-2xl font-medium">
                AIONIQ Services
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['AI Systems', 'Automation', 'Human-Centered AI', 'Design Systems', 'UI/UX Design', 'Brand Identity', 'Digital Products', 'Web Development', 'Full-Stack Engineering', 'Product Strategy', 'AI Integrations', 'Internal Tools', 'Dashboards', 'Workflow Optimization', 'Rapid Prototyping', 'Creative Technology', 'SaaS', 'Startups', 'Enterprise', 'AI & Deep Tech', 'Fintech', 'HealthTech', 'E-commerce', 'Growth Marketing'].map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center justify-center rounded-md border border-border px-1.5 sm:px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-[10px] sm:text-xs bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors duration-150 cursor-pointer"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-end">
              <button className="text-xs sm:text-sm text-white hover:underline flex items-center gap-1">
                <span>Explore Services</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Card 3: Tools Grid + Stats */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Tools Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {socialIcons.map((icon, index) => (
                <div
                  key={index}
                  className="bg-secondary border border-border rounded-[12px] sm:rounded-[16px] p-3 sm:p-4 lg:p-6 flex items-center justify-center"
                >
                  <Link href={icon.href} className="w-6 h-6 flex items-center justify-center">
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-6 h-6 dark:brightness-0 dark:invert brightness-0"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Stats Card */}
            <div className="bg-secondary border border-border rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 lg:p-8 relative overflow-hidden min-h-[200px] sm:h-[250px] lg:h-[278px]">
              <h2 className="font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[100px] text-foreground leading-tight">
                12+
              </h2>
              <div className="border-l-2 border-orange-600 dark:border-orange-500 pl-3 sm:pl-4 mt-2">
                <p className="font-medium text-sm sm:text-base text-foreground leading-5 sm:leading-6">
                  YEARS OF DESIGN
                  <br />
                  EXPERIENCE
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

export default TestimonialsToolsSection
