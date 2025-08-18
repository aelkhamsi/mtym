import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@mdm/ui'
import { UseFormReturn } from 'react-hook-form'

export const FileInput = ({
  form,
  id,
}:{
  form: UseFormReturn,
  id: string, 
}) => {
  const [label, setLabel] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<string>('')

  const onFileChange = (file: File|undefined) => {
    setPlaceholder(file ? file?.name : placeholder)
    setLabel('Modify file')
  }

  useEffect(() => {
    const formState = form.watch()
    const fileField = formState?.[id]
    const fileUrl = formState?.[`${id}Url`]
    
    if (fileField?.length) {
      onFileChange(fileField[0])
    } else if (fileUrl) {
      setLabel('Modify file')
      setPlaceholder('✅ File Uploaded!')
    } else {
      setLabel('Add a file')
      setPlaceholder('No file')
    }
  }, [])

  const register = form.register(id, {
    required: "This document is mandatory",
  })

  return (
    <>
      <Input
        {...register}
        id={id}
        type="file"
        className='hidden'
        onChange={(event) => {
          register.onChange(event)
          onFileChange(event?.target?.files?.[0])
        }}
      />

      <label 
        htmlFor={id} 
        className="block flex gap-x-4 text-sm hover:cursor-pointer border rounded-md px-4 py-2"
      >
        <div className="font-semibold">{label}</div>
        <div>{placeholder}</div>
      </label>
    </>
  )
}
