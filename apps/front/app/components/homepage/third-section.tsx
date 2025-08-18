import { Card } from "../card"


const ThirdSection = () => {
  return (
    <>
      {/* Transition border */}
      <div className="relative w-full flex justify-between -mt-11 h-11">
        <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#000102]"></div>
        <div className="flex justify-between mx-auto w-full px-[1.6rem] sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,100 0,0 100,100" fill="#000102" />
            <polygon points="100,0 0,0 100,100" fill="#FFFFFF" />
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 100,0 0,100" fill="#FFFFFF" />
            <polygon points="100,100 100,0 0,100" fill="#000102" />
          </svg>
        </div>
        <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#000102]"></div>
      </div>

      <div className='relative isolate overflow-hidden w-full flex flex-col justify-center items-center py-14 bg-[#000102] text-white space-y-10'>
        <h1 className='text-3xl font-bold font-neco'>
          You Event Journey
        </h1>

        <div className='max-w-screen-md text-center xl:p-0'>
          Structured to educate, challenge, and connect — here&apos;s what&apos;s on the agenda
        </div>

        <div
          className="md:flex w-full lg:w-3/4 text-sm my-4"
        >
          <div className='w-full'>
            <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-6 text-center px-14">
              <Card className="h-[20rem]" bgImageUrl="/past-edition/contest_2.webp">
                Math Competition
              </Card>

              <Card href='/conferences' className="h-[20rem]" bgImageUrl="/past-edition/panel.webp">
                Conferences & Panel
              </Card>

              <Card className="h-[20rem]" bgImageUrl="/past-edition/workshop.webp">
                Workshops
              </Card>

              <Card className="h-[20rem]" bgImageUrl="/past-edition/board_games.webp">
                Games & Fun
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Transition border */}
      <div className="relative w-full flex justify-between h-11">
        <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#000102] z-10"></div>
        <div className="flex justify-between mx-auto w-full px-[1.6rem] sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 100,0 0,100" fill="#000102" /> 
            <polygon points="100,100 100,0 0,100" fill="#FFF" />
          </svg>
          
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,100 0,0 100,100" fill="#FFF" />
            <polygon points="100,0 0,0 100,100" fill="#000102" />
          </svg>
        </div>
        <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#000102]"></div>
      </div>
    </>
  )
}

export default ThirdSection
