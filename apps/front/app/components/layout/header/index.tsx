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

const NavBarActionButtonContent = ({
  setShowAuthModal
}:{
  setShowAuthModal: Dispatch<SetStateAction<boolean>>
}) => {
  const user = useAtomValue(userAtom)

  return user
    ? <UserNav firstName={user?.firstName} lastName={user?.lastName} email={user?.email} />
    : <AuthButton setShowAuthModal={setShowAuthModal}/>
}

export default function Header() {
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const scrolled = useScroll(isHomepage ? 600 : 50)

  return (
    <>
      <AuthModal />
      
      <div
        className={`
          fixed top-0 flex w-full justify-center z-30 
          ${scrolled
            ? "border-b border-gray-200 bg-white/50 text-black backdrop-blur-xl"
            : `bg-white/0 ${isHomepage ? 'text-white' : 'text-black'}`
          }
        `}
      >
        <div className="mx-5 flex h-16 w-full lg:w-3/4 items-center justify-between">
          <Link href="/">
            <Image
              src="/mtym_square.svg"
              alt="MMC logo"
              width={45}
              height={45}
            ></Image>
          </Link>

          <div className="flex items-center">
            <Menu />
            <NavBarActionButtonContent setShowAuthModal={setShowAuthModal} />
          </div>
        </div>
      </div>
    </>
  );
}
