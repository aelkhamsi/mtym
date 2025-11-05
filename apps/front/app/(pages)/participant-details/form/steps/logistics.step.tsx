"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@mdm/ui"
import { RadioGroup, RadioGroupItem, Separator } from '@mdm/ui'
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mdm/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mdm/ui"
import { User } from '@mdm/types'
import { cn } from '@mdm/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { getAllUsers } from '@/app/api/UsersApi'

const RoommateChoiceField = ({
  form,
  name,
  label,
  required,
  users,
}:{
  form: UseFormReturn<any>,
  name: string,
  label: string,
  required: boolean,
  users: User[],
}) => {
  const usersOptions = users
    ?.filter(user => true)
    ?.map(user => ({
      label: `${user?.firstName} ${user?.lastName}`,
      value: user?.id.toString()
    }))

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} {required && <RequiredAsterisk />} </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? usersOptions?.find((user) => user.value === field.value)?.label
                    : "Selectionnez un participant"
                  }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-full md:w-[20rem] lg:w-[30rem] p-0">
              <Command>
                <CommandInput placeholder="Chercher un participant..." />
                <CommandList>
                  <CommandEmpty>Aucun résultat</CommandEmpty>
                  <CommandGroup>
                    {usersOptions?.map((user) => (
                      <CommandItem
                        value={user.label}
                        key={user.value}
                        onSelect={() => {
                          form.setValue(name, user.value)
                        }}
                      > 
                        <div>
                          <div className='flex'>
                            <Check className={cn("mr-2 h-4 w-4", user.value === field.value ? "opacity-100" : "opacity-0")} />
                            {user.label}
                          </div>
                        </div>
                        
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormDescription>
            Vous trouverez içi tout les participants
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

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

  useEffect(() => {
    getAllUsers()
      .then(users => {
        setUsers(users)
      })
  }, [])

  const onRoommatePreferenceChange = async (value: string, field: ControllerRenderProps) => {
    setHaveRoommatePreference(value === 'yes')
    if (value === 'no') {
      form.setValue('firstRoommateId', '')
      form.clearErrors('firstRoommateId')
      form.setValue('secondRoommateId', '')
      form.clearErrors('secondRoommateId')
    }
    field.onChange(value)
  }

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Préférence de cochambre
      </h2>
      <Separator className='my-2 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-between'>

        {/* haveRoommatePreference */}
        <FormField
          control={form.control}
          name="haveRoommatePreference"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Souhaites-tu partager ta chambre avec quelqu’un en particulier ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => onRoommatePreferenceChange(value, field)}
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

      {haveRoommatePreference ?? <p>Nous essaierons de prendre en compte les préférences dans la mesure du possible</p>}
    </motion.div>
  )
}

// haveRoommatePreference
// firstRoommate
// secondRoommate