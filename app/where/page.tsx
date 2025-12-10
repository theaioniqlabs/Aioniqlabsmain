import { PageContainer } from '@/components/ui/PageContainer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Our standard 90-day framework covers most projects from concept to launch. Smaller projects can be faster (4-6 weeks), while larger enterprise projects may extend to 4-6 months. We'll provide a detailed timeline during our discovery call.",
  },
  {
    question: "What's your pricing structure?",
    answer:
      "We offer project-based pricing starting at $25K for websites and $50K+ for web applications. We also do monthly retainers for ongoing work. Every project is scoped individually based on complexity and requirements.",
  },
  {
    question: 'Do you work with startups?',
    answer:
      "Absolutely! We love working with early-stage companies. We offer flexible payment terms and can structure engagements to fit startup budgets and timelines. Many of our clients have gone on to raise funding with the products we've built together.",
  },
  {
    question: 'Can you maintain my existing website?',
    answer:
      "Yes, we offer maintenance and enhancement packages. Whether you need ongoing support, performance optimization, or new features, we can create a retainer that fits your needs.",
  },
  {
    question: 'What if I only need design (no development)?',
    answer:
      "We can do design-only projects and deliver production-ready Figma files with complete design systems. We'll also provide developer handoff documentation to ensure smooth implementation.",
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      "Yes, we're happy to sign mutual NDAs before discussing sensitive project details. We take confidentiality seriously and never share client work without explicit permission.",
  },
]

export default function Where() {
  return (
    <main>
      <PageContainer mode="marketing" className="py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-8 text-2xl font-semibold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-xl overflow-hidden last:border-b"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </PageContainer>
    </main>
  )
}

