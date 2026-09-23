"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@mdm/ui"
import { UNASSIGNED_OPTION as UNASSIGNED } from "./columns"
import { updateTeam } from "@/app/api/TeamApi"
import { teamsAtom } from "@/app/store/admin/teamsAtom"
import { capitalize } from "@mdm/utils"

export enum QualifCenter {
  CASABLANCA = 'casablanca',
  RABAT = 'rabat',
  MARTIL = 'martil',
  BENGUERIR = 'benguerir',
  AGADIR = 'agadir',
  FEZ = 'fez',
  OUJDA = 'oujda',
  ONLINE = 'online',
}

export function TeamQualifCenter({
  teamId,
  qualifCenter, 
}: {
  teamId: number,
  qualifCenter: QualifCenter,
}) {
  const [teams, setTeams] = useAtom(teamsAtom)
  const [saving, setSaving] = useState(false)

  const handleChange = async (value: string) => {
    const nextQualifCenter = value === UNASSIGNED ? null : value

    setSaving(true)
    try {
      const response = await updateTeam(teamId, {
        qualifCenter: nextQualifCenter,
      }) as any
      if (response?.statusCode >= 400) throw new Error()

      setTeams(teams?.map((team: any) =>
        team.id === teamId
          ? {...team, qualifCenter: nextQualifCenter }
          : team
      ))
      toast({ title: "Qualification center updated" })
    } catch {
      toast({ title: "Could not update qualification center", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Select
      value={qualifCenter ?? UNASSIGNED}
      onValueChange={handleChange}
      disabled={saving}
    >
      <SelectTrigger
        className="w-[14rem]"
        style={{
          backgroundColor: "var(--theme-input-bg)",
          color: "var(--theme-text)",
        }}
      >
        <SelectValue placeholder="Unassigned" />
      </SelectTrigger>
      <SelectContent
        style={{
          backgroundColor: "var(--theme-input-bg)",
          borderColor: "var(--theme-elevation-150)",
          color: "var(--theme-text)",
        }}
      >
        <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
        {qualifCenter && !Object.values(QualifCenter)?.some((center) => center === qualifCenter) && (
          <SelectItem value={qualifCenter} disabled>
            Unknown admin
          </SelectItem>
        )}
        {Object.entries(QualifCenter)?.map(([key, value]) => (
          <SelectItem key={key} value={value}>
            {capitalize(value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
