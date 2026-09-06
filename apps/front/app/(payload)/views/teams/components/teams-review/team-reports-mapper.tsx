import { ReactNode } from "react"
import FilePreviewButton from "../../../components/file/file-preview-button"

export type Field = {
  label: string
  value: ReactNode
}

export function getTeamReportFields(
  reports?: any,
): Field[] {
  if (!reports) return []

  return [
    ...reports.map((report: any) => ({
      label: `Problème ${report.problemNumber}`,
      value: report?.fileUrl ? <FilePreviewButton filename={report?.fileUrl} /> : null,  
    }))
  ]
}