import { FormStepConfig } from '../types/FormConfig';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Separator } from '@mdm/ui';
import { getFieldRenderFn } from './render';
import { FieldConfig } from '../types/FieldConfig';

export const FormStep = ({
  form,
  delta,
  formStepConfig,
}:{
  form: UseFormReturn,
  delta: number,
  formStepConfig: FormStepConfig,
}) => {
  const { title, description, fields } = formStepConfig

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        {title}
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
        {description}
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>
      
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
        {fields?.map((field: FieldConfig<any>) => {
          const { type } = field
          const renderField = getFieldRenderFn(type)
          const rendered = renderField(form, field)

          return rendered || null
        })}
      </div>
    </motion.div>
  )
}