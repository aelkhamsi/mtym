"use client"

import { useAtomValue } from "jotai";
import { ParticipantDetailsForm } from "./form/participant-details-form";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui"

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)

  if (!user) {
    return <ProfileSkeleton />;
  }
  
  return <ParticipantDetailsForm user={user} />;
}