import React from 'react'
import Image from 'next/image'

export type IconType = 'hamburger' | 'close' | 'arrow'

interface IconProps {
  type: IconType
  size?: 'default' | 'small'
  className?: string
  'aria-label'?: string
}

/**
 * Tokenized Icon component
 * Supports hamburger, close, and arrow icons
 */
export const Icon: React.FC<IconProps> = ({
  type,
  size = 'default',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const iconSize = size === 'default' ? 24 : 12
  const iconPath = `/assets/icons/${type}.svg`
  const defaultAriaLabel =
    type === 'hamburger'
      ? 'Open menu'
      : type === 'close'
        ? 'Close menu'
        : 'Arrow'

  // Fallback SVG icons if image fails to load
  const fallbackIcons: Record<IconType, React.ReactElement> = {
    hamburger: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    arrow: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  }

  const [useFallback, setUseFallback] = React.useState(false)

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: `var(--icon-size-${size})`,
        height: `var(--icon-size-${size})`,
        color: 'rgba(0, 0, 0, 0.8)',
      }}
      aria-hidden="true"
    >
      {useFallback ? (
        fallbackIcons[type]
      ) : (
      <Image
        src={iconPath}
        alt=""
        width={iconSize}
        height={iconSize}
        style={{
          opacity: 0.8,
          filter: 'brightness(0)',
        }}
          onError={() => {
            setUseFallback(true)
        }}
      />
      )}
    </span>
  )
}

