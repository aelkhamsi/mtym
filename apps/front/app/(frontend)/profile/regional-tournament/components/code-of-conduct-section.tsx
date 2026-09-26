"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Link1Icon,
} from "@mdm/ui"
import { useAtomValue } from "jotai"
import { teamAtom } from "@/app/store/teamAtom"
import AdditionalInformationsSection from "./additional-information-section"
import Link from "next/link"

const codeOfConductDocumentUrl = "https://drive.google.com/file/d/18MhpM3cT6tYEfZz_nLVjmcoKJqccsmkO/view?usp=sharing"
const reglementGeneralDocumentUrl = "https://drive.google.com/file/d/1G_sEx3S3ba5R9eoR4xV84k8Wzp-Ksapr/view?usp=sharing"

const CodeOfConductSection = () => {
  const team = useAtomValue(teamAtom)
  if (!team?.qualifCenter || team.status !== "APPROVED" || team.review?.intermediateReportDecision !== "PASS") return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code de Conduite</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Pour valider votre participation et confirmer votre présence, vous devez :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><span className="font-semibold">lire le règlement général ;</span></li>
          <li>signer et uploader le Code de Conduite. Ce document est individuel : chaque membre de l&apos;équipe devra <span className="font-semibold">le lire, l&apos;imprimer, le signer puis l&apos;uploader</span>.</li>
        </ul>

        <p>Lien vers le Code de Conduite (à signer !) : <Link className="inline-flex text-blue-400" href={codeOfConductDocumentUrl} target="_blank" rel="noopener noreferrer">Lien <Link1Icon /></Link></p>
        <p>Lien vers le règlement général (à lire uniquement) : <Link className="inline-flex text-blue-400" href={reglementGeneralDocumentUrl} target="_blank" rel="noopener noreferrer">Lien <Link1Icon /></Link></p>

        <AdditionalInformationsSection
          fieldName="codeOfConduct"
          filePrefix="codeOfConduct"
          label="Code de Conduite"
          description="Images ou PDF, 3 Mo maximum."
        />
      </CardContent>
    </Card>
  )
}

export default CodeOfConductSection
