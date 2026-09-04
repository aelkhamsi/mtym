import { z } from "zod"

/**
 * Admin-side counterpart of `createTeamSchema`. The name/slogan/quadrigram
 * rules are the same as the participant form (messages are in English because
 * the admin is), plus the members and the creator, which a participant never
 * picks: they are implicitly themselves.
 */
export const createTeamAdminSchema = z.object({
  name: z.string().trim().min(1, {message: 'A name is required'}).max(1000, {message: 'Maximum 1000 characters'}),
  slogan: z.string().trim().max(1000, {message: 'Maximum 1000 characters'}).optional(),
  quadrigram: z.string().trim().transform((v: string) => v.toUpperCase()).refine((v: string) => /^[A-Z]{4}$/.test(v), {
    message: "A quadrigram is made of exactly 4 letters (A–Z), no digits.",
  }).refine((v: string) => !/^(.)\1{3}$/.test(v), {
    message: "The quadrigram must be meaningful (not 4 identical letters)",
  }),
  memberIds: z.array(z.number())
    .min(3, {message: 'A team must have at least 3 members'})
    .max(5, {message: 'A team can not have more than 5 members'}),
  leaderId: z.number({required_error: 'A creator is required'}),
}).superRefine(({ memberIds, leaderId }, ctx) => {
  if (!memberIds.includes(leaderId)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["leaderId"],
      message: "The creator must be one of the selected members",
    });
  }
});

export const createTeamAdminDefaultValues = {
  name: "",
  slogan: "",
  quadrigram: "",
  memberIds: [] as number[],
  leaderId: undefined as unknown as number,
}
