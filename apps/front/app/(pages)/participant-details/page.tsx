"use client"

import { useAtomValue } from "jotai";
import { ParticipantDetailsForm } from "./form/participant-details-form";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui"
import { useRouter } from "next/navigation"

export default function ParticipantDetailsPage() {
  const user = useAtomValue(userAtom)
  const router = useRouter()

  if (!user) {
    return <ProfileSkeleton />;
  }

  if (!user?.qualified) {
    router.push('/')
    return
  }

  return <ParticipantDetailsForm user={user} />;
}