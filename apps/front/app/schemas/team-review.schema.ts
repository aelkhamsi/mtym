import { z } from "zod"

export const teamReviewSchema = z.object({
  intermediateReportScore: z.number({ message: "Choisissez une option" }).int().min(0).max(4),
  intermediateReportDecision: z.enum(["PASS", "FAIL", "NOT_SURE"], { message: "Choisissez une option" }),
  comment: z.string().nullable().optional()
})

export const teamReviewDefaultValues = {
  intermediateReportScore: null,
  intermediateReportDecision: null,
  comment: null
}