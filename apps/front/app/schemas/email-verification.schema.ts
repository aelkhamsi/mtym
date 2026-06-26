import { z } from "zod"

export const emailVerificationSchema = z.object({
  verificationCode: z.string().min(1, {message: 'A verification code is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
})

export const emailVerificationDefaultValues = {
  verificationCode: "",
}