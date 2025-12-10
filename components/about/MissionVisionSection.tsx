'use client'

import React from 'react'
import Image from 'next/image'

export function MissionVisionSection() {
  return (
    <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Mission Card */}
      <div
        className="bg-card border border-border rounded-2xl"
        style={{
          padding: 'var(--spacing-container-padding-tablet)',
        }}
      >
        <h3
          className="mb-4"
          style={{
            fontSize: 'var(--typography-h3-size-desktop)', // 24px
            fontWeight: 'var(--typography-h3-weight)',
            lineHeight: 'var(--typography-h3-line-height-desktop)',
            color: 'var(--color-text-primary)',
          }}
        >
          Our Mission
        </h3>
        <p
          className="leading-relaxed"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--typography-body-default-size-desktop)',
            lineHeight: 'var(--typography-body-default-line-height)',
          }}
        >
          To empower innovators with intelligent design systems that scale. We craft digital ecosystems that feel effortless, perform beautifully, and stand the test of time.
        </p>
      </div>

      {/* Vision Card with Background Image */}
      <div className="relative bg-card border border-border rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://via.placeholder.com/1080x810/EEF0F2/E5E7EB?text=Vision"
            alt="Vision"
            fill
            className="object-cover opacity-30"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div
          className="relative z-10"
          style={{
            padding: 'var(--spacing-container-padding-tablet)',
          }}
        >
          <h3
            className="mb-4"
            style={{
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '1.3',
              color: 'var(--color-text-primary)',
            }}
          >
            Our Vision
          </h3>
          <p
            className="leading-relaxed"
            style={{
              fontSize: '16px',
              lineHeight: '1.75',
              color: 'var(--color-text-primary)',
            }}
          >
            A future where technology and design merge seamlessly—where every interface feels intuitive, every system feels alive, and innovation is accessible to all.
          </p>
        </div>
      </div>
    </div>
  )
}

