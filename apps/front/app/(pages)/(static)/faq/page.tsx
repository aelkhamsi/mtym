import { generalQuestions } from "./questions"
import { FaqAccordion } from "./faq-accordion"


export default function ConferencesPage() {

  return (
      <div className="w-full max-w-md md:max-w-screen-lg px-5 xl:px-0 space-y-6 my-24">
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
      </div>
  )
}