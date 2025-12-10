'use client'

import React from 'react'
import { Icon } from '@/components/ui/Icon'

export interface CardNavItem {
  label: string
  href: string
  active?: boolean
}

export interface CardItemProps {
  title: string
  items: CardNavItem[]
  className?: string
}

/**
 * CardItem component - represents a single card in the CardNav
 * Contains a title and list of sub-items with arrow prefixes
 */
export const CardItem: React.FC<CardItemProps> = ({
  title,
  items,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col ${className}`}
      style={{
        padding: 'var(--card-padding)', // 32px
        backgroundColor: 'var(--nav-card-bg)',
        borderRadius: 'var(--radii-card-nav)', // 16px
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          e.currentTarget.style.backgroundColor = 'var(--nav-card-hover)'
        }
      }}
      onMouseLeave={(e) => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          e.currentTarget.style.backgroundColor = 'var(--nav-card-bg)'
        }
      }}
    >
      {/* Card Title */}
      <h3
        style={{
          fontSize: 'var(--typography-nav-title-size)', // 24px
          lineHeight: 'var(--typography-nav-title-line-height)', // 32px
          fontWeight: 'var(--typography-nav-title-weight)', // 600
          color: 'var(--color-text-inverse)',
          marginBottom: 'var(--spacing-stack-gap-lg)', // 32px
        }}
      >
        {title}
      </h3>

      {/* Card Items List */}
      <ul
        className="flex flex-col"
        style={{
          gap: 'var(--spacing-stack-gap-sm)', // 16px
        }}
        role="list"
      >
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded"
              style={{
                fontSize: 'var(--typography-body-large-size-desktop)', // 18px
                lineHeight: 'var(--typography-body-large-line-height-desktop)', // 28px
                color: 'var(--color-text-inverse)',
                textDecoration: 'none',
                padding: '8px',
                transition: 'opacity 0.2s ease',
              }}
              aria-current={item.active ? 'page' : undefined}
              onMouseEnter={(e) => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  e.currentTarget.style.opacity = '0.8'
                }
              }}
              onMouseLeave={(e) => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  e.currentTarget.style.opacity = '1'
                }
              }}
            >
              <Icon type="arrow" size="small" />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

