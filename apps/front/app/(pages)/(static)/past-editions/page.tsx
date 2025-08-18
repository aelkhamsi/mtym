import CtaSection from "@/app/components/cta/cta-section"
import TextureBg from "@/app/components/texture-bg"
import { CompassIcon, ExamIcon, RocketMtymIcon, SolutionIcon, TrophyIcon } from "@mdm/ui"
import Link from 'next/link'

export default function ConferencesPage() {

  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full max-w-sm md:max-w-5xl px-5 xl:px-0 mt-10">
        <div className="space-y-6">
          <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            MMC Edition <span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>2023</span>
          </h1>

          <div
            className="flex justify-around flex-wrap gap-6 p-8 rounded-lg animate-fade-up opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0">          
              <Link href='https://drive.google.com/file/d/1oCejbBinUACzqYRnTKhBNJqwmbluoGMw/view' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Practice exercises</span>
                  <RocketMtymIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/1mGo-D44d7u3odnpkQVJcPZujWZQznTBI/view' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Exam 2023</span>
                  <ExamIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/13ek3AjET72NA5BSAbEWqhbk-1rDq4_p3/view' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Solution 2023</span>
                  <SolutionIcon />
                  </div>
                </div>
              </Link>

              <Link
                className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                href='/past-editions/2023/results'
              > 
                <div className="flex flex-col items-center text-center">
                <span className="text-sm">Results 2023</span>
                <TrophyIcon />
                </div>
              </Link>
            </div>
          </div>

          <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            MMC Edition <span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>2024</span>
          </h1>
          
          <div
            className="flex justify-around flex-wrap gap-6 p-8 animate-fade-up opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0">          
              <Link href='https://drive.google.com/file/d/138cwliaGh_KuHp4RIKGVrmzirtHaW3tf/view' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Syllabus 2024</span>
                  <CompassIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/1L8Zla_r5Qh86J8lx36va9IE_YTuP04L2/view?usp=drive_link' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
                > 
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm">Exam 1 2024</span>
                    <ExamIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/14JGyh9KM5ekbF9XYe-auTgpwfdjYDu1e/view?usp=drive_link' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
                > 
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm">Exam 2 2024</span>
                    <ExamIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/13qO6jjetOpObz2MGRZe_9dRdWTQhYMq8/view?usp=drive_link' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
                > 
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm">Solutions 2024</span>
                    <SolutionIcon />
                  </div>
                </div>
              </Link>

              <Link href='/past-editions/2024/results'>
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
                > 
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm">Results 2024</span>
                    <TrophyIcon />
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>

        <CtaSection className="md:w-full mt-20" />
      </div>
    </TextureBg>
  )
}