import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Input, Separator } from "@mdm/ui"
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@mdm/ui"


const educationLevels = [
  {label: "Bac +1", value:"bac-plus-1"},
  {label: "Bac +2", value:"bac-plus-2"},
  {label: "Bac +3", value:"bac-plus-3"},
  {label: "Bac +4", value:"bac-plus-4"},
]

const universityTypes = [
  {label: "Classes préparatoires (CPGE)", value:"cpge"},
  {label: "University", value:"university"},
  {label: "Engineering School post-Bac", value:"engineering-post-bac"},
  {label: "Engineering School post-CPGE", value:"engineering-post-cpge"},
]

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const EducationStep = ({
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
        Education
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
      Provide information on your level of study and your institution of higher education (in Morocco or abroad) in <span className='font-semibold'> the current academic year 2024/2025</span>.
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>
      
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Education Level */}
        <FormField
          control={form.control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level of study <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      {educationLevels.map(level =>
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* University Type Level */}
        <FormField
          control={form.control}
          name="universityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of study <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      {universityTypes.map(level =>
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Highschool */}
        <FormField
          control={form.control}
          name="universityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of University<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Enter a value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Highschool */}
        <FormField
          control={form.control}
          name="educationField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of study (Filière)<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Enter a value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}