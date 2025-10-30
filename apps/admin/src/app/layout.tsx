import type { Metadata } from 'next';
import { sfPro, inter } from '@/fonts';
import "./globals.css";
import cx from "classnames";
import { Toaster } from '@/components/shared/toaster';
import { getAllUsers, getSessionCookie } from '@/api/UsersApi';
import { cookies } from 'next/headers';
import { getAdminUserById } from '@/api/AdminUsersApi';
import RootProvider from './root-provider';
import { getAllApplications } from '@/api/ApplicationApi';
import { getAllTeams } from '@/api/TeamApi';

export const metadata: Metadata = {
  title: "MTYM 2025 Admin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies().toString();
  const session = await getSessionCookie(cookieStore) as any
  const adminUser = await getAdminUserById(session?.id, cookieStore) as any
  const applications = await getAllApplications(cookieStore) as any[]
  const teams = await getAllTeams(cookieStore) as any[]
  const users = await getAllUsers(cookieStore) as any[]

  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <RootProvider
          adminUser={adminUser}
          applications={applications}
          teams={teams}
          users={users}
        >
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
