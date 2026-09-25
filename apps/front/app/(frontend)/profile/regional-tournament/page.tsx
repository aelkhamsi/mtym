"use client"

import { Separator } from "@mdm/ui"
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import ReportsSection from "./components/intermediate-reports-section";
import { teamAtom } from "@/app/store/teamAtom";
import QualificationCenterSection from "./components/qualification-center-section";
import ParentalAuthorizationSection from "./components/parental-authorization-section";

export default function RegionalTournamentPage() {
  const team = useAtomValue(teamAtom)
  const review = team?.review

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Tournoi régional</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous déposerez votre rapports intermédiaires &
        </p>
      </div>

      <Separator />

      <ReportsSection reportType="INTERMEDIATE" />
      <QualificationCenterSection />
      <ParentalAuthorizationSection />
    </div>
  )
}
