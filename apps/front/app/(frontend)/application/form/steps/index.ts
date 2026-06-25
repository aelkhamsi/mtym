import { isOverEighteen } from '@mdm/utils';

type Step = {
  id: string,
  name: string,
  getValidationFields: (formState?: any) => string[],
}

export const steps: Step[] = [
  {
    id: 'Étape 1',
    name: 'Informations Personnelles',
    getValidationFields: (formState: any) => {
      const dob = formState?.dateOfBirth
      const isAdult = isOverEighteen(dob)
      return [
        ...(!isAdult ? ['guardianFullName', 'guardianPhoneNumber', 'relationshipWithGuardian'] : []),
        ...(isAdult ? ['identityCardNumber'] : []),
        ...['firstName', 'lastName', 'dateOfBirth', 'city', 'region', 'phoneNumber']
      ]
    }
  },
  {
    id: 'Step 2',
    name: 'Éducation',
    getValidationFields: (_) => (['educationLevel', 'educationField', 'highschool', 'highschoolCity', 'highschoolRegion', 'isHighschoolFarFromHome'])
  },
  {
    id: 'Step 3',
    name: 'Motivations',
    getValidationFields: (formState) => {
      const hasPreviousMTYMParticipations = formState?.hasPreviousMTYMParticipations === 'yes'
      const hasPreviousExperiences = formState?.hasPreviousExperiences === 'yes'

      return [
        'hasPreviousMTYMParticipations', 
        ...(hasPreviousMTYMParticipations ? ['previousMTYMParticipations'] : []),
        'hasPreviousExperiences',
        ...(hasPreviousExperiences ? ['previousExperiences'] : []),
        'motivations',
        'comments'
      ]
    }
  },
  {
    id: 'Step 4',
    name: 'Uploads',
    getValidationFields: (formState) => {
      const isFileUploaded = (key: string) => !!formState?.[`${key}Url`]
      return [
        !isFileUploaded('fileCnie') ? 'fileCnie' : '',
        !isFileUploaded('filePhoto') ? 'filePhoto' : '',
        !isFileUploaded('fileGrades') ? 'fileGrades' : '',
      ]
    }
  },
  { id: 'Step 5', 
    name: 'Validation',
    getValidationFields: (_) => ['termsAgreement']
  }
];

export { PersonalInformationStep } from './personal-information-step'
export { EducationStep } from './education-step'
export { MotivationStep } from "./motivation-step"
export { UploadStep } from './upload-step'
export { ValidationStep } from './validation-step'

