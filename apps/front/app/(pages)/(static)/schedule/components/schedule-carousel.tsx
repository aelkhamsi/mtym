import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@mdm/ui"
import { schedule, dayLabels } from './schedule'
import Day from "./day"
const ScheduleCarousel = () => {
  return (
    <div className="p-8 lg:p-0 font-normal">
      <Carousel>
        <CarouselContent>
          {schedule.map((daySchedule, index) =>
            <CarouselItem className="basis-1/2 lg:basis-[20%]" key={index}> <Day dayLabel={dayLabels[index]} daySchedule={daySchedule} /> </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ScheduleCarousel