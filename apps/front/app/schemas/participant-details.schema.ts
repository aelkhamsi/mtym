import { ZodSchema, z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png','image/jpeg','image/jpg', 'image/png','image/webp', 'application/pdf'];
export const zodFileValidation = z.any()
  .refine(files => files?.length == 1, 'Ce fichier est obligatoire.')
  .refine(files => files ? ACCEPTED_FILE_TYPES.includes(files[0]?.type) : true, { message: 'Please choose PNG, JPEG or PDF format files only' })
  .refine(files => files ? files[0]?.size <= MAX_UPLOAD_SIZE : true, 'File size must be less than 3MB')

export const participantDetailsSchema: ZodSchema = z.object({
  /* Medical Informations */
  foodAllergy: z.array(z.string()).nonempty({ message: 'Choissisez une option' }),
  nonFoodAllergy: z.array(z.string()).nonempty({ message: 'Choissisez une option' }),
  allergyPrecaution: z.string().optional(),
  
  illnessOrDisability: z.array(z.string()).nonempty({ message: 'Choissisez une option' }),
  specialAccommodations: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  isOnMedication: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  medication: z.string().min(1, { message: 'Entrez une valeur' }).refine(async text => text.split(' ').length <= 100, { message: "Le texte ne doit pas dépasser 100 mots", }),
  needAssistance: z.enum(["yes", "no"], { message: "Choisissez une option" }),

  haveRoommatePreference: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  firstRoommateId: z.string().min(1, {message: 'Un choix est requis'}),
  secondRoommateId: z.string().optional(),

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

  haveRoommatePreference: '',
  firstRoommateId: '',
  secondRoommateId: '',

  /* Uploads */
  fileRegulations: undefined,
  fileGrades: undefined,

  /* Terms of agreement */
  termsAgreement: false,
}