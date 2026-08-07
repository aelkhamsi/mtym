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
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"
import { putApplicationReview } from "@/app/api/ApplicationApi"
import type { AdminOption } from "./columns"

const UNASSIGNED = "__unassigned__"

export function ApplicationReviewer({
  applicationId,
  reviewerId,
  admins,
}: {
  applicationId: number
  reviewerId: string | null
  admins: AdminOption[]
}) {
  const [applications, setApplications] = useAtom(applicationsAtom)
  const [saving, setSaving] = useState(false)

  const handleChange = async (value: string) => {
    const nextReviewerId = value === UNASSIGNED ? null : value

    setSaving(true)
    try {
      const response = await putApplicationReview(applicationId, {
        reviewerId: nextReviewerId,
      }) as any
      if (response?.statusCode >= 400) throw new Error()

      setApplications(applications.map((application: any) =>
        application.id === applicationId
          ? {
              ...application,
              review: {
                ...application.review,
                reviewerId: nextReviewerId,
              },
            }
          : application
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
      value={reviewerId ?? UNASSIGNED}
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
        {reviewerId && !admins.some((admin) => admin.id === reviewerId) && (
          <SelectItem value={reviewerId} disabled>
            Unknown admin
          </SelectItem>
        )}
        {admins.map((admin) => (
          <SelectItem key={admin.id} value={admin.id}>
            {admin.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
