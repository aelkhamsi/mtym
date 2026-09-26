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
  reports: any[],
  reportType: "INTERMEDIATE" | "FINAL",
): Field[] => {
  if (!reports) return []

  return reports
    .filter((report) => report.reportType === reportType)
    .sort((a, b) => Number(a.problemNumber) - Number(b.problemNumber))
    .map((report) => ({
      label: `Problème ${report.problemNumber}`,
      value: report?.fileUrl ? <FilePreviewButton filename={report.fileUrl} /> : null,
    }))
}

export const ProblemsPanel = ({
  reports,
  finalReportRanking,
}: {
  reports: any[]
  finalReportRanking: number[] | null
}) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 py-6">
        <CardTitle className="text-lg p-2 bg-gray-100 rounded-md">Rapports et préférences</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <div className="space-y-5">
          {(["INTERMEDIATE", "FINAL"] as const).map((reportType) => (
            <div key={reportType}>
              <h3 className="mb-2 font-medium">{reportType === "FINAL" ? "Rapports finaux" : "Rapports intermédiaires"}</h3>
              <div className="divide-y rounded-lg border">
                {getTeamReportFields(reports, reportType).map((field) => (
                  <ReportField key={`${reportType}-${field.label}`} field={field} />
                ))}
              </div>
            </div>
          ))}
          <div>
            <h3 className="mb-2 font-medium">Préférences de défense</h3>
            <p className="text-sm">{finalReportRanking?.map((problem, index) => `${index + 1}. Problème ${problem}`).join(" · ") ?? "Non renseignées"}</p>
          </div>
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