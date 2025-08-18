"use client"

import { useState } from 'react';
import { LoadingDots } from '@mdm/ui';
import Link from 'next/link';
import { MessageCircleIcon } from 'lucide-react';


const FaqButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Link
      className="flex max-w-fit items-center justify-center h-11 space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-md transition-colors hover:border-gray-800"
      href="/faq"
      onClick={() => setIsLoading(true)}
    >
      <MessageCircleIcon className='h-5 w-5'/>
      {!isLoading
        ? <span className="hidden sm:inline-block">FAQ</span>
        : <LoadingDots color="#808080" />
      }
    </Link>
  )
}

export default FaqButton
