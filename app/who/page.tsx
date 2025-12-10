import { AboutBento } from '@/components/about/AboutBento'
import { AboutSection } from '@/components/about/AboutSection'
import { PageContainer } from '@/components/ui/PageContainer'

export default function Who() {
  return (
    <main className="w-full min-h-screen">
      <AboutSection />
      <PageContainer mode="visual">
        <AboutBento />
      </PageContainer>
    </main>
  )
}

