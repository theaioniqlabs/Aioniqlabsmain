import React from 'react'

interface StatCardProps {
  value: string | number
  label: string
  supportingText?: string
  className?: string
}

/**
 * Reusable metric card component
 * Displays large numeric value with label and optional supporting text
 */
export function StatCard({ value, label, supportingText, className = '' }: StatCardProps) {
  return (
    <article className={`card-item ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="text-h2 font-heading" style={{ fontSize: '48px', lineHeight: '56px' }}>
          {value}
        </div>
        <div className="text-body-small font-body" style={{ color: 'var(--color-text-secondary)' }}>{label}</div>
        {supportingText && (
          <div className="text-caption font-body" style={{ color: 'var(--color-text-tertiary)' }}>{supportingText}</div>
        )}
      </div>
    </article>
  )
}

