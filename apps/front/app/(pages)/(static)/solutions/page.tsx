import CtaSection from "@/app/components/cta/cta-section"
import TextureBg from "@/app/components/texture-bg"
import { ExamIcon, SolutionIcon } from "@mdm/ui"
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
            MMC <span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>2025</span>
          </h1>

          <div className="flex justify-center">
            <div className="text-center md:max-w-screen-lg space-y-2">
              <p>The brightest university minds went head-to-head in our toughest math competitions.</p>
              <p>Dive into the exact exams they faced, test your skills, and see how you measure up against the best.</p>
              <p>Great minds dared to try — now it&apos;s your turn.</p>
            </div>
          </div>

          <div
            className="flex justify-around flex-wrap rounded-lg animate-fade-up opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0">          
              <Link href='https://drive.google.com/file/d/1E9K6PUNvOd6b9rKDTqxJihLaCoNWsNw0/view?usp=sharing' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Exam Day 1</span>
                  <ExamIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/1lYkzFImu1IqSH2K9Sr5UHb6LOr7uAKRp/view?usp=sharing' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Exam Day 2</span>
                  <ExamIcon />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div
            className="flex justify-around flex-wrap animate-fade-up opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0">          
              <Link href='https://drive.google.com/file/d/1lhXnTaZkStQgzFLNBXo6EZ0q0JF0JOMl/view?usp=sharing' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Solution Day 1</span>
                  <SolutionIcon />
                  </div>
                </div>
              </Link>

              <Link href='https://drive.google.com/file/d/1Bug8fSR9Ba0mQbJOOG8PJorqgNk4w4FA/view?usp=sharing' target="_blank">
                <div 
                  className="h-[7rem] w-[8rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md py-2 hover:cursor-pointer shadow-lg"
                > 
                  <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Solution Day 2</span>
                  <SolutionIcon />
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