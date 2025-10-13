"use client"

import { Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui";
import ApplicationSection from "./application-section";
import AdditionalInformationsSection from "./additional-information-section";
import { useEffect, useState } from "react";
import { applicationAtom } from "@/app/store/applicationAtom";
import { teamAtom } from "@/app/store/teamAtom";
import { Team } from "@mdm/types";

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)
  const application = useAtomValue(applicationAtom)
  const team = useAtomValue(teamAtom) as Team|undefined
  const [isApplicationComplete, setIsApplicationComplete] = useState<boolean>(false)
  const [isTeamComplete, setIsTeamComplete] = useState<boolean>(false)

  useEffect(() => {
    const applicationStatus = application?.status?.status;
    const teamMembers = team?.users?.length ?? 0

    setIsApplicationComplete(!!application && applicationStatus !== 'DRAFT')
    setIsTeamComplete(!!team && teamMembers >= 3 && teamMembers <= 5)
  }, [application, team])

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Candidature</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous trouverez le statut de votre candidature.
        </p>
      </div>

      <Separator className="h-1" />

      {!user
        ? <ProfileSkeleton />
        : <ApplicationSection application={application} team={team} />
      }

      {(isApplicationComplete && isTeamComplete) && 
        <>
          <div>
            <div className="text-lg font-medium">Informations complémentaires</div>
            <p className="text-sm text-muted-foreground">
              Certaines informations complémentaires sont nécessaires pour votre candidature
            </p>
          </div>

          <Separator className="h-1" />

          {!user
            ? <ProfileSkeleton />
            : <AdditionalInformationsSection user={user} />
          }
        </>
      }
    </div>
  )
}
