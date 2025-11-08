
import { User } from '@mdm/types';
import { useState } from 'react';
import { toast } from "@mdm/ui";
import { excludeFileFields, stringifyFormData } from '../serialization';
import { useFileUpload } from './use-file-upload';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { postParticipantDetails, putParticipantDetails } from '@/app/api/ParticipantDetailsApi';

export const useParticipantDetailsHandlers = (
  user: User|undefined
) => {
  const router = useRouter()
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const {
    getFiles,
    uploadFiles,
    updateParticipantDetailsFiles,
  } = useFileUpload()

  const onSubmit = async (form: UseFormReturn) => {
    const formData = form.watch()
    setIsFormLoading(true);

    try {
      const participantDetailsResponse = await postParticipantDetails(
        excludeFileFields(stringifyFormData(formData))
      ) as any;

      if (participantDetailsResponse?.statusCode !== 200) {
        throw new Error(participantDetailsResponse?.message ?? 'Post of participant details failed')
      }

      // Upload files
      const files = getFiles(formData)
      await uploadFiles(files, user)
      await updateParticipantDetailsFiles(formData, files, user)

      toast({
        title: 'Participant details created with success',
        description: 'You can access your current informations in your profile page',
      });

      await putParticipantDetails(participantDetailsResponse?.id, {status: 'COMPLETED'})

      router.push('/profile/participant-details')
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } 
    catch(err: any) 
    {
      setError(err);
      setShowErrorDialog(true);
    } 
    finally 
    {
      setIsFormLoading(false);
    }
  }

  const onSave = async (form: UseFormReturn) => {
    const participantDetails = form.watch()

    try {
      const participantDetailsResponse = await postParticipantDetails(
        excludeFileFields(stringifyFormData(participantDetails))
      ) as any;

      if (participantDetailsResponse?.statusCode !== 200) {
        throw new Error(participantDetailsResponse?.message ?? 'Post of participant details failed')
      }

      toast({
        title: 'Participant Details saved successfully',
        description: 'You can access your current details in your profile page',
      });
      
      router.push('/profile/participant-details')
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch(err: any) {
      setError(err);
      setShowErrorDialog(true);
    }
  }

  const onError = async (errors: any) => {}

  return {
    onSubmit,
    onSave,
    onError,
    isFormLoading,
    setIsFormLoading,
    showErrorDialog,
    setShowErrorDialog,
    error,
    setError,
  }
}
