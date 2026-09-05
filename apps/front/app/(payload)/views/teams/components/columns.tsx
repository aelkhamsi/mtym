import { Button } from "@mdm/ui"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TeamsMembers from "./teams-members"
import TeamAvatar from "./teams-avatar"
import TeamStatus, { Status } from "./team-status"
import TeamReview from "./teams-review/layout"
import { TeamReviewer } from "./team-reviewer"

export type AdminOption = { id: string; label: string }
 
export type TeamRow = {
  id: string,
  name: string,
  quadrigram: string,
  slogan: string,
  status: Status,
  leaderName: string,
  leaderId: string,
  members: any[],
  reports: any[],
  review: any,
}
 
export const getColumns = (admins: AdminOption[]): ColumnDef<TeamRow>[] => [
  {
    id: "identicon",
    cell: ({ row }) => {
      const id = row.original?.id;
 
      return <div className='flex justify-end'>
        <TeamAvatar id={id} />
      </div>
    }
  },
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
    },
    filterFn: "equalsString"
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
    accessorKey: "quadrigram",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quadrigram
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <TeamStatus teamId={Number(row.original.id)} status={row.original.status} />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "leader",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creator
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
          N° of Members
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const numberOfMembers = parseInt(row.getValue('numberOfMembers'))
      const isValid = numberOfMembers >= 3 && numberOfMembers <= 5

      return <div className={`text-center ${isValid ? 'text-green-500' : 'text-red-500'}`}>
        {row.getValue('numberOfMembers') as string}
      </div>
    },
  },
  {
    id: "memberName",
    accessorFn: (row) => row.members,
    enableHiding: false,
    filterFn: (row, id, filterValue) => {
      const query = String(filterValue ?? "").trim().toLowerCase()
      if (!query) return true

      const members = (row.getValue(id) as any[]) ?? []
      return members.some((member) =>
        `${member?.firstName ?? ""} ${member?.lastName ?? ""}`
          .toLowerCase()
          .includes(query)
      )
    },
  },
  {
    accessorKey: "reviewerId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reviewer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <TeamReviewer
        teamId={Number(row.original.id)}
        review={row.original.review}
        admins={admins}
      />
    ),
    filterFn: (row, _, value: string[]) =>
      value.includes(row.original.review.id ?? "__unassigned__"),
  },
  {
    id: "actionButtons",
    cell: ({ row }) => {
      const members = row.original?.members;
      const review = row.original?.review;
      const reports = row.original?.reports;

      return <div className='flex justify-end gap-4'>
        <TeamsMembers 
          teamId={Number(row.original.id)}
          members={members}
          leaderId={row.original.leaderId}
        />

        <TeamReview 
          teamId={Number(row.original.id)}
          review={review}
          reports={reports}
        />
      </div>
    }
  },
]
