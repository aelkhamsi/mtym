import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().min(1, {message: 'An email is required'}).max(1000, {message: 'Maximum 1000 caractères'}).email({message: 'Invalid email address'}),
  password: z.string().min(1, {message: 'A password is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
})

export const signInDefaultValues = {
  email: "",
  password: "",
}