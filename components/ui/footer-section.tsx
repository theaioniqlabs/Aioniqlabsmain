'use client'
import React, { useEffect, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react'
import { PageContainer } from '@/components/ui/PageContainer'

// Use framer-motion for animations
import { motion } from 'framer-motion'

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

interface FooterProps {
  sections?: FooterSection[]
  companyName?: string
  logo?: React.ReactNode
  className?: string
}

const defaultFooterLinks: FooterSection[] = [
  {
    label: 'Product',
    links: [
      { title: 'Features', href: '#features' },
      { title: 'Pricing', href: '#pricing' },
      { title: 'Testimonials', href: '#testimonials' },
      { title: 'Integration', href: '/' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'FAQs', href: '/faqs' },
      { title: 'About Us', href: '/about' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Services', href: '/terms' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Blog', href: '/blog' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Brand', href: '/brand' },
      { title: 'Help', href: '/help' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'Facebook', href: '#', icon: FacebookIcon },
      { title: 'Instagram', href: '#', icon: InstagramIcon },
      { title: 'Youtube', href: '#', icon: YoutubeIcon },
      { title: 'LinkedIn', href: '#', icon: LinkedinIcon },
    ],
  },
]

export function Footer({
  sections = defaultFooterLinks,
  companyName = 'AiONIQ Labs',
  logo,
  className = '',
}: FooterProps) {
  return (
    <footer
      className={`relative w-full flex flex-col items-center justify-center border-t ${className}`}
      style={{
        borderRadius: 'var(--radii-card-default) var(--radii-card-default) 0 0',
        borderTopColor: 'var(--color-button-secondary-border)',
        backgroundColor: 'var(--color-background-primary)',
        paddingTop: 'var(--spacing-section-vertical-desktop)',
        paddingBottom: 'var(--spacing-section-vertical-desktop)',
        background: 'radial-gradient(35% 128px at 50% 0%, var(--color-text-inverse-08), transparent)',
        minHeight: '300px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Top border accent line */}
      <div
        className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur"
        style={{
          backgroundColor: 'var(--color-button-secondary-border)',
          opacity: 0.2,
        }}
      />

      <PageContainer>
        <div
          className="grid w-full"
          style={{
            gap: 'var(--spacing-stack-gap-md)',
          }}
        >
          <div className="grid w-full xl:grid-cols-3" style={{ gap: 'var(--spacing-stack-gap-md)' }}>
            <AnimatedContainer
              className="space-y-4"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-stack-gap-sm)',
              }}
            >
              {logo || <FrameIcon className="size-8" style={{ color: 'var(--color-text-primary)' }} />}
              <p
                className="font-body"
                style={{
                  marginTop: 'var(--spacing-stack-gap-md)',
                  fontSize: 'var(--typography-body-small-size-desktop)',
                  lineHeight: 'var(--typography-body-small-line-height)',
                  fontWeight: 'var(--typography-body-small-weight)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                © {new Date().getFullYear()} {companyName}. All rights reserved.
              </p>
            </AnimatedContainer>

            <div
              className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0"
              style={{
                gap: 'var(--spacing-stack-gap-md)',
              }}
            >
              {sections.map((section, index) => (
                <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                  <div
                    style={{
                      marginBottom: 'var(--spacing-stack-gap-md)',
                    }}
                  >
                    <h3
                      className="font-body"
                      style={{
                        fontSize: 'var(--typography-caption-size)',
                        lineHeight: 'var(--typography-caption-line-height)',
                        fontWeight: 'var(--typography-caption-weight)',
                        color: 'var(--color-text-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {section.label}
                    </h3>
                    <ul
                      className="mt-4 space-y-2"
                      style={{
                        marginTop: 'var(--spacing-stack-gap-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-stack-gap-xs)',
                      }}
                    >
                      {section.links.map((link) => {
                        const Icon = link.icon
                        return (
                          <li key={link.title}>
                            <a
                              href={link.href}
                              className="inline-flex items-center transition-all duration-300 font-body"
                              style={{
                                fontSize: 'var(--typography-body-small-size-desktop)',
                                lineHeight: 'var(--typography-body-small-line-height)',
                                fontWeight: 'var(--typography-body-small-weight)',
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--color-text-primary)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--color-text-secondary)'
                              }}
                            >
                              {Icon && (
                                <span style={{ marginRight: 'var(--spacing-stack-gap-xs)', display: 'inline-flex', width: 'var(--icon-size-small)', height: 'var(--icon-size-small)' }}>
                                  <Icon className="w-4 h-4" />
                                </span>
                              )}
                              {link.title}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: string
  children: ReactNode
  style?: React.CSSProperties
}

function AnimatedContainer({ className, delay = 0.1, children, style }: ViewAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference using media query
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setShouldReduceMotion(mediaQuery.matches)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [shouldReduceMotion])

  // Use framer-motion for animations if reduced motion is not preferred
  if (!shouldReduceMotion) {
    return (
      <motion.div
        initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
        whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    )
  }

  // Fallback: CSS animations or reduced motion
  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  // Fallback: CSS animations
  const animationStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : 'blur(4px)',
    transform: isVisible ? 'translateY(0)' : 'translateY(-8px)',
    transition: `opacity 0.8s ease ${delay}s, filter 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  }

  return (
    <div ref={containerRef} className={className} style={animationStyle}>
      {children}
    </div>
  )
}

