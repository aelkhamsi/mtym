import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z.string().min(1, {message: 'An email is required'}).max(1000, {message: 'Maximum 1000 caractères'}).email({message: 'Invalid email address'}),
})

export const resetPasswordDefaultValues = {
  email: "",
}