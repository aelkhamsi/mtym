import { z } from 'zod'
import { computeSHA256, generateFileName, getUploadFolderName } from '@/app/utils/file.utils'
import { User } from '@mdm/types';
import { getSignedURL, uploadFile } from '@/app/api/MediaApi';
import { excludeFileFields, stringifyFormData } from '../serialization';
import { postParticipantDetails, putParticipantDetails } from '@/app/api/ParticipantDetailsApi';
import { participantDetailsSchema } from '@/app/schemas/participant-details.schema';

export const useFileUpload = () => {
  const getFiles = (
    formData: z.infer<typeof participantDetailsSchema>
  ) => {
    const { filePhoto, fileParentalAuthorization } = formData;
    const uploadFileNames = ['photo', 'parentalAuthorization']
      .map(name => `${name}_${generateFileName()}`)
    const files = [filePhoto, fileParentalAuthorization]
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
    const uploadFolderName = `participant-details/${getUploadFolderName(user?.firstName, user?.lastName)}`;

    for (const file of files) {
      if (file) {
        const checksum = await computeSHA256(file);
        const signedURLResponse = await getSignedURL(`${uploadFolderName}/${file.name}`, file.type, file.size, checksum) as any;
        await uploadFile(signedURLResponse?.url, file) as any;
      }
    }
  }

  const updateParticipantDetailsFiles = async (
    formData: z.infer<typeof participantDetailsSchema>, 
    files: (File|undefined)[], 
    user: User|undefined
  ) => {
    const uploadFolderName = `participant-details/${getUploadFolderName(user?.firstName, user?.lastName)}`;
    const fileUrls = {
      filePhotoUrl: files[0] ? `${uploadFolderName}/${files[0].name}` : (formData?.filePhotoUrl ?? null),
      fileParentalAuthorizationUrl: files[1] ? `${uploadFolderName}/${files[1].name}` : (formData?.fileParentalAuthorizationUrl ?? null),
    }

    const result = await putParticipantDetails(formData?.id, fileUrls) as any

    if (result?.statusCode !== 200) {
      await postParticipantDetails({
        ...excludeFileFields(stringifyFormData(formData)),
        ...fileUrls,
      }) as any
    }
  }

  return {
    getFiles,
    uploadFiles,
    updateParticipantDetailsFiles,
  }
}
