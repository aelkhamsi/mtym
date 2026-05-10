import SectionContainer from "@/app/components/section-container";

export default function ConferencesPage() {

  return (
    <SectionContainer className="pt-24 pb-20 z-0">
        <div className="space-y-10">
            <h1 className="text-center text-4xl font-bold drop-shadow-sm">
                <span className='font-neco text-[#244B3A]'>Planning</span>
            </h1>

            <img
                src='/images/planning_mtym.png'
                alt='planning'
                style={{height: 'auto', width: '100%'}}
            /> 
        </div>
    </SectionContainer>
  )
}