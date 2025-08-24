import { GlitterIcon, LightbulbIcon, StarShineIcon} from '@mdm/ui'
import { ImageStack } from '../image-stack'

const images = [
  {
    name: 'Summer camp photo',
    src: '/slideshow/competition.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/slideshow/amphi2.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/slideshow/workshop_ai.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/slideshow/board_games.webp' 
  },
  {
    name: 'Summer camp photo',
    src: '/slideshow/closing_ceremony.webp'
  },
  {
    name: 'Summer camp photo',
    src: '/slideshow/president_aui.webp'
  },
]

const SecondSection = () => {
  return (
    <div className='w-full flex flex-col items-center bg-white'>
      <div
        className="w-full lg:w-3/4 flex flex-col space-y-4 md:flex-row md:justify-between md:space-x-8 my-12"
      >
        <div className="w-full space-y-4 p-4 lg:p-0">
          <p className='font-bold text-xs text-[#244B3A]'>Qu&apos;est-ce que le MTYM ?</p>
          <h1 className='font-bold text-3xl font-neco'>MTYM, la scène de la recherche mathématique pour les lycéens</h1>
          <p>Organisé par <span className='font-semibold'>Math&Maroc</span>, le <span className='font-semibold'> Moroccan Tournament of Young Mathematicians (MTYM)</span> est un tournoi national destiné aux lycéens d&apos;orientation scientifique du Maroc.</p>
          <p>Il offre aux participants une expérience de recherche scientifique en mathématiques, en valorisant la curiosité, l&apos;esprit critique et la créativité à travers des problèmes mathématiques ouverts, conçus pour stimuler la réflexion et l&apos;investigation collective.</p>
          <p>Chaque équipe, formée de trois à cinq personnes, est encouragée à explorer différentes pistes, à développer ses propres idées et à présenter ses résultats, à l&apos;image du travail d&apos;un chercheur en mathématiques.</p>
        </div>

        <div className="w-full">
          <ImageStack
            images={images}
            autoplay={true}
          />
        </div>
      </div>

      <div className='w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 my-12 mb-24'>
        
        <div className="w-full space-y-4 p-8 bg-[#F9FAFB] rounded-3xl shadow-sm border-[1px] border-gray-100">
          <div className="flex justify-center">
            <div className="w-fit p-[10px] bg-[#629F73] rounded-full">
              <StarShineIcon className="h-8 w-8"/>
            </div>
          </div>

          <h1 className='text-center font-bold text-xl'>L&apos;esprit du tournoi</h1>
          <p>
            Le MTYM valorise le travail collaboratif, l&apos;esprit critique et la persévérance.<br/>
            Les problèmes proposés sont ouverts et peuvent avoir plusieurs pistes de solution.<br/>
            L&apos;objectif est d&apos;encourager l&apos;analyse en profondeur, le raisonnement autonome et l&apos;esprit critique.
          </p>
        </div>

        <div className="w-full space-y-4 p-8 bg-[#F9FAFB] rounded-3xl shadow-sm border-[1px] border-gray-100">
          <div className="flex justify-center">
            <div className="w-fit p-[10px] bg-[#629F73] rounded-full">
              <GlitterIcon className="h-8 w-8"/>
            </div>
          </div>

          <h1 className='text-center font-bold text-xl'>Au delà de la compétition</h1>
          <p>Plus qu&apos;un simple concours, MTYM est une expérience complète: plusieurs mois de travail aboutissant à trois jours intenses, rythmés par des débats mathématiques, des conférences, des ateliers et des activités ludiques, alliant apprentissage et convivialité avec d&apos;autres passionnés.</p>
        </div>

        <div className="w-full space-y-4 p-8 bg-[#F9FAFB] rounded-3xl shadow-sm border-[1px] border-gray-100">
          <div className="flex justify-center">
            <div className="w-fit p-[10px] bg-[#629F73] rounded-full">
              <LightbulbIcon className="h-8 w-8"/>
            </div>
          </div>

          <h1 className='text-center font-bold text-xl'>Retour sur les éditions précédentes</h1>
          <p>
            La dernière édition, à l&apos;instar de celle-ci, s&apos;est tenue à l&apos;Université Al Akhawayn à Ifrane (AUI).<br/>
            L&apos;événement a connu une forte affluence de plus de 200 lycéens venant des quatre coins du Maroc pour relever des défis hors du cadre scolaire traditionnel.
          </p>
        </div>
      </div>
    </div>
  )
}

{/* <Button className='w-fit bg-transparent text-black border border-black hover:text-white'>
  Learn more
</Button> */}

export default SecondSection
