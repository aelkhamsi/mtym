"use client"

import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"
import ApplicationPanel from "./layout/ApplicationPanel"
import ReviewerPanel from "./layout/ReviewerPanel"
import Header from "./layout/Header"
import { AdminOption } from "../components/table/columns"
import { ProfileSkeleton } from "@mdm/ui"

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
  }, [id, applications])

  if (!application) {
    return <ProfileSkeleton />
  }

  return (
    <div className="w-full">
      <Header application={application} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ApplicationPanel application={application} />

        <div className="sticky top-6 h-fit">
          <ReviewerPanel application={application} admins={admins} />
        </div>
      </div>
    </div>
  )
}
