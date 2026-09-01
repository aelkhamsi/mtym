import { Button } from "@mdm/ui"
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

const TeamsMembers = ({
  members,
  leaderId,
}:{
  members: any[],
  leaderId: string,
}) => {  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs">Show Members</Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
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
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {member?.application?.status?.status && (
                        <div className={getStatusClassname(member.application.status.status as Status, 'sm')}>
                          {member.application.status.status.split('_').join(' ')}
                        </div>
                      )}
                      <TeamHistoryDialog
                        userId={member?.id}
                        userLabel={`${member?.firstName} ${member?.lastName}`}
                      />
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
