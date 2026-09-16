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
import { qualificationCenters } from "./qualification-centers"

const ParentalAuthorizationSection = () => {
  const team = useAtomValue(teamAtom)
  if (!team || !team?.qualifCenter || !["APPROVED"].includes(team.status)) return null

  const positiveReviewDecision = team?.review?.intermediateReportDecision === 'PASS'
  if (!positiveReviewDecision) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Autorisation Parentale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Pour valider votre participation et confirmer votre présence, vous allez devoir uploader une autorisation parentale.</p>
        <p>Cette autorisation parentale est individuelle. Chaque membre de l&apos;équipe devra <span className="font-semibold">la remplir, la légaliser puis l&apos;uploader</span></p>

        {team?.qualifCenter === 'fez' || team?.qualifCenter === 'benguerir' || team?.qualifCenter === 'rabat'
          ? <p className="font-semibold text-red-900">Nous allons vous partager (dans cette même page) très prochainement le modèle de l&apos;autorisation à remplir relatif à votre centre. Ne remplissez pas à autre modèle entre temps.</p>
          : <p>Chaque centre de qualification requiert une autorisation parentale différente. Il est donc impératif d&apos;utiliser le modèle suivant: <Link className='inline-flex text-blue-400' href={qualificationCenters[team?.qualifCenter]?.parentalAuthorizationUrl} target='_target'> Lien <Link1Icon /></Link></p>  
        }
        

        <AdditionalInformationsSection
          fieldName="parentalAuthorization"
          filePrefix="parentalAuthorization"
          label="Autorisation parentale"
          description="Images ou PDF, 3 Mo maximum."
        />
      </CardContent>
    </Card>
  )
}

export default ParentalAuthorizationSection
