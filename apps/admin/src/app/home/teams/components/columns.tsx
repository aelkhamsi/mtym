import { Button } from "@/components/shared/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TeamsMembers from "./teams-members"
 
export type TeamRow = {
  id: string,
  name: string,
  slogan: string,
  mentorFullname: string,
  leaderName: string,
  leaderId: string,
  members: any[],
}
 
export const columns: ColumnDef<TeamRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "slogan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slogan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "mentorFullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mentor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const mentorFullname = row.getValue("mentorFullname") as string;
      return <>
        {mentorFullname ? mentorFullname : <span className="text-gray-300">{"(empty)"}</span>}
      </>
    }
  },
  {
    accessorKey: "leader",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Leader
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const leaderId = row.original?.leaderId;
      const leaderName = row.original?.leaderName;
      return <>
        {leaderName} <span className="text-gray-300">(id={leaderId})</span>
      </>
    },
  },
  {
    accessorKey: "numberOfMembers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number of Members
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">
        {row.getValue('numberOfMembers') as string}
      </div>
    },
  },
  {
    id: "showButton",
    cell: ({ row }) => {
      const members = row.original?.members;
 
      return <div className='flex justify-end'>
        <TeamsMembers members={members}/>
      </div>
    }
  },
]