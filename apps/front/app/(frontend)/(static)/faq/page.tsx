import { generalQuestions } from "./questions"
import { FaqAccordion } from "./faq-accordion"
import SectionContainer from "@/app/components/section-container"
import CtaSection from "@/app/components/cta/cta-section"


export default function ConferencesPage() {
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
          <FaqAccordion items={generalQuestions} />
        </div>

        <div className="flex justify-center">
          <CtaSection />
        </div>
      </div>
    </SectionContainer>
  )
}