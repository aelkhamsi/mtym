import Image from 'next/image'
import FaqButton from '../../cta/faq-button'
import RegulationButton from '../../cta/regulation-button'
import SectionContainer from '@/app/components/section-container'
import HeroSectionSeparator from './hero-section-separator'
import HeroSectionTitle from './hero-section-title'
import HeroSectionInformations from './hero-section-informations'
import HeroSectionOrganizers from './hero-section-organizers'
import { Separator } from '@mdm/ui'
import CtaButton from '../../cta/cta-button'

const HeroSection = () => {
  // const backgroundColorClassname = "bg-[url('/grain.png'),linear-gradient(to_bottom,#244B3A,#244B3A,#122019)] bg-center bg-repeat [background-blend-mode:multiply]"
  const backgroundColorClassname = "bg-[linear-gradient(to_bottom,#244B3A,#244B3A,#122019)]"

  return (
    <SectionContainer className={`pt-24 pb-4 z-0 ${backgroundColorClassname}`}>
      
      <div 
        className='w-full flex flex-col items-center space-y-6 animate-fade-up opacity-0'
        style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
      >
        <Image
          src="/images/logos/mtym.svg"
          alt="MTYM logo"
          width={350}
          height={0}
          priority
        />

        <HeroSectionSeparator />
        
        <HeroSectionTitle />

        <div
          className="flex justify-center space-x-4"
        >
          <CtaButton />
          <RegulationButton />
          <FaqButton />
        </div>
      </div>

      <Separator className='bg-gray-600 my-6'/>

      <div 
        className='w-full flex flex-col items-center space-y-6 animate-fade-up opacity-0'
        style={{ animationDelay: "0.50s", animationFillMode: "forwards" }}
      >
        <HeroSectionOrganizers />
      </div>
    </SectionContainer>
  )
}

export default HeroSection
