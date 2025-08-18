import { FieldConfig } from "../types/FieldConfig";
import { FormConfig, FormStepConfig } from "../types/FormConfig";

export const getFormStepsMetadata = (formConfig: FormConfig) => {
  return formConfig?.formSteps?.map((formStep: FormStepConfig) => ({
    id: formStep?.id,
    title: formStep?.title,
    fields: formStep?.fields?.map((field: FieldConfig<any>) => field?.name)
  }))
}