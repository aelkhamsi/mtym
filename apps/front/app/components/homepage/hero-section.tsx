import React from 'react'
import TextureBg from '../texture-bg'
import Link from 'next/link'
import Image from 'next/image'
import CtaButton from '../cta/cta-button'
import FaqButton from '../cta/faq-button'
import { BookIcon, CalendarMDMIcon, LocationIcon } from '@mdm/ui'

const HeroSection = () => {
  return (
    <TextureBg
      className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#fff9f3] to-transparent'
    > 
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center max-w-2xl">
        {/* Logo */}
        <div 
          className="animate-fade-up opacity-0 z-10 md:p-0"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Image
            src="/mmc.png"
            alt="MMC logo"
            width='400'
            height='150'
          />
        </div>

        <div className="w-[25rem] md:w-[80rem] relative mb-6">
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-cyan-100 to-transparent h-[2px] md:w-3/4 blur-sm" />
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-cyan-100 to-transparent h-px md:w-3/4" />
          <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-[#252162] to-transparent h-[5px] md:w-2/4 blur-sm" />
          <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-cyan-600 to-transparent h-px md:w-2/4" />
        </div>

        <div className='space-y-6'>
          {/* Hero Title */}
          <div className='space-y-2'>
            <h1
              className="animate-fade-up opacity-0 text-center font-display text-4xl font-bold tracking-[0.05em] text-wrap:balance md:text-5xl md:leading-[3rem]"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              <span className='text-[#000102] font-neco'>
                The results of MMC 2025 are available!
              </span>
            </h1>
          </div>

          {/* Time and Location */}
          <div className='flex flex-col items-start space-y-2 gap-x-8 md:flex-row md:justify-center md:space-y-0'>
            <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
              <CalendarMDMIcon className='h-12'/>
              <div className="text-sm font-semibold text-gray-600">
                <span className='text-[#252162]'> July 25th</span> to <br/> 
                <span className='text-[#252162]'> July 29th</span>  2025
              </div>
            </div>

            <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
              <BookIcon className='h-12' />
              <div className="text-sm font-semibold text-gray-600">
                Top students from
                <span className='text-[#252162]'> Bac+1</span> to
                <span className='text-[#252162]'> Bac+4</span>
              </div>
            </div>

            <div className='flex items-center justify-center w-auto md:w-1/3 min-h-[4rem] space-x-2'>
              <LocationIcon className='h-12' />
              <div className="text-sm font-semibold text-gray-600 text-center">
                <span className='text-[#252162]'>UM6P | College of Computing</span>,<br/> Benguerir
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="mx-auto flex animate-fade-up items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
          >
            <CtaButton />
            <FaqButton />
          </div>

          {/* Organizer & sponsors */}
          <div
            className="flex flex-col items-center justify-between w-full space-y-4 md:flex-row md:space-y-0 animate-fade-up opacity-0 "
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <div className='flex items-center space-x-4'>
              <p className='text-sm text-gray-500'>
                Organized by
              </p>

              <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d38e31]/[.15] via-transparent to-transparent" href="/partners">
                <Image
                  src="/mm.png"
                  alt="Math&Maroc Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-10 w-auto filter grayscale brightness-100 contrast-125 hover:grayscale-0 hover:brightness-100 hover:contrast-100"
                />
              </Link>
            </div>
            
            <div className="flex space-x-8 items-center">
              <p className='text-sm text-gray-500'>
                Trusted by
              </p>
              
              <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d38e31]/[.15] via-transparent to-transparent" href="/partners">
                <Image
                  src="/adria_official_partner.png"
                  alt="Adria Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-12 w-auto filter grayscale brightness-50 contrast-125 hover:grayscale-0 hover:brightness-100 hover:contrast-100"
                />
              </Link>

              <Link className="h-[3.5rem] flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d38e31]/[.15] via-transparent to-transparent" href="/partners">
                <Image
                  src="/um6p_cc.png"
                  alt="UM6P CC Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-11 w-auto filter grayscale brightness-70 contrast-125 hover:grayscale-0 hover:brightness-100 hover:contrast-100"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TextureBg>
  )
}

export default HeroSection
