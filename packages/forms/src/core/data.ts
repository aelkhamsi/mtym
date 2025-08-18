import { FieldConfig } from '../types/FieldConfig'
import { FormConfig, FormStepConfig } from '../types/FormConfig'

export const getFormDefaultValues = (formConfig: FormConfig) => {
  const formDefaultValues = {}
  formConfig?.formSteps.forEach((formStep: FormStepConfig) => {
    formStep?.fields.forEach((field: FieldConfig<any>) => {
      formDefaultValues[field.name] = field.defaultValue
    })
  })

  return formDefaultValues
}