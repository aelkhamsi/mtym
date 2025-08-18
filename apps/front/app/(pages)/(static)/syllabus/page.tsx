import CtaSection from "@/app/components/cta/cta-section"
import TextureBg from "@/app/components/texture-bg"
import { ExamIcon } from "@mdm/ui";
import Link from "next/link";

export default function SyllabusPage() {

  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-10 mb-20">
        <h1 className="text-center text-4xl font-bold drop-shadow-sm">
          <span className='font-neco text-[#FF4925]'>Syllabus</span>
        </h1>

        <div className="w-full space-y-8 p-4 text-center">
          <p>
            The 3rd edition of Math&Maroc Competition will take place in July 2025 !<br/>
            University-level students currently undergoing a curriculum will be able to participate. This edition will be open to students from Bac+1 to Bac+4.
          </p>

          <p className="font-semibold">
            This syllabus will establish the topics that will be covered in the competition problems. <br/>
            It should also help you prepare more efficiently for our competition.
          </p>

          <p>
            We believe that the material covered in Bac+1 mathematics, such as CPGE MPSI, will be sufficient with <span className="font-semibold">certain exceptions</span>.<br/>
            Please carefully read the syllabus below.
          </p>

          <div
            className="flex flex-col items-center text-center w-full space-y-4"
          >
            <div>To help you prepare thoroughly for the selection test, there is all you need to know about the mathematical topics covered in the competition.</div>
            <Link target='_blank' href='https://drive.google.com/file/d/1wNiM858X5M9QGwjvtzxGIFEqF9PZ48kZ/view?usp=sharing'>
              <div className="bg-[#252162] w-fit py-4 px-8 text-white rounded-xl hover:pointer-cursor hover:bg-[#393292]">
                Competition Syllabus
              </div>
            </Link>
          </div>

          <p>
          <span className="font-semibold">Remark : </span> It is of the utmost importance to understand that MMC is not an academic examination.<br/>
          Rather, it aims to challenge your capacity to deploy efficiency and creativity in problem-solving.
          </p>
        </div>
      </div>

      <CtaSection />
    </TextureBg>
  )
}
{/* <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Link target="_blank" href='https://drive.google.com/file/d/1myh4omK1NeONcE-PK7cOtpA54SFlJF6N/view?usp=sharing'>
                <div className="flex flex-col items-center justify-center text-center h-[6rem] w-[8rem] bg-white border-b-4 border-b-red-500 bg-gray-200 border-2 shadow-md flex justify-center rounded-md">
                  <span className="font-bold text-gray-600">Problem List</span>
                  <ExamIcon className="h-[3rem]"/>
                </div>
              </Link>
            </div> */}