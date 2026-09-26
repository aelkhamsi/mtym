"use client"

import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@mdm/ui"
import { MTYM_PROBLEM_COUNT } from "@mdm/shared"
import { useAtomValue } from "jotai";
import ReportsSection from "./components/intermediate-reports-section";
import { teamAtom } from "@/app/store/teamAtom";
import { applicationAtom } from "@/app/store/applicationAtom";
import QualificationCenterSection from "./components/qualification-center-section";
import ParentalAuthorizationSection from "./components/parental-authorization-section";
import CodeOfConductSection from "./components/code-of-conduct-section";
import FinalReportRankingSection from "./components/final-report-ranking-section"

const MissingDot = () => (
  <span title="Éléments manquants" className="ml-2 inline-block h-2 w-2 rounded-full bg-red-500" />
)

export default function RegionalTournamentPage() {
  const team = useAtomValue(teamAtom)
  const application = useAtomValue(applicationAtom)
  const review = team?.review
  const canSeeFinalReport = review?.intermediateReportDecision === "PASS"
  const missingReports = (reportType: "INTERMEDIATE" | "FINAL") =>
    Array.from({ length: MTYM_PROBLEM_COUNT }, (_, index) => index + 1).some(
      (problemNumber) => !team?.reports?.some(
        (report) => report.reportType === reportType && report.problemNumber === problemNumber && report.fileUrl,
      ),
    )
  const missingFinal = missingReports("FINAL") || team?.finalReportRanking?.length !== MTYM_PROBLEM_COUNT
  const missingDocuments = !application?.parentalAuthorizationUrl || !application?.codeOfConductUrl

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
              {missingFinal && <MissingDot />}
            </TabsTrigger>
          }
          {canSeeFinalReport &&
            <TabsTrigger
              className="data-[state=active]:bg-[#F6A806] data-[state=active]:text-white"
              value="documents"
            >
                Documents
                {missingDocuments && <MissingDot />}
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
            <CodeOfConductSection />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
