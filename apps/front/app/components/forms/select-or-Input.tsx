import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
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
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { Option } from "@mdm/types"
import { RequiredAsterisk } from "./required-asterisk"
import { useState, useEffect } from "react"

const SelectOrInput = ({
  name,
  form,
  label,
  options,
  required = true,
}:{
  name: string,
  form: UseFormReturn,
  label: string,
  options: Option<string>[],
  required?: boolean,
}) => {
  const [showInput, setShowInput] = useState<boolean>(false)

  const toggleShowInput = () => {
    setShowInput(!showInput)
    form.setValue(name, '')
    form.clearErrors(name)
  }

  const onValueChange = ((field: ControllerRenderProps, value: string) => {
    if (value === 'other') {
      toggleShowInput()
    } else {
      field.onChange(value)
    }
  })

  const labelComponent = <div>
    <FormLabel>{label}{required && <RequiredAsterisk />}</FormLabel>
    {showInput && <span className="text-blue-500 text-xs cursor-pointer" onClick={() => toggleShowInput()}> ↺ Revenir aux options</span>}
  </div>

  useEffect(() => {
    const fieldValue = form.getValues()?.[name]
    const isAnOption = options.find(option => option.value === fieldValue)
    if (fieldValue && !isAnOption) {
      setShowInput(true)
    }
  }, [])

  return (
    <>
      {!showInput && 
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {labelComponent}

              <FormControl>
                <Select onValueChange={(value) => onValueChange(field, value)} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez une option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      {options.map(option =>
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
      
      {showInput && 
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {labelComponent}

              <FormControl>
                <Input placeholder="Entrez une valeur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
    </>
  )
}

export default SelectOrInput
