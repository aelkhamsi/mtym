"use client"

import { Badge, Button, Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import { useEffect, useState } from "react";
import { applicationAtom } from "@/app/store/applicationAtom";
import { teamAtom } from "@/app/store/teamAtom";
import { Team } from "@mdm/types";
import { participantDetailsAtom } from "@/app/store/participantDetailsAtom";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mdm/ui";
import { formatDate } from "@mdm/utils";
import { useRouter } from "next/navigation";

const getBadgeClassname = (status: string) => {
  switch(status) {
    case 'DRAFTED':
      return 'bg-gray-300 text-black';
    case 'COMPLETE':
      return 'bg-[#006644] text-white';
  }
}


export default function ParticipantDetailsPage() {
  const router = useRouter()
  const user = useAtomValue(userAtom)
  const participantDetails = useAtomValue(participantDetailsAtom)

  if (!user?.qualified) {
    router.push('/profile/account')
    return
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Formulaire Participant</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous trouverez le formulaire participant à compléter.
        </p>
      </div>

      <Separator className="h-1" />

      <Card>
        <CardHeader>
          <CardTitle> Informations pratiques pour votre participation </CardTitle>
          <CardDescription> Pour compléter votre candidature, nous avons besoin d&apos;informations complémentaires. </CardDescription>
        </CardHeader>

        <CardContent>
          {participantDetails && 
            <>
              <div className="text-sm"><span className="font-bold">Date de soumission</span>: {formatDate(participantDetails?.createdAt)}</div>
              <div className="text-sm"><span className="font-bold">Date de sauvegarde</span>: {formatDate(participantDetails?.updatedAt)}</div>
              <div className="text-sm"><span className="font-bold">Status</span>: <Badge className={`px-4 ${getBadgeClassname(participantDetails?.status)}`}>{participantDetails?.status}</Badge></div>
            </>
          }
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => router.push('/participant-details')}
          >
            Remplir le Formulaire Participant
          </Button>
        </CardFooter> 
      </Card>
    </div>
  )
}
