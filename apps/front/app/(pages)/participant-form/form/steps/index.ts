type Step = {
  id: string,
  name: string,
  getValidationFields: (formState?: any) => string[],
}

export const steps: Step[] = [
  {
    id: 'Step 1',
    name: 'Informations Médicales',
    getValidationFields: () => ([])
  },
  {
    id: 'Step 2',
    name: 'Logistiques',
    getValidationFields: () => ([])
  },
  {
    id: 'Step 3',
    name: 'Activités',
    getValidationFields: () => ([])
  },
  {
    id: 'Step 4',
    name: 'Uploads',
    getValidationFields: () => ([])
  },
  { id: 'Step 5', 
    name: 'Validation',
    getValidationFields: () => ([])
  }
];


export { MedicalInformationStep } from "./medical-information.step"
export { LogisticsStep } from "./logistics.step"
export { ActivitiesStep } from "./activities.step"
export { UploadStep } from './upload.step'
export { ValidationStep } from './validation.step'


