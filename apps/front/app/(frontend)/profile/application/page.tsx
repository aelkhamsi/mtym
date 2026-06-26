"use client"

import { Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui";
import ApplicationSection from "./application-section";

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)

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
    </div>
  )
}
