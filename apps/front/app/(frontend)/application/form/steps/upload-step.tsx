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
import { FileInput } from '../components/file-input';
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk';

export const initFileInput = (field: any, id: string) => {
  if (field?.value && field?.value.length) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(field?.value[0]);
    setTimeout(() => {
      const fileInputElement = document.querySelector(`#${id}`) as HTMLInputElement;
      if (fileInputElement) fileInputElement.files = dataTransfer.files;
    }, 300)
  }
}

export const UploadStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number,
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
        Uploader les documents relatifs à votre candidature
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* CNIE */}
        <FormField
          control={form.control}
          name="fileCnie"
          render={({ field }) => {
            initFileInput(field, "fileCnie")

            return (
              <FormItem>
                <FormLabel>CNIE recto-verso ou pièce d'identité avec photo<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileCnie" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* PHOTO */}
        <FormField
          control={form.control}
          name="filePhoto"
          render={({ field }) => {
            initFileInput(field, "filePhoto")

            return (
              <FormItem>
                <FormLabel>Photo<RequiredAsterisk /></FormLabel>
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
          name="fileGrades"
          render={({ field }) => {
            initFileInput(field, "fileGrades")

            return (
              <FormItem>
                <FormLabel>Bulletin de notes (dernière année 2025-2026)<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileGrades" />
                </FormControl>
                <FormDescription>
                  <span className="text-blue-500">Remarque</span>: Veuillez vous assurer que les informations suivantes sont clairement visibles sur votre bulletin : nom, prénom, code Massar, année scolaire et nom de l'établissement.
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