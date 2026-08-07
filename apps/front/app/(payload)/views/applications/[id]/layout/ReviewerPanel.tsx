'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  RadioGroup,
  RadioGroupItem,
  toast,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@mdm/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Separator } from "@mdm/ui"
import { Textarea } from "@mdm/ui"
import { Button } from "@mdm/ui"
import { AdminOption } from "../../components/table/columns"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { applicationReviewSchema } from "@/app/schemas/application-review.schema"
import { RequiredAsterisk } from "@/app/components/forms/required-asterisk"
import { cityOptions } from "@mdm/shared"
import { Loader2 } from "lucide-react"
import { putApplicationReview } from "@/app/api/ApplicationApi"
import { ApplicationReviewer } from "../../components/table/application-reviewer"
import { useAtom } from "jotai"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"

const checklistOptions = [
  {label: 'Yes', value: 'YES'},
  {label: 'No', value: 'NO'},
  {label: 'Not sure', value: 'NOT_SURE'},
]

const cityCheclistOptions = [
  {label: 'Yes', value: 'YES'},
  {label: 'Changed', value: 'CHANGED'},
  {label: 'Not sure', value: 'NOT_SURE'},
]

const ReviewerPanel = ({
  application,
  admins,
}:{
  application: any,
  admins: AdminOption[],
}) => {
  const [applications, setApplications] = useAtom(applicationsAtom)
  const applicationId = application?.id
  const reviewData = application?.review
  const reviewerId = reviewData?.reviewerId
  const form = useForm<z.infer<typeof applicationReviewSchema>>({
    resolver: zodResolver(applicationReviewSchema),
    values: reviewData,
    mode: "onChange",
  })
  const { isSubmitting } = form.formState
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  
  const onSubmit = async (data: z.infer<typeof applicationReviewSchema>) => {
    if (!applicationId) return
    await wait(800)

    try {
      const response = await putApplicationReview(applicationId, data) as any
      if (response?.statusCode >= 400) throw new Error()

      setApplications(applications.map((application: any) =>
        application.id === applicationId
          ? {
              ...application,
              review: {
                ...application.review,
                ...data
              },
            }
          : application
      ))
      toast({
        title: 'Application Review',
        description: 'Your application review was saved successfully',
      })
    } catch {
      toast({ 
        title: "Could not update reviewer",
        description: 'Your application review was saved successfully',
        variant: "destructive" 
      })
    } 
  }

  return (
    <Card className="relative">
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <CardHeader className="space-y-4">
        <CardTitle>Reviewer Panel</CardTitle>

        <CardDescription className="flex items-center gap-x-2">
          Assigned to <ApplicationReviewer applicationId={applicationId} reviewerId={reviewerId} admins={admins} />
        </CardDescription>
      </CardHeader>

      <Separator />
      
      <CardContent>
        <Form {...form}>
          <form id="form-application-review" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
            
            <ReviewRadioGroup form={form} name="identityCheck" label="Identity" options={checklistOptions}/>

            <ReviewRadioGroup form={form} name="levelCheck" label="Education Level" options={checklistOptions} />

            <ReviewRadioGroup form={form} name="pictureCheck" label="Picture" options={checklistOptions} />

            <ReviewRadioGroup form={form} name="cityCheck" label="City" options={cityCheclistOptions} />

            <FormField
              control={form.control}
              name="updatedCity"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Updated City</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cityOptions.map(option =>
                          <SelectItem value={option.value}>{option.label}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <ReviewTextArea
              form={form}
              name="comment"
              label="Comments"
            />

            <div className="flex">
              <Button className="flex-1">
                Submit Review
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      
    </Card>
  )
}

const ReviewTextArea = ({
  form,
  name,
  label,
}: {
  form: UseFormReturn,
  name: string,
  label: string,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
          <Textarea
            rows={8}
            placeholder=""
            {...field}
          />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const ReviewRadioGroup = ({
  form,
  name,
  label,
  options,
}: {
  form: UseFormReturn,
  name: string,
  label: string,
  options: {label: string, value: string}[]
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2 space-y-0">
            <FormLabel className="w-[9rem]">{label} <RequiredAsterisk /></FormLabel>

            <FormControl>
              <RadioGroup
                onValueChange={(value: string) => field.onChange(value)}
                value={field.value}
                className="flex space-x-2"
              >
                {options.map(option => 
                  <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value={option.value} /></FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                  </FormItem>
                )}
              </RadioGroup>
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ReviewerPanel