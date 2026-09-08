import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@mdm/ui"
import FilePreviewButton from "app/(payload)/views/components/file/file-preview-button"
import { ReactNode } from "react"

type Field = {
  label: string
  value: ReactNode
}

const getTeamReportFields = (
  reports?: any,
): Field[] => {
  if (!reports) return []

  return reports
    .sort((a: any, b: any) => Number(a.problemNumber) - Number(b.problemNumber))
    .map((report: any) => ({
      label: `Problème ${report.problemNumber}`,
      value: report?.fileUrl ? <FilePreviewButton filename={report?.fileUrl} /> : null,
    }))
}

export const ProblemsPanel = ({
  reports,
}: {
  reports: any[]
}) => {
  const reportFields = getTeamReportFields(reports)

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 py-6">
        <CardTitle className="text-lg p-2 bg-gray-100 rounded-md">Problems Panel</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <div className="divide-y rounded-lg border">
          {reportFields.map((field, index) => (
            <ReportField key={`field_${index}`} field={field} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const ReportField = ({
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