import Link from "next/link";
import { AnimatedTooltip } from '@/app/components/animated-tooltip';
import { organizingCommittee, webDevelopment } from "@/app/(pages)/(static)/organizing-team/data";
import CtaSection from "../cta/cta-section";

const FifthSection = () => {
  const members = [...organizingCommittee, ...webDevelopment]
    .sort((a, b) => 0.5 - Math.random())
    .slice(0, 9)
    .map((member, index) => ({id: index, image: member?.imageSrc, name: member?.name}))

  return (
    <div className='relative isolate overflow-hidden w-full flex flex-col justify-center items-center py-12 px-2 space-y-6 bg-[#fff9f3] bg-[url(/arches.png)] bg-center bg-repeat'>
      <h1 className='text-3xl font-bold font-neco px-14 py-6'>
        Who are we ?
      </h1>

      <div className='max-w-screen-md text-center my-6 xl:p-0'>
        We are people with a passion for science, united by a desire to share and train the leaders of tomorrow. 
        Our vision is of a Morocco where every young person has the opportunity to realize his or her full potential through quality education.
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C55FF] to-cyan-600 rounded-lg" />
          <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
            Meet the Organizing Team
          </div>
        </button>
      </Link>

      <CtaSection className="mt-6 mb-20" />
    </div>
  )
}

export default FifthSection
