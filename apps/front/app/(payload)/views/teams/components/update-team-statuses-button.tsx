"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { RotateCw } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  LoadingDots,
  toast,
} from "@mdm/ui"
import { getAllTeams, updateTeamStatuses } from "@/app/api/TeamApi"
import { teamsAtom } from "@/app/store/admin/teamsAtom"

const UpdateTeamStatusesButton = () => {
  const [, setTeams] = useAtom(teamsAtom)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onConfirm = async () => {
    setIsLoading(true)

    const response = await updateTeamStatuses() as any

    if (response?.statusCode !== 200) {
      setIsLoading(false)
      toast({
        title: "Recalculation failed",
        description: response?.message ?? "Please try again later.",
        variant: "destructive",
      })
      return
    }

    /* Every team's status may have shifted, so the local list is refetched
     * wholesale rather than patched from the (id, from, to) diff. */
    const teams = await getAllTeams() as any[]
    setTeams(teams)
    setIsLoading(false)
    setIsOpen(false)

    const updatedCount = response?.updated?.length ?? 0
    toast({
      title: "Team statuses recalculated",
      description: updatedCount
        ? `${updatedCount} team${updatedCount > 1 ? "s" : ""} updated.`
        : "No team status needed to change.",
    })
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (isLoading) return
        setIsOpen(open)
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <RotateCw className="mr-2 h-4 w-4" />
          Recalculate statuses
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recalculate every team&apos;s status?</AlertDialogTitle>
          <AlertDialogDescription>
            This re-evaluates every team from its members&apos; application statuses
            and updates the ones that no longer match, based on their current
            validated member count.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <LoadingDots color="#808080" /> : <span>Recalculate</span>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateTeamStatusesButton
