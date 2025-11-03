import SelectOrInput from '@/app/components/forms/select-or-input'
import { Button, Input, Separator, Textarea } from '@mdm/ui'
import { motion } from 'framer-motion'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { CheckboxAndInput } from '@/app/components/forms/checkbox-and-input'

const foodAllergies = [
  { label: 'Aucune', value: 'none' },
  { label: 'Gluten', value: 'gluten' },
  { label: 'Lactose', value: 'lactose' },
  { label: 'Arachides', value: 'arachides' },
]

const nonFoodAllergies = [
  { label: 'Aucune', value: 'none' },
  { label: 'Pollen', value: 'pollen' },
  { label: "Piqûres d'insectes", value: 'insects' },
]

export const MedicalInformationStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {

  const { fields: foodAllergyFields, append: appendFoodAllergy } = useFieldArray({
    name: "foodAllergy",
    control: form.control,
  }) as any

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Allergies et intolérances
      </h2>
      <Separator className='mt-2 mb-6 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
        {/* Food Allergy */}
        <CheckboxAndInput
          name="foodAllergy"
          form={form}
          label="Allergies Alimentaires"
          options={foodAllergies}
          required={true}
        ></CheckboxAndInput>

        {/* Non-Food Allergy */}
        <CheckboxAndInput
          name="nonFoodAllergy"
          form={form}
          label="Allergies non Alimentaires"
          options={nonFoodAllergies}
          required={true}
        ></CheckboxAndInput>

        {/* Allergy Precaution */}
        <FormField
          control={form.control}
          name="allergyPrecaution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>En cas de réaction allergique, des précautions sont-elles nécessaires (procédure, médicament spécifiques...) ?
              </FormLabel>
              <FormControl>
              <Textarea
                placeholder="Entrez votre réponse"
                className="resize-none"
                {...field}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <h2 className='text-base font-semibold leading-7 text-[#0284C7] mt-4'>
        Santé
      </h2>
      <Separator className='mt-2 mb-6 bg-[#0284C7]'/>
    </motion.div>
  )
}