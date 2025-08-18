import { FieldConfig } from '../types/FieldConfig'
import { FormConfig, FormStepConfig } from '../types/FormConfig'
import { ZodSchema, z } from "zod"

export const getFormSchema = (formConfig: FormConfig): ZodSchema => {
  const formSchema = {}
  formConfig?.formSteps.forEach((formStep: FormStepConfig) => {
    formStep?.fields.forEach((field: FieldConfig<any>) => {
      formSchema[field.name] = field.validationRule
    })
  })

  return z.object(formSchema)
}
