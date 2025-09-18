
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

export default function TeamPage() {
  const userData = useAtomValue(userAtom)
  const [content, setContent] = useState<any>(undefined);
  const [isTeamLeader, setIsTeamLeader] = useState<boolean>(false);
  const router = useRouter();
  
  useEffect(() => {
    const team = userData?.team;
    const isTeamLeader = team?.leader?.id === userData?.id 
    setIsTeamLeader(isTeamLeader);

    if (!team) {
      setContent({
        title: "Vous ne faites pas partie d'une équipe!",
        subtitle: "Votre candidature n'est pas valide tant que vous n'avez pas rejoint une équipe.",
      })
    } else {
      setContent({
        title: isTeamLeader ? "Vous avez créé une équipe!" : "Vous avez rejoint une équipe!",
        subtitle: "Votre candidature sera jointe à celles de vos coéquipiers.",
      })
    }
  }, [userData])

  const applicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>
          {content?.title}
        </CardTitle>
        <CardDescription>
          {content?.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userData?.team && 
          <div>
            <TeamBanner team={userData.team} />
            
            <div className="space-y-4 p-4">
              <TeamMembers
                userId={userData?.id}
                team={userData?.team}
              ></TeamMembers>

              <div>
                <span className="font-bold">Mentor</span>

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {userData?.team?.mentorFullname
                          ? userData?.team?.mentorFullname 
                          : <span className="text-gray-500">(non défini)</span>
                        }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        }
      </CardContent>

      <CardFooter>
        {(!userData?.application || userData?.application?.status?.status === 'DRAFT')
          ? (
            <>
              <p>Avant que vous puissiez rejoindre une équipe, il faut que vous soumettiez votre candidature:</p>
              <Button
                onClick={() => router.push('/application')}
              >
                Créer votre candidature
              </Button>
            </>
          ) : (
            userData?.team
              ? (
                <div className="flex space-x-4">
                  {isTeamLeader && <InviteButton />}
                  <QuitButton isTeamLeader={isTeamLeader} />
                </div>
              ) : (
                <Button
                  onClick={() => router.push('/team')}
                >
                  Rejoindre une équipe
                </Button>
              )
          )
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

      {!userData
        ? <ProfileSkeleton />
        : applicationCard
      }
    </div>
  )
}
