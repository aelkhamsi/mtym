"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { RadioGroup, RadioGroupItem, Separator } from '@mdm/ui'
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'
import { getAllUsers } from '@/app/api/UsersApi'
import { RoommateChoiceField } from './roommate-choixe.field'
import SelectOrInput from '@/app/components/forms/select-or-input'

const cities = [
  { label: "Agadir", value: "agadir" },
  { label: "Aït Melloul", value: "ait-melloul" },
  { label: "Al Hoceima", value: "al-hoceima" },
  { label: "Ben Guerir", value: "ben-guerir" },
  { label: "Beni Mellal", value: "beni-mellal" },
  { label: "Berrechid", value: "berrechid" },
  { label: "Berkane", value: "berkane" },
  { label: "Bouskoura", value: "bouskoura" },
  { label: "Casablanca", value: "casablanca" },
  { label: "El Jadida", value: "el-jadida" },
  { label: "Errachidia", value: "errachidia" },
  { label: "Essaouira", value: "essaouira" },
  { label: "Fez", value: "fez" },
  { label: "Guelmim", value: "guelmim" },
  { label: "Guercif", value: "guercif" },
  { label: "Ifrane", value: 'ifrane' },
  { label: "Kenitra", value: "kenitra" },
  { label: "Khouribga", value: "khouribga" },
  { label: "Khemisset", value: "khemisset" },
  { label: "Khenifra", value: "khenifra" },
  { label: "Larache", value: "larache" },
  { label: "Marrakesh", value: "marrakesh" },
  { label: "Meknes", value: "meknes" },
  { label: "Mohammedia", value: "mohammedia" },
  { label: "Nador", value: "nador" },
  { label: "Ouarzazate", value: "ouarzazate" },
  { label: "Oujda", value: "oujda" },
  { label: "Rabat", value: "rabat" },
  { label: "Safi", value: "safi" },
  { label: "Salé", value: "sale" },
  { label: "Sefrou", value: "sefrou" },
  { label: "Settat", value: "settat" },
  { label: "Tan-Tan", value: "tan-tan" },
  { label: "Tangier", value: "tangier" },
  { label: "Taroudant", value: "taroudant" },
  { label: "Taza", value: "taza" },
  { label: "Temara", value: "temara" },
  { label: "Tetouan", value: "tetouan" },
  { label: "Tifelt", value: "tifelt" },
  { label: "Tiznit", value: "tiznit" },
  { label: "(Autre)", value: 'other' }
]

export const LogisticsStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  const [users, setUsers] = useState(undefined)
  const [haveRoommatePreference, setHaveRoommatePreference] = useState(
    form.getValues('haveRoommatePreference') === 'yes'
  )
  const [needDepartureShuttle, setNeedDepartureShuttle] = useState(
    form.getValues('needDepartureShuttle') === 'yes'
  )
  const [needArrivalShuttle, setNeedArrivalShuttle] = useState(
    form.getValues('needArrivalShuttle') === 'yes'
  )

  useEffect(() => {
    getAllUsers()
      .then(users => {
        setUsers(users)
      })
  }, [])

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Préférence de cochambre
      </h2>
      <Separator className='mt-2 mb-6 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-between my-6'>

        {/* haveRoommatePreference */}
        <FormField
          control={form.control}
          name="haveRoommatePreference"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Souhaites-tu partager ta chambre avec quelqu’un en particulier ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setHaveRoommatePreference(value === 'yes')
                    if (value === 'no') {
                      form.setValue('firstRoommateId', '')
                      form.clearErrors('firstRoommateId')
                      form.setValue('secondRoommateId', '')
                      form.clearErrors('secondRoommateId')
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
      
        {haveRoommatePreference && 
          <>
            <RoommateChoiceField form={form} name='firstRoommateId' label='1er co-chambre' required={true} users={users} />
            <RoommateChoiceField form={form} name='secondRoommateId' label='2iem co-chambre (facultatif)' required={false} users={users} />
          </>
        }
      </div>

      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Transports & Navettes
      </h2>
      <Separator className='mt-2 mb-6 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-6'>
        {/* needDepartureShuttle */}
        <FormField
          control={form.control}
          name="needDepartureShuttle"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>As-tu besoin d&apos;une navette pour l&apos;aller ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setNeedDepartureShuttle(value === 'yes')
                    if (value === 'no') {
                      form.setValue('departureCity', '')
                      form.clearErrors('departureCity')
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

        {/* Departure City */}
        {needDepartureShuttle && 
          <SelectOrInput
            name="departureCity"
            form={form}
            label="Ville de départ"
            options={cities}
            required={true}
          ></SelectOrInput>
        }
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-between my-6'>
        {/* needArrivalShuttle */}
        <FormField
          control={form.control}
          name="needArrivalShuttle"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>As-tu besoin d&apos;une navette pour le retour ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setNeedArrivalShuttle(value === 'yes')
                    if (value === 'no') {
                      form.setValue('arrivalCity', '')
                      form.clearErrors('arrivalCity')
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

        {/* Arrival City */}
        {needArrivalShuttle && 
          <SelectOrInput
            name="arrivalCity"
            form={form}
            label="Ville d'arrivée"
            options={cities}
            required={true}
          ></SelectOrInput>
        }
      </div>

    </motion.div>
  )
}