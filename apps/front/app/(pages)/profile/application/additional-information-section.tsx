"use client"

import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  Button,
  LoadingDots,
} from "@mdm/ui"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RequiredAsterisk } from "@/app/components/forms/required-asterisk"
import { FileInput } from "../../application/form/components/file-input"
import { initFileInput } from "../../application/form/steps/upload-step"
import { zodFileValidation } from "@/app/schemas/application.schema"
import { computeSHA256, generateFileName, getUploadFolderName } from "@/app/lib/utils"
import { getSignedURL, uploadFile } from "@/app/api/MediaApi"
import { putApplication } from "@/app/api/ApplicationApi"
import { useState } from "react"

const additionalInformationSchema = z.object({
    fileCnie: zodFileValidation,
    fileCnieUrl: z.any().optional()
  })

const AdditionalInformationsSection = ({
  user,
}:{
  user: any,
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(additionalInformationSchema),
    defaultValues: {
      fileCnie: undefined,
      fileCnieUrl: user?.application?.fileCnieUrl,
    },
    mode: "onChange",
  }) as UseFormReturn<any>;

  console.log('user', user)

  const onSubmit = async (formData: z.infer<typeof additionalInformationSchema>) => {
    setIsFormLoading(true)
    const { fileCnie } = formData;
    
    let file = undefined
    if (fileCnie && fileCnie.length) {
      file = new File(
        [fileCnie[0]], 
        `cnie_${generateFileName()}` + '.' + fileCnie[0]?.name.split('.').pop(),
        { type: fileCnie[0]?.type },
      )
    }
    
    const uploadFolderName = getUploadFolderName(user?.firstName, user?.lastName);
    if (file) {
      const checksum = await computeSHA256(file);
      const signedURLResponse = await getSignedURL(`upload_mtym/${uploadFolderName}/${file.name}`, file.type, file.size, checksum) as any;
      await uploadFile(signedURLResponse?.url, file) as any;
    }

    const fileUrls = {
      fileCnieUrl: file ? `upload_mtym/${uploadFolderName}/${file.name}` : (user?.application?.fileCnieUrl ?? null),
    }

    await putApplication(user?.application?.id, fileUrls) as any

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fileCnie"
          render={({ field }) => {
            initFileInput(field, "fileCnie")

            return (
              <FormItem>
                <FormLabel>Justificatif d&apos;identité du participant avec photo (carte d&apos;identité, passeport, carte d&apos;élève...) <RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput form={form} id="fileCnie" />
                </FormControl>
                <FormDescription>
                  <span className="text-blue-500">Remarque</span>: Le document doit de préference être la CNIE ou le passeport. Sinon, vous pouvez envoyer tout document contenant les informations de l&apos;élève avec sa photo; ou bien son acte de naissance accompagné de sa photo dans le même PDF.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit">
          {isFormLoading
            ? <LoadingDots color="#808080" />
            : (user?.application?.fileCnieUrl ? 'Mettre à jour les informations' : 'Envoyer les informations')
          }
        </Button>
      </form>
    </Form>
  )
}

export default AdditionalInformationsSection
