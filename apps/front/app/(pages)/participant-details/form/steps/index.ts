type Step = {
  id: string,
  name: string,
  getValidationFields: (formState?: any) => string[],
}

export const steps: Step[] = [
  {
    id: 'Step 1',
    name: 'Informations Médicales',
    getValidationFields: (formState) => {
      const isOnMedication = formState?.isOnMedication === 'yes'

      return [
        'foodAllergy',
        'nonFoodAllergy',
        'illnessOrDisability',
        'specialAccommodations',
        'isOnMedication',
        ...(isOnMedication ? ['medication', 'needAssistance'] : []),
      ]
    }
  },
  {
    id: 'Step 2',
    name: 'Logistiques',
    getValidationFields: (formState) => {
      const haveRoommatePreference = formState?.haveRoommatePreference === 'yes'

      return [
        'haveRoommatePreference',
        ...(haveRoommatePreference ? ['firstRoommateId'] : []),
      ]
    }
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


