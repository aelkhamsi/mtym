"use client"

import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"
import ReviewerPanel from "./layout/ReviewerPanel"
import Header from "./layout/Header"
import { AdminOption } from "../components/table/columns"
import { ProfileSkeleton } from "@mdm/ui"
import ApplicationPanel from "./layout/ApplicationPanel"
import TeamPanel from "./layout/TeamPanel"
import { log } from "console"

export default function ApplicationDetailsClient({
  id,
  admins,
}:{
  id: string|undefined,
  admins: AdminOption[],
}) {
  const applications = useAtomValue(applicationsAtom)
  const [application, setApplication] = useState<any>(undefined);
  
  useEffect(() => {
    if (!id || !applications || !Array.isArray(applications)) return;

    const searchResult = applications.find((application: any) => application?.id === +id)
    setApplication(searchResult)
    console.log('application', searchResult)
  }, [id, applications])

  if (!application) {
    return <ProfileSkeleton />
  }

  return (
    <div className="w-full space-y-10">
      <Header application={application} admins={admins}/>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <CandidateTabs application={application} team={application?.user?.team} />

        <div className="sticky lg:mt-16 h-fit">
          <ReviewerPanel application={application} />
        </div>
      </div>
    </div>
  )
}

function CandidateTabs({ application, team }:{ application: any, team: any }) {
  const [tab, setTab] = useState("application");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b">
        {[
          { id: "application", label: "Application" },
          { id: "team", label: "Team" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-lg font-semibold rounded-t-lg transition-colors ${
              tab === t.id
                ? "text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={tab === t.id ? { backgroundColor: "#F6A806", color: "black" } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "application" 
        ? <ApplicationPanel application={application} />
        : <TeamPanel team={team} />
      }
    </div>
  );
}
