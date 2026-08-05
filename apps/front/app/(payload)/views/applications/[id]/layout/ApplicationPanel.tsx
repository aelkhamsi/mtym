'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@mdm/ui"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mdm/ui"
import { useState } from "react"
import { Field, getApplicationSections } from "../application-mapper"

const ApplicationPanel = ({
  application,
}:{
  application: any
}) => {
  const [tab, setTab] = useState("personal")
  const applicationSections = getApplicationSections(application)
  
  return (
    <Card>
      <CardHeader className="pb-0">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="personal"> Personal </TabsTrigger>
            <TabsTrigger value="education"> Education </TabsTrigger>
            <TabsTrigger value="motivation"> Motivation </TabsTrigger>
            <TabsTrigger value="documents"> Documents </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <ApplicationTab
              title="Personal Information"
              fields={applicationSections.personal}
            />
          </TabsContent>

          <TabsContent value="education">
            <ApplicationTab
              title="Education"
              fields={applicationSections.education}
            />
          </TabsContent>

          <TabsContent value="motivation">
            <ApplicationTab
              title="Motivation"
              fields={applicationSections.motivation}
            />
          </TabsContent>

          <TabsContent value="documents">
            <ApplicationTab
              title="Documents"
              fields={applicationSections.documents}
            />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}

const ApplicationTab = ({
  title,
  fields,
}: {
  title: string
  fields: Field[]
}) => {
  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <div className="divide-y rounded-lg border">
          {fields.map((field, index) => (
            <ApplicationField key={`field_${index}`} field={field} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const ApplicationField = ({
  field,
}:{
  field: Field,
}) => {
  return (
    <div
      key={field.label}
      className="grid grid-cols-[220px_1fr] gap-4 px-6 py-4"
    >
      <div className="text-muted-foreground">
        {field.label}
      </div>

      <div>
        {field.value ?? (
          <span className="text-muted-foreground italic">
            (empty)
          </span>
        )}
      </div>
    </div>
  )
}

export default ApplicationPanel