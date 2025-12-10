export type ProjectSlug =
  | 'fintech-dashboard'
  | 'ai-content-studio'
  | 'wellness-mobile-app'

export interface ProjectSummary {
  slug: ProjectSlug
  title: string
  summary: string
  image: string
  tags: string[]
}

export interface ProjectDetailSection {
  title: string
  body: string
}

export interface ProjectMeta {
  timeline: string
  teamSize: string
  industry: string
}

export interface Project extends ProjectSummary {
  heroImages: string[]
  galleryImages: string[]
  sections: ProjectDetailSection[]
  meta: ProjectMeta
}

export const projects: Project[] = [
  {
    slug: 'fintech-dashboard',
    title: 'FinTech Dashboard',
    summary: 'Real-time analytics platform for financial services',
    image:
      'https://images.unsplash.com/photo-1614020661498-fef5b2293108?auto=format&fit=crop&w=1080&q=80',
    tags: ['Web App', 'React', 'Data Viz'],
    heroImages: [
      'https://images.unsplash.com/photo-1614020661498-fef5b2293108?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?auto=format&fit=crop&w=1080&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1719938073286-437141b562e9?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1614020661483-d2bb855eee1d?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1614020661498-fef5b2293108?auto=format&fit=crop&w=1080&q=80',
    ],
    sections: [
      {
        title: 'Challenge',
        body: 'Create a real-time financial analytics platform that handles millions of data points while maintaining sub-second response times.',
      },
      {
        title: 'Process',
        body: 'Built a custom WebSocket infrastructure with React for live data visualization. Implemented advanced caching strategies and optimized rendering to keep the interface responsive at scale.',
      },
      {
        title: 'Result',
        body: '40% increase in user engagement and a 60% reduction in decision-making time for analysts using the platform.',
      },
    ],
    meta: {
      timeline: '3–6 months',
      teamSize: '4–6 people',
      industry: 'FinTech',
    },
  },
  {
    slug: 'ai-content-studio',
    title: 'AI Content Studio',
    summary: 'Generative AI platform for creative professionals',
    image:
      'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1080&q=80',
    tags: ['AI/ML', 'Next.js', 'API'],
    heroImages: [
      'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1080&q=80',
    ],
    sections: [
      {
        title: 'Challenge',
        body: 'Empower content teams to generate, iterate, and publish assets quickly while staying on brand and in control.',
      },
      {
        title: 'Process',
        body: 'Designed prompt-to-layout workflows, reusable component templates, and a governance layer for brand and compliance review before publishing.',
      },
      {
        title: 'Result',
        body: 'Teams produced 3x more content per sprint while reducing review cycles from weeks to days.',
      },
    ],
    meta: {
      timeline: '4–8 months',
      teamSize: '5–7 people',
      industry: 'Creative / Marketing',
    },
  },
  {
    slug: 'wellness-mobile-app',
    title: 'Wellness Mobile App',
    summary: 'Holistic health tracking with AI-powered insights',
    image:
      'https://images.unsplash.com/photo-1566554001689-b53a88dbd138?auto=format&fit=crop&w=1080&q=80',
    tags: ['Mobile', 'React Native', 'Health'],
    heroImages: [
      'https://images.unsplash.com/photo-1566554001689-b53a88dbd138?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1080&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1515444744559-7be63e1600de?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1080&q=80',
    ],
    sections: [
      {
        title: 'Challenge',
        body: 'Help users build sustainable wellness habits while keeping daily tracking simple and non-intrusive.',
      },
      {
        title: 'Process',
        body: 'Designed a modular habit system, daily check-ins, and AI-powered nudges that adapt to user behavior over time.',
      },
      {
        title: 'Result',
        body: 'In a 12-week pilot, 70% of users reported better routine adherence and higher perceived wellbeing.',
      },
    ],
    meta: {
      timeline: '3–5 months',
      teamSize: '3–5 people',
      industry: 'Health & Wellness',
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(
  slug: string,
): { previous?: ProjectSummary; next?: ProjectSummary } {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return {}

  const previous = projects[index - 1]
  const next = projects[index + 1]

  return {
    previous:
      previous && {
        slug: previous.slug,
        title: previous.title,
        summary: previous.summary,
        image: previous.image,
        tags: previous.tags,
      },
    next:
      next && {
        slug: next.slug,
        title: next.title,
        summary: next.summary,
        image: next.image,
        tags: next.tags,
      },
  }
}


