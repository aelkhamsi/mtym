"use client"

import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@mdm/ui"
import { useAtomValue } from "jotai";
import ReportsSection from "./components/intermediate-reports-section";
import { teamAtom } from "@/app/store/teamAtom";
import QualificationCenterSection from "./components/qualification-center-section";
import ParentalAuthorizationSection from "./components/parental-authorization-section";
import FinalReportRankingSection from "./components/final-report-ranking-section"

export default function RegionalTournamentPage() {
  const team = useAtomValue(teamAtom)
  const review = team?.review
  const canSeeFinalReport = review?.intermediateReportDecision === "PASS"

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Tournoi régional</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous déposerez votre rapports intermédiaires &
        </p>
      </div>

      <Separator />

      <QualificationCenterSection />
      {/* F6A806 */}

      <Tabs defaultValue="intermediate">
        <TabsList>
          <TabsTrigger 
            className="data-[state=active]:bg-[#F6A806] data-[state=active]:text-white"
            value="intermediate"
          >
            Rapport intermédiaire
          </TabsTrigger>
          {canSeeFinalReport && 
            <TabsTrigger
              className="data-[state=active]:bg-[#F6A806] data-[state=active]:text-white"
              value="final"
            >
              Rapport final
            </TabsTrigger>
          }
          {canSeeFinalReport &&
            <TabsTrigger
              className="data-[state=active]:bg-[#F6A806] data-[state=active]:text-white"
              value="documents"
            >
                Documents
            </TabsTrigger>
          }
          
        </TabsList>
        
        <TabsContent value="intermediate" className="mt-6 space-y-6">
          <ReportsSection reportType="INTERMEDIATE" />
        </TabsContent>

        {canSeeFinalReport && (
          <TabsContent value="final" className="mt-6 space-y-6">
            <ReportsSection reportType="FINAL" />
            <FinalReportRankingSection />
          </TabsContent>
        )}
        
        {canSeeFinalReport && (
          <TabsContent value="documents" className="mt-6 space-y-6">
            <ParentalAuthorizationSection />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
