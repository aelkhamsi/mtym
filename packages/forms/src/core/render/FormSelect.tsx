import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@mdm/ui'
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@mdm/ui"

export const FormSelect = (
  form: UseFormReturn,
  ...props
) => {
  const {
    name,
    label, 
    placeholder, 
    description,
    options
  } = props as any;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map(option =>
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select> 
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}