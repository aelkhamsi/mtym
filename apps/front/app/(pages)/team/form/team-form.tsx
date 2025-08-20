"use client"

import { useEffect, useState } from "react"
import { FormSteps } from "./header/form-steps"
import { FormNavigation } from "./navigation/form-navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@mdm/ui"
import { Button, Separator } from "@mdm/ui"
import { toast } from "@mdm/ui";
import { CreateOrJoinTeamStep } from "./steps/create-or-join-team-step"
import { CreateTeamForm } from "./steps/create-team-form"
import { JoinTeamForm } from "./steps/join-team-form"
import { createTeamDefaultValues, createTeamSchema } from "@/app/schemas/create-team.schema"
import { joinTeamDefaultValues, joinTeamSchema } from "@/app/schemas/join-team.schema"
import { SummaryCard } from "./steps/summary-step"
import { addUser, createTeam, getAllTeams } from "@/app/api/TeamApi"
import { useRouter } from "next/navigation"
import { Team } from "@mdm/types"
import { checkAccessCode, deleteAccessCode } from "@/app/api/TeamAccessCodeApi"

export const TeamForm = () => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formType, setFormType] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const router = useRouter()
  const delta = currentStep - previousStep
  
  const createTeamForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: createTeamDefaultValues,
    mode: "onChange",
  })

  const joinTeamForm = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: joinTeamDefaultValues,
    mode: "onChange",
  })

  const onSubmitCreateTeam = async (formData: z.infer<typeof createTeamSchema>) => {
    try {      
      const createTeamResult = await createTeam(formData) as any;
      if (createTeamResult?.statusCode !== 200) {
        throw new Error(createTeamResult?.message)
      }
      
      const teamId = createTeamResult?.team?.id;
      const addUserResult = await addUser(teamId) as any;
      if (addUserResult?.statusCode !== 200) {
        throw new Error('Adding the user in the team failed')
      }
      
      router.push('/profile/team')
      setTimeout(() => {
        window.location.reload()
      }, 200) 
    } catch(err: any) {
      toast({
        title: 'This operation have failed',
        description: err?.message,
        variant: 'destructive',
      });
    }
  }

  const onSubmitJoinTeam = async (formData: z.infer<typeof joinTeamSchema>) => {
    try {
      const checkAccessCodeResult = await checkAccessCode(formData?.accessCode, parseInt(formData?.teamId)) as any;
      if (checkAccessCodeResult?.statusCode !== 200) {
        throw new Error(checkAccessCodeResult?.message)
      }

      const addUserResult = await addUser(parseInt(formData?.teamId)) as any;
      if (addUserResult?.statusCode !== 200) {
        throw new Error(addUserResult?.message ?? 'Adding the user in the team failed')
      }

      await deleteAccessCode(checkAccessCodeResult?.accessCode?.id) as any;

      router.push('/profile/team')
      setTimeout(() => {
        window.location.reload()
      }, 200)
    } catch(err: any) {
      toast({
        title: 'This operation have failed',
        description: err?.message,
        variant: 'destructive',
      });
    }
  }
  
  const onError = async (errors: any) => {
    toast({
      title: "The form is invalid",
      description: "Not all required fields have been filled in.",
      variant: 'destructive',
    })
  }

  useEffect(() => {
    if (formType) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (formType === 'join' && teams?.length === 0) {
      getAllTeams()
        .then(res => {
          const teams = (res as any)?.teams;
          setTeams(teams)
        })
    }
  }, [formType])

  return (
    <section className='w-full inset-0 flex flex-col justify-between mb-20'>
      {/* Header */}
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight">Selection d&apos;équipe</h2>
          <div className="text-muted-foreground text-sm">
            Suivez les étapes ci-dessous pour créer ou rejoindre une équipe
          </div>
        </div>
      </div>
        
      <Separator className="my-6" />

      {/* Steps */}
      <FormSteps currentStep={currentStep} />

      {/* Navigation */}
      {currentStep >= 1 && (
        <FormNavigation
          currentStep={currentStep}
          form={formType === 'create' ? createTeamForm : formType === 'join' ? joinTeamForm : undefined}
          formType={formType}
          setPreviousStep={setPreviousStep} 
          setCurrentStep={setCurrentStep}
          setFormType={setFormType}
        />
      )}

      {/* Forms */}

      {currentStep === 0 && (
        <CreateOrJoinTeamStep delta={delta} setFormType={setFormType} />
      )}
      
      {formType === 'create' && (
        <Form {...createTeamForm}>
          <form className='mt-6' onSubmit={createTeamForm.handleSubmit(onSubmitCreateTeam, onError)}>
            {currentStep === 1 && (
              <CreateTeamForm form={createTeamForm} delta={delta} />
            )}

            {currentStep === 2 && (
              <SummaryCard formData={createTeamForm.watch()} formType={formType} teams={teams} delta={delta} />
            )}

            {/* Submit Button */}
            {currentStep === 2 && (
              <div className='mt-20 text-center'> 
                <Button type="submit" className='text-lg md:w-1/4 lg:w-1/6 p-8'>
                  <div>Create Team</div>
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}

      {formType === 'join' && (
        <Form {...joinTeamForm}>
          <form className='mt-6' onSubmit={joinTeamForm.handleSubmit(onSubmitJoinTeam, onError)}>
            {currentStep === 1 && (
              <JoinTeamForm form={joinTeamForm} teams={teams} delta={delta} />
            )}

            {currentStep === 2 && (
              <SummaryCard formData={joinTeamForm.watch()} formType={formType} teams={teams} delta={delta} />
            )}

            {/* Submit Button */}
            {currentStep === 2 && (
              <div className='mt-20 text-center'> 
                <Button type="submit" className='text-lg md:w-1/4 lg:w-1/6 p-8'>
                  <div>Join Team</div>
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}

      {/* Navigation */}
      {currentStep == 1 && (
        <FormNavigation
          variant="button"
          currentStep={currentStep}
          form={formType === 'create' ? createTeamForm : formType === 'join' ? joinTeamForm : undefined}
          formType={formType}
          setPreviousStep={setPreviousStep} 
          setCurrentStep={setCurrentStep}
          setFormType={setFormType}
        />
      )}
    </section>
  )
}