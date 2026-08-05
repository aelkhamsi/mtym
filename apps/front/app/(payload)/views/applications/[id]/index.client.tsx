"use client"

import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"
import ApplicationPanel from "./layout/ApplicationPanel"
import ReviewerPanel from "./layout/ReviewerPanel"
import Header from "./layout/Header"

export default function ApplicationDetailsClient({
  id,
}:{
  id: string|undefined
}) {
  const applications = useAtomValue(applicationsAtom)
  const [application, setApplication] = useState<any>(undefined);
  
  useEffect(() => {
    if (!id || !applications || !Array.isArray(applications)) return;

    const searchResult = applications.find((application: any) => application?.id === +id)
    setApplication(searchResult)
  }, [id, applications])

  return (
    <div className="w-full">
      <Header application={application} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ApplicationPanel application={application} />

        <div className="sticky top-6 h-fit">
          <ReviewerPanel />
        </div>
      </div>
    </div>
  )
}
