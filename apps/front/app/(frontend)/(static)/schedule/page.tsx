import CtaSection from "@/app/components/cta/cta-section";
import ScheduleCarousel from "./components/schedule-carousel";

export default function SchedulePage() {
  return (    
    <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-20 my-28">
      <h1 className="text-center text-4xl font-bold drop-shadow-sm">
        <span className='font-neco text-[#FF4925]'>Schedule</span>
      </h1>

      <div
        className="animate-fade-up bg-clip-text text-center font-display text-base font-bold text-black opacity-0"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <div className="flex flex-col-reverse md:flex-row space-x-10">
          <ScheduleCarousel />
          <div className="flex flex-col space-y-1 text-sm mt-8">
            <div className="py-1 px-6 bg-red-400">Contest</div>
            <div className="py-1 px-6 bg-orange-400">Talks</div>
            <div className="py-1 px-6 bg-blue-400">Workshops</div>
            <div className="py-1 px-6 bg-green-400">Fun</div>
            <div className="py-1 px-6 bg-purple-200">Meals</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg">Notes</h2>
        <ul className="list-disc">
          <li>CoC = College of Computing building</li>
          <li>Checkout: 1 group should finalize the checkout before the closing ceremony and 1 group should do it after. We will divide people on more groups for the shuttles to the train station.</li>
          <li>Conferences: everyone should arrive at 13:45</li>
          <li>Night activites are optional. Dinner will be open until 21:30</li>
          <li>Grade dispute: we will send the results (except 1 problem chosen randomly for each contestant) on Monday before 2pm; whoever wants to dispute their grade can come talk to the jury in CoC. Others will be free or can play board games</li>
        </ul>
      </div>
      
      <CtaSection />
    </div>
  )
}
