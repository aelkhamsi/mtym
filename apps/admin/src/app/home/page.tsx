"use client"

import { HoverEffect } from "@/components/shared/card-hover-effect";
import Image from "next/image";
import Stats from "./stats";
import { useAtomValue } from "jotai";
import { applicationsAtom } from "@/store/applicationsAtom";
import { teamsAtom } from "@/store/teamsAtom";

const links = [
  {
    title: "Applications",
    description:
      "Manage applications",
    link: "/home/applications",
  },
  {
    title: "Users",
    description:
      "Manage user pofiles",
    link: "/home/users",
  },
  {
    title: "Teams",
    description:
      "Manage teams",
    link: "/home/teams",
  },
];

const countApplications = (applications: any[]) => {
  return (applications||[])?.reduce(
    (count: any[], application: any) => {
      count[0]++;
      const status = application?.status?.status
      const educationLevel = application?.educationLevel

      if (status === 'PENDING') {
        count[1]++

        if (educationLevel === 'tronc-commun') {
          count[2]++
        }
        if (educationLevel === '1bac') {
          count[3]++
        }
        if (educationLevel === '2bac') {
          count[4]++
        }
      }
      
      return count;
    }, 
    [0, 0, 0, 0, 0]
  );
}

const countTeams = (teams: any[]) => {
  return (teams||[])?.reduce(
    (count: any[], team: any) => {
      const membersNumber = team?.users?.length
      count[0]++
      if (membersNumber < 3 || membersNumber > 5) {
        count[2]++
      } else {
        count[1]++
      }

      return count
    },
    [0, 0, 0]
  )
}

export default function Home() {
  const applications = useAtomValue(applicationsAtom);
  const teams = useAtomValue(teamsAtom) as any[]
  const [countAllApplications, countPendingApplications, countTC, countBac1, countBac2] = countApplications(applications)
  const [countAllTeams, countCompleteTeams, countIncompleteTeams] = countTeams(teams)

  return (
    <>
      <Image
        src="/mtym.png"
        alt="Summer Camp"
        width='350'
        height='100'
      />

      <HoverEffect items={links} className="flex justify-center gap-x-4 xl:w-1/2"/>

      <div className="flex gap-x-4">
        <Stats
          className="text-white bg-[#244B3A]" 
          valueAllApplications={countAllApplications} 
          valuePendingApplications={countPendingApplications} 
          valueBac1Applications={countBac1} 
          valueBac2Applications={countBac2} 
          valueTCApplications={countTC}
          valueAllTeams={countAllTeams}
          valueCompleteTeams={countCompleteTeams}
          valueIncompleteTeams={countIncompleteTeams}
        />
      </div>
    </>
  )
}
