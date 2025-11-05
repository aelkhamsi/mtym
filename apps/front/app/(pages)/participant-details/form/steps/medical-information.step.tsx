import { RadioGroup, RadioGroupItem, Separator, Textarea } from '@mdm/ui'
import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { CheckboxAndInput } from '@/app/components/forms/checkbox-and-input'
import { useState } from 'react'
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'

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

const illnessOrDisability = [
  { label: 'Aucune', value: 'none' },
  { label: 'Asthme', value: 'asthme' },
  { label: "Diabète", value: 'diabete' },
  { label: 'Épilepsie', value: 'epilepsie' },
  { label: 'Trouble du spectre autistique (TSA)', value: 'autiste' },
  { label: "TDAH", value: 'tdah' },
]

export const MedicalInformationStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  const [isOnMedication, setIsOnMedication] = useState(form.getValues('isOnMedication') === 'yes' ?? false)
  
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

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-6'>
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
      </div>

      <div className='grid grid-cols-1 justify-between my-4'>
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
      
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 justify-between'>
        {/* Illness or Disability */}
        <CheckboxAndInput
          name="illnessOrDisability"
          form={form}
          label="Souffrez-vous d’une maladie chronique ou d’un handicap ?"
          options={illnessOrDisability}
          required={true}
        ></CheckboxAndInput>

        {/* Special Accommodations */}
        <FormField
          control={form.control}
          name="specialAccommodations"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Avez-vous besoin d&apos;un aménagement ou d&apos;une attention particulière pendant le tournoi ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value)}
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

        {/* Is On Medication */}
        <FormField
          control={form.control}
          name="isOnMedication"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Suivez-vous actuellement un traitement médical ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setIsOnMedication(value === 'yes')
                    if (value === 'no') {
                      form.setValue('medication', '')
                      form.clearErrors('medication')
                      form.setValue('needAssistance', '')
                      form.clearErrors('needAssistance')
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

        {/* Medication */}
        {isOnMedication &&
          <FormField
            control={form.control}
            name="medication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veuillez préciser les médicaments que vous prenez, et à quel moment de la journée <RequiredAsterisk /></FormLabel>
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
        
        {/* Need Assistance */}
        {isOnMedication &&
          <FormField
            control={form.control}
            name="needAssistance"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Avez-vous besoin d&apos;une assistance pour la prise de médicament ?<RequiredAsterisk /></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value)}
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
        }
      </div>
    </motion.div>
  )
}