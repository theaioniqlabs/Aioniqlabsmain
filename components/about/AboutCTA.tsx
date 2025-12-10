'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutCTA() {
  return (
    <div
      className="border border-border rounded-2xl text-center"
      style={{
        padding: '40px',
        background: 'linear-gradient(to right, rgba(31, 41, 55, 0.05), var(--color-background-primary), rgba(243, 244, 246, 0.05))',
      }}
    >
      <p
        className="text-xl mb-6 max-w-2xl mx-auto"
        style={{
          fontSize: '20px',
          lineHeight: '1.5',
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

