'use client'

import React from 'react'

export function AboutHero() {
  return (
    <div
      className="relative mb-20 rounded-3xl overflow-hidden"
      style={{
        padding: 'var(--spacing-stack-gap-xl) var(--spacing-stack-gap-2xl)', // 48px 64px
        background: 'linear-gradient(to bottom right, var(--color-brand-primary-05), var(--color-background-primary), var(--color-background-tertiary-10))',
      }}
    >
      {/* Blur effects */}
      <div
        className="absolute top-0 right-0 rounded-full blur-3xl pointer-events-none"
        style={{
          width: '256px',
          height: '256px',
          backgroundColor: 'var(--color-brand-primary-05)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 rounded-full blur-3xl pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          backgroundColor: 'var(--color-background-tertiary-10)',
        }}
      />
      
      <div className="relative z-10" style={{ maxWidth: 'var(--spacing-container-max-width-md)' }}>
        <h2
          className="mb-4 tracking-tight"
          style={{
            fontSize: 'clamp(var(--typography-h2-subtle-size-mobile), 5vw, var(--typography-h2-subtle-size-desktop))', // 30px-48px responsive
            lineHeight: 'var(--typography-h2-subtle-line-height-desktop)', // 1.2 equivalent
            fontWeight: '700',
            color: 'var(--color-text-primary)',
          }}
        >
          About AIONIQ Labs
        </h2>
        <p
          className="text-xl"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--typography-body-large-size-desktop)', // 18px, closest to 20px
            lineHeight: 'var(--typography-body-large-line-height-desktop)', // 28px/18px ≈ 1.56
          }}
        >
          Where design systems meet intelligent engineering.
        </p>
      </div>
    </div>
  )
}

