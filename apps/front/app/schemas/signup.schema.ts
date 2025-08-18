import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, {message: 'This field is required'}),
  lastName: z.string().min(1, {message: 'This field is required'}),
  email: z.string().min(1, {message: 'This field is required'}).email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'The password must have at least 6 characters'}),
  confirmPassword: z.string().min(1, {message: 'This field is required'}),
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