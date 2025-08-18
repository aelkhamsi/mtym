import type { Metadata } from 'next';
import { sfPro, inter } from '@/fonts';
import "./globals.css";
import cx from "classnames";
import RecoilContextProvider from './recoilContextProvider';
import { DataLoader } from '@/components/layout/data-loader';
import { Toaster } from '@/components/shared/toaster';

export const metadata: Metadata = {
  title: "MMC 2025 Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <RecoilContextProvider>
          <DataLoader />
          {children}
          <Toaster />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
