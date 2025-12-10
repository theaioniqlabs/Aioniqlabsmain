'use client'

import React from 'react'

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Global Clients' },
  { value: '100K+', label: 'Active Users' },
]

export function StatsGrid() {
  return (
    <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-2xl text-center"
          style={{
            padding: '32px',
          }}
        >
          <div
            className="mb-2"
            style={{
              fontSize: '48px',
              lineHeight: '1.2',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
            }}
          >
            {stat.value}
          </div>
          <p
            className="text-sm"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

