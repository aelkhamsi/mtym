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
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@mdm/ui"
import { User } from '@mdm/types'
import { cn } from '@mdm/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { UseFormReturn } from "react-hook-form"
import { RequiredAsterisk } from "@/app/components/forms/required-asterisk"

export const RoommateChoiceField = ({
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
  users: any[],
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