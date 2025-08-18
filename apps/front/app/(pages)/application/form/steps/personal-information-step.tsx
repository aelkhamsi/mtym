import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Textarea } from "@mdm/ui"
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
import { cn, isOverEighteen } from '@mdm/utils'
import { Button } from "@mdm/ui"
import { format } from "@mdm/ui"

const regions = [
  {label: "Tanger-Tétouan-Al Hoceïma", value:"tanger-tetouan-al-houceima"},
  {label: "Oriental", value:"oriental"},
  {label: "Fès-Meknès", value:"fes-meknes"},
  {label: "Rabat-Salé-Kénitra", value:"rabat-sale-kenitra"},
  {label: "Béni Mellal-Khénifra", value:"beni-mellal-khenifra"},
  {label: "Casablanca-Settat", value:"casablanca-settat"},
  {label: "Marrakech-Safi", value:"marrakech-safi"},
  {label: "Drâa-Tafilalet", value:"draa-tafilalet"},
  {label: "Souss-Massa", value:"souss-massa"},
  {label: "Guelmim-Oued Noun", value:"guelmim-oued-noun"},
  {label: "Laâyoune-Sakia El Hamra", value:"laayoune-sakia-el-hamra"},
  {label: "Dakhla-Oued Eddahab", value:"dakhla-oued-eddahab"},
  {label: "Abroad", value:"abroad"},
]

const relationshipsWithGuardian = [
  {label: "Father", value:"father"},
  {label: "Mother", value:"mother"},
  {label: "Tutor", value:"guardian"},
  {label: "Other", value:"other"},
]

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

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
        Personal Informations
      </h2>
      <Separator className='my-6 bg-[#0284C7]'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name <RequiredAsterisk /></FormLabel>
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
              <FormLabel>Last Name <RequiredAsterisk /></FormLabel>
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
              <FormLabel>Date of birth <RequiredAsterisk /></FormLabel>
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
                        <span>Choose a date</span>
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
              <FormLabel>CNIE Number<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Enter a value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City of residency<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Enter a value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Region */}
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region of residency<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      <SelectLabel>Regions</SelectLabel>
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
              <FormLabel className="text-left">Phone Number <RequiredAsterisk /></FormLabel>
              <FormControl className="w-full">
                <PhoneInput onValueChange={field.onChange} defaultValue={field.value} defaultCountry='MA' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <h2 className='text-base font-semibold leading-7 text-[#0284C7] mt-6'>
        Emergency Contact Informations
      </h2>
      <Separator className='mt-4 bg-[#0284C7]'/>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
        {/* Guardian Full Name */}
        <FormField
          control={form.control}
          name="emergencyContactFullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name of Emergency Contact<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Enter a full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    
        {/* Guardian Phone Number */}
        <FormField
          control={form.control}
          name="emergencyContactPhoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2 items-start">
              <FormLabel className="text-left">Phone Number of Emergency Contact <RequiredAsterisk /></FormLabel>
              <FormControl className="w-full">
                <PhoneInput onValueChange={field.onChange} defaultValue={field.value} defaultCountry='MA' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Relationship with Guardian */}
        <FormField
          control={form.control}
          name="emergencyContactRelationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship with this person<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Relationship with Emergency contact</SelectLabel>
                      {relationshipsWithGuardian.map(relationship => 
                        <SelectItem key={relationship.value} value={relationship.value}>{relationship.label}</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}