import { Card } from "../card"


const ThirdSection = () => {
  return (
    <>
      {/* Transition border */}
      <div className="relative w-full flex justify-between -mt-11 h-11">
        <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#122019]"></div>
        <div className="flex justify-between mx-auto w-full px-[1.6rem] sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,100 0,0 100,100" fill="#122019" />
            <polygon points="100,0 0,0 100,100" fill="#FFFFFF" />
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 100,0 0,100" fill="#FFFFFF" />
            <polygon points="100,100 100,0 0,100" fill="#122019" />
          </svg>
        </div>
        <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#122019]"></div>
      </div>

      <div className='relative overflow-hidden w-full flex flex-col justify-center items-center pt-14 bg-[#122019] text-white space-y-10'>
        <h1 className='text-3xl font-bold font-neco text-[#F6A806]'>
          Votre aventure MTYM
        </h1>

        <div className='max-w-screen-md text-center xl:p-0'>
          Tous les piliers qui font de MTYM une expérience unique
        </div>

        <div
          className="md:flex w-full lg:w-3/4 text-sm my-4"
        >
          <div className='w-full'>
            <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-6 text-center px-14">
              <Card className="h-[20rem]" bgImageUrl="/slideshow/competition2.webp">
                Compétition de Math
              </Card>

              <Card className="h-[20rem]" bgImageUrl="/slideshow/conference_amine.webp">
                Conférences & Panel
              </Card>

              <Card className="h-[20rem]" bgImageUrl="/slideshow/workshop_math.webp">
                Workshops
              </Card>

              <Card className="h-[20rem]" bgImageUrl="/slideshow/board_games.webp">
                Jeux & Divertissements
              </Card>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden w-full h-[35rem] bg-[#122019] bg-[url(/opening_ceremony.webp)] bg-center bg-cover bg-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-b from-[#122019] via-transparent to-[#122019]" />
        </div>
      </div>

      {/* Transition border */}
      <div className="relative w-full flex justify-between h-11">
        <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#122019] z-10"></div>
        <div className="flex justify-between mx-auto w-full px-[1.6rem] sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 100,0 0,100" fill="#122019" /> 
            <polygon points="100,100 100,0 0,100" fill="#FFF" />
          </svg>
          
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,100 0,0 100,100" fill="#FFF" />
            <polygon points="100,0 0,0 100,100" fill="#122019" />
          </svg>
        </div>
        <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#122019]"></div>
      </div>
    </>
  )
}

export default ThirdSection
