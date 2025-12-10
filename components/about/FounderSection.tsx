'use client'

import React from 'react'
import Image from 'next/image'

export function FounderSection() {
  return (
    <div className="mb-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Founder Image - 3 columns */}
      <div className="lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="https://via.placeholder.com/1080x810/EEF0F2/E5E7EB?text=Founder+Portrait"
            alt="Founder"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      </div>

      {/* Story Cards - 2 columns */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div
          className="bg-card border border-border rounded-2xl flex-1"
          style={{
            padding: 'var(--card-padding)',
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
            Founder Story
          </h3>
          <p
            className="leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--typography-body-default-size-desktop)',
              lineHeight: 'var(--typography-body-default-line-height)',
            }}
          >
            Founded by a designer-engineer hybrid with a decade of experience building products at the intersection of AI and human-centered design. AIONIQ Labs emerged from a vision to bridge the gap between technical excellence and thoughtful design systems.
          </p>
        </div>

        <div
          className="border border-primary/10 rounded-2xl flex-1"
          style={{
            padding: 'var(--card-padding)',
            backgroundColor: 'var(--color-brand-primary-05)',
          }}
        >
          <h3
            className="mb-4"
            style={{
              fontSize: 'var(--typography-h3-size-desktop)', // 24px
              fontWeight: 'var(--typography-h3-weight)',
              lineHeight: 'var(--typography-h3-line-height-desktop)',
              color: 'var(--color-brand-primary)',
            }}
          >
            Human-first AI Design Philosophy
          </h3>
          <p
            className="leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--typography-body-default-size-desktop)',
              lineHeight: 'var(--typography-body-default-line-height)',
            }}
          >
            We believe AI should amplify human creativity, not replace it. Every system we build prioritizes clarity, accessibility, and intuitive interaction.
          </p>
        </div>
      </div>
    </div>
  )
}

