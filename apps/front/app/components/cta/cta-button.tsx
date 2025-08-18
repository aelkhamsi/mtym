"use client"

import { Scroll } from 'lucide-react'
import { useAuthModal } from '../auth/auth-modal';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/app/store/userAtom';
import { useRouter } from "next/navigation"
import { useState } from 'react';
import { LoadingDots } from '@mdm/ui';

const CtaButton = ({
  label
}:{
  label?: string
}) => {
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const user = useAtomValue(userAtom)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClickResults = () => {
    router.push('/results')
  }

  const handleClickSolutions = () => {
    router.push('/solutions')
  }

  return (
    <>
      <AuthModal />
      
      <button 
        className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        onClick={handleClickResults}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1C55FF_0%,#FF4925_50%,#1C55FF_100%)]" />
        <span className="inline-flex h-full w-full gap-x-2 cursor-pointer items-center justify-center rounded-full bg-white px-6 py-1 text-black backdrop-blur-3xl">
          <Scroll className='h-5 w-5'/>

          {!isLoading
            ? label ?? 'Results'
            : <LoadingDots color="#808080" />
          }
        </span>
      </button>

      <button 
        className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        onClick={handleClickSolutions}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1C55FF_0%,#FF4925_50%,#1C55FF_100%)]" />
        <span className="inline-flex h-full w-full gap-x-2 cursor-pointer items-center justify-center rounded-full bg-white px-6 py-1 text-black backdrop-blur-3xl">
          <Scroll className='h-5 w-5'/>

          {!isLoading
            ? label ?? 'Exams & Solutions'
            : <LoadingDots color="#808080" />
          }
        </span>
      </button>
    </>
  )
}

export default CtaButton
