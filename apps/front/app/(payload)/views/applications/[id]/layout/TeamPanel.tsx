'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@mdm/ui"
import { Field } from "../application-mapper"
import { getTeamFields } from "../team-mapper"

const TeamPanel = ({
  team,
}:{
  team: any
}) => {
  if (!team) return
  const teamFields = getTeamFields(team)
  
  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Team Panel</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="divide-y rounded-lg border">
          {teamFields.map((field, index) => (
            <TeamField key={`field_${index}`} field={field} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const TeamField = ({
  field,
}:{
  field: Field,
}) => {
  return (
    <div
      key={field.label}
      className="grid grid-cols-[220px_1fr] gap-4 px-6 py-4"
    >
      <div className="text-muted-foreground">
        {field.label}
      </div>

      <div>
        {field.value ?? (
          <span className="text-muted-foreground italic">
            (empty)
          </span>
        )}
      </div>
    </div>
  )
}

export default TeamPanel