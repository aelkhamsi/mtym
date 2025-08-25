import {
  designAndBranding,
  organizingCommittee,
  webDevelopment,
} from './data';
import Link from 'next/link';
import { shuffle } from '@mdm/utils';

const Card = ({
  key,
  name,
  imageSrc,
  portfolioSrc,
}:{
  key: string,
  name: string,
  imageSrc: string,
  portfolioSrc?: string,
}) => {
  return (
    <Link href={portfolioSrc ?? '#'} target='_blank'>
      <div 
        className="w-[12rem] border-b-4 border-[#F6A806] flex flex-col justify-between items-center space-y-2 rounded-md py-2"
        key={key}
      > 
        <div className="h-fit">
          <img
            src={imageSrc}
            style={{ width: 'auto'}}
          />
        </div>

        <div className='text-sm text-center font-semibold '>{name}</div>
      </div>
    </Link>
  )
}

export default function OrganizingTeamPage() {
  const shuffledOrganizingCommitte = shuffle(organizingCommittee)

  return (
    <div className="w-full max-w-md md:max-w-screen-xl px-5 xl:px-0 my-28 space-y-6">
      <h1 className="text-center text-4xl font-bold font-neco drop-shadow-sm">
        <span className='text-[#244B3A]'>Organizing Committee</span>
      </h1>

      <div 
        className="flex justify-around flex-wrap gap-6 p-8 rounded-lg md:gap-x-12"
      >
        {shuffledOrganizingCommitte.map(person =>
          <Card
            key={person.name.toLowerCase().replace(' ', '_')}
            name={person.name}
            imageSrc={person.imageSrc} 
            portfolioSrc={person.portfolioSrc}
          />
        )}
      </div>

      <div className='flex flex-col justify-around space-y-6 flex-wrap gap-y-6 md:flex-row md:space-y-0'>          
        {/* WEB DEV */}
        <div className='w-full md:w-1/2 space-y-4'>
          <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm">
            <span className='text-[#244B3A]'>Web Development</span>
          </h1>

          <div 
            className="flex justify-around flex-wrap gap-6 shadow-md  p-8 rounded-lg ml-6"
          >
            {webDevelopment.map(person =>
              <Card
                key={person?.name.toLowerCase().replace(' ', '_')}
                name={person?.name}
                imageSrc={person?.imageSrc} 
                portfolioSrc={person?.portfolioSrc}
              />
            )}
            
          </div>
        </div>

        <div className='w-full md:w-1/2 space-y-4'>
          <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm">
            <span className='text-[#244B3A]'>Design & Branding</span>
          </h1>

          <div 
            className="flex justify-around flex-wrap gap-6 shadow-md  p-8 rounded-lg ml-6"
          >
            {designAndBranding.map(person =>
              <Card
                key={person?.name.toLowerCase().replace(' ', '_')}
                name={person?.name}
                imageSrc={person?.imageSrc} 
                portfolioSrc={person?.portfolioSrc}
              />
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}