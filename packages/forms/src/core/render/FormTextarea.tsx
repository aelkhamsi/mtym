import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@mdm/ui'
import { Textarea } from '@mdm/ui'
import { UseFormReturn } from "react-hook-form";


export const FormTextarea = (
  form: UseFormReturn,
  ...props
) => {
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
            <Textarea placeholder={placeholder} className="resize-none" {...field} />
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}