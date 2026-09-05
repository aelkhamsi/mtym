import { Button, Separator } from "@mdm/ui"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mdm/ui"
import { ProblemsPanel } from "./ProblemsPanel"
import ReviewPanel from "./ReviewPanel"

const TeamReview = ({
  teamId,
  review,
  reports,
}:{
  teamId: number,
  review: any,
  reports: any[],
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs">Review</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-6xl overflow-y-auto bg-white">
        <DialogHeader className="min-w-0">
          <DialogTitle>Team Review</DialogTitle>

          <Separator />

          <div className="grid gap-6 lg:grid-cols-2">
            <ProblemsPanel reports={reports} />
            <ReviewPanel teamId={teamId} review={review} />
          </div>
          
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default TeamReview
