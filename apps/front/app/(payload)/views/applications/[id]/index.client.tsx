"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  ExpandingArrow,
} from "@mdm/ui"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mdm/ui"
import { Badge } from "@mdm/ui"
import { Separator } from "@mdm/ui"
import { Checkbox } from "@mdm/ui"
import { Label } from "@mdm/ui"
import { Input } from "@mdm/ui"
import { Textarea } from "@mdm/ui"
import { Button } from "@mdm/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mdm/ui"
import { useAtomValue } from "jotai"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"
import { useRouter } from "next/navigation"

export default function ApplicationDetailsClient({
  id,
}:{
  id: string|undefined
}) {
  const router = useRouter()
  const [tab, setTab] = useState("personal")
  const applications = useAtomValue(applicationsAtom)
  const [application, setApplication] = useState<any>(undefined);
  
  useEffect(() => {
    if (!id || !applications || !Array.isArray(applications)) return;

    const searchResult = applications.find((application: any) => application?.id === +id)
    setApplication(searchResult)
  }, [id, applications])

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className='font-semibold flex cursor-pointer'
        onClick={() => router.back()}
      >
        <ExpandingArrow className='rotate-180 mr-2'/> {"  "} Go Back
      </div>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Application #{application?.id} - {application?.firstName} {application?.lastName}
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <Badge>Pending Review</Badge>

            <span className="text-muted-foreground text-sm">
              Submitted on April 18, 2025
            </span>
          </div>
        </div>

        <Button variant="outline">Actions</Button>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* LEFT */}
        <Card>
          <CardHeader className="pb-0">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="personal">
                  Personal
                </TabsTrigger>

                <TabsTrigger value="education">
                  Education
                </TabsTrigger>

                <TabsTrigger value="documents">
                  Documents
                </TabsTrigger>

                <TabsTrigger value="essay">
                  Essay
                </TabsTrigger>
              </TabsList>

              {/* PERSONAL */}
              <TabsContent value="personal">
                <Section
                  title="Personal Information"
                  fields={[
                    ["Full Name", "John Doe"],
                    ["Email", "john@example.com"],
                    ["Phone", "+212 ..."],
                    ["Nationality", "Moroccan"],
                    ["Birth Date", "14/05/2004"],
                    ["Address", "Casablanca"],
                  ]}
                />
              </TabsContent>

              {/* EDUCATION */}
              <TabsContent value="education">
                <Section
                  title="Education"
                  fields={[
                    ["High School", "..."],
                    ["Graduation", "..."],
                    ["Average", "..."],
                    ["Major", "..."],
                  ]}
                />
              </TabsContent>

              {/* DOCUMENTS */}
              <TabsContent value="documents">
                <Section
                  title="Documents"
                  fields={[
                    ["Passport", "Uploaded"],
                    ["Transcript", "Uploaded"],
                    ["Recommendation", "Uploaded"],
                  ]}
                />
              </TabsContent>

              {/* ESSAY */}
              <TabsContent value="essay">
                <Section
                  title="Essay"
                  fields={[
                    [
                      "Motivation",
                      "Lorem ipsum dolor sit amet...",
                    ],
                  ]}
                />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* RIGHT */}
        <div className="sticky top-6 h-fit">
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
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  fields,
}: {
  title: string
  fields: [string, string][]
}) {
  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <div className="divide-y rounded-lg border">
          {fields.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[220px_1fr] gap-4 px-6 py-4"
            >
              <div className="text-muted-foreground">
                {label}
              </div>

              <div>{value}</div>
            </div>
          ))}
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