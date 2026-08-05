'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@mdm/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mdm/ui"
import { Separator } from "@mdm/ui"
import { Checkbox } from "@mdm/ui"
import { Label } from "@mdm/ui"
import { Input } from "@mdm/ui"
import { Textarea } from "@mdm/ui"
import { Button } from "@mdm/ui"

const ReviewerPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviewer Panel</CardTitle>

        <CardDescription>
          Assigned to Ibrahim
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Checklist */}

        <div className="space-y-3">
          <h3 className="font-medium">
            Checklist
          </h3>

          <ReviewCheckbox label="Identity verified" />

          <ReviewCheckbox label="Documents complete" />

          <ReviewCheckbox label="Eligible" />

          <ReviewCheckbox label="No red flags" />
        </div>

        <Separator />

        {/* Score */}

        <div className="space-y-2">
          <Label>Score</Label>

          <Input
            type="number"
            placeholder="0 - 100"
          />
        </div>

        {/* Recommendation */}

        <div className="space-y-2">
          <Label>Recommendation</Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="accept">
                Accept
              </SelectItem>

              <SelectItem value="waitlist">
                Waitlist
              </SelectItem>

              <SelectItem value="reject">
                Reject
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comments */}

        <div className="space-y-2">
          <Label>Comments</Label>

          <Textarea
            rows={8}
            placeholder="Write your review..."
          />
        </div>

        <Separator />

        {/* Actions */}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
          >
            Save Draft
          </Button>

          <Button className="flex-1">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewCheckbox({
  label,
}: {
  label: string
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} />

      <Label htmlFor={label}>{label}</Label>
    </div>
  )
}

export default ReviewerPanel