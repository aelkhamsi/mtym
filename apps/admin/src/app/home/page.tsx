"use client"

import { HoverEffect } from "@/components/shared/card-hover-effect";
import Image from "next/image";
import Stats from "./stats";
import { useRecoilValue } from "recoil";
import { applicationsState } from "@/store/applicationsState";

const links = [
  {
    title: "Applications",
    description:
      "Manage candidate applications",
    link: "/home/applications",
  },
  {
    title: "Users",
    description:
      "Manage user pofiles",
    link: "/home/users",
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

        if (educationLevel === 'bac-plus-1') {
          count[2]++
        }
        if (educationLevel === 'bac-plus-2') {
          count[3]++
        }
        if (educationLevel === 'bac-plus-3') {
          count[4]++
        }
        if (educationLevel === 'bac-plus-4') {
          count[5]++
        }
      }
      
      return count;
    }, 
    [0, 0, 0, 0, 0, 0]
  );
}

export default function Home() {
  const applications = useRecoilValue(applicationsState);
  const [countAll, countPending, countBac1, countBac2, countBac3, countBac4] = countApplications(applications)

  return (
    <>
      <Image
        src="/mmc.png"
        alt="Summer Camp"
        width='350'
        height='100'
      />

      <HoverEffect items={links} className="flex justify-center gap-x-4 xl:w-1/2"/>

      <div className="flex gap-x-4">
        <Stats 
          className="text-white bg-[#413A9C]" 
          valueAll={countAll} 
          valuePending={countPending} 
          valueBac1={countBac1} 
          valueBac2={countBac2} 
          valueBac3={countBac3} 
          valueBac4={countBac4} 
        />
      </div>
    </>
  )
}
