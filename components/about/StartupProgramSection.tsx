'use client'

import React from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export function StartupProgramSection() {
  return (
    <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Program Card */}
      <div
        className="lg:col-span-2 relative border border-primary/20 rounded-2xl overflow-hidden"
        style={{
          padding: 'var(--spacing-container-padding-tablet)',
          background: 'linear-gradient(to bottom right, var(--color-brand-primary-10), var(--color-brand-primary-05), var(--color-background-tertiary-10))',
        }}
      >
        {/* Blur effects */}
        <div
          className="absolute top-0 right-0 rounded-full blur-3xl pointer-events-none"
          style={{
            width: '192px',
            height: '192px',
            backgroundColor: 'var(--color-brand-primary-10)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 rounded-full blur-3xl pointer-events-none"
          style={{
            width: '256px',
            height: '256px',
            backgroundColor: 'var(--color-background-tertiary-10)',
          }}
        />

        <div className="relative z-10">
          <h3
            className="mb-4"
            style={{
              fontSize: 'var(--typography-h3-size-desktop)', // 24px
              fontWeight: 'var(--typography-h3-weight)',
              lineHeight: 'var(--typography-h3-line-height-desktop)',
              color: 'var(--color-text-primary)',
            }}
          >
            Startup Acceleration Program
          </h3>
          <p
            className="leading-relaxed mb-6"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--typography-body-default-size-desktop)',
              lineHeight: 'var(--typography-body-default-line-height)',
            }}
          >
            We support early-stage founders with AI-powered product design, rapid prototyping, and system architecture guidance. Get access to our design systems, technical mentorship, and strategic consulting to accelerate your product journey.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Design Systems', 'AI Integration', 'Technical Guidance'].map((tag, index) => (
              <span
                key={index}
                className="text-sm rounded-full border"
                style={{
                  padding: 'var(--spacing-badge-padding-y) var(--spacing-badge-padding-x)',
                  backgroundColor: 'var(--color-text-inverse-50)',
                  borderColor: 'hsl(var(--border))',
                  fontSize: 'var(--typography-body-small-size-desktop)',
                  lineHeight: 'var(--typography-body-small-line-height)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Now Card */}
      <Link
        href="#"
        className="bg-card border border-border rounded-2xl flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors group"
        style={{
          padding: 'var(--spacing-container-padding-tablet)',
        }}
      >
        <div
          className="w-16 h-16 mb-4 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
          style={{
            backgroundColor: 'var(--color-brand-primary-10)',
          }}
        >
          <ExternalLink
            size={32}
            style={{
              color: 'var(--color-brand-primary)',
            }}
            aria-hidden="true"
          />
        </div>
        <h4
          className="mb-2"
          style={{
            fontSize: 'var(--typography-h4-size-desktop)', // 20px
            fontWeight: 'var(--typography-h4-weight)',
            lineHeight: 'var(--typography-h4-line-height-desktop)',
            color: 'var(--color-text-primary)',
          }}
        >
          Apply Now
        </h4>
        <p
          className="text-sm"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          Join our next cohort
        </p>
      </Link>
    </div>
  )
}

