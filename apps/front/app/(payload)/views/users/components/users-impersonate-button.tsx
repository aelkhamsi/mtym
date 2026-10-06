'use client'

import { impersonate } from '@/app/api/AuthApi'
import { Button, toast } from '@mdm/ui'
import { useRouter } from 'next/navigation'

const UsersImpersonateButton = ({
  userId,
}:{
  userId: number
}) => {
  const router = useRouter()

  const onImpersonate = async () => {
    const response = await impersonate(userId) as any;
    switch(response?.statusCode) {
      case 200:
        router.push('/')
        window.location.reload()
        break;
      default:
        toast({
          title: 'Impersonate Failed',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive'
        });
    }
  }

  return (
    <Button onClick={onImpersonate}>
      Impersonate
    </Button>
  )
}

export default UsersImpersonateButton