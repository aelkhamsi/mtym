import CtaSection from "@/app/components/cta/cta-section"
import TextureBg from "@/app/components/texture-bg"
import { ExamIcon } from "@mdm/ui";
import Link from "next/link";

export default function MathSprintPage() {

  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-10 mb-20">
        <h1 className="text-center text-4xl font-bold drop-shadow-sm">
          <span className='font-neco text-[#FF4925]'>Selection Test</span>
        </h1>

        <div
          className="flex flex-col w-full md:flex-row md:justify-between md:space-x-8"
        >
          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#1C55FF]'>The selection</p>
            <h1 className='font-bold text-3xl'>How will the selection process work ?</h1>
            <p>For the 2025 edition, the selection test will take place on June 8th.</p>

            <h2 className="font-bold">Online test</h2>
            <p>Each candidate will take a 90-minute online test on the secure platform Evalmee. The questions will be strictly based on the Math Sup (L1) syllabus.</p>
            <p>To ensure the integrity of the selection, the webcam must remain activated throughout; therefore, ensure you have a reliable computer, a stable internet connection, and a quiet, well-lit workspace.</p>
            <p>Final results will be communicated individually by email.</p>
          </div>

          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#1C55FF]'>Test Preparation</p>
            <h1 className='font-bold text-3xl'>How to prepare for the test ?</h1>
            
            <p>The test will take the form of a multiple-choice questionnaire (MCQ) and will cover various mathematical concepts. It will allow us to assess your logical reasoning, your ability to solve complex problems, and more generally, your level in mathematics.</p>
            <p>To help you prepare thoroughly for the selection test, we would like to share with you the Long Problem List used in the 2024 selection test.</p>

            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Link target="_blank" href='https://drive.google.com/file/d/1myh4omK1NeONcE-PK7cOtpA54SFlJF6N/view?usp=sharing'>
                <div className="flex flex-col items-center justify-center text-center h-[6rem] w-[8rem] bg-white border-b-4 border-b-red-500 bg-gray-200 border-2 shadow-md flex justify-center rounded-md">
                  <span className="font-bold text-gray-600">Problem List</span>
                  <ExamIcon className="h-[3rem]"/>
                </div>
                {/* <div className="text-xs text-gray-500 mt-1">Available soon</div> */}
              </Link>
            </div>
          </div>
        </div>

        <CtaSection />
      </div>
    </TextureBg>
  )
}