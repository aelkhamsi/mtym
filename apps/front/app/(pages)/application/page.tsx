"use client"

import { useAtomValue } from "jotai";
import { ApplicationForm } from "./form/application-form";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui"
import { useRouter } from "next/navigation";

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)
  const router = useRouter();

  if (user) {
    return <ApplicationForm user={user} />
  } else { 
    return <ProfileSkeleton />
  }
}