
"use client"

import { ProfileSkeleton, Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import TeamSection from "./components/team-section";
import NoTeamSection from "./components/no-team-section";

export default function TeamPage() {
  const user = useAtomValue(userAtom)

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
          ? <TeamSection user={user} />
          : <NoTeamSection user={user} />
      }
    </div>
  )
}
