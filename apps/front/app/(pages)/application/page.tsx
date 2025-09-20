"use client"

import { useAtomValue } from "jotai";
import { ApplicationForm } from "./form/application-form";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui"
import { CLOSE_APPLICATIONS } from "config";
import { useRouter } from "next/navigation";

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)
  const router = useRouter();
  const applicationComplete = user?.application && user?.application?.status?.status !== 'DRAFT'
  const teamComplete = user?.team && user?.team?.users?.length >= 3 && user?.team?.users?.length <= 5 

  if (!user) {
    return <ProfileSkeleton />;
  }
  
  if (!CLOSE_APPLICATIONS) {
    return <ApplicationForm user={user} />;
  }
  
  if (applicationComplete && teamComplete) {
    return <ApplicationForm user={user} />;
  }
  
  router.push("/profile/application");
  return null;
}