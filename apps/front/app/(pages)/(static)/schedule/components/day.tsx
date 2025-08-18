import React from 'react'
import { DaySchedule } from './schedule'

const Day = ({
  dayLabel,
  daySchedule,
}:{
  dayLabel: string,
  daySchedule: DaySchedule,
}) => {
  return (
    <div className='flex flex-col'>
      <div className='mb-2 h-6 text-sm'>
        {dayLabel}
      </div>

      {daySchedule.map((activities, index) => {
        const parralelActivities = Array.isArray(activities)
          ? [...activities]
          : [activities]
        ;

        return (
          <div className={`${parralelActivities.length > 1 ? 'flex' : ''}`} key={index}>
            {parralelActivities.map((activity, index) =>
                <div 
                  key={index} 
                  className={`${activity?.bgColor} flex justify-center items-center outline outline-white outline-2 text-sm md:text-base`}
                  style={{height: `${activity?.rowspan * 1.5}rem`, width: `${100/parralelActivities?.length}%`}} 
                >
                  <div className='leading-none'>
                    {activity?.label} <br/>
                    <span className='text-xs text-gray-900'>{activity?.description}</span>
                  </div>
                </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Day