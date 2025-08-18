"use client"

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormConfig, FormStepConfig } from "../types/FormConfig"
import { getFormSchema } from "./schema"
import { getFormDefaultValues } from "./data"
import { useState } from 'react'
import { Button } from '@mdm/ui'
import { Separator } from '@mdm/ui'
import { FormSteps } from "./layout/form-steps"
import { FormNavigation } from "./layout/form-navigation"
import { Form } from "@mdm/ui"
import { FormStep } from "./FormStep"

export const FormLayout = ({
  formConfig,
  title,
  description,
  onSubmitButtonLabel,
  onSaveButtonLabel,
  onSubmit,
  onSave,
  onError,
}:{
  formConfig: FormConfig,
  title: string,
  description: string,
  onSubmitButtonLabel: string,
  onSaveButtonLabel: string,
  onSubmit: SubmitHandler<any>,
  onSave: SubmitHandler<any>,
  onError: SubmitErrorHandler<any>,
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const formSchema = getFormSchema(formConfig)
  const formDefaultValues = getFormDefaultValues(formConfig)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
    mode: "onChange",
  })

  return (
    <section className='w-full inset-0 flex flex-col justify-between mt-6'>
      {/* Header */}
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <div className="text-muted-foreground">{description}</div>
        </div>

        <div>
          <Button onClick={onSave}>{onSaveButtonLabel}</Button>
        </div>
      </div>
      
      <Separator className="my-6" />

      <FormSteps formConfig={formConfig} currentStep={currentStep} />

      {/* Top Navigation */}
      <FormNavigation
        variant="arrows"
        currentStep={currentStep}
        form={form}
        formConfig={formConfig}
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />

      {/* Form */}
      {/* <Form {...form}>
        <form className='mt-6' onSubmit={form.handleSubmit(onSubmit, onError)}>
          {formConfig?.formSteps.map((formStepConfig: FormStepConfig, index: number) => {
            return (
              currentStep === index && <FormStep form={form} delta={delta} formStepConfig={formStepConfig} />
            )
          })}

          {(currentStep === formConfig?.formSteps.length - 1) && (
            <div className='mt-20 text-center'> 
              <Button type="submit">
                <div>{onSubmitButtonLabel}</div>
              </Button>
            </div>
          )}
        </form>
      </Form> */}
      
      {/* Bottom Navigation */}
      <FormNavigation
        variant="button"
        form={form}
        formConfig={formConfig}
        currentStep={currentStep} 
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />
    </section>
  )
}