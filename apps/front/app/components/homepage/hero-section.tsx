import Link from 'next/link'
import Image from 'next/image'
import CtaButton from '../cta/cta-button'
import FaqButton from '../cta/faq-button'
import { BookIcon, CalendarMDMIcon, LocationIcon } from '@mdm/ui'
import RegulationButton from '../cta/regulation-button'

const HeroSection = () => {
  return (
    <div 
      className='relative w-full flex flex-col justify-center items-center pb-8 pt-24'
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#244B3A] via-[#244B3A] to-[#122019]"></div>
      <div className="absolute inset-0 bg-[url(/topography.svg)] bg-center bg-repeat opacity-10"></div>

      <div className="relative z-10 w-full flex flex-col items-center max-w-2xl text-white">
        {/* Logo */}
        <div
          className={`flex flex-col items-center animate-fade-up opacity-0 z-10 md:p-0`}
          style={{ animationDelay: "0.10s", animationFillMode: "forwards" }}
        >
          <Image
            src="/mtym.svg"
            alt="MTYM logo"
            width='400'
            height='150'
          />

          <div className="w-[25rem] md:w-[80rem] relative mb-6">
            <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-[2px] md:w-3/4 blur-sm" />
            <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-px md:w-3/4" />
            <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-[5px] md:w-2/4 blur-sm" />
            <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-px md:w-2/4" />
          </div>
        </div>

        
        <div 
          className={`space-y-8 animate-fade-up opacity-0`}
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          {/* Hero Title */}
          <div className='space-y-2'>
            <h1
              className="text-center font-display text-4xl font-bold tracking-[0.05em] text-wrap:balance md:text-5xl md:leading-[3rem]"
            >
              <span className='font-neco'>
                Les inscriptions pour MTYM 2025 sont ouvertes!
              </span>
            </h1>
          </div>

          {/* Time and Location */}
          <div className='flex flex-col items-start space-y-2 gap-x-8 md:flex-row md:justify-center md:space-y-0'>
            <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
              <CalendarMDMIcon className='h-12'/>
              <div className="text-sm font-semibold text-[#629F73]"> 
                du <span className='text-white'> 25</span> au <span className='text-white'>28 décembre 2025</span>
              </div>
            </div>

            <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
              <BookIcon className='h-12' />
              <div className="text-sm font-semibold text-[#629F73]">
                <span className='text-white'>Lycéens</span> d&apos;orientation scientifique
              </div>
            </div>

            <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
              <LocationIcon className='h-12' />
              <div className="text-sm font-semibold text-[#629F73] text-center">
                <span className='text-white'>Université Al Akhawayn</span> <br/> 
                Ifrane
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="mx-auto flex items-center justify-center space-x-5"
          >
            <CtaButton />
            <FaqButton />
            <RegulationButton />
          </div>

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
