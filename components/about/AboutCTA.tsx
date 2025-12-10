'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutCTA() {
  return (
    <div
      className="border border-border rounded-2xl text-center"
      style={{
        padding: 'var(--spacing-container-padding-tablet)',
        background: 'linear-gradient(to right, var(--color-brand-primary-05), var(--color-background-primary), var(--color-background-tertiary-05))',
      }}
    >
      <p
        className="text-xl mb-6 max-w-2xl mx-auto"
        style={{
          fontSize: 'var(--typography-body-large-size-desktop)', // 18px, closest to 20px
          lineHeight: 'var(--typography-body-large-line-height-desktop)', // 28px/18px ≈ 1.56
          color: 'var(--color-text-primary)',
        }}
      >
        &quot;We build digital ecosystems, not just websites.&quot;
      </p>
      <Button
        asChild
        variant="default"
        className="inline-flex items-center gap-2"
      >
        <a href="#">
          <span>Explore AIONIQ Services</span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </Button>
    </div>
  )
}

