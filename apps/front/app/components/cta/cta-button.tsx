"use client"

import { Scroll } from 'lucide-react'
import { useAuthModal } from '../auth/auth-modal';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/app/store/userAtom';
import { useRouter } from "next/navigation"
import { useState } from 'react';
import { LoadingDots } from '@mdm/ui';

const CtaButton = ({
  href,
}:{
  href?: string,
}) => {
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const user = useAtomValue(userAtom)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCtaClick = () => {
    if (user) {
      setIsLoading(true)
      router.push(href ?? '/profile/application')
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <AuthModal />
      
      <button 
        className="flex items-center justify-center h-11 space-x-2 rounded-full border-2 border-[#f6a806] bg-white px-4 py-2 text-gray-700 shadow-md transition-colors hover:border-gray-800"
        onClick={handleCtaClick}
      >
        <Scroll />

        {!isLoading
          ? <span>Participer</span>
          : <LoadingDots color="#808080" />
        }
      </button>
    </>
  )
}

export default CtaButton
