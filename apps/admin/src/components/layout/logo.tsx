"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  const onLogoClick = () => {
    router.push('/home');
  }

  return (
    <div onClick={onLogoClick} className="flex items-center font-display text-2xl cursor-pointer">
      <Image
        src="/mtym.png"
        alt="MTYM logo"
        width="40"
        height="40"
        className="mr-2"
      ></Image>
    </div>
  )
}

export default Logo
