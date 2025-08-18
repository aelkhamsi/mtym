import { FieldConfig } from "./FieldConfig";

export type FormStepConfig = {
  id: string;

  title: string;

  description: string;

  fields: FieldConfig<any>[]
}

export type FormConfig = {
  id: string;

  formSteps: FormStepConfig[]
}