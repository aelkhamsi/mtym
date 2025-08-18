import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z.string().min(1, {message: 'An email is required'}).email({message: 'Invalid email address'}),
})

export const resetPasswordDefaultValues = {
  email: "",
}