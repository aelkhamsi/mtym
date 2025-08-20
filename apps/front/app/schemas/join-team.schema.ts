import { z } from "zod"

export const joinTeamSchema = z.object({
  teamId: z.string().min(1, {message: 'A team is required'}),
  accessCode: z.string().min(1, {message: 'An access code is required'}),
})

export const joinTeamDefaultValues = {
  teamId: '',
  accessCode: '',
}