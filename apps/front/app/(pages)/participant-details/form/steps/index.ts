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
      const hasBeenHospitalized = formState?.hasBeenHospitalized === 'yes'

      return [
        'gender',
        'foodAllergy',
        'nonFoodAllergy',
        'illnessOrDisability',
        'specialAccommodations',
        'isOnMedication',
        ...(isOnMedication ? ['medication', 'needAssistance'] : []),
        'hasBeenHospitalized',
        ...(hasBeenHospitalized ? ['hospitalizationReasons'] : []),
      ]
    }
  },
  {
    id: 'Step 2',
    name: 'Logistiques',
    getValidationFields: (formState) => {
      const haveRoommatePreference = formState?.haveRoommatePreference === 'yes'
      const needDepartureShuttle = formState?.needDepartureShuttle === 'yes'
      const needArrivalShuttle = formState?.needArrivalShuttle === 'yes'

      return [
        'haveRoommatePreference',
        ...(haveRoommatePreference ? ['firstRoommateId'] : []),
        'needDepartureShuttle',
        'needArrivalShuttle',
        ...(needDepartureShuttle || needArrivalShuttle ? ['cityOfResidence'] : []),
      ]
    }
  },
  {
    id: 'Step 3',
    name: 'Activités',
    getValidationFields: (formState) => {
      const haveTalent = formState?.haveTalent === 'yes'

      return [
        'haveTalent',
        ...(haveTalent ? ['talentDescription'] : []),
        'workshops',
      ]
    }
  },
  {
    id: 'Step 4',
    name: 'Uploads',
    getValidationFields: (formState) => {
      const isFileUploaded = (key: string) => !!formState?.[`${key}Url`]

      return [
        !isFileUploaded('filePhoto') ? 'filePhoto' : '',
        !isFileUploaded('fileParentalAuthorization') ? 'fileParentalAuthorization' : '',
      ]
    }
  },
  { 
    id: 'Step 5', 
    name: 'Validation',
    getValidationFields: () => (['termsAgreement'])
  }
];


export { MedicalInformationStep } from "./medical-information.step"
export { LogisticsStep } from "./logistics.step"
export { ActivitiesStep } from "./activities.step"
export { UploadStep } from './upload.step'
export { ValidationStep } from './validation.step'


