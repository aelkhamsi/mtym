"use client"

import dynamic from "next/dynamic";

const ImageStack = dynamic(() => import("../image-stack").then(m => m.ImageStack), {
  ssr: false,
})
import { CalendarMDMIcon, GlitterIcon, LightbulbIcon, BookIcon, StarShineIcon} from '@mdm/ui'

const images = [
  {
    name: 'Slideshow photo 1',
    src: '/images/homepage/slideshow/competition.webp' 
  },
  {
    name: 'Slideshow photo 2',
    src: '/images/homepage/slideshow/amphi.webp' 
  },
  {
    name: 'Slideshow photo 3',
    src: '/images/homepage/slideshow/workshop_ai.webp' 
  },
  {
    name: 'Slideshow photo 4',
    src: '/images/homepage/slideshow/board_games.webp' 
  },
  {
    name: 'Slideshow photo 5',
    src: '/images/homepage/slideshow/closing_ceremony.webp'
  },
  {
    name: 'Slideshow photo 6',
    src: '/images/homepage/slideshow/president_aui.webp'
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
          <p>Organisé par <span className='font-semibold'>Math&Maroc</span>, le <span className='font-semibold'> Moroccan Tournament of Young Mathematicians (MTYM)</span> est la première compétition de recherche mathématique destinée aux lycéens au Maroc et aux lycéens marocains scolarisés à l&apos;étranger.</p>
          <p>Le MTYM propose une approche des mathématiques différente du cadre scolaire traditionnel à travers des problèmes de recherche ouverts qui encouragent la curiosité, l&apos;esprit critique, la créativité et le travail collaboratif.</p>
          <p>Réunis en équipes de 3 à 5 élèves, les participants explorent ces problèmes pendant plusieurs mois avant de présenter et défendre leurs résultats devant d&apos;autres équipes et un jury lors des Tournois Régionaux puis du Tournoi National.</p>
        </div>

        <div className="w-full">
          <ImageStack
            images={images}
            autoplay={true}
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center gap-x-8 text-lg'>
        <div className='flex items-center justify-center gap-x-6'>
          <CalendarMDMIcon />
          <div> 
            <span className="font-semibold">Octobre</span>: Tournois régionaux <br/>
            <span className="font-semibold">Décembre</span>: Tournoi national
          </div>
        </div>

        <div className='flex items-center justify-center gap-x-6' >
          <BookIcon />
          <div className="font-semibold text-center w-[8rem] md:w-full">Lycéens de l&apos;année <br/> scolaire 2026-2027</div>
        </div>
      </div>

      <div className='w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 my-12 mb-24'>
        
        <div className="w-full space-y-4 p-8 bg-[#F9FAFB] rounded-3xl shadow-sm border-[1px] border-gray-100">
          <div className="flex justify-center">
            <div className="w-fit p-[10px] bg-[#629F73] rounded-full">
              <StarShineIcon className="h-8 w-8"/>
            </div>
          </div>

          <h1 className='text-center font-bold text-xl'>Chiffres clés</h1>
          <p>
            <span className="font-semibold">+1000 participants</span> aux tournois régionaux dans 9 villes du Maroc <br/>
            <span className="font-semibold">+150 étudiants</span> au tournoi national (4 jours) <br/>
            <span className="font-semibold">3 éditions</span> : une communauté en pleine croissance <br/>
            <span className="font-semibold">10 étudiants</span> sélectionnés pour ETEAM 2025 (Lyon) et 2026 (Lausanne) <br/>
          </p>
        </div>

        <div className="w-full space-y-4 p-8 bg-[#F9FAFB] rounded-3xl shadow-sm border-[1px] border-gray-100">
          <div className="flex justify-center">
            <div className="w-fit p-[10px] bg-[#629F73] rounded-full">
              <GlitterIcon className="h-8 w-8"/>
            </div>
          </div>

          <h1 className='text-center font-bold text-xl'>Vers le trophée MTYM</h1>
          <p>
            Avec son format XXL, le MTYM est ouvert à tous.<br/>
            Les tournois régionaux, en octobre dans 9 villes, rassemblent tous les étudiants intéressés.<br/>
            Le tournoi national, en décembre, réunit les meilleures équipes du Maroc.
          </p>
        </div>

        <div className="w-full space-y-4 p-8 bg-[#F9FAFB] rounded-3xl shadow-sm border-[1px] border-gray-100">
          <div className="flex justify-center">
            <div className="w-fit p-[10px] bg-[#629F73] rounded-full">
              <LightbulbIcon className="h-8 w-8"/>
            </div>
          </div>

          <h1 className='text-center font-bold text-xl'>Une expérience unique</h1>
          <p>
            Plus qu&apos;une compétition, le MTYM est un espace d&apos;apprentissage et de rencontres.<br/>
            Au programme : débats scientifiques, ateliers en mathématiques, informatique et IA, sessions d&apos;orientation et activités ludiques et conviviales.
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
