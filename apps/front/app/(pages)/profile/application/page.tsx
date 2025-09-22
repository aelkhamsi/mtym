"use client"

import { Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui";
import ApplicationSection from "./application-section";
import AdditionalInformationsSection from "./additional-information-section";
import { useEffect, useState } from "react";

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)
  const [isApplicationComplete, setIsApplicationComplete] = useState(false)
  const [isTeamComplete, setIsTeamComplete] = useState(false)

  useEffect(() => {
    const application = user?.application;
    const applicationStatus = application?.status?.status;
    const teamMembers = user?.team?.users?.length

    setIsApplicationComplete(application && applicationStatus !== 'DRAFT')
    setIsTeamComplete(user?.team && teamMembers >= 3 && teamMembers <= 5)
  })

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
        : <ApplicationSection />
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
            : <AdditionalInformationsSection />
          }
        </>
      }
    </div>
  )
}
