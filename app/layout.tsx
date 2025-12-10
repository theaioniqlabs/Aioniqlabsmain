import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Design9Nav } from '@/components/navigation/Design9Nav'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { TextBanner } from '@/components/ui/TextBanner'
import { Footer } from '@/components/ui/footer-section'

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
        {/* Google Sans Flex Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <section className="relative w-full">
            <TextBanner />
            <Design9Nav />
          </section>
          <div className="pt-16 lg:pt-16 pb-16 lg:pb-0">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

