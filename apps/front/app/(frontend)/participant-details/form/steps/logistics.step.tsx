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
import { RoommateChoiceField } from './roommate-choice.field'
import SelectOrInput from '@/app/components/forms/select-or-input'
import { cities } from '@mdm/shared'

export const LogisticsStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  const [users, setUsers] = useState<any[]>([])
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
        setUsers(users as any)
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

      <p className='text-gray-600 font-light text-sm mb-2'>
        Nous organiserons des navettes pour faciliter votre venue à l&apos;université Al Akhawayn. 
      </p>

      <p className='text-gray-600 font-light text-sm mb-2'>
        <span className='underline'>Trajet navette départ</span>: <span className='font-normal bg-gray-100 px-2 rounded-sm'> Gare de Meknès</span> ➡️ <span className='font-normal bg-gray-100 px-2 rounded-sm'>Université Al Akhawayn</span> <br/>
        Deux navettes sont prévues le jeudi <span className='font-normal'> 25 décembre</span> : l&apos;une à <span className='font-normal'>10h</span> et l&apos;autre vers <span className='font-normal'>13h</span>.
      </p>

      <p className='text-gray-600 font-light text-sm mb-2'>
        <span className='underline'>Trajet navette retour</span>: <span className='font-normal bg-gray-100 px-2 rounded-sm'>Université Al Akhawayn</span>  ➡️ <span className='font-normal bg-gray-100 px-2 rounded-sm'>Gare de Meknès</span> <br/>
        Les navettes sont prévues le dimanche <span className='font-normal'> 28 décembre</span>. Les horaires seront communiqués ultérieurement.
      </p>
      
      <p className='text-gray-600 font-light text-sm mb-2'>
        Les places étant limitées, une place dans la navette n&apos;est pas garantie. <br/>
        Si vous n&apos;avez pas réellement besoin d&apos;une navette et que vous pouvez venir directement à l&apos;université, mettez “Non” aux questions suivantes.
      </p>

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
                    if (value === 'no' && !needArrivalShuttle) {
                      form.setValue('cityOfResidence', '')
                      form.clearErrors('cityOfResidence')
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
                    if (value === 'no' && !needDepartureShuttle) {
                      form.setValue('cityOfResidence', '')
                      form.clearErrors('cityOfResidence')
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

        {/* City of Residence */}
        {(needDepartureShuttle || needArrivalShuttle) && 
          <SelectOrInput
            name="cityOfResidence"
            form={form}
            label="Ville de résidence"
            options={cities}
            required={true}
          ></SelectOrInput>
        }
      </div>
    </motion.div>
  )
}