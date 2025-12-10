'use client'

import React from 'react'
import { PageContainer } from './PageContainer'

export interface QuoteSectionProps {
  quote?: string
  children?: React.ReactNode
}

/**
 * Quote Section Component
 * Displays a quote with top and bottom borders
 * Matches design from UI-Design-direct-code.txt
 */
export const QuoteSection: React.FC<QuoteSectionProps> = ({
  quote = "We don't just build websites. We architect digital ecosystems that elevate brands and empower users.",
  children,
}) => {
  return (
    <div
      className="py-8 border-t border-b border-border"
      style={{
        paddingTop: 'var(--spacing-stack-gap-lg)', // 32px
        paddingBottom: 'var(--spacing-stack-gap-lg)', // 32px
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
        borderColor: 'hsl(var(--border))', // Uses --color-button-secondary-border
      }}
      role="region"
      aria-label="Company quote"
    >
      <PageContainer>
        {children || (
        <p
          className="text-muted-foreground italic text-center"
          style={{
            color: 'hsl(var(--muted-foreground))', // Uses --color-text-secondary
            fontStyle: 'italic',
            fontSize: 'var(--typography-body-subtle-size-desktop)', // 15px
            lineHeight: 'var(--typography-body-subtle-line-height-desktop)', // 22px
            fontFamily: 'var(--typography-font-family-body)',
            textAlign: 'center',
          }}
        >
          &quot;{quote}&quot;
        </p>
        )}
      </PageContainer>
    </div>
  )
}

export default QuoteSection

