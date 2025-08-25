import { isValidPhoneNumber } from "react-phone-number-input";
import { ZodSchema, z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png','image/jpeg','image/jpg', 'image/png','image/webp', 'application/pdf'];
const zodFileValidation = z.any()
  .refine(files => files?.length == 1, 'Ce fichier est obligatoire.')
  .refine(files => files ? ACCEPTED_FILE_TYPES.includes(files[0]?.type) : true, { message: 'Please choose PNG, JPEG or PDF format files only' })
  .refine(files => files ? files[0]?.size <= MAX_UPLOAD_SIZE : true, 'File size must be less than 3MB')

export const applicationSchema: ZodSchema = z.object({
  /* Personal Informations */
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.date({ required_error: "La date de naissance est obligatoire." }),
  identityCardNumber: z.string().min(1).max(50),
  city: z.string().nonempty("Choisissez une option"),
  region: z.string().nonempty("Choisissez une option"),
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Numéro de téléphone invalide" }),

  /* Education */
  educationLevel: z.string().nonempty("Choisissez une option"),
  educationField: z.string().min(1).max(50),
  highschool: z.string().min(1).max(50),
  averageGrade: z.coerce.number().min(0).max(20),
  mathAverageGrade: z.coerce.number().min(0).max(20),
  ranking: z.coerce.number().min(0).max(20),
  mathRanking: z.coerce.number().min(0).max(20),
  numberOfStudentsInClass: z.coerce.number().min(1),

  /* Motivation */
  hasPreviousExperiences: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  previousExperiences: z.string().min(1).refine(async text => text.split(' ').length <= 100, { message: "Text can't be more than 100 words", }),
  hasPreviousMTYMParticipations: z.enum(["yes", "no"], { message: "Choisissez une option" }),
  previousMTYMParticipations: z.string().min(1).refine(async text => text.split(' ').length <= 100, { message: "Text can't be more than 100 words", }),
  motivations: z.string().min(1).refine(async text => text.split(' ').length <= 300, { message: "Maximum 300 mots", }),
  comments: z.string().optional().refine((val) => {
    if (val) {
      return val.split(' ').length <= 100
    }
    return true;
  } , { message: "Maximum 100 mots"}),

  /* Uploads */
  fileRegulations: zodFileValidation,
  fileGrades: zodFileValidation,

  /* Terms of agreement */
  termsAgreement: z.boolean().default(false).refine(value => value === true, { message: "Vous devez accepter les Conditions Générales."}),
})

export const applicationDefaultValues = {
  /* Personal Informations */
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  identityCardNumber: '',
  city: '',
  region: '',
  phoneNumber: '',

  /* Education */
  educationLevel: '',
  educationField: '',
  highschool: '',
  averageGrade: '',
  mathAverageGrade: '',
  ranking: '',
  mathRanking: '',
  numberOfStudentsInClass: '',

  /* Motivation */
  hasPreviousExperiences: '',
  previousExperiences: '',
  hasPreviousMTYMParticipations: '',
  previousMTYMParticipations: '', 
  motivations: '',
  comments: '',

  /* Uploads */
  fileRegulations: undefined,
  fileGrades: undefined,


  /* Terms of agreement */
  termsAgreement: false,
}