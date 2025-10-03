import Image from 'next/image'
import CtaButton from '../../cta/cta-button'
import FaqButton from '../../cta/faq-button'
import RegulationButton from '../../cta/regulation-button'
import SectionContainer from '@/app/components/section-container'
import HeroSectionSeparator from './hero-section-separator'
import HeroSectionTitle from './hero-section-title'
import HeroSectionInformations from './hero-section-informations'
import HeroSectionOrganizers from './hero-section-organizers'
import { Separator } from '@mdm/ui'

const HeroSection = () => {
  const backgroundColorClassname = "bg-[url('/grain.png'),linear-gradient(to_bottom,#244B3A,#244B3A,#122019)] bg-center bg-repeat [background-blend-mode:multiply]"

  return (
    <SectionContainer className={`pt-24 pb-4 z-0 ${backgroundColorClassname}`}>
      
      <div className='w-full flex flex-col items-center space-y-6'>
        <Image
          src="/mtym.svg"
          alt="MTYM logo"
          width='350'
          height='0'
        />

        <HeroSectionSeparator />
        
        <HeroSectionTitle />

        <div
          className="flex justify-center space-x-4"
        >
          <CtaButton />
          <FaqButton />
          <RegulationButton />
        </div>

        <Separator className='bg-gray-600'/>

        <HeroSectionInformations />
        <HeroSectionOrganizers />
      </div>
    </SectionContainer>
  )
}

export default HeroSection
