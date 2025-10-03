import Link from 'next/link'
import Image from 'next/image'
import CtaButton from '../../cta/cta-button'
import FaqButton from '../../cta/faq-button'
import { BookIcon, CalendarMDMIcon, LocationIcon } from '@mdm/ui'
import RegulationButton from '../../cta/regulation-button'
import { CLOSE_APPLICATIONS } from 'config'
import SectionContainer from '@/app/components/section-container'
import HeroSectionSeparator from './hero-section-separator'
import HeroSectionTitle from './hero-section-title'
import HeroSectionInformations from './hero-section-informations'

const HeroSection = () => {
  const backgroundColorClassname = "bg-[url('/grain.png'),linear-gradient(to_bottom,#244B3A,#244B3A,#122019)] bg-center bg-repeat [background-blend-mode:multiply]"

  return (
    <SectionContainer className={`pt-24 z-0 ${backgroundColorClassname}`}>

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

        <HeroSectionInformations />
      </div>
      
    </SectionContainer>
  )
}

const HeroSection2 = () => {
  return (
    <div 
      className='relative w-full flex flex-col justify-center items-center pb-8 pt-24'
    >
      
      <div className="relative z-10 w-full flex flex-col items-center max-w-2xl text-white">


        
        <div className={`space-y-8`}>

          {/* Organizer & sponsors */}
          <div
            className="flex flex-col items-center justify-between w-full space-y-4 md:flex-row md:space-y-0"
          >
            <div className='flex items-center space-x-4'>
              <p className='text-sm text-gray-500'>
                Organized by
              </p>

              <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" href="/partners">
                <Image
                  src="/mm.png"
                  alt="Math&Maroc Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-10 w-auto filter grayscale brightness-100 contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0"
                />
              </Link>
            </div>
            
            <div className="flex space-x-8 items-center">
              <p className='text-sm text-gray-500'>
                Trusted by
              </p>
              
              <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" href="/partners">
                <Image
                  src="/adria_official_partner.png"
                  alt="Adria Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-12 w-auto filter grayscale brightness-50 contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0"
                />
              </Link>

              <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" href="/partners">
                <Image
                  src="/aui.png"
                  alt="AUI Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-11 w-auto filter grayscale brightness-70 contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
