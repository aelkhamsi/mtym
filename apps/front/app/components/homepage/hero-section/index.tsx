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
      </div>
      
    </SectionContainer>
  )
}

// const HeroSection2 = () => {
//   return (
//     <div 
//       className='relative w-full flex flex-col justify-center items-center pb-8 pt-24'
//     >
      
//       <div className="relative z-10 w-full flex flex-col items-center max-w-2xl text-white">


        
//         <div className={`space-y-8`}>
//           {/* Hero Title */}
//           <div className='space-y-2'>
//             <h1
//               className="text-center font-display text-4xl font-bold tracking-[0.05em] text-wrap:balance md:text-5xl md:leading-[3rem]"
//             >
//               <span className='font-neco'>
//                 {CLOSE_APPLICATIONS
//                   ? 'Les inscriptions pour MTYM 2025 sont fermées!'
//                   : 'Les inscriptions pour MTYM 2025 sont ouvertes!'
//                 }
//               </span>
//             </h1>
//           </div>

//           {/* Time and Location */}
//           <div className='flex flex-col items-start space-y-2 gap-x-8 md:flex-row md:justify-center md:space-y-0'>
//             <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
//               <CalendarMDMIcon className='h-12'/>
//               <div className="text-sm font-semibold text-[#629F73]"> 
//                 du <span className='text-white'> 25</span> au <span className='text-white'>28 décembre 2025</span>
//               </div>
//             </div>

//             <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
//               <BookIcon className='h-12' />
//               <div className="text-sm font-semibold text-[#629F73]">
//                 <span className='text-white'>Lycéens</span> d&apos;orientation scientifique
//               </div>
//             </div>

//             <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
//               <LocationIcon className='h-12' />
//               <div className="text-sm font-semibold text-[#629F73] text-center">
//                 <span className='text-white'>Université Al Akhawayn</span> <br/> 
//                 Ifrane
//               </div>
//             </div>
//           </div>

//           {/* CTA buttons */}
//           <div
//             className="mx-auto flex items-center justify-center space-x-5"
//           >
//             <CtaButton />
//             <FaqButton />
//             <RegulationButton />
//           </div>

//           {/* Organizer & sponsors */}
//           <div
//             className="flex flex-col items-center justify-between w-full space-y-4 md:flex-row md:space-y-0"
//           >
//             <div className='flex items-center space-x-4'>
//               <p className='text-sm text-gray-500'>
//                 Organized by
//               </p>

//               <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" href="/partners">
//                 <Image
//                   src="/mm.png"
//                   alt="Math&Maroc Logo"
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="h-10 w-auto filter grayscale brightness-100 contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0"
//                 />
//               </Link>
//             </div>
            
//             <div className="flex space-x-8 items-center">
//               <p className='text-sm text-gray-500'>
//                 Trusted by
//               </p>
              
//               <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" href="/partners">
//                 <Image
//                   src="/adria_official_partner.png"
//                   alt="Adria Logo"
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="h-12 w-auto filter grayscale brightness-50 contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0"
//                 />
//               </Link>

//               <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" href="/partners">
//                 <Image
//                   src="/aui.png"
//                   alt="AUI Logo"
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="h-11 w-auto filter grayscale brightness-70 contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0"
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default HeroSection
