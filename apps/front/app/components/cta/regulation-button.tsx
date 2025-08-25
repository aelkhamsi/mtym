"use client"

import Link from 'next/link';
import { BookIcon } from 'lucide-react';

const RegulationButton = () => {
  return (
    <Link
      className="flex max-w-fit items-center justify-center h-11 space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-md transition-colors hover:border-gray-800"
      href="https://drive.google.com/file/d/1tE5qMUjEoeicBQ01XqsF5LyzLqT34rsm/view?usp=drive_link"
      target='_blank'
    >
      <BookIcon className='h-5 w-5'/>
      <span className="hidden sm:inline-block">Règlement</span>
    </Link>
  )
}

export default RegulationButton
