"use client"

import { useAtomValue } from "jotai";
import { ApplicationForm } from "./form/application-form";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui"

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)

  if (user) {
    return <ApplicationForm user={user} />
  } else { 
    return <ProfileSkeleton />
  }
}