import { z } from "zod"

export const teamReviewSchema = z.object({
  intermediateReportScore1: z.number({ message: "Choisissez une option" }).int().min(0).max(4),
  intermediateReportScore2: z.number({ message: "Choisissez une option" }).int().min(0).max(4),
  intermediateReportScore3: z.number({ message: "Choisissez une option" }).int().min(0).max(4),
  intermediateReportScore4: z.number({ message: "Choisissez une option" }).int().min(0).max(4),
  aiSuspicionScore: z.number({ message: "Choisissez une option" }).int().min(0).max(100),
  intermediateReportDecision: z.enum(["PASS", "FAIL", "NOT_SURE"], { message: "Choisissez une option" }),
  comment: z.string().nullable().optional()
})

export const teamReviewDefaultValues = {
  intermediateReportScore1: null,
  intermediateReportScore2: null,
  intermediateReportScore3: null,
  intermediateReportScore4: null,
  aiSuspicionScore: null,
  intermediateReportDecision: null,
  comment: null
}