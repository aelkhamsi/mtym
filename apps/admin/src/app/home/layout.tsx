"use client"

import { Inter } from 'next/font/google';
import "../globals.css";
import { NavItem } from '@/components/layout/nav-item';
import { UsersIcon } from '@/components/shared/icons';
import { SettingsIcon } from '@/components/shared/icons';
import Logo from '@/components/layout/logo';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminState } from '@/store/adminState';
import { objIsEmpty } from '@/lib/utils';
import PageSkeleton from './page-skeleton';
import { AdminNav } from '@/components/layout/admin-nav';

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminData = useRecoilValue(adminState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (adminData && !objIsEmpty(adminData)) {
      setIsLoading(false);
    }
  }, [adminData])

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="border-r">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-5">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavItem href="/home/applications" className="h-12">
                <UsersIcon className="h-4 w-4" />
                Applications
              </NavItem>
              <NavItem href="/home/users" className="h-12">
                <UsersIcon className="h-4 w-4" />
                Users
              </NavItem>
              <NavItem href="/home/settings" className="h-12">
                <SettingsIcon className="h-4 w-4" />
                Settings
              </NavItem>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 justify-between lg:justify-end">
          {!isLoading ? <AdminNav /> : <></>}
        </header>

        <div className='p-8'>
          {isLoading
            ? <PageSkeleton />
            : children
          }
        </div>
      </div>
    </div>
  );
}
