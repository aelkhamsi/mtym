"use client"

import { useEffect, useState } from 'react';
import { LoadingDots } from '@mdm/ui';
import Link from 'next/link';
import { MessageCircleIcon } from 'lucide-react';

const QuestionIcon = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return <span className='inline-block w-6 h-6 bg-gray-200 rounded-sm' />
  return <MessageCircleIcon />
}

const FaqButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Link
      className="flex items-center justify-center h-11 space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-md transition-colors hover:border-gray-800"
      href="/faq"
      onClick={() => setIsLoading(true)}
    >
      <QuestionIcon />
      {!isLoading
        ? <span className="hidden sm:inline-block">FAQ</span>
        : <LoadingDots color="#808080" />
      }
    </Link>
  )
}

export default FaqButton
