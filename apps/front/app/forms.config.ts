// import { z } from 'zod'
// import { FormConfig, FieldType } from "@mdm/forms"

// export const applicationFormConfig: FormConfig = {
//   id: 'applicationForm',
//   formSteps: [
//     {
//       id: 'personal-information',
//       title: 'Personal Information',
//       description: 'Provide personal information about the student',
//       fields: [
//         {
//           name: 'firstName',
//           label: 'First Name',
//           placeholder: 'Enter your first name',
//           description: '',
//           type: FieldType.TEXT_INPUT,
//           defaultValue: '',
//           validationRule: z.string().min(1).max(50),
//         },
//         {
//           name: 'lastName',
//           label: 'Last Name',
//           placeholder: 'Enter your last name',
//           description: '',
//           type: FieldType.TEXT_INPUT,
//           defaultValue: '',
//           validationRule: z.string().min(1).max(50),
//         }
//       ]
//     },
//     {
//       id: 'education',
//       title: 'Education',
//       description: 'Provide information about the education of the student',
//       fields: [
//         {
//           name: 'highschool',
//           label: 'Highschool',
//           placeholder: 'Enter the name of your highschool',
//           description: '',
//           type: FieldType.TEXT_INPUT,
//           defaultValue: '',
//           validationRule: z.string().min(1).max(50),
//         },
//         {
//           name: 'field',
//           label: 'Field',
//           placeholder: 'Enter your field of study',
//           description: '',
//           type: FieldType.TEXT_INPUT,
//           defaultValue: '',
//           validationRule: z.string().min(1).max(50),
//         }
//       ]
//     }
//   ]
// }
