'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PageContainer } from './PageContainer'

// --- Data for the image accordion ---
interface AccordionItemData {
  id: number
  title: string
  imageUrl: string
}

const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Voice Assistant',
    imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'AI Image Generation',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'AI Chatbot + Local RAG',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'AI Agent',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Visual Understanding',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
  },
]

// --- Accordion Item Component ---
interface AccordionItemProps {
  item: AccordionItemData
  isActive: boolean
  onMouseEnter: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative h-[450px] overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      style={{
        borderRadius: 'var(--radii-banner-default)', // 16px
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 60px, (max-width: 1024px) 200px, 400px"
          className="object-cover"
          style={{
            borderRadius: 'var(--radii-banner-default)',
          }}
        />
      </div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" style={{
        borderRadius: 'var(--radii-banner-default)',
      }}></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-heading whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0' // Active state: horizontal, bottom-center
              // Inactive state: vertical, positioned at the bottom, for all screen sizes
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
        style={{
          fontSize: isActive ? 'var(--typography-h3-subtle-size-desktop)' : 'var(--typography-body-subtle-size-desktop)',
          fontWeight: isActive ? 'var(--typography-h3-subtle-weight)' : 'var(--typography-body-subtle-weight)',
          lineHeight: isActive ? 'var(--typography-h3-subtle-line-height-desktop)' : 'var(--typography-body-subtle-line-height-desktop)',
        }}
      >
        {item.title}
      </span>
    </div>
  )
}

// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(4)

  const handleItemHover = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="bg-white font-body" style={{
      backgroundColor: 'var(--color-background-primary)',
    }}>
      <section 
        className="py-12 md:py-24"
        style={{
          paddingTop: 'var(--spacing-section-vertical-mobile)',
          paddingBottom: 'var(--spacing-section-vertical-mobile)',
        }}
      >
        <PageContainer>
        {/* Image Accordion */}
        <div className="flex justify-center">
          <div 
            className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4"
            style={{
              gap: 'var(--spacing-stack-gap-md)',
              padding: 'var(--spacing-stack-gap-md)',
            }}
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => handleItemHover(index)}
              />
            ))}
          </div>
        </div>
        </PageContainer>
      </section>
    </div>
  )
}

