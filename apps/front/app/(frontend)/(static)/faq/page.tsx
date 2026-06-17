import { getPayload } from "payload"
import config from "@payload-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mdm/ui"
import { FaqAccordion } from "./faq-accordion"
import SectionContainer from "@/app/components/section-container"
import CtaSection from "@/app/components/cta/cta-section"

const GENERAL_TAB = "general"

type FaqItem = {
  id: string
  question: string
  answer: any
  categoryId: string | null
}

export default async function FaqPage() {
  const payload = await getPayload({ config })

  const [faqsResult, categoriesResult] = await Promise.all([
    payload.find({ collection: "faq", limit: 200, depth: 1 }),
    payload.find({ collection: "faq-categories", limit: 200 }),
  ])

  const faqs: FaqItem[] = faqsResult.docs.map((doc) => ({
    id: String(doc.id),
    question: doc.question,
    answer: doc.answer,
    categoryId:
      doc.category && typeof doc.category === "object"
        ? String(doc.category.id)
        : doc.category != null
          ? String(doc.category)
          : null,
  }))

  // Build one tab per category that actually has questions, plus a
  // "Général" tab gathering every question without a category.
  const tabs: { value: string; label: string; items: FaqItem[] }[] = []

  const generalItems = faqs.filter((faq) => !faq.categoryId)
  if (generalItems.length > 0) {
    tabs.push({ value: GENERAL_TAB, label: "Général", items: generalItems })
  }

  for (const category of categoriesResult.docs) {
    const items = faqs.filter((faq) => faq.categoryId === String(category.id))
    if (items.length > 0) {
      tabs.push({ value: String(category.id), label: category.name, items })
    }
  }

  return (
    <SectionContainer className="pt-24 pb-20 z-0">

      <div className="space-y-8">
        <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm text-[#244B3A]">
          FAQ
        </h1>

        <p
          className="animate-fade-up bg-clip-text text-center font-display opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Une question ? Consultez cette FAQ, où vous trouverez les réponses aux demandes les plus fréquentes des participants de l'édition précédente.
        </p>

        <p
          className="animate-fade-up bg-clip-text text-center font-display opacity-0"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          Pour toute autre question non traitée sur le site vous pouvez nous contacter via nos réseaux sociaux ou par email sur <span className="text-blue-500">math.maroc.mtym@gmail.com</span>.<br/>
          Notez cependant que nous ne pouvons répondre qu&apos;aux questions non discutées sur le site.
        </p>

        <div
          className="animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          {tabs.length > 0 && (
            <Tabs defaultValue={tabs[0].value} className="w-full">
              <TabsList className="flex flex-wrap w-full h-auto gap-1">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-6">
                  <FaqAccordion items={tab.items} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>

        <div className="flex justify-center">
          <CtaSection />
        </div>
      </div>
    </SectionContainer>
  )
}
