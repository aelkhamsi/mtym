import { z } from "zod";

type FieldOption<T> = {
  label: string;

  value: T;
}

export enum FieldType {
  TEXT_INPUT = 'text-input',
  PHONE_INPUT = 'phone-input',
  DATE_OF_BIRTH = 'date-of-birth',
  SELECT = 'text-input',
  TEXTAREA = 'text-input',
}

export type FieldConfig<T> = {
  name: string;

  label: string;

  placeholder?: string|undefined;

  description?: string|undefined;

  options?: FieldOption<T>[]|undefined;

  defaultValue: T;

  type: FieldType;

  validationRule: any;
}