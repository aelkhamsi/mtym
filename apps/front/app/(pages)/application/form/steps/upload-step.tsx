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

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

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
        Provide the student&apos;s personal documents
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
                <FormLabel>CNIE (recto & verso) <RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileCnie" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* School Certificate */}
        <FormField
          control={form.control}
          name="fileSchoolCertificate"
          render={({ field }) => {
            initFileInput(field, "fileSchoolCertificate")

            return (
              <FormItem>
                <FormLabel>Schooling certificate for the year 2024-2025<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileSchoolCertificate" />
                </FormControl>
                <FormDescription>
                  <span className="text-blue-500">Remark</span>: If you can't obtain them, please email us to request an exception
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* REGULATIONS */}
        <FormField
          control={form.control}
          name="fileRegulations"
          render={({ field }) => {
            initFileInput(field, "fileRegulations")

            return (
              <FormItem>
                <FormLabel>Regulations signed (<Link className="text-blue-500 underline" href='https://drive.google.com/file/d/1spkc0-KyaBbeq9sWT2x8Vj0EEoO-FGi7/view?usp=sharing' target="_blank">file</Link>)<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileRegulations" />
                </FormControl>
                <FormDescription>
                    <span className="text-blue-500">Remark</span>:  print it out, sign it by hand, then scan it. <span className="font-bold">No need to legalize.</span>.
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
                <FormLabel>Last bulletin obtained<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileGrades" />
                </FormControl>
                <FormDescription>
                  <span className="text-blue-500">Remark</span>: If you can't obtain them, please email us to request an exception
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