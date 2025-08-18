import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form'
import { isOverEighteen } from '@mdm/utils'

export const useAge = (form: UseFormReturn) => {
  const [isAdult, setIsAdult] = useState(true)

  useEffect(() => {
    const formState = form.watch()
    const dateOfBirth = formState?.dateOfBirth
    if (dateOfBirth) {
      const isAdult = isOverEighteen(dateOfBirth as Date)
      setIsAdult(isAdult)
    }
  }, [])

  return {
    isAdult,
    setIsAdult
  }
}
