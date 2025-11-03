import { ZodSchema, z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png','image/jpeg','image/jpg', 'image/png','image/webp', 'application/pdf'];
export const zodFileValidation = z.any()
  .refine(files => files?.length == 1, 'Ce fichier est obligatoire.')
  .refine(files => files ? ACCEPTED_FILE_TYPES.includes(files[0]?.type) : true, { message: 'Please choose PNG, JPEG or PDF format files only' })
  .refine(files => files ? files[0]?.size <= MAX_UPLOAD_SIZE : true, 'File size must be less than 3MB')

export const participantDetailsSchema: ZodSchema = z.object({
  /* Medical Informations */
  foodAllergy: z.array(z.string()),
  nonFoodAllergy: z.array(z.string()),
  allergyPrecaution: z.string().optional(),
  
  illnessOrDisability: z.array(z.string()),
  specialAccommodations: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  isOnMedication: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  medication: z.string().min(1).refine(async text => text.split(' ').length <= 100, { message: "Text can't be more than 100 words", }),
  needAssistance: z.enum(["yes", "no"], { message: "Choisissez une option" }),

  /* Uploads */
  filePhoto: zodFileValidation,
  fileParentalAuthorization: zodFileValidation,

  /* Terms of agreement */
  termsAgreement: z.boolean().default(false).refine(value => value === true, { message: "Vous devez accepter les Conditions Générales."}),
})

export const participantDetailsDefautValues = {
  /* Medical Informations */
  foodAllergy: '',
  nonFoodAllergy: '',
  allergyPrecaution: '',
  
  illnessOrDisability: '',
  specialAccommodations: '',
  isOnMedication: '',
  medication: '',
  needAssistance: '',

  /* Uploads */
  fileRegulations: undefined,
  fileGrades: undefined,

  /* Terms of agreement */
  termsAgreement: false,
}