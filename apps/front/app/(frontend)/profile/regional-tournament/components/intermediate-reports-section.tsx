"use client"

import { useState } from "react"
import {
  MTYM_PROBLEM_COUNT,
  MTYM_REPORT_MAX_FILE_SIZE,
} from "@mdm/shared"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  LoadingDots,
  toast,
} from "@mdm/ui"
import type { TeamReport } from "@mdm/types"
import { useAtom, useAtomValue } from "jotai"
import { uploadFile } from "@/app/api/MediaApi"
import {
  getFinalReportUploadUrl,
  getIntermediateReportUploadUrl,
  updateFinalReport,
  updateIntermediateReport,
} from "@/app/api/TeamApi"
import { teamAtom } from "@/app/store/teamAtom"
import { userAtom } from "@/app/store/userAtom"
import { computeSHA256 } from "@/app/utils/file.utils"
import FilePreviewButton from "@/app/(payload)/views/components/file/file-preview-button"

const ReportRow = ({
  reportType,
  problemNumber,
  report,
  selectedFile,
  canUpload,
  onFileChange,
  onSubmit,
  inputVersion,
  isDisabled,
  isUploading,
}: {
  reportType: "INTERMEDIATE" | "FINAL"
  problemNumber: number
  report?: TeamReport
  selectedFile?: File
  canUpload: boolean
  onFileChange: (file?: File) => void
  onSubmit: () => void
  inputVersion: number
  isDisabled: boolean
  isUploading: boolean
}) => (
  <div className="space-y-3 rounded-md border p-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="font-medium">Problème {problemNumber}</div>
      {report
        ? <FilePreviewButton filename={report.fileUrl} />
        : <span className="text-sm text-red-500">Pas encore déposé</span>
      }
    </div>

    {canUpload && (
      <div className="space-y-3">
        <Input
          key={inputVersion}
          id={`${reportType}-report-${problemNumber}`}
          type="file"
          accept="application/pdf"
          className="hidden"
          disabled={isDisabled}
          onChange={(event) => onFileChange(event.target.files?.[0])}
        />
        <label
          htmlFor={`${reportType}-report-${problemNumber}`}
          className="flex flex-1 gap-x-4 rounded-md border px-4 py-2 text-sm hover:cursor-pointer"
        >
          <div className="font-semibold">
            {report || selectedFile ? "Modifier le fichier" : "Ajouter un fichier"}
          </div>
          <div>
            {selectedFile?.name ?? (report ? "✅ Votre fichier a été envoyé!" : "Pas de fichier")}
          </div>
        </label>
        <Button type="button" disabled={isDisabled} onClick={onSubmit}>
          {isUploading
            ? <LoadingDots color="#808080" />
            : "Envoyer le fichier"
          }
        </Button>
      </div>
    )}
  </div>
)

const ReportsSection = ({ reportType }: { reportType: "INTERMEDIATE" | "FINAL" }) => {
  const user = useAtomValue(userAtom)
  const [team, setTeam] = useAtom(teamAtom)
  const [files, setFiles] = useState<Record<number, File | undefined>>({})
  const [uploadingProblem, setUploadingProblem] = useState<number>()
  const [inputVersions, setInputVersions] = useState<Record<number, number>>({})

  if (!team) return null
  if (reportType === "FINAL" && team.review?.intermediateReportDecision !== "PASS") return null
  if (reportType === "INTERMEDIATE" && team.status !== "APPROVED") return null

  const isTeamLeader = team.leader?.id === user?.id
  const problemNumbers = Array.from(
    { length: MTYM_PROBLEM_COUNT },
    (_, index) => index + 1,
  )

  const submit = async (problemNumber: number) => {
    const file = files[problemNumber]

    if (!file) {
      toast({
        title: "Rapport manquant",
        description: "Veuillez sélectionner un PDF.",
        variant: "destructive",
      })
      return
    }
    if (file.type !== "application/pdf") {
      toast({
        title: "Fichier invalide",
        description: "Le rapport doit être au format PDF.",
        variant: "destructive",
      })
      return
    }
    if (file.size > MTYM_REPORT_MAX_FILE_SIZE) {
      toast({
        title: "Fichier trop volumineux",
        description: "Le fichier doit faire moins de 10 Mo.",
        variant: "destructive",
      })
      return
    }

    setUploadingProblem(problemNumber)

    try {
      const checksum = await computeSHA256(file)
      const getUploadUrl = reportType === "FINAL" ? getFinalReportUploadUrl : getIntermediateReportUploadUrl
      const signedUrlResponse = await getUploadUrl(
        team.id,
        problemNumber,
        file.size,
        checksum,
      ) as { url?: string; fileUrl?: string }

      if (!signedUrlResponse.url || !signedUrlResponse.fileUrl) {
        throw new Error()
      }

      const uploadResponse = await uploadFile(
        signedUrlResponse.url,
        file,
      ) as { statusCode: number }
      if (uploadResponse.statusCode < 200 || uploadResponse.statusCode >= 300) {
        throw new Error()
      }

      const saveReport = reportType === "FINAL" ? updateFinalReport : updateIntermediateReport
      const savedReport = await saveReport(
        team.id,
        problemNumber,
        signedUrlResponse.fileUrl,
      ) as TeamReport
      if (!savedReport.id) throw new Error()

      setTeam((current) => current ? {
        ...current,
        reports: [
          ...(current.reports ?? []).filter(
            (report) => report.reportType !== reportType || report.problemNumber !== problemNumber,
          ),
          savedReport,
        ],
      } : current)
      setFiles((current) => ({ ...current, [problemNumber]: undefined }))
      setInputVersions((current) => ({
        ...current,
        [problemNumber]: (current[problemNumber] ?? 0) + 1,
      }))
      toast({
        title: "Rapport envoyé",
        description: `Le rapport du problème ${problemNumber} a bien été enregistré.`,
      })
    } catch {
      toast({
        title: "Échec de l'envoi",
        description: "Le rapport n'a pas pu être envoyé. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setUploadingProblem(undefined)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{reportType === "FINAL" ? "Rapports finaux" : "Rapports intermédiaires"}</CardTitle>
        <CardDescription>
          Déposez un rapport PDF pour chaque problème.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTeamLeader && (
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            Lecture seule : seul le responsable de l&apos;équipe peut déposer ou remplacer les rapports.
          </p>
        )}

        {problemNumbers.map((problemNumber) => (
          <ReportRow
            key={problemNumber}
            reportType={reportType}
            problemNumber={problemNumber}
            report={team.reports?.find(
              (item) => item.reportType === reportType && item.problemNumber === problemNumber,
            )}
            selectedFile={files[problemNumber]}
            canUpload={reportType === "FINAL" && isTeamLeader}
            inputVersion={inputVersions[problemNumber] ?? 0}
            isDisabled={uploadingProblem !== undefined}
            isUploading={uploadingProblem === problemNumber}
            onSubmit={() => submit(problemNumber)}
            onFileChange={(file) => {
              setFiles((current) => ({ ...current, [problemNumber]: file }))
            }}
          />
        ))}

        {isTeamLeader && (
          <p className="text-xs text-muted-foreground">
            PDF uniquement, 10 Mo maximum par fichier.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default ReportsSection
