"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@mdm/ui';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className='panel'>
      {/* Transition border */}
      <div className="relative w-full flex justify-between -mt-11 h-11">
        <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#122019]"></div>
        <div className="flex justify-between mx-auto w-full px-[1.6rem] sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,100 0,0 100,100" fill="#122019" />
            <polygon points="100,0 0,0 100,100" fill={pathname === '/' ? '#244B3A' : '#FFF'} />
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 100,0 0,100" fill={pathname === '/' ? '#244B3A' : '#FFF'} />
            <polygon points="100,100 100,0 0,100" fill="#122019" />
          </svg>
        </div>
        <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-[#122019]"></div>
      </div>

      {/* Content */}
      <div className='flex flex-col justify-center items-center w-full py-12 space-y-6 bg-[#122019] text-white'>
        <div className='flex flex-col space-y-8 md:flex-row md:justify-between md:space-y-0 w-3/4'>
          {/* LEFT */}
          <div>
            <div className="flex space-x-4 items-center">
              <Link className="h-9 flex items-center" href="/">
                <Image
                  src="/mm_light.png"
                  alt="Math&Maroc Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-auto filter grayscale brightness-100 contrast-125 hover:grayscale-0 hover:brightness-100 hover:contrast-100"
                />
              </Link>
            </div>

            <div className='text-sm max-w-[15rem] mt-2'>
              Unlocking the scientific potential of Moroccan youth.
            </div>
          </div>

          {/* RIGHT */}
          <div className='flex text-sm space-x-12'>
            <div className='space-y-6'>
              <h1 className='font-bold'>Pages</h1>
              <ul className='space-y-2'>
                <li><Link href='/selection' className='hover:underline'>Test de sélection</Link></li>
                <li><Link href='/past-edition' className='hover:underline'>Édition passée</Link></li>
                <li><Link href='/organizing-team' className='hover:underline'>Équipe organisatrice</Link></li>
                <li><Link href='/partners' className='hover:underline'>Partenaires</Link></li>
                <li><Link href='/faq' className='hover:underline'>FAQ</Link></li>
              </ul>
            </div>

            <div className='space-y-6'>
              <h1 className='font-bold'>Social Media</h1>
              <ul className='space-y-2'>
                <li><Link href='https://www.instagram.com/mathmaroc/' target='_blank' className='hover:underline'>Instagram</Link></li>
                <li><Link href='https://www.youtube.com/@mathmaroc1396' target='_blank' className='hover:underline'>Youtube</Link></li>
                <li><Link href='https://www.linkedin.com/company/mathemaroc/posts/?feedView=all' target='_blank' className='hover:underline'>Linkedin</Link></li>
                <li><Link href='https://www.facebook.com/MathsMaroc2' target='_blank' className='hover:underline'>Facebook</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className='w-3/4 bg-gray-600' />

        <div className='w-3/4 text-sm text-left text-gray-600'>
          Math&Maroc © 2025. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
