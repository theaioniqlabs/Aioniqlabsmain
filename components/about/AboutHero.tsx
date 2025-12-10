'use client'

import React from 'react'

export function AboutHero() {
  return (
    <div
      className="relative mb-20 rounded-3xl overflow-hidden"
      style={{
        padding: '48px 64px', // p-12 md:p-16
        background: 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.05), var(--color-background-primary), rgba(243, 244, 246, 0.1))',
      }}
    >
      {/* Blur effects */}
      <div
        className="absolute top-0 right-0 rounded-full blur-3xl pointer-events-none"
        style={{
          width: '256px',
          height: '256px',
          backgroundColor: 'rgba(31, 41, 55, 0.05)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 rounded-full blur-3xl pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          backgroundColor: 'rgba(243, 244, 246, 0.1)',
        }}
      />
      
      <div className="relative z-10" style={{ maxWidth: '768px' }}>
        <h2
          className="mb-4 tracking-tight"
          style={{
            fontSize: 'clamp(30px, 5vw, 48px)',
            lineHeight: '1.2',
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
            fontSize: '20px',
            lineHeight: '1.5',
          }}
        >
          Where design systems meet intelligent engineering.
        </p>
      </div>
    </div>
  )
}

