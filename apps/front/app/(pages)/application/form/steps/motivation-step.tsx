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
import Link from 'next/link';

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const MotivationStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number,
}) => {
  const [hasPreviousMathMarocParticipations, setHasPreviousMathMarocParticipations] = useState(false)
  const [hasPreviousExperiences, setHasPreviousExperiences] = useState(false)

  useEffect(() => {
    const formState = form.watch()
    setHasPreviousMathMarocParticipations(formState?.hasPreviousMathMarocParticipations === 'yes')
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
        Provide information about your past participations and your motivations.
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-6 grid grid-cols-1 gap-4 justify-between'>
        {/* Motivations */}
        <FormField
          control={form.control}
          name="motivations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your motivations to participate in MMC ?<RequiredAsterisk /></FormLabel>
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

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Has Previous Experiences */}
        <FormField
          control={form.control}
          name="hasPreviousExperiences"
          render={({ field }) => (
            <FormItem className="space-y-3">
              
              <FormLabel>Have you taken part in competitions before (Olympiads, concour, etc.)?<RequiredAsterisk /></FormLabel>
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
                <FormLabel>Please specify which ones and the result obtained<RequiredAsterisk /></FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Tell us about your achievements"
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
          name="hasPreviousMathMarocParticipations"
          render={({ field }) => (
            <FormItem className="space-y-3">
              
              <FormLabel>Have you ever taken part in Math Maroc Competition (MMC)?<RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setHasPreviousMathMarocParticipations(value === 'yes')
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
        {hasPreviousMathMarocParticipations && 
          <FormField
            control={form.control}
            name="previousMathMarocParticipations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify in which edition (2023 or 2024) and what was your ranking (<Link className="text-blue-500 underline" href='/past-editions' target="_blank">results link</Link>)?<RequiredAsterisk /></FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Tell us about your achievements"
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
        {/* Comments */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks / Comments</FormLabel>
              <FormControl>
              <Textarea
                placeholder="Anything to add?"
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