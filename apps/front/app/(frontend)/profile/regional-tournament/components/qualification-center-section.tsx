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
import { qualificationCenters } from "./qualification-centers"
import Link from "next/link"

const QualificationCenterSection = () => {
  const team = useAtomValue(teamAtom)
  if (!team || !team?.qualifCenter || !["APPROVED"].includes(team.status)) return null

  const positiveReviewDecision = team?.review?.intermediateReportDecision === 'PASS'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Résultat de la sélection intermédiaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        Resultat: <span 
          className={`
            ${positiveReviewDecision ? 'bg-green-700' : 'bg-red-800'}
            py-1 px-4 rounded-md text-white
          `}
        >
          {positiveReviewDecision ? 'Accepté' : 'Refusé'} 
        </span>


        {positiveReviewDecision 
          ? <>
            <p>Félicitations 🎉, votre équipe a été retenu pour participer aux tournois régionaux de MTYM!</p>
            {team?.qualifCenter === 'online'
              ? <p>Votre équipe va passer les tournois régionaux <span className="font-bold">en ligne</span>.</p>
              : <>
                <p>Votre équipe a été affecté au centre de qualification suivant: </p>
                <div className="bg-gray-100 p-2">
                  <p><span className="text-gray-400 text-sm font-light">Centre:</span> {qualificationCenters[team?.qualifCenter]?.establishment} - {qualificationCenters[team?.qualifCenter]?.city}</p>
                  <p><span className="text-gray-400 text-sm font-light">Adresse:</span> <Link className='inline-flex text-blue-400' href={qualificationCenters[team?.qualifCenter]?.address} target='_blank'>Lien <Link1Icon /></Link></p>
                </div>
              </>
            }
          </>
          : <>
            <p>Malheureusement 😔, votre équipe n'a pas été retenu pour participer aux tournois régionaux de MTYM!</p>
          </>
        }        
      </CardContent>
    </Card>
  )
}

export default QualificationCenterSection
