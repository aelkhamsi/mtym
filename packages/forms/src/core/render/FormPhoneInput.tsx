import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@mdm/ui'
import { PhoneInput } from '@mdm/ui'
import { UseFormReturn } from 'react-hook-form'

export const FormPhoneInput = (form: UseFormReturn, ...props) => {
  const {
    name,
    label, 
    placeholder, 
    description
  } = props as any;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col mt-2 items-start">
          <FormLabel className="text-left">{label}</FormLabel>

          <FormControl className="w-full">
            {/* <PhoneInput placeholder={placeholder} {...field} /> */}
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}