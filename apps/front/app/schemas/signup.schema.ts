import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, {message: 'This field is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
  lastName: z.string().min(1, {message: 'This field is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
  email: z.string().min(1, {message: 'This field is required'}).max(1000, {message: 'Maximum 1000 caractères'}).email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'The password must have at least 6 characters'}).max(1000, {message: 'Maximum 1000 caractères'}),
  confirmPassword: z.string().min(1, {message: 'This field is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const signUpDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}