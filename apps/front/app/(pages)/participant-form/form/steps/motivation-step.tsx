import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Separator, Textarea } from "@mdm/ui"
import { RadioGroup, RadioGroupItem } from '@mdm/ui';
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk';

export const MotivationStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number,
}) => {
  const [hasPreviousMTYMParticipations, setHasPreviousMTYMParticipations] = useState(false)
  const [hasPreviousExperiences, setHasPreviousExperiences] = useState(false)

  useEffect(() => {
    const formState = form.watch()
    setHasPreviousMTYMParticipations(formState?.hasPreviousMTYMParticipations === 'yes')
    setHasPreviousExperiences(formState?.hasPreviousExperiences === 'yes')
  }, [])

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Motivations
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Fournissez des informations sur vos participations passées et vos motivations.
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Has Previous Experiences */}
        <FormField
          control={form.control}
          name="hasPreviousExperiences"
          render={({ field }) => (
            <FormItem className="space-y-3">
              
              <FormLabel>Avez-vous déjà participé à des compétitions auparavant ? (Olympiades, concours, etc.)?<RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setHasPreviousExperiences(value === 'yes')
                    if (value === 'no') {
                      form.setValue('previousExperiences', '')
                      form.clearErrors('previousExperiences')
                    }
                    field.onChange(value)}
                  }
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous Experiences */}
        {hasPreviousExperiences && 
          <FormField
            control={form.control}
            name="previousExperiences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veuillez préciser lesquels et le résultat obtenu.<RequiredAsterisk /></FormLabel>
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

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Has Previous Experiences */}
        <FormField
          control={form.control}
          name="hasPreviousMTYMParticipations"
          render={({ field }) => (
            <FormItem className="space-y-3">
              
              <FormLabel>Avez-vous participé à MTYM en Mai 2024 ou en Décembre 2024 ?<RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setHasPreviousMTYMParticipations(value === 'yes')
                    if (value === 'no') {
                      form.setValue('previousMTYMParticipations', '')
                      form.clearErrors('previousMTYMParticipations')
                    }
                    field.onChange(value)}
                  }
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous Experiences */}
        {hasPreviousMTYMParticipations && 
          <FormField
            control={form.control}
            name="previousMTYMParticipations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veuillez préciser le nom de votre équipe<RequiredAsterisk /></FormLabel>
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

      <div className='mt-6 grid grid-cols-1 gap-4 justify-between'>
        {/* Motivations */}
        <FormField
          control={form.control}
          name="motivations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quelles sont vos motivations pour participer à MTYM ?<RequiredAsterisk /></FormLabel>
              <FormControl>
              <Textarea
                placeholder="Maximum 300 words"
                className="resize-none"
                {...field}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-4 justify-between'>
        {/* Comments */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarques / Commentaires</FormLabel>
              <FormControl>
              <Textarea
                placeholder="Quelque chose à rajouter?"
                className="resize-none"
                {...field}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}