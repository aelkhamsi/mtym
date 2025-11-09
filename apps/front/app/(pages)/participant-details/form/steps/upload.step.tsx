import { Separator } from '@mdm/ui'
import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@mdm/ui"
import { initFileInput } from '@/app/(pages)/application/form/steps/upload-step'
import { FileInput } from '../components/file-input'
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'
import Link from 'next/link'

export const UploadStep = ({
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
        Uploads
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Uploader les documents relatifs à votre participation
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* REGULATIONS */}
        <FormField
          control={form.control}
          name="filePhoto"
          render={({ field }) => {
            initFileInput(field, "filePhoto")

            return (
              <FormItem>
                <FormLabel>Photo d&apos;identité <RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="filePhoto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* GRADES */}
        <FormField
          control={form.control}
          name="fileParentalAuthorization"
          render={({ field }) => {
            initFileInput(field, "fileParentalAuthorization")

            return (
              <FormItem>
                <FormLabel>Autorisation parentale <Link className='text-blue-500' target='_blank' href='https://drive.google.com/file/d/1rKCIRwKzB55FU3F6KKin5X9TWKo75ZZT/view?usp=drive_link'>(fichier)</Link> <RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileParentalAuthorization" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
    </motion.div>
  )
}