
import { z } from 'zod';
import { applicationSchema } from '@/app/schemas/application.schema';
import { User } from '@mdm/types';
import { useState } from 'react';
import { toast } from "@mdm/ui";
import { postApplication, updateApplicationStatus } from '@/app/api/ApplicationApi';
import { excludeFileFields, serializeApplication } from '../serialization';
import { useFileUpload } from './use-file-upload';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const useApplicationHandlers = (
  user: User|undefined
) => {
  const router = useRouter()
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const {
    getFiles,
    uploadFiles,
    updateApplicationFiles,
  } = useFileUpload()

  const onSubmit = async (formData: z.infer<typeof applicationSchema>) => {
    setIsFormLoading(true);

    try {
      // Post application
      const applicationResponse = await postApplication(
        excludeFileFields(serializeApplication(formData))
      ) as any

      if (applicationResponse?.statusCode !== 200) {
        throw new Error(applicationResponse?.message ?? 'Post of application failed')
      }

      // Upload files
      const files = getFiles(formData)
      await uploadFiles(files, user)
      await updateApplicationFiles(formData, files, user)
      
      // Update application status
      const applicationId = applicationResponse?.id;
      await updateApplicationStatus(applicationId, { status: user?.application?.status?.status === 'NOTIFIED'
        ? 'UPDATED'
        : 'PENDING'
      }) as any;

      toast({
        title: 'Application created with success',
        description: 'You can access your current application in your profile page',
      });

      router.push('/profile/application')
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
    const application = form.watch()

    try {
      const applicationResponse = await postApplication(
        excludeFileFields(serializeApplication(application))
      ) as any;

      if (applicationResponse?.statusCode !== 200) {
        throw new Error(applicationResponse?.message ?? 'Post of application failed')
      }

      toast({
        title: 'Application saved successfully',
        description: 'You can access your current application in your profile page',
      });
      
      router.push('/profile/application')
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
