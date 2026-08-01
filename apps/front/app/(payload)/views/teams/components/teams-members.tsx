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

const TeamsMembers = ({
  members,
}:{
  members: any[],
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
                  <TableCell className="font-medium">{member.id}</TableCell>
                  <TableCell>{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/applications/${member?.application?.id}`} target="_blank">
                      <Button className="text-xs">
                        Show Application
                      </Button>
                    </Link>
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
