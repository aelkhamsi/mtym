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
  toast,
} from "@mdm/ui"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RequiredAsterisk } from "@/app/components/forms/required-asterisk"
import { FileInput } from "../../../application/form/components/file-input"
import { initFileInput } from "../../../application/form/steps/upload-step"
import { zodFileValidation } from "@/app/schemas/application.schema"
import { computeSHA256, generateFileName, getUploadFolderName } from "@/app/utils/file.utils"
import { getSignedURL, uploadFile } from "@/app/api/MediaApi"
import { putApplication } from "@/app/api/ApplicationApi"
import { ReactNode, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { userAtom } from "@/app/store/userAtom"
import { applicationAtom } from "@/app/store/applicationAtom"
import FilePreviewButton from "@/app/(payload)/views/components/file/file-preview-button"

const AdditionalInformationsSection = ({
  fieldName = "fileCnie",
  filePrefix = "cnie",
  label = "Justificatif d'identité du participant avec photo (carte d'identité, passeport, carte d'élève...)",
  description = <><span className="text-blue-500">Remarque</span>: Le document doit de préference être la CNIE ou le passeport. Sinon, vous pouvez envoyer tout document contenant les informations de l&apos;élève avec sa photo; ou bien son acte de naissance accompagné de sa photo dans le même PDF.</>,
}: {
  fieldName?: string
  filePrefix?: string
  label?: ReactNode
  description?: ReactNode
}) => {
  const user = useAtomValue(userAtom)
  const application = useAtomValue(applicationAtom)
  const setApplication = useSetAtom(applicationAtom)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const urlFieldName = `${fieldName}Url`
  const additionalInformationSchema = z.object({
    [fieldName]: zodFileValidation,
    [urlFieldName]: z.any().optional(),
  })
  const form = useForm({
    resolver: zodResolver(additionalInformationSchema),
    defaultValues: {
      [fieldName]: undefined,
      [urlFieldName]: application?.[urlFieldName],
    },
    mode: "onChange",
  }) as UseFormReturn<any>;

  const onSubmit = async (formData: z.infer<typeof additionalInformationSchema>) => {
    setIsFormLoading(true)
    try {
      const selectedFiles = formData[fieldName];

      let file = undefined
      if (selectedFiles && selectedFiles.length) {
        file = new File(
          [selectedFiles[0]],
          `${filePrefix}_${generateFileName()}` + '.' + selectedFiles[0]?.name.split('.').pop(),
          { type: selectedFiles[0]?.type },
        )
      }

      const uploadFolderName = `applications/${getUploadFolderName(user?.firstName, user?.lastName)}`;
      if (file) {
        const checksum = await computeSHA256(file);
        const signedURLResponse = await getSignedURL(`${uploadFolderName}/${file.name}`, file.type, file.size, checksum) as any;
        const uploadResponse = await uploadFile(signedURLResponse?.url, file) as { statusCode: number };
        if (uploadResponse.statusCode < 200 || uploadResponse.statusCode >= 300) throw new Error("Upload failed")
      }

      const fileUrls = {
        [urlFieldName]: file ? `${uploadFolderName}/${file.name}` : (application?.[urlFieldName] ?? null),
      }

      const updateResponse = await putApplication(application?.id, fileUrls) as { statusCode: number }
      if (updateResponse.statusCode !== 200) throw new Error("Application update failed")

      setApplication((current: any) => ({ ...current, ...fileUrls }))
      form.setValue(urlFieldName, fileUrls[urlFieldName])
      form.resetField(fieldName)
      toast({ title: application?.[urlFieldName] ? "Document mis à jour" : "Document envoyé" })
    } catch {
      toast({ title: "Envoi impossible", description: "Veuillez réessayer.", variant: "destructive" })
    } finally {
      setIsFormLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => {
            initFileInput(field, fieldName)

            return (
              <FormItem>
                <FormLabel>{label} <RequiredAsterisk /></FormLabel>
                <FormControl>
                  <FileInput key={application?.[urlFieldName]} form={form} id={fieldName} />
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                {application?.[urlFieldName] && <FilePreviewButton filename={application[urlFieldName]} />}
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit" disabled={isFormLoading || !form.watch(fieldName)?.length}>
          {isFormLoading
            ? <LoadingDots color="#808080" />
            : (application?.[urlFieldName] ? 'Mettre à jour le fichier' : 'Envoyer le fichier')
          }
        </Button>
      </form>
    </Form>
  )
}

export default AdditionalInformationsSection
