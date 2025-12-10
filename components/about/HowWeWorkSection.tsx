'use client'

import React from 'react'
import { Search, Layers, Cpu } from 'lucide-react'

const services = [
  {
    icon: Search,
    title: 'Research & Strategy',
    description: "Deep discovery sessions, user research, competitive analysis, and strategic planning to ensure we're solving the right problems.",
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Building scalable, maintainable design systems with comprehensive component libraries and documentation.',
  },
  {
    icon: Cpu,
    title: 'AI Engineering',
    description: 'Integrating intelligent features, machine learning models, and automation that enhances user experience without complexity.',
  },
]

export function HowWeWorkSection() {
  return (
    <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <div
            key={index}
            className="bg-card border border-border rounded-2xl hover:border-primary/20 transition-colors"
            style={{
              padding: '32px',
            }}
          >
            <div
              className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: 'rgba(31, 41, 55, 0.1)',
              }}
            >
              <Icon
                size={24}
                style={{
                  color: 'var(--color-brand-primary)',
                }}
                aria-hidden="true"
              />
            </div>
            <h4
              className="mb-3"
              style={{
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '1.3',
                color: 'var(--color-text-primary)',
              }}
            >
              {service.title}
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.75',
              }}
            >
              {service.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

