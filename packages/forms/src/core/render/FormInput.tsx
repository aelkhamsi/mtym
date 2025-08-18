import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@mdm/ui'
import { Input } from '@mdm/ui'
import { UseFormReturn } from 'react-hook-form'


export const FormInput = (form: UseFormReturn, ...props) => {
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
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}