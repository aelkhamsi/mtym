import { z } from "zod"

export const createTeamSchema = z.object({
  name: z.string().min(1, {message: 'Un nom est requis'}).max(1000, {message: 'Maximum 1000 caractères'}),
  slogan: z.string().min(1, {message: 'Un slogan est requis'}).max(1000, {message: 'Maximum 1000 caractères'}),
  quadrigram: z.string().trim().transform((v: string) => v.toUpperCase()).refine((v: string) => /^[A-Z]{4}$/.test(v), {
    message: "Un quadrigramme contient exactement 4 lettres (A–Z).",
  }),
}).superRefine(({ name, quadrigram }, ctx) => {
  const quad = quadrigram;

  if (/^(.)\1{3}$/.test(quad)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["quadrigram"],
      message: "Le quadrigramme doit être significatif (pas 4 lettres identiques)",
    });
  }
});

export const createTeamDefaultValues = {
  name: "",
  slogan: "",
  quadrigram: "",
}