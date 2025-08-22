import CtaSection from "@/app/components/cta/cta-section"
import { CompassIcon, ExamIcon } from "@mdm/ui";
import Link from "next/link";

export default function MathSprintPage() {

  return (
    <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-10 my-28">
      <h1 className="text-center text-4xl font-bold drop-shadow-sm">
        <span className='font-neco text-[#244B3A]'>Test de sélection</span>
      </h1>

      <div
        className="flex flex-col w-full md:flex-row md:justify-between md:space-x-8"
      >
        <div className="w-full space-y-4 p-4">
          <p className='font-bold text-sm text-[#F6A806]'>La sélection</p>
          <h1 className='font-bold text-3xl'>Comment va se dérouler la sélection ?</h1>
          <p>La sélection pour participer à MTYM repose principalement sur un test qui se tiendra le <span className="font-semibold">28 septembre 2025</span>. </p>
          <p>Ce test Le test se présentera sous la forme d'un questionnaire à choix multiples (QCM), et évaluera les connaissances et les compétences des candidats sur les sujets du syllabus, conçu pour couvrir l&apos;essentiel des notions à maîtriser.</p>

          <h2 className="font-bold">Quelques consignes</h2>
          <p>Afin de garantir l'intégrité de la sélection, la webcam doit rester activée pendant toute la durée du test. Veillez donc à disposer d'un ordinateur fiable, d'une connexion Internet stable et d'un espace de travail calme et bien éclairé.</p>
          <p>Les résultats finaux seront communiqués individuellement par e-mail.</p>
        </div>

        <div className="w-full space-y-4 p-4">
          <p className='font-bold text-sm text-[#F6A806]'>La préparation</p>
          <h1 className='font-bold text-3xl'>Comment se préparer pour le test ?</h1>
          
          <p>Pour vous aider à vous préparer, le <span className="font-semibold">syllabus</span> sur lequel se basera le test ainsi que des <span className="font-semibold">questions types</span> sont disponibles ci-dessous.</p>
          <p>L&apos;ensemble de ces ressources va vous permettre d&apos;aborder la sélection de manière sereine et de vous donner les meilleures chances de réussite.</p>

          <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <Link target="_blank" href='https://drive.google.com/file/d/19Nz9tYgi9tvoV-qNI4ArmgJeLS3CwtIE/view?usp=sharing'>
              <div className="flex flex-col items-center justify-center text-center h-[8rem] w-[9rem] bg-white border-b-4 border-b-[#629F73] bg-gray-200 border-2 shadow-md flex justify-center rounded-md">
                <span className="font-bold text-gray-600">Syllabus</span>
                <CompassIcon className="h-[4rem]"/>
              </div>
              {/* <div className="text-xs text-gray-500 mt-1">Available soon</div> */}
            </Link>

            <Link target="_blank" href='https://drive.google.com/file/d/1GtHKeWKbT0n4b57OvBUjzOS14Ns-_2-1/view?usp=sharing'>
              <div className="flex flex-col items-center justify-center text-center h-[8rem] w-[9rem] bg-white border-b-4 border-b-[#629F73] bg-gray-200 border-2 shadow-md flex justify-center rounded-md">
                <span className="font-bold text-gray-600">Questions types</span>
                <ExamIcon className="h-[4rem]"/>
              </div>
              {/* <div className="text-xs text-gray-500 mt-1">Available soon</div> */}
            </Link>
          </div>
        </div>
      </div>

      <CtaSection />
    </div>
  )
}