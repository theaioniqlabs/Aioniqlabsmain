import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/ui/header-3'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Footer } from '@/components/ui/footer-section'
import { IntelligenceLayer } from '@/components/providers/IntelligenceLayer'
import { CrowdCanvas } from '@/components/ui/crowd-canvas'

export const metadata: Metadata = {
  title: 'AiONIQ Labs - A Human-first Intelligent Design Systems',
  description: 'Creative Technology Studio with 40000000+ reach',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Sans Flex Font - Using link tags because Google Sans Flex is not available in next/font/google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <IntelligenceLayer />
          <Header />
          <div className="pt-[57px] pb-12 lg:pt-[57px] lg:pb-0">
            {children}
          </div>
          <section 
            className="relative w-full"
            style={{ 
              zIndex: 0,
              minHeight: '90vh'
            }}
            aria-label="Crowd Canvas Background"
          >
            <CrowdCanvas src="/assets/People/all-public.png" rows={15} cols={7} />
          </section>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

