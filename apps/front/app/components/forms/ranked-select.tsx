import { Cross1Icon } from '@mdm/ui';
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

type WorkshopOption = {
  title: string;

  animators: string;

  value: string;
}

const RankedSelect = ({
  name,
  form,
  options,
}:{
  name: string,
  form: UseFormReturn,
  options: WorkshopOption[],
}) => {
  const [chosenOptions, setChosenOptions] = useState<WorkshopOption[]>([])
  const [remainingOptions, setRemainingOptions] = useState<WorkshopOption[]>([])

  useEffect(() => {
    const chosenValues = form.getValues(name) as string[]
    const chosen = chosenValues.map(value => options.find(option => option.value === value)) as WorkshopOption[]
    options.filter(option => chosenValues.includes(option.value))
    const remaining = options.filter(option => !chosenValues.includes(option.value))
    setChosenOptions(chosen)
    setRemainingOptions(remaining)
  }, [])

  const onChooseOption = (option: WorkshopOption) => {
    const remaining = remainingOptions.filter(opt => opt.value !== option.value)
    const chosen = [...chosenOptions, option]
    setRemainingOptions(remaining)
    setChosenOptions(chosen)
    form.setValue(name, chosen.map(opt => opt.value))
  }

  const onUnchooseOption = (option: WorkshopOption) => {
    const remaining = [...remainingOptions, option]
    const chosen = chosenOptions.filter(opt => opt.value !== option.value)
    setChosenOptions(chosen)
    setRemainingOptions(remaining)
    form.setValue(name, chosen.map(opt => opt.value))
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div>
        {remainingOptions.map((option) => 
          <div className='bg-gray-100 rounded-md text-sm mb-2 p-2 hover:cursor-pointer' onClick={() => onChooseOption(option)}>
            {option.title}<br/>
            <span className='text-gray-500 font-light text-xs'>{option.animators}</span>
          </div>
        )}
      </div>

      <div>
        {chosenOptions.length > 0 && chosenOptions.map((option, index) => 
          <div className='flex justify-between bg-gray-100 rounded-md text-sm mb-2 p-2 hover:cursor-pointer' onClick={() => onUnchooseOption(option)}>
            <div className='flex items-center p-2 text-lg'>{index+1}</div>
            
            <div>
              {option.title}<br/>
              <span className='text-gray-500 font-light text-xs'>{option.animators}</span>
            </div>

            <div className='flex items-center text-lg p-2'><Cross1Icon /></div>
          </div>
        )}

        {chosenOptions.length === 0 && 
          <div className='h-full flex justify-center items-center text-xs text-gray-400'>
            <p>Cliquez sur une option pour la classer</p>
          </div>
        }
      </div>
    </div>
  )
}

export default RankedSelect
