import { Option } from "@mdm/types";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormLabel,
  Input,
  Label,
} from "@mdm/ui"
import { RequiredAsterisk } from "./required-asterisk";
import { useEffect, useState } from "react";

export const CheckboxAndInput = ({
  name,
  form,
  label,
  options,
  required = true,
}: {
  name: string
  form: UseFormReturn
  label: string
  options: Option<string>[]
  required?: boolean
}) => {
  const selectedInit = form.watch(name) || []
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedInit)
  const [selectedCustomOptions, setSelectedCustomOptions] = useState<string[]>(
    selectedInit.filter((v: string) => !options.find(o => o.value === v))
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      setSelectedOptions(values[name] || [])
    })
    return () => subscription.unsubscribe?.()
  }, [form, name])

  const onToggleCheckbox = (checked: boolean, option: string) => {
    const current = form.getValues(name) || []
    if (checked) form.setValue(name, [...current, option])
    else form.setValue(name, current.filter((v: string) => v !== option))
  }

  const onInput = (index: number, newValue: string) => {
    setSelectedCustomOptions((prev) => {
      const next = [...prev]
      const oldValue = next[index]
      next[index] = newValue

      const current = form.getValues(name) || []
      if (current.includes(oldValue)) {
        const updated = current.filter((v: string) => v !== oldValue)
        if (newValue) updated.push(newValue)
        form.setValue(name, updated)
      }

      return next
    })
  }

  const onAddCustomOption = () => {
    setSelectedCustomOptions([...selectedCustomOptions, ""])
  }

  const onRemoveCustomOption = (index: number) => {
    const value = selectedCustomOptions[index]
    setSelectedCustomOptions((prev) => prev.filter((_, i) => i !== index))
    const current = form.getValues(name) || []
    form.setValue(name, current.filter((v: string) => v !== value))
  }

  return (
    <div className="flex flex-col">
      <FormLabel className="mb-2 leading-2">
        {label} {required && <RequiredAsterisk />}
      </FormLabel>

      {options.map((option, index) => {
        const id = `${name}-${index}`
        const checked = selectedOptions.includes(option.value)
        return (
          <div key={id} className="flex items-center my-2 gap-x-2 h-4">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={(checked) =>
                onToggleCheckbox(checked as boolean, option.value)
              }
            />
            <Label className='font-light' htmlFor={id}>{option.label}</Label>
          </div>
        )
      })}

      {selectedCustomOptions.map((option: string, index: number) => {
        const checked = selectedOptions.includes(option)
        return (
          <div key={index} className="flex items-center gap-x-2 h-9">
            <Checkbox
              checked={checked}
              onCheckedChange={(checked) =>
                onToggleCheckbox(checked as boolean, option)
              }
            />
            <Input
              className="h-2 px-0 m-0 font-light"
              value={option}
              onChange={(e) => onInput(index, e.target.value)}
              placeholder="Rentrez une valeure"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveCustomOption(index)}
            >
              ✕
            </Button>
          </div>
        )
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-fit font-light"
        onClick={onAddCustomOption}
      >
        + Ajouter une option
      </Button>
    </div>
  )
}
