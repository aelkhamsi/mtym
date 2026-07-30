'use client'

import { applicationsAtom } from "@/app/store/admin/applicationsAtom";
import { useAtomValue } from "jotai";

export const ApplicationsView = () => {
  const applications = useAtomValue(applicationsAtom);
  console.log('applications', applications)

  return (
    <div>Applications View</div>
  )
}
