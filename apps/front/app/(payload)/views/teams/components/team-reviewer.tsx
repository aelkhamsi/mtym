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
import type { AdminOption } from "./columns"
import { updateTeamReview } from "@/app/api/TeamApi"
import { teamsAtom } from "@/app/store/admin/teamsAtom"

const UNASSIGNED = "__unassigned__"

export function TeamReviewer({
  teamId,
  review,
  admins,
}: {
  teamId: number,
  review: any,
  admins: AdminOption[]
}) {
  const [teams, setTeams] = useAtom(teamsAtom)
  const [saving, setSaving] = useState(false)

  const handleChange = async (value: string) => {
    const nextReviewerId = value === UNASSIGNED ? null : value

    setSaving(true)
    try {
      const response = await updateTeamReview(review?.id, {
        reviewerId: nextReviewerId,
      }) as any
      if (response?.statusCode >= 400) throw new Error()

      setTeams(teams?.map((team: any) =>
        team.id === teamId
          ? {
              ...team,
              review: {
                ...team.review,
                reviewerId: nextReviewerId,
              },
            }
          : team
      ))
      toast({ title: "Reviewer updated" })
    } catch {
      toast({ title: "Could not update reviewer", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Select
      value={review?.reviewerId ?? UNASSIGNED}
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
        {review?.reviewerId && !admins?.some((admin) => admin.id === review?.reviewerId) && (
          <SelectItem value={review?.reviewerId} disabled>
            Unknown admin
          </SelectItem>
        )}
        {admins?.map((admin) => (
          <SelectItem key={admin.id} value={admin.id}>
            {admin.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
