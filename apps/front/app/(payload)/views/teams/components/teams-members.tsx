import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { Button, toast } from "@mdm/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mdm/ui"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mdm/ui"
import Link from "next/link";
import { Crown } from "lucide-react";
import { getStatusClassname, Status } from "../../applications/components/table/application-status";
import TeamHistoryDialog from "./team-history-dialog";
import { markFreeAgent } from "@/app/api/TeamApi";
import { getEligibleUsersForTeamCreation } from "@/app/api/UsersApi";
import { teamsAtom } from "@/app/store/admin/teamsAtom";
import { usersAtom } from "@/app/store/admin/usersAtom";

const TeamsMembers = ({
  teamId,
  members: initialMembers,
  leaderId,
}:{
  teamId: number,
  members: any[],
  leaderId: string,
}) => {
  const [teams, setTeams] = useAtom(teamsAtom)
  const [, setUsers] = useAtom(usersAtom)
  const [members, setMembers] = useState(initialMembers)

  useEffect(() => {
    setMembers(initialMembers)
  }, [initialMembers])

  /* Freeing someone up removes them from this team, so the dialog's own list
   * and the teams table behind it (member count, "Show Members" contents on
   * a reopen) both need the same update rather than waiting for a reload. */
  const handleMarkFreeAgent = async (member: any) => {
    const response = await markFreeAgent(member.id) as any

    if (response?.statusCode === 200) {
      setMembers((current) => current.filter((entry) => entry.id !== member.id))
      setTeams(
        (Array.isArray(teams) ? teams : []).map((team: any) =>
          team?.id === teamId
            ? { ...team, users: (team.users ?? []).filter((user: any) => user.id !== member.id) }
            : team
        ),
      )

      const eligibleUsers = await getEligibleUsersForTeamCreation() as any
      if (Array.isArray(eligibleUsers)) setUsers(eligibleUsers)

      toast({
        title: "Free agent",
        description: `${member.firstName} ${member.lastName} is now a free agent.`,
      })
    } else {
      toast({
        title: "Failed to mark as free agent",
        description: response?.message ?? "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs">Show Members</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-6xl overflow-y-auto bg-white">
        <DialogHeader className="min-w-0">
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription className="text-xs">
            You&apos;ll find the list of all the team members
          </DialogDescription>

          <Table>
            <TableCaption>{members.length === 0 ? <span className="text-xs text-gray-400">Empty list</span> : ''}</TableCaption>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead>Id</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-1">
                      {member.id}
                      {String(member.id) === String(leaderId) && (
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell className="break-all">{member.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {member?.application?.status?.status && (
                        <div className={getStatusClassname(member.application.status.status as Status, 'sm')}>
                          {member.application.status.status.split('_').join(' ')}
                        </div>
                      )}
                      <TeamHistoryDialog
                        userId={member?.id}
                        userLabel={`${member?.firstName} ${member?.lastName}`}
                      />
                      {member?.application?.status?.status === 'VALIDATED' && (
                        <Button
                          className="text-xs"
                          variant="outline"
                          onClick={() => handleMarkFreeAgent(member)}
                        >
                          Mark as Free Agent
                        </Button>
                      )}
                      <Link href={`/admin/applications/${member?.application?.id}`} target="_blank">
                        <Button className="text-xs">
                          Show Application
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default TeamsMembers
