import '../(frontend)/globals.css'
import './globals.css'
import "@mdm/ui/globals.css";
import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'

import { importMap } from './admin/importMap'
import { ServerFunctionClient } from 'payload'
import RootProvider from './root-provider'
import { cookies } from 'next/headers';
import { getAllUsers } from '../api/UsersApi'
import { getAllApplications } from '../api/ApplicationApi'
import { getAllTeams } from '../api/TeamApi'
import { pally, poppins } from '../lib/fonts';
import cx from "classnames";

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

const Layout = async ({ children }: Args) => {
  const cookieStore = (await cookies()).toString();
  const applications = await getAllApplications(cookieStore) as any[]
  const teams = await getAllTeams(cookieStore) as any[]
  const users = await getAllUsers(cookieStore) as any[]

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction as ServerFunctionClient}>
      <RootProvider
        applications={applications}
        teams={teams}
        users={users}
      >
        <div className={`${cx(pally.variable, poppins.variable)} font-poppins`}>
          {children}
        </div>
      </RootProvider>    
    </RootLayout>
  
  )
}

export default Layout
