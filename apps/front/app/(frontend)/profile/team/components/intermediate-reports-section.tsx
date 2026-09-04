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
import { useAtomValue } from "jotai"
import { uploadFile } from "@/app/api/MediaApi"
import {
  getIntermediateReportUploadUrl,
  updateIntermediateReports,
} from "@/app/api/TeamApi"
import { teamAtom } from "@/app/store/teamAtom"
import { userAtom } from "@/app/store/userAtom"
import { computeSHA256 } from "@/app/utils/file.utils"
import FilePreviewButton from "@/app/(payload)/views/applications/components/file/file-preview-button"

const IntermediateReportRow = ({
  problemNumber,
  report,
  canUpload,
  onFileChange,
  inputVersion,
}: {
  problemNumber: number
  report?: TeamReport
  canUpload: boolean
  onFileChange: (file?: File) => void
  inputVersion: number
}) => (
  <div className="space-y-3 rounded-md border p-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="font-medium">Problème {problemNumber}</div>
      {report
        ? <FilePreviewButton filename={report.fileUrl} />
        : <span className="text-sm text-muted-foreground">Pas encore déposé</span>
      }
    </div>

    {canUpload && (
      <Input
        key={inputVersion}
        type="file"
        accept="application/pdf"
        onChange={(event) => onFileChange(event.target.files?.[0])}
      />
    )}
  </div>
)

const IntermediateReportsSection = () => {
  const user = useAtomValue(userAtom)
  const team = useAtomValue(teamAtom)
  const [reports, setReports] = useState<TeamReport[]>(
    team?.reports?.filter((report) => report.reportType === "INTERMEDIATE") ?? [],
  )
  const [files, setFiles] = useState<Record<number, File | undefined>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [inputVersion, setInputVersion] = useState(0)

  if (!team || !["NEW", "APPROVED"].includes(team.status)) return null

  const isTeamLeader = team.leader?.id === user?.id
  const problemNumbers = Array.from(
    { length: MTYM_PROBLEM_COUNT },
    (_, index) => index + 1,
  )

  const submit = async () => {
    const selectedFiles = problemNumbers.map((problemNumber) => ({
      problemNumber,
      file: files[problemNumber],
    }))

    if (selectedFiles.some(({ file }) => !file)) {
      toast({
        title: "Rapports manquants",
        description: "Veuillez sélectionner un PDF pour chaque problème.",
        variant: "destructive",
      })
      return
    }
    if (selectedFiles.some(({ file }) => file?.type !== "application/pdf")) {
      toast({
        title: "Fichier invalide",
        description: "Tous les rapports doivent être au format PDF.",
        variant: "destructive",
      })
      return
    }
    if (selectedFiles.some(({ file }) => file!.size > MTYM_REPORT_MAX_FILE_SIZE)) {
      toast({
        title: "Fichier trop volumineux",
        description: "Chaque fichier doit faire moins de 10 Mo.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const uploadedReports = await Promise.all(
        selectedFiles.map(async ({ problemNumber, file }) => {
          const checksum = await computeSHA256(file!)
          const signedUrlResponse = await getIntermediateReportUploadUrl(
            team.id,
            problemNumber,
            file!.size,
            checksum,
          ) as { url?: string; fileUrl?: string }

          if (!signedUrlResponse.url || !signedUrlResponse.fileUrl) {
            throw new Error()
          }

          const uploadResponse = await uploadFile(
            signedUrlResponse.url,
            file!,
          ) as { statusCode: number }
          if (uploadResponse.statusCode < 200 || uploadResponse.statusCode >= 300) {
            throw new Error()
          }

          return {
            problemNumber,
            fileUrl: signedUrlResponse.fileUrl,
          }
        }),
      )

      const savedReports = await updateIntermediateReports(
        team.id,
        uploadedReports,
      ) as TeamReport[]
      if (!Array.isArray(savedReports)) {
        throw new Error()
      }

      setReports(savedReports)
      setFiles({})
      setInputVersion((current) => current + 1)
      toast({
        title: "Rapports envoyés",
        description: "Tous les rapports intermédiaires ont bien été enregistrés.",
      })
    } catch {
      toast({
        title: "Échec de l'envoi",
        description: "Les rapports n'ont pas pu être envoyés. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rapports intermédiaires</CardTitle>
        <CardDescription>
          Sélectionnez un PDF pour chaque problème, puis envoyez tous les rapports en une seule fois.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTeamLeader && (
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            Lecture seule : seul le responsable de l&apos;équipe peut déposer ou remplacer les rapports.
          </p>
        )}

        {problemNumbers.map((problemNumber) => (
          <IntermediateReportRow
            key={problemNumber}
            problemNumber={problemNumber}
            report={reports.find((item) => item.problemNumber === problemNumber)}
            canUpload={isTeamLeader}
            inputVersion={inputVersion}
            onFileChange={(file) => {
              setFiles((current) => ({ ...current, [problemNumber]: file }))
            }}
          />
        ))}

        {isTeamLeader && (
          <div className="space-y-2">
            <Button type="button" disabled={isLoading} onClick={submit}>
              {isLoading
                ? <LoadingDots color="#808080" />
                : "Envoyer tous les rapports"
              }
            </Button>
            <p className="text-xs text-muted-foreground">
              PDF uniquement, 10 Mo maximum par fichier.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default IntermediateReportsSection
