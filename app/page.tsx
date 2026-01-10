import ExploreSection from '@/components/ui/ExploreSection'
import { PageContainer } from '@/components/ui/PageContainer'
import WhereHeroCard from '@/components/ui/WhereHeroCard'
import TestimonialsToolsSection from '@/components/ui/TestimonialsToolsSection'

export default function Home() {
  return (
    <main>
      <WhereHeroCard />
      <TestimonialsToolsSection />
      <PageContainer mode="visual">
        <ExploreSection />
      </PageContainer>
    </main>
  )
}
