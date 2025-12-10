import { TeamGrid } from '@/components/ui/TeamGrid'
import ExploreSection from '@/components/ui/ExploreSection'
import { PageContainer } from '@/components/ui/PageContainer'
import HeroSection02 from '@/components/ui/ruixen-hero-section-02'

export default function Home() {
  return (
    <main>
      <HeroSection02 />
      <PageContainer mode="visual">
        <TeamGrid />
        <ExploreSection />
      </PageContainer>
    </main>
  )
}
