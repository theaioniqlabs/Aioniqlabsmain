import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageContainer } from '@/components/ui/PageContainer'
import { projects, getProjectBySlug, getAdjacentProjects } from '../projects'

interface ProjectPageProps {
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return notFound()
  }

  const { previous, next } = getAdjacentProjects(params.slug)

  return (
    <main className="w-full min-h-screen">
      {/* Sticky header (Design 8.1 style) */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <PageContainer mode="showcase" className="flex items-center justify-between py-4">
          <h3 className="font-heading text-lg md:text-xl">{project.title}</h3>
          <Link
            href="/what"
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close project"
          >
            <span className="sr-only">Back to projects</span>
            {/* Simple X icon using text to avoid extra imports */}
            <span className="block text-lg leading-none">&times;</span>
          </Link>
        </PageContainer>
      </div>

      <section className="w-full">
        <PageContainer mode="showcase" className="py-8 md:py-12">
          {/* Top hero gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {project.heroImages[0] && (
              <Image
                src={project.heroImages[0]}
                alt={project.title}
                width={1080}
                height={600}
                className="w-full object-cover rounded-2xl"
                style={{
                  height: 'var(--spacing-image-height-hero)',
                }}
              />
            )}
            {project.heroImages[1] && (
              <Image
                src={project.heroImages[1]}
                alt={`${project.title} interface`}
                width={1080}
                height={600}
                className="w-full object-cover rounded-2xl"
                style={{
                  height: 'var(--spacing-image-height-hero)',
                }}
              />
            )}
          </div>

          {/* Secondary gallery */}
          {project.galleryImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {project.galleryImages.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  alt={`${project.title} view ${index + 1}`}
                  width={1080}
                  height={500}
                  className="w-full object-cover rounded-2xl"
                  style={{
                    height: 'var(--spacing-image-height-gallery)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: badges + sections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tags / badges */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.sections.map((section) => (
                <div
                  key={section.title}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8"
                >
                  <h4 className="mb-4 font-heading text-lg">{section.title}</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: sticky meta card */}
            <div className="space-y-6">
              <div className="bg-accent/40 border border-border rounded-2xl p-6 sticky top-28">
                <h4 className="mb-6 font-heading text-lg">Project Details</h4>
                <div className="space-y-4 mb-8 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Timeline</p>
                    <p>{project.meta.timeline}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Team Size</p>
                    <p>{project.meta.teamSize}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Industry</p>
                    <p>{project.meta.industry}</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <span>Start a Similar Project</span>
                  <span className="text-base">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Previous / Next navigation */}
          {(previous || next) && (
            <div className="mt-16 pt-8 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previous && (
                  <Link
                    href={`/what/${previous.slug}`}
                    className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-4 p-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-xl text-primary">{'<'}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-muted-foreground mb-1">
                          Previous Project
                        </p>
                        <p className="line-clamp-1">{previous.title}</p>
                      </div>
                      <Image
                        src={previous.image}
                        alt={previous.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                )}

                {next && (
                  <Link
                    href={`/what/${next.slug}`}
                    className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-4 p-6">
                      <Image
                        src={next.image}
                        alt={next.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm text-muted-foreground mb-1">
                          Next Project
                        </p>
                        <p className="line-clamp-1">{next.title}</p>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-xl text-primary">{'>'}</span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </PageContainer>
      </section>
    </main>
  )
}


