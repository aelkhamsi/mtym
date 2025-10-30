import Image from 'next/image'
import Link from 'next/link'

const OrganizerLogo = ({
  src,
  alt,
  brightness=100,
  width,
  height,
}:{
  src: string,
  alt: string,
  brightness?: number
  width: number,
  height: number,
}) => {
  return (
    <Link 
      className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6A806]/[.15] via-transparent to-transparent" 
      href="/partners"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`filter grayscale brightness-${brightness} contrast-125 invert hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:invert-0`}
      />
    </Link>
  )
}

const HeroSectionOrganizers = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-4 lg:w-2/3 xl:w-1/2"
    >
      <div className='flex items-center space-x-4'>
        <p className='text-sm text-gray-500'>
          Organized by
        </p>

        <OrganizerLogo src="/images/logos/mm.png" alt="Math&Maroc Logo" width={100} height={0}/>
      </div>
      
      <div className="flex space-x-8 items-center">
        <p className='text-sm text-gray-500'>
          Trusted by
        </p>
        
        <OrganizerLogo src="/images/logos/adria_official_partner.png" alt="Adria Logo" brightness={50} width={100} height={0} />
        <OrganizerLogo src="/images/logos/aui.png" alt="AUI Logo" brightness={70} width={80} height={0}/>
      </div>
    </div>
  )
}

export default HeroSectionOrganizers
