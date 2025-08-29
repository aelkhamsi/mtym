import Link from "next/link";
import CtaButton from '../cta/cta-button';
import { Button } from "@mdm/ui";

const ParticipationStepsSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-12 px-2 space-y-14">
      <h1 className='text-3xl text-center font-bold font-neco'>
        Comment participer ?
      </h1>

      <div
        className="flex flex-col space-y-10 md:flex-row md:space-y-0 w-full lg:w-3/4 my-4"
      >
        <div className='w-full text-center'>
          <span className="inline-block border bg-[#244B3A] text-white px-4 py-2 rounded-full text-2xl">
            1
          </span>

          <div className='text-center p-6 text-lg font-semibold text-[#244B3A]'>
            Soumets ta candidature
          </div>

          <div className='text-center p-6'>
            Vous devez remplir et soumettre votre candidature de façon individuelle avant le <span className='font-bold'>20 septembre 2025</span>.
          </div>

          <CtaButton label="Candidature" />
        </div>

        <div className='w-full text-center'>
          <span className="inline-block border bg-[#244B3A] text-white px-4 py-2 rounded-full text-2xl">
            2
          </span>

          <div className='text-center p-6 text-lg font-semibold text-[#244B3A]'>
            Crée ou Rejoins ton équipe
          </div>

          <div className='text-center p-6'>
            Vous devez créer voter propore équipe ou rejoindre une équipe déjà existante avant le  <span className='font-bold'>20 septembre 2025</span>.
          </div>

          <CtaButton label="Équipe" href='/profile/team' />
        </div>

        <div className='w-full text-center'>
          <span className="inline-block border bg-[#244B3A] text-white px-4 py-2 rounded-full text-2xl">
            3
          </span>

          <div className='text-center p-6 text-lg font-semibold text-[#244B3A]'>
            Passe le test de sélection
          </div>

          <div className='text-center p-6'>
            Les participants ayant soumis un dossier complet et faisant partie d&apos;une équipe composée de 3 à 5 membres seront invités à passer un test de sélection le <span className="font-bold">28 septembre 2025</span>.
          </div>

          <Link href="selection">
            <Button className='w-fit bg-transparent text-black border border-black hover:text-white'>
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const TutorialSection = () => {
  return (
    <div 
      className="flex justify-center p-4"
    >
      <iframe width="718" height="450" src="https://www.youtube.com/embed/4FmoWRmPn64?si=33vWIDqmvNKTE7lu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  )
}

const SyllabusSection = () => {
  return (
    <div className="space-y-8">
      <h1 className='text-3xl text-center font-bold font-neco'>
        How to prepare for the competition ?
      </h1>

      <div
        className="flex flex-col items-center text-center w-full space-y-4"
      >
        <div>To help you prepare thoroughly for the selection test, there is all you need to know about the mathematical topics covered in the competition.</div>
        <Link href='/syllabus'>
          <div className="bg-[#252162] w-fit py-4 px-8 text-white rounded-xl hover:pointer-cursor hover:bg-[#393292]">
            Competition Syllabus
          </div>
        </Link>
      </div>
    </div>
  )
}

const FourthSection = () => {
  return (
    <div className='space-y-10 mb-10'>
      <ParticipationStepsSection />
      <TutorialSection />
    </div>
  )
}

export default FourthSection
