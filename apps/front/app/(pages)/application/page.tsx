"use client"

import { useAtomValue } from "jotai";
import { ApplicationForm } from "./form/application-form";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui"
import { CLOSE_APPLICATIONS } from "@/../config";
import { useRouter } from "next/navigation";

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)
  const router = useRouter();

  if (!user) {
    return <ProfileSkeleton />;
  }

  if (CLOSE_APPLICATIONS) {
    router.push("/profile/application");
    return null;
  }
  
  return <ApplicationForm user={user} />;
}