import { ReactNode } from "react"

export type Field = {
  label: string
  value: ReactNode
}

export function getTeamFields(
  team?: any,
): Field[] {
  if (!team) return []

  return [
    { label: "Team Name", value: team.name },
    { label: "Slogan", value: team.slogan },
    { label: "Quadrigram", value: team.quadrigram },
    { label: "Team Status", value: team.status },
    { label: "Qualification center", value: team.qualifCenter },
  ]
}