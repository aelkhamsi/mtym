"use client"

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TeamRow, columns } from "./components/columns";
import { TeamsTable } from "./components/teams-table";
import { teamsState } from "@/store/teamsState";

export default function TeamsPage() {
  const teams = useRecoilValue(teamsState);
  const [tableData, setTableData] = useState<TeamRow[]>([])

  useEffect(() => {
    if (teams) {
      setTableData(
        teams
        .filter((team: any) => team?.users?.length)
        .map((team: any) => ({
          id: team?.id,
          name: team?.name,
          slogan: team?.slogan,
          mentorFullname: team?.mentorFullname,
          leaderId: team?.leader?.id,
          leaderName: `${team?.leader?.firstName} ${team?.leader?.lastName}`,
          numberOfMembers: team?.users?.length,
          members: team?.users,
        }))
      )
    }
  }, [teams])

  return (
    <div className="space-y-4">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Teams
      </div>
      
      <TeamsTable columns={columns} data={tableData} />
    </div>
  );
}