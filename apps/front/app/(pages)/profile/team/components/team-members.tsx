import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mdm/ui"
import { ActionButton } from "./action-button"

const TeamMembers = ({
  userId,
  team
}:{
  userId: number|undefined
  team: any
}) => {
  const members = team?.users
  const creator = team?.leader
  const isTeamCreator = userId === creator?.id

  return (
    <div>
      <span className="font-bold">Membres de l&apos;équipe</span>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((user: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user?.firstName}</TableCell>
              <TableCell>{user?.lastName}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell className="flex justify-end">
                {user?.id === creator?.id
                  ? <Badge className="bg-green-700">Créateur</Badge>
                  : isTeamCreator
                    ? <ActionButton user={user}/>
                    : ''
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TeamMembers
