import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Checkbox, Separator } from '@mdm/ui'
import Link from 'next/link'
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'

export const ValidationStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Validation
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Veuillez lire attentivement nos conditions générales avant de soumettre votre candidature.
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2md:grid-cols-2 gap-8 justify-between'>
        <FormField
          control={form.control}
          name="termsAgreement"
          render={({ field }) => (
            <div className="space-y-2">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Conditions Générales <RequiredAsterisk />
                  </FormLabel>
                  <FormDescription>
                  Je confirme avoir pris connaissance du règlement <Link className="text-blue-500 font-bold underline" href='https://drive.google.com/file/d/1tE5qMUjEoeicBQ01XqsF5LyzLqT34rsm/view?usp=drive_link' target="_blank">(fichier)</Link> de l&apos;événement et m&apos;engage à le respecter.<br/>
                  En particulier, je m&apos;engage à être présent sur le campus de l&apos;AUI pendant toute la durée de la compétition (sauf exception demandée par e-mail et explicitement approuvée par le comité d&apos;organisation).
                  </FormDescription>
                </div>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />
      </div>
    </motion.div>
  )
}