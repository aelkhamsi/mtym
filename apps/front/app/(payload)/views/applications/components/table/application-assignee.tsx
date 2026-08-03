"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "@mdm/ui"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"
import { putApplicationAssignee } from "@/app/api/ApplicationApi"
import type { AdminOption } from "./columns"

const UNASSIGNED = "__unassigned__"

export function ApplicationAssignee({
  applicationId,
  assignedAdminId,
  admins,
}: {
  applicationId: number
  assignedAdminId: string | null
  admins: AdminOption[]
}) {
  const [applications, setApplications] = useAtom(applicationsAtom)
  const [saving, setSaving] = useState(false)

  const handleChange = async (value: string) => {
    const nextId = value === UNASSIGNED ? null : value

    setSaving(true)
    try {
      const response = await putApplicationAssignee(applicationId, nextId) as any
      if (response?.statusCode !== 200) throw new Error()

      setApplications(applications.map((application: any) =>
        application.id === applicationId
          ? {
              ...application,
              assignedAdminId: nextId,
            }
          : application
      ))
      toast({ title: "Assigned admin updated" })
    } catch {
      toast({ title: "Could not update assigned admin", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Select value={assignedAdminId ?? UNASSIGNED} onValueChange={handleChange} disabled={saving}>
      <SelectTrigger
        className="w-[220px]"
        style={{ backgroundColor: "var(--theme-input-bg)", color: "var(--theme-text)" }}
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
        {assignedAdminId && !admins.some((admin) => admin.id === assignedAdminId) && (
          <SelectItem value={assignedAdminId} disabled>
            Unknown admin
          </SelectItem>
        )}
        {admins.map((admin) => (
          <SelectItem key={admin.id} value={admin.id}>{admin.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
