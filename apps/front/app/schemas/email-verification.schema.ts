import { z } from "zod"

export const emailVerificationSchema = z.object({
  verificationCode: z.string().min(1, {message: 'A verification code is required'}),
})

export const emailVerificationDefaultValues = {
  verificationCode: "",
}