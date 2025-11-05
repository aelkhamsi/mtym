import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@mdm/ui"
import { RadioGroup, RadioGroupItem, Separator } from '@mdm/ui'
import { useState } from 'react'
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'
import SelectOrInput from '@/app/components/forms/select-or-input'

export const ActivitiesStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  const [haveTalent, setHaveTalent] = useState(
    form.getValues('haveTalent') === 'yes'
  )

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Activités
      </h2>
      <Separator className='my-6 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-6'>
        {/* needDepartureShuttle */}
        <FormField
          control={form.control}
          name="haveTalent"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>As-tu besoin d&apos;une navette pour l&apos;aller ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setHaveTalent(value === 'yes')
                    if (value === 'no') {
                      form.setValue('talentDescription', '')
                      form.clearErrors('talentDescription')
                    }
                    field.onChange(value)
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="yes" />
                    <FormLabel className="font-normal"> Oui </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="no" />
                    <FormLabel className="font-normal"> Non </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Departure City */}
        {haveTalent && 
          <FormField
            control={form.control}
            name="talentDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Décrivez-nous votre talent, et si vous avez besoin de matériel (musique, micro, etc) <RequiredAsterisk /></FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Maximum 100 mots"
                  className="resize-none"
                  {...field}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        }
      </div>
    </motion.div>
  )
}