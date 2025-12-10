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
          padding: '40px',
          background: 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.1), rgba(31, 41, 55, 0.05), rgba(243, 244, 246, 0.1))',
        }}
      >
        {/* Blur effects */}
        <div
          className="absolute top-0 right-0 rounded-full blur-3xl pointer-events-none"
          style={{
            width: '192px',
            height: '192px',
            backgroundColor: 'rgba(31, 41, 55, 0.1)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 rounded-full blur-3xl pointer-events-none"
          style={{
            width: '256px',
            height: '256px',
            backgroundColor: 'rgba(243, 244, 246, 0.1)',
          }}
        />

        <div className="relative z-10">
          <h3
            className="mb-4"
            style={{
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '1.3',
              color: 'var(--color-text-primary)',
            }}
          >
            Startup Acceleration Program
          </h3>
          <p
            className="leading-relaxed mb-6"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '16px',
              lineHeight: '1.75',
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
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderColor: 'hsl(var(--border))',
                  fontSize: '14px',
                  lineHeight: '1.5',
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
          padding: '40px',
        }}
      >
        <div
          className="w-16 h-16 mb-4 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
          style={{
            backgroundColor: 'rgba(31, 41, 55, 0.1)',
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
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '1.3',
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

