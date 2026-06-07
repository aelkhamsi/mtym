import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@mdm/ui"
import { Input, Separator } from "@mdm/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mdm/ui"
import { Calendar } from "@mdm/ui"
import { CalendarIcon } from "@mdm/ui"
import { PhoneInput } from "@mdm/ui"
import { cn } from '@mdm/utils'
import { Button } from "@mdm/ui"
import { format } from "@mdm/ui"
import { RequiredAsterisk } from '@/app/components/forms/required-asterisk'
import SelectOrInput from '@/app/components/forms/select-or-input'
import { cities, regions } from "@mdm/shared"

export const PersonalInformationStep = ({
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
        Informations personnelles
      </h2>
      <Separator className='my-6 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input disabled placeholder="Entrez une valeur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input disabled placeholder="Entrez une valeur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of birth */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Date de naissance <RequiredAsterisk /></FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    captionLayout="dropdown" //Also: dropdown | buttons
                    fromYear={2000} 
                    toYear={2020}
                    selected={field.value}
                    onSelect={(value) => field.onChange(value)}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ID Number */}
        <FormField
          control={form.control}
          name="identityCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNIE</FormLabel>
              <FormControl>
                <Input placeholder="Entrez une valeur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <SelectOrInput
          name="city"
          form={form}
          label="Ville de résidence"
          options={cities}
          required={true}
        ></SelectOrInput>
        
        

        {/* Region */}
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Région de résidence<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez une région" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      <SelectLabel>Régions</SelectLabel>
                      {regions.map(region =>
                        <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2 items-start">
              <FormLabel className="text-left">Téléphone <RequiredAsterisk /></FormLabel>
              <FormControl className="w-full">
                <PhoneInput onValueChange={field.onChange} defaultValue={field.value} defaultCountry='MA' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}