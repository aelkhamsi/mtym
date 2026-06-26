import CtaSection from "@/app/components/cta/cta-section"
import SectionContainer from "@/app/components/section-container";
import Image from "next/image";
import Link from "next/link";

export default function MathSprintPage() {

  return (
    <SectionContainer className="pt-24 pb-20 z-0">

      <div className="space-y-10">
        <h1 className="text-center text-4xl font-bold drop-shadow-sm">
          <span className='font-neco text-[#244B3A]'>Éditions passées</span>
        </h1>

        <div className="w-full space-y-4 p-4">
          <p>Vous trouverez içi les problèmes proposés lors des éditions passées. </p>
          <p>Ces problèmes vous donneront une idée du type de questions posées et vous aideront à vous familiariser avec le format des compétitions.</p>

          <div>3 éditions ont déjà vu le jour:
            <ul className="list-disc">
              <li><span className="font-bold">MTYM Mai 2024</span> au Lycée Mohammed VI d&apos;Excellence (LM6E/Lydex)</li>
              <li><span className="font-bold">MTYM Décembre 2024</span> à l&apos;AUI Ifrane</li>              
              <li><span className="font-bold">MTYM Décembre 2025</span> à l&apos;AUI Ifrane</li>              
            </ul>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 justify-between">
          <div className="flex flex-col items-center w-full lg:w-1/3">
            <div className="text-center">Mai 2024</div>
            <Link
              href='https://drive.google.com/file/d/1EKiMV4nwd4WL9fS2U4TGpxMPFpESRM2c/view?usp=sharing'
              target="_blank"
            >
              <Image
                src="/images/problems/problems_2024_mai.webp"
                alt="Logo"
                width={350}
                height={0}
                className="w-full"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center w-full lg:w-1/3">
            <div className="text-center">Décembre 2024</div>
            <Link
              href='https://drive.google.com/file/d/15cELRc4dH3tbKW6z7pCO7yXiL5H-KskM/view?usp=sharing'
              target="_blank"
            >
              <Image
                src="/images/problems/problems_2024_december.webp"
                alt="Logo"
                width={350}
                height={0}
                className="w-full"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center w-full lg:w-1/3">
            <div className="text-center">Décembre 2025</div>
            <Link
              href='https://drive.google.com/file/d/1EIRuCYoFHq9bVw56pzNSy13bJ9mnZlob/view?usp=sharing'
              target="_blank"
            >
              <Image
                src="/images/problems/problems_2025.webp"
                alt="Logo"
                width={350}
                height={0}
                className="w-full"
              />
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <CtaSection/>
        </div>
      </div>
    </SectionContainer>
  )
}