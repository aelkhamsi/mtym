"use client"

import { useRouter } from "next/navigation";
import { userAtom } from "@/app/store/userAtom";
import { useAtomValue } from "jotai";
import { TeamForm } from "./form/team-form";
import { ProfileSkeleton } from "@mdm/ui";
import { CLOSE_APPLICATIONS } from "@/../config";

export default function TeamPage() {
  const user = useAtomValue(userAtom)
  const router = useRouter();
  
  const applicationComplete = user?.application && user?.application?.status?.status !== 'DRAFT'
  const isFormClosed = CLOSE_APPLICATIONS || !applicationComplete || user?.team

  if (!user) {
    return <ProfileSkeleton />;
  }

  if (isFormClosed)  {
    router.push('/profile/team')
    return null
  }
  
  return (
    <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
      <div className="space-y-6 p-10 pb-16">
        <TeamForm />
      </div>
    </div>
  )
}