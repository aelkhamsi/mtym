import { Linkedin } from '@mdm/ui';
import {
  organizingCommittee,
  webDevelopment,
} from './data';
import Link from 'next/link';
import { shuffle } from '@mdm/utils';
import { Brush } from '@mdm/ui';
import TextureBg from '@/app/components/texture-bg';

const Card = ({
  key,
  name,
  imageSrc,
  linkedinSrc,
  portfolioSrc,
}:{
  key: string,
  name: string,
  imageSrc: string,
  linkedinSrc?: string,
  portfolioSrc?: string,
}) => {
  return (
    <div 
      className="w-[12rem] bg-white border-b-4 border-red-500 flex flex-col justify-between items-center space-y-2 rounded-md py-2"
      key={key}
    > 
      <div className="h-fit">
        <img
          src={imageSrc}
          style={{height: '150px', width: 'auto'}}
        />
      </div>

      <div className='flex space-x-2'>
        <div className='text-xs text-center font-semibold '>{name}</div>
        {linkedinSrc && <div><Link href={linkedinSrc} target='_blank' className='shadow-md'><Linkedin className="h-5 w-5 text-[#f04b5b]" /></Link></div>}
        {portfolioSrc && <div><Link href={portfolioSrc} target='_blank' className='shadow-md'><Brush className="h-6 w-6 text-[#f04b5b]" /></Link></div>}
      </div>
    </div>
  )
}

export default function OrganizingTeamPage() {
  const shuffledOrganizingCommitte = shuffle(organizingCommittee)

  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full max-w-sm md:max-w-screen-lg px-5 xl:px-0 mt-10 space-y-6">
        <h1 className="text-center text-4xl font-bold font-neco drop-shadow-sm">
          <span className='text-[#252162]'>Math&Maroc</span> <span className='font-extralight'>{" | "}</span>
          <span className='bg-gradient-to-br from-black to-stone-500 inline-block text-transparent bg-clip-text'>Organizing Committee</span>
        </h1>

        <div 
          className="flex justify-around flex-wrap gap-6 p-8 rounded-lg md:gap-x-12"
        >
          {shuffledOrganizingCommitte.map(person =>
            <Card
              key={person.name.toLowerCase().replace(' ', '_')}
              name={person.name}
              imageSrc={person.imageSrc} 
              linkedinSrc={person.linkedinSrc}
            />
          )}
        </div>

        <div className='flex flex-col justify-around space-y-6 flex-wrap gap-y-6 md:flex-row md:space-y-0'>          
          {/* WEB DEV */}
          <div className='w-full md:w-1/2 space-y-4'>
            <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm">
              <span className='text-[#252162]'>Math&Maroc</span> <span className='font-extralight'>{" | "}</span>
              <span className='bg-gradient-to-br from-black to-stone-500 inline-block text-transparent bg-clip-text'>Web Development</span>
            </h1>

            <div 
              className="flex justify-around flex-wrap gap-6 shadow-md  p-8 rounded-lg ml-6"
            >
              {webDevelopment.map(person =>
                <Card
                  key={person.name.toLowerCase().replace(' ', '_')}
                  name={person.name}
                  imageSrc={person.imageSrc} 
                  linkedinSrc={person.linkedinSrc}
                />
              )}
              
            </div>
          </div>
        </div>
      </div>
    </TextureBg>
  )
}