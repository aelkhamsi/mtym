import { z } from 'zod'
import { applicationSchema } from "@/app/schemas/application.schema"
import { computeSHA256, generateFileName, getUploadFolderName } from '@/app/lib/utils';
import { User } from '@mdm/types';
import { getSignedURL, uploadFile } from '@/app/api/MediaApi';
import { postApplication, putApplication } from '@/app/api/ApplicationApi';
import { excludeFileFields, serializeApplication } from '../serialization';

export const useFileUpload = () => {
  const getFiles = (
    formData: z.infer<typeof applicationSchema>
  ) => {
    const { fileRegulations, fileGrades } = formData;
    const uploadFileNames = ['regulations', 'grades']
      .map(name => `${name}_${generateFileName()}`)
    const files = [fileRegulations, fileGrades]
      .map((files, index) => {
        if (files && files.length) {
          return new File(
            [files[0]], 
            uploadFileNames[index] + '.' + files[0]?.name.split('.').pop(),
            { type: files[0]?.type },
          )
        }
        
        return undefined
      })
    
    return files
  }

  const uploadFiles = async (
    files: (File|undefined)[], 
    user: User|undefined
  ) => {
    const uploadFolderName = getUploadFolderName(user?.firstName, user?.lastName);

    for (const file of files) {
      if (file) {
        const checksum = await computeSHA256(file);
        const signedURLResponse = await getSignedURL(`upload_mtym/${uploadFolderName}/${file.name}`, file.type, file.size, checksum) as any;
        await uploadFile(signedURLResponse?.url, file) as any;
      }
    }
  }

  const updateApplicationFiles = async (
    formData: z.infer<typeof applicationSchema>, 
    files: (File|undefined)[], 
    user: User|undefined
  ) => {
    const uploadFolderName = getUploadFolderName(user?.firstName, user?.lastName);
    const fileUrls = {
      fileRegulationsUrl: files[0] ? `upload_mtym/${uploadFolderName}/${files[0].name}` : (formData?.fileRegulationsUrl ?? null),
      fileGradesUrl: files[1] ? `upload_mtym/${uploadFolderName}/${files[1].name}` : (formData?.fileGradesUrl ?? null),
    }

    const result = await putApplication(formData?.id, fileUrls) as any

    if (result?.statusCode !== 200) {
      await postApplication({
        ...excludeFileFields(serializeApplication(formData)),
        ...fileUrls,
      }) as any
    }
  }

  return {
    getFiles,
    uploadFiles,
    updateApplicationFiles,
  }
}
