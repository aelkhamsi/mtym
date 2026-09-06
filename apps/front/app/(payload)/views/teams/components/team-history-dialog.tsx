"use client"

import { useState } from "react"
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LoadingDots,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  format,
} from "@mdm/ui"
import { getTeamHistoryForUser } from "@/app/api/TeamApi"

const formatDate = (value: string | null) =>
  value ? format(new Date(value), "PP p") : ""

const TeamHistoryDialog = ({
  userId,
  userLabel
}:{
  userId: number,
  userLabel: string
}) => {
  const [history, setHistory] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const load = async () => {
    setIsLoading(true)
    const response = await getTeamHistoryForUser(userId) as any
    setHistory(Array.isArray(response) ? response : [])
    setIsLoading(false)
  }

  return (
    <Dialog
      onOpenChange={(open: boolean) => {
        if (open && history === null) load()
      }}
    >
      <DialogTrigger asChild>
        <div>Show History</div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team history</DialogTitle>
          <DialogDescription className="text-xs">
            Every team {userLabel} has been a member of, most recent first.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingDots color="#808080" />
          </div>
        ) : (
          <Table>
            <TableCaption>
              {history?.length === 0 ? (
                <span className="text-xs text-gray-400">No team history yet</span>
              ) : ''}
            </TableCaption>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead>Team</TableHead>
                <TableHead>With</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Left</TableHead>
                <TableHead>Joined by</TableHead>
                <TableHead>Left by</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history?.map((entry: any) => (
                <TableRow key={entry.id} className="text-xs">
                  <TableCell className="font-medium">
                    {entry.teamName}
                    <span className="ml-1 text-gray-400">({entry.teamQuadrigram})</span>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {entry.teammates?.length
                      ? entry.teammates
                          .map((mate: any) => `${mate.firstName} ${mate.lastName}`)
                          .join(', ')
                      : '—'}
                  </TableCell>
                  <TableCell>{formatDate(entry.joinedAt)}</TableCell>
                  <TableCell>
                    {entry.leftAt
                      ? formatDate(entry.leftAt)
                      : <Badge variant="secondary">Current</Badge>
                    }
                  </TableCell>
                  <TableCell className="text-gray-500">{entry.joinedByEmail ?? '—'}</TableCell>
                  <TableCell className="text-gray-500">{entry.leftByEmail ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TeamHistoryDialog
