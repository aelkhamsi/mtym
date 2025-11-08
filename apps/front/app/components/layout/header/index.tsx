"use client";

import Image from "next/image";
import Link from "next/link";
import { useScroll } from "@mdm/hooks";
import { UserNav } from "./user-nav";
import { useAuthModal } from "@/app/components/auth/auth-modal";
import { userAtom } from "@/app/store/userAtom";
import { Dispatch, SetStateAction } from "react";
import { useAtomValue } from "jotai";
import AuthButton from "./auth-button";
import { Menu } from './menu'
import { usePathname } from "next/navigation";
import SectionContainer from "../../section-container";

const NavBarActionButtonContent = ({
  setShowAuthModal
}:{
  setShowAuthModal: Dispatch<SetStateAction<boolean>>
}) => {
  const user = useAtomValue(userAtom)

  return user
    ? <UserNav user={user} />
    : <AuthButton setShowAuthModal={setShowAuthModal}/>
}

export default function Header() {
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const scrolled = useScroll(50)

  return (
    <>
      <AuthModal />
      
      <SectionContainer
        className={`
          fixed top-0 h-14 z-10 items-center
          ${scrolled
            ? "border-b border-gray-200 bg-white/50 text-black backdrop-blur-xl"
            : `bg-white/0 ${isHomepage ? 'text-white' : 'text-black'}`
          }
        `}
      >
        <div className='flex justify-between'>
          <Link href="/">
            <Image
              src="/images/logos/mtym_square.svg"
              alt="MMC logo"
              width={40}
              height={40}
            ></Image>
          </Link>

          <div className="flex items-center">
            <Menu />
            <NavBarActionButtonContent setShowAuthModal={setShowAuthModal} />
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
