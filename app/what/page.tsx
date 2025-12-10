import Image from 'next/image'
import Link from 'next/link'
import { AboutSection } from '@/components/about/AboutSection'
import Design7Hero from '@/components/ui/Design7Hero'
import { PageContainer } from '@/components/ui/PageContainer'
import { projects } from './projects'

export default function What() {
  return (
    <main className="w-full min-h-screen">
      <Design7Hero
        badge="Version 2.0 is here"
        headline="AI-Powered Financial Solution"
        ctaLabel="Get Started"
        ctaHref="#"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
        features={[
          'Funds are safe by your data security',
          'Privacy of the most transaction',
        ]}
        metricTitle="AI Growth Rate"
        metricValue="90x"
        metricDescription="faster"
      />

      {/* Work / Case Studies Grid (Design 8) */}
      <section
        className="w-full border-t border-border"
        style={{
          paddingTop: 'var(--spacing-section-vertical-desktop)',
          paddingBottom: 'var(--spacing-section-vertical-desktop)',
          borderTopColor: 'var(--color-button-secondary-border)',
        }}
      >
        <PageContainer mode="marketing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/what/${project.slug}`}
                className="group relative w-full bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1080}
                    height={675}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      ↗
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <AboutSection />
    </main>
  )
}

