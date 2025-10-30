import { CalendarMDMIcon, LocationIcon, BookIcon } from "@mdm/ui"
import { ComponentType, ReactNode } from 'react'

const InformationComponent = ({
  Icon,
  IconClassname,
  children
}:{
  Icon: ComponentType<any>,
  IconClassname?: string,
  children?: ReactNode
}) => {
  return (
    <div className='flex items-center'>
      <Icon className={IconClassname}/>
      <div className="text-sm font-semibold text-[#629F73]"> 
        {children}
      </div>
    </div>
  )
}

const HeroSectionInformations = () => {
  return (
    <div className='w-full flex flex-col gap-y-2 lg:w-2/3 sm:flex-row sm:justify-center sm:gap-y-0 sm:gap-x-2'>
      <InformationComponent Icon={CalendarMDMIcon} IconClassname='h-12'>
        du <span className='text-white'> 25</span> au <span className='text-white'>28 décembre 2025</span>
      </InformationComponent>

      <InformationComponent Icon={BookIcon} IconClassname='h-10'>
        <span className='text-white'>Lycéens</span> d&apos;orientation scientifique
      </InformationComponent>

      <InformationComponent Icon={LocationIcon} IconClassname='h-12'>
      <span className='text-white'>Université Al Akhawayn</span> Ifrane
      </InformationComponent>
    </div>
  )
}

export default HeroSectionInformations
