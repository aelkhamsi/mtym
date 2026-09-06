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
import { MoreVertical, Crown } from "lucide-react";
import { getStatusClassname, Status } from "../../applications/components/table/application-status";
import TeamHistoryDialog from "./team-history-dialog";
import { markFreeAgent, changeLeaderAsAdmin } from "@/app/api/TeamApi";
import { getEligibleUsersForTeamCreation } from "@/app/api/UsersApi";
import { teamsAtom } from "@/app/store/admin/teamsAtom";
import { usersAtom } from "@/app/store/admin/usersAtom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mdm/ui"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  useEffect(() => {
    setMembers(initialMembers)
  }, [initialMembers])

  const handleMarkFreeAgent = async (member: any) => {
    const response = await markFreeAgent(member.id) as any

    if (response?.statusCode === 200) {
      const remainingMembers = members.filter((entry) => entry.id !== member.id)
      const newLeader = response?.leaderChanged
        ? remainingMembers.find((entry) => entry.id === response.newLeaderId) ?? null
        : undefined

      setMembers(remainingMembers)
      setTeams(
        (Array.isArray(teams) ? teams : []).map((team: any) => {
          if (team?.id !== teamId) return team
          return {
            ...team,
            users: (team.users ?? []).filter((user: any) => user.id !== member.id),
            ...(newLeader !== undefined ? { leader: newLeader } : {}),
          }
        }),
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

  const handleMakeLead = async (member: any) => {
    const response = await changeLeaderAsAdmin(teamId, member.id) as any

    if (response?.statusCode === 200) {
      setTeams(
        (Array.isArray(teams) ? teams : []).map((team: any) =>
          team?.id === teamId
            ? { ...team, leader: { id: member.id, firstName: member.firstName, lastName: member.lastName } }
            : team
        ),
      )

      toast({
        title: "Lead updated",
        description: `${member.firstName} ${member.lastName} is now the team lead.`,
      })
    } else {
      toast({
        title: "Failed to update lead",
        description: response?.message ?? "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs" variant={"outline"}>Show Members</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-6xl overflow-y-auto bg-white">
        <DialogHeader className="min-w-0">
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription className="text-xs">
            You&apos;ll find the list of all the team members
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] w-full overflow-y-auto">
          <Table>
            <TableCaption>{members.length === 0 ? <span className="text-xs text-gray-400">Empty list</span> : ''}</TableCaption>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead>Id</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
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
                    {member?.application?.status?.status && (
                      <div className={getStatusClassname(member.application.status.status as Status, 'md')}>
                        {member.application.status.status.split('_').join(' ')}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                          <MoreVertical className='h-6 cursor-pointer'/>
                      </DropdownMenuTrigger>
                      
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem 
                            className="hover:cursor-pointer hover:bg-gray-100"
                            onClick={() => router.push(`/admin/applications/${member?.application?.id}`)}
                          >
                            Show Application
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <TeamHistoryDialog
                              className="hover:cursor-pointer hover:bg-gray-100 w-full h-full"
                              userId={member?.id}
                              userLabel={`${member?.firstName} ${member?.lastName}`}
                            />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {member?.application?.status?.status === 'VALIDATED' && <>
                            <DropdownMenuItem
                              className="hover:cursor-pointer hover:bg-gray-100"
                              onClick={() => handleMarkFreeAgent(member)}
                            >
                              Mark as Free Agent
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>}
                        
                          {String(member.id) !== String(leaderId) && <>
                            <DropdownMenuItem
                              className="hover:cursor-pointer hover:bg-gray-100" 
                              onClick={() => handleMakeLead(member)}
                            >
                              Mark as Lead
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>}                          
                        </DropdownMenuGroup>                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamsMembers
