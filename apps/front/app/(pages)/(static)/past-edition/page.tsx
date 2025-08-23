import CtaSection from "@/app/components/cta/cta-section"
import { CompassIcon, ExamIcon } from "@mdm/ui";
import Link from "next/link";

export default function MathSprintPage() {

  return (
    <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-10 my-28">
      <h1 className="text-center text-4xl font-bold drop-shadow-sm">
        <span className='font-neco text-[#244B3A]'>Édition passée</span>
      </h1>

      <CtaSection />
    </div>
  )
}