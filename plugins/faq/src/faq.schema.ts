import { z } from 'zod'

export const faqSchema = z.object({
  id: z.number(),
  question: z.string().nonempty(),
  answer: z.string().nonempty(),
  createdAt: z.date().default(new Date()),
})

export type FaqSchema = z.infer<typeof faqSchema>;