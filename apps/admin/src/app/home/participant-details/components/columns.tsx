"use client"

import { ColumnDef } from '@tanstack/react-table'
import ApplicationStatus, { Status } from './application-status'
import { Button } from '@/components/shared/button'
import { useRouter } from 'next/navigation'
import { ArrowUpDown } from 'lucide-react'

export type ApplicationRow = {
  id: string
  firstName: string,
  lastName: string,
  city: string,
  establishment: string,
  educationLevel: string,
  status: string,
}

const ActionButton = ({
  participantDetailsId,
}:{
  participantDetailsId: string,
}) => {
  const router = useRouter()

  return (
    <Button onClick={() => router.push(`/home/participant-details/${participantDetailsId}`)}>Show Details</Button>
  )
}

export const columns: ColumnDef<ApplicationRow>[] = [
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
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
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
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;
      
      return <ApplicationStatus status={status} />
    },
  },
  {
    id: "actionButton",
    cell: ({ row }) => {
      const participantDetailsId = row.original?.id;
 
      return <div className='flex justify-end'>
        <ActionButton participantDetailsId={participantDetailsId} />
      </div>
    }
  },
]
