import { motion } from 'framer-motion'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { Separator } from "@mdm/ui"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import Link from 'next/link';
import { FileInput } from '../components/file-input';
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk';

export const UploadStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number,
}) => {
  const initFileInput = (field: ControllerRenderProps, id: string) => {
    if (field?.value && field?.value.length) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(field?.value[0]);
      setTimeout(() => {
        const fileInputElement = document.querySelector(`#${id}`) as HTMLInputElement;
        fileInputElement.files = dataTransfer.files;
      }, 300)
    }
  }

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
        Uploader les documents relatifs à votre candidature
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* REGULATIONS */}
        <FormField
          control={form.control}
          name="fileRegulations"
          render={({ field }) => {
            initFileInput(field, "fileRegulations")

            return (
              <FormItem>
                <FormLabel>Règlement signé (<Link className="text-blue-500 underline" href='https://drive.google.com/file/d/1tE5qMUjEoeicBQ01XqsF5LyzLqT34rsm/view?usp=sharing' target="_blank">file</Link>)<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileRegulations" />
                </FormControl>
                <FormDescription>
                    <span className="text-blue-500">Remarque</span>: À imprimer, signer puis scanner. <span className="font-bold">Pas besoin de légaliser.</span>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* GRADES */}
        <FormField
          control={form.control}
          name="fileGrades"
          render={({ field }) => {
            initFileInput(field, "fileGrades")

            return (
              <FormItem>
                <FormLabel>Bulletin de notes (dernière année 2024/2025)<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileGrades" />
                </FormControl>
                <FormDescription>
                  <span className="text-blue-500">Remarque</span>: Ce fichier sera utilisé pour vérifier les notes que vous avez fournies plus tôt dans le formulaire.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
    </motion.div>
  )
}