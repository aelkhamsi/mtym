"use client"

import { useRouter } from "next/navigation";
import { userAtom } from "@/app/store/userAtom";
import { useAtomValue } from "jotai";
import { TeamForm } from "./form/team-form";
import { ProfileSkeleton } from "@mdm/ui";


export default function ApplicationPage() {
  const userData = useAtomValue(userAtom)
  const router = useRouter();

  if (!userData) {
    return <ProfileSkeleton />;
  } else if (!userData?.application || userData?.application?.status?.status === 'DRAFT' || userData?.team) {
    router.push('/profile/team')
  }  else {
    return (
      <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
        <div className="space-y-6 p-10 pb-16">
          <TeamForm />
        </div>
      </div>
    )
  }

  return <ProfileSkeleton />
}