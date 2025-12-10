import React from 'react'
import Image from 'next/image'

export interface Avatar {
  src?: string
  alt: string
  name?: string
}

interface AvatarGroupProps {
  avatars: Avatar[]
  size?: 'default' | 'small'
  className?: string
}

/**
 * AvatarGroup component with overlapping avatars and fallback placeholders
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 'default',
  className = '',
}) => {
  const avatarSize = size === 'default' ? 48 : 40
  const avatarSizePx = `${avatarSize}px`
  const [imageErrors, setImageErrors] = React.useState<Set<number>>(new Set())

  const generateInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const generatePlaceholder = (alt: string, index: number): { color: string; isVar: boolean } => {
    // Use sampled color from screenshot for third avatar, otherwise generate based on alt
    if (index === 2) {
      return { color: '#FFDAB9', isVar: false } // Sampled from screenshot
    }
    // Generate a simple gradient based on the alt text for other avatars
    const hash = alt.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    const hue = Math.abs(hash % 360)
    return { color: `hsl(${hue}, 70%, 80%)`, isVar: false }
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index))
  }

  return (
    <div
      className={`flex items-center ${className}`}
      role="group"
      aria-label="Team members"
    >
      {avatars.map((avatar, index) => {
        const bgColorInfo = generatePlaceholder(avatar.alt, index)
        const initials = avatar.name ? generateInitials(avatar.name) : avatar.alt[0]?.toUpperCase() || '?'

        return (
          <div
            key={index}
            className="relative rounded-full border-2 border-white bg-gray-200 overflow-hidden"
            style={{
              width: avatarSizePx,
              height: avatarSizePx,
              marginLeft: index > 0 ? 'var(--spacing-avatar-gap)' : '0', // -12px overlap
              zIndex: avatars.length - index,
            }}
            role="img"
            aria-label={avatar.alt}
          >
            {avatar.src && !imageErrors.has(index) ? (
              <Image
                src={avatar.src}
                alt=""
                width={avatarSize}
                height={avatarSize}
                className="object-cover"
                onError={() => handleImageError(index)}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: bgColorInfo.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A1A1A',
                  fontWeight: 600,
                  fontSize: `${avatarSize * 0.4}px`,
                }}
              >
                {initials}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

