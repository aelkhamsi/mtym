
"use client"

import { Badge, Button, ProfileSkeleton, Separator } from "@mdm/ui"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mdm/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mdm/ui"
import { useRouter } from "next/navigation";
import { InviteButton } from "./components/invite-button";
import QuitButton from "./components/quit-button";
import { ActionButton } from "./components/action-button";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import TeamBanner from "./components/team-banner";
import TeamMembers from "./components/team-members";
import TeamMentor from "./components/team-mentor";

export default function TeamPage() {
  const user = useAtomValue(userAtom)
  const isTeamLeader = user?.team?.leader?.id === user?.id 
  const router = useRouter();

  const teamSection = (
    <Card>
      <CardHeader>
        <TeamBanner team={user?.team} />
      </CardHeader>

      <CardContent className="space-y-4 px-8">            
        <Separator />
        <TeamMembers userId={user?.id} team={user?.team} />

        <Separator />
        <TeamMentor team={user?.team} />
      </CardContent>

      <CardFooter className="flex space-x-4">
        {isTeamLeader && <InviteButton />}
        <QuitButton isTeamLeader={isTeamLeader} />
      </CardFooter>
    </Card>
  )

  const noTeamSection = (
    <Card>
      <CardHeader>
        <CardTitle>Vous ne faites pas partie d&apos;une équipe!</CardTitle>
        <CardDescription>Votre candidature n&apos;est pas valide tant que vous n&apos;avez pas rejoint une équipe.</CardDescription>
      </CardHeader>

      <CardFooter>
        {(!user?.application || user?.application?.status?.status === 'DRAFT')
          ? <>
            <p className="text-sm">Avant que vous puissiez rejoindre une équipe, il faut que vous soumettiez votre candidature</p>
            <Button onClick={() => router.push('/application')}>
              Créer votre candidature
            </Button>
          </>
          : <Button onClick={() => router.push('/team')}>
            Rejoindre une équipe
          </Button>
        }
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Équipe</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous trouverez le statut de votre équipe.
        </p>
      </div>

      <Separator />

      {!user
        ? <ProfileSkeleton />
        : user?.team
          ? teamSection
          : noTeamSection
      }
    </div>
  )
}
