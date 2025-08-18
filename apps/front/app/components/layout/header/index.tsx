"use client";

import Image from "next/image";
import Link from "next/link";
import { useScroll } from "@mdm/hooks";
import { UserNav } from "./user-nav";
import { useAuthModal } from "@/app/components/auth/auth-modal";
import { userAtom } from "@/app/store/userAtom";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { useAtomValue } from "jotai";
import AuthButton from "./auth-button";
import { Menu } from './menu'

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
  const scrolled = useScroll(50)

  return (
    <>
      <AuthModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full lg:w-3/4 items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logomark.png"
              alt="MMC logo"
              width={45}
              height={45}
              className="mr-2"
            ></Image>
          </Link>

          <div className="flex items-center">
            <Menu />

            <Suspense fallback="..." >
              <NavBarActionButtonContent setShowAuthModal={setShowAuthModal} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
