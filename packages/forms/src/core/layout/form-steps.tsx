import { FormConfig } from "../../types/FormConfig"
import { getFormStepsMetadata } from "../navigation"

export const FormSteps = ({
  formConfig,
  currentStep
}:{
  formConfig: FormConfig,
  currentStep: number
}) => {
  const formStepsMetadata = getFormStepsMetadata(formConfig)

  return (
    <nav aria-label='Progress'>
      <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
        {formStepsMetadata.map((step, index) => (
          <li key={step.title} className='md:flex-1'>
            {currentStep > index ? (
              <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-sky-600 transition-colors '>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.title}</span>
              </div>
            ) : currentStep === index ? (
              <div
                className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                aria-current='step'
              >
                <span className='text-sm font-medium text-sky-600'>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.title}</span>
              </div>
            ) : (
              <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-gray-500 transition-colors'>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.title}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}