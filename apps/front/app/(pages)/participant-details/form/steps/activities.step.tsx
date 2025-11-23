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
import RankedSelect from '@/app/components/forms/ranked-select'
import Link from 'next/link'

const workshopOptions = [
  {title: 'Can you beat maths ?', animators: "Ismail Bouhaj", value: 'math-bouhaj'},
  {title: 'How do AI think ? A gentle introduction to LLMs', animators: "Oumaima Hourrane", value: 'ai-hourrane'},
  {title: 'Math in Action: when computers bring ideas to life', animators: "Safaa Khadim, Achraf El Khamsi", value: 'cs-khadim-khamsi'},
  {title: 'What game theory tells us about life?', animators: "Mouad Zemzoumi", value: 'math-zemzoumi'},
]

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
      <Separator className='my-2 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-6'>
        {/* needDepartureShuttle */}
        <FormField
          control={form.control}
          name="haveTalent"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Souhaites-tu présenter un talent sur scène lors du Talent Show ? <RequiredAsterisk /></FormLabel>
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

      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Workshops
      </h2>
      <Separator className='my-2 bg-[#0284C7]'/>
      
      <p className='text-gray-600 font-light text-sm mb-6'>
        Vous aurez l&apos;opportunité de participer à l&apos;un des quatre workshops présentés dans ce document: <Link href={'https://drive.google.com/file/d/1Nvst0BhTTieRrlvVAoqS4WRKXayO9l8d/view?usp=sharing'} target='_blank'> <span className='text-blue-500 font-medium'>(cliquer sur ce lien)</span></Link><br/>
        Nous vous demandons de <span className='font-semibold'>classer tout les workshops selon votre préférence</span>.
      </p>

      <RankedSelect
        form={form}
        name='workshops'
        options={workshopOptions}
      />
    </motion.div>
  )
}