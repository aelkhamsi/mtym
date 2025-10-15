import { teamAtom } from "@/app/store/teamAtom"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mdm/ui"
import { useAtomValue } from "jotai"

const TeamMentor = () => {
  const team = useAtomValue(teamAtom)

  return (
    <div>
      <span className="font-bold">Mentor</span>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {team?.mentorFullname
                ? team?.mentorFullname 
                : <span className="text-gray-500">(vide)</span>
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default TeamMentor
