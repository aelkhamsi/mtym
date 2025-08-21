import CtaSection from "@/app/components/cta/cta-section"
import ConferencesSection from "./conferences-section"

const images = [
  {
    name: 'MathSprint contest',
    src: '/past-edition/mdm_1.webp' 
  },
  {
    name: 'MathSprint contest',
    src: '/past-edition/mdm_2.webp'
  },
]

export default function ConferencesPage() {

  return (
    <div className="w-full flex flex-col max-w-sm md:max-w-screen-2xl my-24 space-y-10">
      <h1 className="text-[#1C55FF] text-center text-4xl font-bold drop-shadow-sm">
        Conferences
      </h1>

      <div className="flex justify-center">
        <div className="text-center md:max-w-screen-lg space-y-2">
          <p>Immerse yourself in the world of mathematics through a series of captivating lectures by renowned experts in the field.</p>
          <p>These talks will offer fresh perspectives, in-depth discussions and insights into a wide range of mathematical topics, from classical theories to the latest advances.</p>
        </div>
      </div>

      <ConferencesSection />

      <div className="flex justify-center">
        <CtaSection />
      </div>        
    </div>
  )
}