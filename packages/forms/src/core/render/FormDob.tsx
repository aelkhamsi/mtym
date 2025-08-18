import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@mdm/ui'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@mdm/ui'
import { Calendar } from '@mdm/ui'
import { cn } from '@mdm/utils'
import { Button } from "@mdm/ui"
import { format } from "@mdm/ui"
import { CalendarIcon } from "@mdm/ui"


export const FormDob = (form: UseFormReturn, ...props) => {
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
        <FormItem className="flex flex-col mt-2">
          <FormLabel>{label}</FormLabel>

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
                    <span>{placeholder}</span>
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
                fromYear={1990} 
                toYear={2010}
                selected={field.value}
                onSelect={field.onChange}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}