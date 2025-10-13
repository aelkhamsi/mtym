"use client"

import { Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import TeamSection from "./components/team-section";
import NoTeamSection from "./components/no-team-section";
import { teamAtom } from "@/app/store/teamAtom";
import { applicationAtom } from "@/app/store/applicationAtom";

export default function TeamPage() {
  const user = useAtomValue(userAtom)
  const application = useAtomValue(applicationAtom)
  const team = useAtomValue(teamAtom)

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Équipe</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous trouverez le statut de votre équipe.
        </p>
      </div>

      <Separator />

      {team
        ? <TeamSection user={user} team={team} />
        : <NoTeamSection user={user} application={application} />
      }
    </div>
  )
}
