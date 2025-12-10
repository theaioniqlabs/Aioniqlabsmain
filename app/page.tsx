import { TeamGrid } from '@/components/ui/TeamGrid'
import ExploreSection from '@/components/ui/ExploreSection'
import { PageContainer } from '@/components/ui/PageContainer'

export default function Home() {
  return (
    <main>
      <PageContainer mode="visual">
        <TeamGrid />
        <ExploreSection />
      </PageContainer>
    </main>
  )
}
