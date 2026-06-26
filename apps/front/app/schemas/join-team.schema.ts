import { z } from "zod"

export const joinTeamSchema = z.object({
  teamId: z.string().min(1, {message: 'A team is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
  accessCode: z.string().min(1, {message: 'An access code is required'}).max(1000, {message: 'Maximum 1000 caractères'}),
})

export const joinTeamDefaultValues = {
  teamId: '',
  accessCode: '',
}