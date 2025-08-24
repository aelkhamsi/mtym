import CtaSection from "@/app/components/cta/cta-section"
import { CompassIcon, ExamIcon } from "@mdm/ui";
import Image from "next/image";
import Link from "next/link";

export default function MathSprintPage() {

  return (
    <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-10 my-28">
      <h1 className="text-center text-4xl font-bold drop-shadow-sm">
        <span className='font-neco text-[#244B3A]'>Éditions passées</span>
      </h1>

      <div className="w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 justify-between">
        <div className="w-full lg:w-1/3 space-y-4 p-4">
          <h1 className='font-bold text-3xl'>Les problèmes des dernières éditions</h1>
          <p>Vous trouverez içi les problèmes proposés lors des éditions passées. </p>
          <p>Ces problèmes vous donneront une idée du type de questions posées et vous aideront à vous familiariser avec le format des compétitions.</p>

          <p>2 éditions ont déjà vu le jour:
            <ul className="list-disc">
              <li><span className="font-bold">MTYM Mai 2024</span> à l&apos;UM6P Ben-guerir</li>
              <li><span className="font-bold">MTYM Décembre 2024</span> à l&apos;AUI Ifrane</li>              
            </ul>
          </p>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="text-center">Mai 2024</div>
          <Link
            href='https://drive.google.com/file/d/1EKiMV4nwd4WL9fS2U4TGpxMPFpESRM2c/view?usp=sharing'
            target="_blank"
          >
            <img
              src="/problems_mai_2025.webp"
              alt="Logo"
              className="w-full" 
            />
          </Link>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="text-center">Décembre 2024</div>
          <Link
            href='https://drive.google.com/file/d/15cELRc4dH3tbKW6z7pCO7yXiL5H-KskM/view?usp=sharing'
            target="_blank"
          >
            <img
              src="/problems_decembre_2025.webp"
              alt="Logo"
              className="w-full" 
            />
          </Link>
        </div>
      </div>

      <CtaSection />
    </div>
  )
}