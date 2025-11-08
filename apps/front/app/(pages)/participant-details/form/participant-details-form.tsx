"use client"

import { useState } from "react"
import { FormSteps } from "./header/form-steps"
import { FormNavigation } from "./navigation/form-navigation"
import { MedicalInformationStep, LogisticsStep, ActivitiesStep, UploadStep, ValidationStep } from "./steps"
import { useForm } from "react-hook-form"
import { participantDetailsSchema, participantDetailsDefautValues } from "@/app/schemas/participant-details.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@mdm/ui"
import { Button, Separator } from "@mdm/ui"
import { LoadingDots } from "@mdm/ui"
import { User } from "@mdm/types"
import FormHeader from "./header/form-header"
import FormErrorDialog from "./error/form-error-dialog"
import { useParticipantDetailsHandlers } from "@/app/(pages)/participant-details/hooks/use-participant-details-handlers"
import { parseFormData } from "../serialization"

export const ParticipantDetailsForm = ({
  user
}:{
  user: User|undefined
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep
  const participantDetails = {
    ...(user?.participantDetails ? parseFormData(user?.participantDetails) : participantDetailsDefautValues)
  }
  const form = useForm<z.infer<typeof participantDetailsSchema>>({
    resolver: zodResolver(participantDetailsSchema),
    defaultValues: participantDetails,
    mode: "onChange",
  })
  const {
    onSubmit,
    onSave,
    onError,
    setShowErrorDialog,
    isFormLoading,
    showErrorDialog,
    error,
  } = useParticipantDetailsHandlers(user)
  const onClickSave = () => {
    onSave(form)
  }

  return (
    <section className='w-full inset-0 flex flex-col justify-between mt-6 mb-20'>
      {/* Header */}
      <FormHeader onClickSave={onClickSave} />
      <Separator className="my-6" />
      <FormSteps currentStep={currentStep} />

      {/* Top Navigation */}
      <FormNavigation
        variant="arrows"
        currentStep={currentStep}
        form={form}
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {}, onError)}>
          {/* Personal informations */}
          {currentStep === 0 && (
            <MedicalInformationStep form={form} delta={delta} />
          )}

          {currentStep === 1 && (
            <LogisticsStep form={form} delta={delta} />
          )}

          {currentStep === 2 && (
            <ActivitiesStep form={form} delta={delta} />
          )}

          {currentStep === 3 && (
            <UploadStep form={form} delta={delta} />
          )}

          {currentStep === 4 && (
            <ValidationStep form={form} delta={delta} />
          )}

          {/* Submit Button */}
          {currentStep === 4 && (
            <div className='mt-20 text-center'> 
              <Button type="submit" onClick={() => onSubmit(form)}>
                {isFormLoading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <div>Soumettre ma candidature</div>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
      
      {/* Bottom Navigation */}
      <FormNavigation
        variant="button"
        form={form}
        currentStep={currentStep} 
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />

      <FormErrorDialog showDialog={showErrorDialog} setShowDialog={setShowErrorDialog} error={error} />
    </section>
  )
}