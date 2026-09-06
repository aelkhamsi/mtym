import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  RadioGroup,
  RadioGroupItem,
  toast
} from "@mdm/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Textarea } from "@mdm/ui"
import { Button } from "@mdm/ui"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Loader2 } from "lucide-react"
import { updateTeamReview } from "@/app/api/TeamApi"
import { teamReviewSchema } from "@/app/schemas/team-review.schema"
import { RequiredAsterisk } from "@/app/components/forms/required-asterisk"
import { sleep } from "@mdm/utils"
import { useAtom } from "jotai"
import { teamsAtom } from "@/app/store/admin/teamsAtom"

const reportDecisionOptions = [
  {label: 'Pass', value: 'PASS'},
  {label: 'Fail', value: 'FAIL'},
  {label: 'Not sure', value: 'NOT_SURE'},
]

const reportScoreOptions = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
]

const aiSuspicionOptions = [
  {label: '0', value: 0},
  {label: '20', value: 20},
  {label: '40', value: 40},
  {label: '60', value: 60},
  {label: '80', value: 80},
  {label: '100', value: 100},
]

const ReviewPanel = ({
  teamId,
  review,
}:{
  teamId: number,
  review: any
}) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 py-6">
        <CardTitle className="text-lg p-2 bg-gray-100 rounded-md">Review Panel</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <ReviewForm teamId={teamId} review={review} />
      </CardContent>
    </Card>
  )
}

const ReviewForm = ({
  teamId,
  review
}: {
  teamId: number,
  review: any
}) => {
  const [teams, setTeams] = useAtom(teamsAtom)
  const reviewId = review?.id
  const form = useForm<z.infer<typeof teamReviewSchema>>({
    resolver: zodResolver(teamReviewSchema),
    values: review,
    mode: "onChange",
  })
  const { isSubmitting } = form.formState
  
  const onSubmit = async (data: z.infer<typeof teamReviewSchema>) => {
    if (!reviewId) return
    await sleep(800)

    try {
      const response = await updateTeamReview(reviewId, data) as any
      if (response?.statusCode >= 400) throw new Error()

      setTeams(teams.map((team: any) =>
        team.id === teamId
          ? {
              ...team,
              review: {
                ...team.review,
                ...data
              },
            }
          : team
      ))
      toast({
        title: <span className="text-green-700">Team Review</span>,
        description: 'Your team review was saved successfully',
      })
    } catch {
      toast({ 
        title: "Could not update team review",
        description: 'Your team review was not saved successfully. Please try again later.',
        variant: "destructive" 
      })
    } 
  }
  
  return (
    <>
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <Form {...form}>
        <form id="form-application-review" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <ReviewRadioGroup form={form} name="intermediateReportScore1" label="Problem 1 Score" options={reportScoreOptions} />
          <ReviewRadioGroup form={form} name="intermediateReportScore2" label="Problem 2 Score" options={reportScoreOptions} />
          <ReviewRadioGroup form={form} name="intermediateReportScore3" label="Problem 3 Score" options={reportScoreOptions} />
          <ReviewRadioGroup form={form} name="intermediateReportScore4" label="Problem 4 Score" options={reportScoreOptions} />
          <ReviewRadioGroup form={form} name="aiSuspicionScore" label="AI Suspicion Score (in %)" options={aiSuspicionOptions} />
          <ReviewRadioGroup form={form} name="intermediateReportDecision" label="Decision" options={reportDecisionOptions} />
          <ReviewTextArea form={form} name="comment" label="Comments" />

          <div className="flex">
            <Button className="flex-1">
              Submit Review
            </Button>
          </div>
        </form>
      </Form>
    </>
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
  options: {label: string, value: string|number}[]
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


export default ReviewPanel