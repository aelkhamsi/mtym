"use client"

import { useEffect, useMemo, useState } from "react";
import { AdminOption, TeamRow, getColumns } from "./components/columns";
import { TeamsTable } from "./components/teams-table";
import { useAtom } from "jotai";
import { teamsAtom } from "@/app/store/admin/teamsAtom";

export default function TeamsClient({
  admins,
  currentAdminId,
}: {
  admins: AdminOption[]
  currentAdminId: string
}) {
  const [teams, setTeams] = useAtom(teamsAtom);
  const [tableData, setTableData] = useState<TeamRow[]>([])
  const columns = useMemo(() => getColumns(admins), [admins])
  

  /* Appended rather than prepended: the list is served in creation order, so
   * this is where the new team would sit after a reload too. The table then
   * jumps to the page holding it, whatever the sorting in place. */
  const handleTeamCreated = (team: any) => {
    setTeams([...(Array.isArray(teams) ? teams : []), team])
  }

  useEffect(() => {
    if (teams) {
      const list = Array.isArray(teams) ? teams : []
      setTableData(
        list
          .filter((team: any) => team?.users?.length)
          .map((team: any) => ({
            id: team?.id,
            name: team?.name,
            quadrigram: team?.quadrigram,
            slogan: team?.slogan,
            status: team?.status,
            intermediateReportDecision: team?.review?.intermediateReportDecision ?? null,
            leaderId: team?.leader?.id,
            leaderName: `${team?.leader?.firstName} ${team?.leader?.lastName}`,
            numberOfMembers: team?.users?.length,
            members: team?.users,
            reports: team?.reports,
            review: team?.review
          }))
      )
    }
  }, [teams])

  return (
    <div className="space-y-4">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Teams
      </div>
      
      <TeamsTable 
        columns={columns}
        data={tableData}
        onTeamCreated={handleTeamCreated}
        admins={admins}
        currentAdminId={currentAdminId}
      />
    </div>
  );
}