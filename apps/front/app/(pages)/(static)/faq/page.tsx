import { generalQuestions } from "./questions"
import { FaqAccordion } from "./faq-accordion"


export default function ConferencesPage() {

  return (
      <div className="w-full max-w-sm md:max-w-screen-md px-5 xl:px-0 space-y-6 my-24">
        <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm text-[#FF4925]">
          FAQ
        </h1>

        <p
          className="animate-fade-up bg-clip-text text-center font-display opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          A question? Take a look at this FAQ, where you'll find answers to the most frequently asked questions from last year&apos;s participants.
        </p>

        <p
          className="animate-fade-up bg-clip-text text-center font-display opacity-0"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          
          For any other questions not covered on this page, you can contact us via our social networks or by email at <span className="text-blue-500">math.maroc.competition@gmail.com</span>.<br/>
          Please note that we will not respond to emails for questions already addressed in this FAQ.
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