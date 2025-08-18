import { Button} from '@mdm/ui'
import { ImageStack } from '../image-stack'
import Link from 'next/link';

const images = [
  {
    name: 'Summer camp photo',
    src: '/past-edition/contest.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/past-edition/panel.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/past-edition/sports.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/past-edition/board_games.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/past-edition/closing_ceremony.webp'
  },
  {
    name: 'Summer camp photo',
    src: '/past-edition/closing_ceremony_2.webp'
  },
]

const SecondSection = () => {
  return (    
    <div className='relative isolate overflow-hidden w-full flex flex-col justify-center items-center py-14 bg-[url(/logomark_beige.svg)] bg-no-repeat bg-center shadow-xl shadow-slate-800'>
      <div
        className="flex flex-col w-full space-y-4 md:flex-row md:justify-between md:space-x-8 lg:w-3/4 text-base mb-12 md:mb-20"
      >
        <div className="w-full space-y-4 p-4 lg:p-0">
          <p className='font-bold text-xs text-[#1C55FF]'>What is MMC ?</p>
          <h1 className='font-bold text-3xl font-neco'>Math&Maroc Competition, The Summit of Moroccan Mathematical Minds</h1>
          <p><span className='font-semibold'>MMC (Math&Maroc Competition)</span> is a 5 days annual math competition gathering 200+ university students.</p>
          <p>MMC is where Morocco&apos;s brightest university students challenge their minds through <span className='font-semibold'>competition</span>, grow through inspiring <span className='font-semibold'>talks</span> and <span className='font-semibold'>workshops</span>, and bond through <span className='font-semibold'>games</span>, <span className='font-semibold'>sports</span>, and shared moments.</p>

          <p>
            Top-ranked participants earn the opportunity to take part in the <span className='font-semibold'>IMC (International Mathematics Competition for University Students)</span>.
          </p>
        </div>

        <div className="w-full">
          <ImageStack
            images={images}
            autoplay={true}
          />
        </div>
      </div>

      <div className='text-3xl font-bold p-4 lg:p-0 font-neco'>
        Looking back at MMC 2024
      </div>

      <div
        className="flex flex-col md:flex-row md:justify-between md:space-x-8 w-full lg:w-3/4 text-base md:my-12"
      >
        <div className='w-full flex justify-start p-4 lg:p-0'>
          <div className="w-fit space-y-4 font-medium text-3xl">
            <p><span className='bg-gradient-to-br from-[#1C55FF] to-[#ABA8A9] inline-block text-transparent bg-clip-text'>5</span> Fully sponsored days</p>
            <p><span className='bg-gradient-to-br from-[#1C55FF] to-[#ABA8A9] inline-block text-transparent bg-clip-text'>200+</span> Participants</p>
            <p><span className='bg-gradient-to-br from-[#1C55FF] to-[#ABA8A9] inline-block text-transparent bg-clip-text'>5+</span> Speakers</p>
            <p>⚽ Games, sports and activities</p>
          </div>
        </div>

        <div className="w-full flex flex-col px-4 space-y-4">
          <p>The last edition of MMC was held in Benguerir in collaboration with UM6P College of Computing.</p>
          <p>The event was a groundbreaking success, bringing together over 200 participants that competed, connected with top professors and engineers, and bonded through games and fun activities.</p>

          <Link href="/past-editions">
            <Button className='w-fit bg-transparent text-black border border-black hover:text-white'>
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SecondSection
