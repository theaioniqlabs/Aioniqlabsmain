import React from 'react'

export type ContainerMode = 'marketing' | 'visual' | 'showcase' | 'app'

export interface PageContainerProps {
  children: React.ReactNode
  mode?: ContainerMode
  className?: string
  as?: keyof JSX.IntrinsicElements
  style?: React.CSSProperties
}

/**
 * PageContainer component with four container modes
 * - marketing: 1280px max-width (standard content)
 * - visual: 1440px max-width (hero sections, bento layouts)
 * - showcase: 1728px max-width (large showpiece sections)
 * - app: 1800px max-width (internal tools/dashboards)
 * 
 * All modes use:
 * - padding-inline: var(--gutter-desktop) on desktop
 * - padding-inline: var(--gutter-mobile) on mobile
 * - mx-auto centering
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  mode = 'marketing',
  className = '',
  as: Component = 'div',
  style,
}) => {
  const maxWidthMap = {
    marketing: 'var(--marketing-max)',
    visual: 'var(--visual-max)',
    showcase: 'var(--showcase-max)',
    app: 'var(--app-max)',
  }

  return (
    <Component
      className={`page-container mx-auto w-full ${className}`}
      style={{
        maxWidth: maxWidthMap[mode],
        ...style,
      }}
      data-container-mode={mode}
    >
      {children}
    </Component>
  )
}

export default PageContainer
