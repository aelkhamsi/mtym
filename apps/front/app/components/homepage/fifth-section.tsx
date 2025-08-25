import Link from "next/link";
import { AnimatedTooltip } from '@/app/components/animated-tooltip';
import { organizingCommittee, webDevelopment } from "@/app/(pages)/(static)/organizing-team/data";

const FifthSection = () => {
  const members = [...organizingCommittee, ...webDevelopment]
    .sort((a, b) => 0.5 - Math.random())
    .slice(0, 9)
    .map((member, index) => ({id: index, image: member?.imageSrc, name: member?.name}))

  return (
    <div className='relative overflow-hidden w-full flex flex-col justify-center items-center py-12 px-2 space-y-6 text-white bg-[#244B3A]'> 
      <h1 className='text-3xl text-[#F6A806] font-bold font-neco px-14 py-6'>
        Qui sommes-nous ?
      </h1>

      <div className='max-w-screen-md text-center my-6 xl:p-0'>
        Nous sommes des passionnés de science, unis par le désir de partager et de former les leaders de demain. 
        Notre vision est celle d'un Maroc où chaque jeune a la possibilité de réaliser son plein potentiel grâce à une éducation de qualité.
      </div>

      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={members} />
      </div>

      <Link
        href='organizing-team'
      >
        <button
          className="p-[3px] relative text-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6A806] via-[#F6A806]/80 to-[#F6A806]/50 rounded-lg" />
          <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
            Rencontrez l'équipe organisatrice
          </div>
        </button>
      </Link>

      <div className="relative overflow-hidden w-full h-[40rem] bg-[#244B3A] bg-[url(/group_photo.webp)] bg-center bg-cover bg-blend-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-[#244B3A] via-transparent to-[#244B3A]" />
      </div>
    </div>
  )
}

export default FifthSection
