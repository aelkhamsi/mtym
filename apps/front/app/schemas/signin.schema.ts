import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().min(1, {message: 'An email is required'}).email({message: 'Invalid email address'}),
  password: z.string().min(1, {message: 'A password is required'}),
})

export const signInDefaultValues = {
  email: "",
  password: "",
}