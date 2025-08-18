import { Dispatch, SetStateAction } from "react"
import { getFormStepsMetadata } from "../navigation"
import { FormConfig } from "../../types/FormConfig"
import { Button } from "@mdm/ui"
import { UseFormReturn } from "react-hook-form";

export const FormNavigation = ({
  form,
  formConfig,
  currentStep,
  setPreviousStep,
  setCurrentStep,
  variant = "arrows",
}:{
  form: UseFormReturn,
  formConfig: FormConfig,
  currentStep: number,
  setPreviousStep: Dispatch<SetStateAction<number>>,
  setCurrentStep: Dispatch<SetStateAction<number>>,
  variant?: 'arrows' | 'button',
}) => {
  const formStepsMetadata = getFormStepsMetadata(formConfig)

  const next = async () => {
    const fields = formStepsMetadata[currentStep].fields
    const output = await form.trigger(fields, { shouldFocus: true })
    if (!output) return

    if (currentStep < formStepsMetadata.length - 1) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const arrowsTemplate =  (
    <div className='mt-8 pt-5'>
      <div className='flex justify-between'>
        <button
          type='button'
          onClick={prev}
          disabled={currentStep === 0}
          className='rounded bg-white px-2 py-1 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </button>
        <button
          type='button'
          onClick={next}
          disabled={currentStep === formStepsMetadata.length - 1}
          className='rounded bg-white px-2 py-1 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  )

  const buttonTemplate = (
    <div className='mt-12 pt-5 flex flex-row space-x-8 justify-center'>
      <Button className="w-[10rem] bg-gray-600" onClick={prev} disabled={currentStep === 0}>Étape Précédente</Button>
      <Button className="w-[10rem] bg-[#0284C7]" onClick={next} disabled={currentStep === formStepsMetadata.length - 1}>Étape Suivante</Button>
    </div>
  )

  if (variant == 'arrows') return arrowsTemplate
  else return buttonTemplate
}