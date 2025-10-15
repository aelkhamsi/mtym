import "./globals.css";
import "@mdm/ui/globals.css";
import cx from "classnames";
import { pally, poppins } from "../lib/fonts";
import Footer from "@/app/components/layout/footer/footer";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Header from "@/app/components/layout/header";
import { Toaster } from "@mdm/ui";
import { cookies } from "next/headers";
import { getUser } from "@/app/api/UsersApi";
import RootProvider from "./root-provider";

export const metadata = {
  title: "MTYM 2025",
  description: "MTYM: Explorer, Élaborer, Collaborer",
  metadataBase: new URL("https://mtym.mathmaroc.org"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies().toString();
  const user = await getUser(cookieStore) as any

  return (
    <html lang="en">
      <body className={`${cx(pally.variable, poppins.variable)} font-poppins`}>
        <RootProvider initialUser={user}>
          <Header />
          <>{children}</>
          <Footer />
          <Toaster />
          <VercelAnalytics />
        </RootProvider>
      </body>
    </html>
  );
}
