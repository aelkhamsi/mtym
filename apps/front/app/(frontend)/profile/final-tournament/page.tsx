"use client"

import { Separator } from "@mdm/ui"
import { useAtomValue } from "jotai"
import { teamAtom } from "@/app/store/teamAtom"
import ReportsSection from "../regional-tournament/components/intermediate-reports-section"
import FinalReportRankingSection from "./components/final-report-ranking-section"

export default function FinalTournamentPage() {
  const team = useAtomValue(teamAtom)
  if (team?.review?.intermediateReportDecision !== "PASS") return null

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Rapport final</div>
        <p className="text-sm text-muted-foreground">
          Déposez vos rapports finaux et classez les problèmes que vous souhaitez défendre.
        </p>
      </div>

      <Separator />

      <ReportsSection reportType="FINAL" />
      <FinalReportRankingSection />
    </div>
  )
}
