import { z } from "zod"

export const applicationReviewSchema = z.object({
  identityCheck: z.enum(["YES", "NO", "NOT_SURE"], { message: "Choisissez une option" }),
  levelCheck: z.enum(["YES", "NO", "NOT_SURE"], { message: "Choisissez une option" }),
  pictureCheck: z.enum(["YES", "NO", "NOT_SURE"], { message: "Choisissez une option" }),
  cityCheck: z.enum(["YES", "CHANGED", "NOT_SURE"], { message: "Choisissez une option" }),
  updatedCity: z.string().optional(),
  comment: z.string().optional()
})

export const applicationReviewDefaultValues = {
  identityCheck: null,
  levelCheck: null,
  pictureCheck: null,
  cityCheck: null,
  updatedCity: null,
  comment: null
}