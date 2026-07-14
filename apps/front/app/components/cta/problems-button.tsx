"use client"

import Link from 'next/link';
import { BookIcon } from 'lucide-react';

const ProblemsButton = () => {
  return (
    <Link
      className="flex max-w-fit items-center justify-center h-11 space-x-2 rounded-full border-[3px] border-[#f6a806] bg-white px-4 py-2 text-gray-700 shadow-md transition-colors hover:border-gray-500"
      href="https://drive.google.com/file/d/1tdx8-VT4JXpJxCjj-tEiRUteoT8RFG02/view?usp=sharing"
      target='_blank'
    >
      <BookIcon className='h-5 w-5'/>
      <span>Problèmes 2026</span>
    </Link>
  )
}

export default ProblemsButton
