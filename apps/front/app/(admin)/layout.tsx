import '../(frontend)/globals.css'
import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import React from 'react'

import { importMap } from './admin/importMap'
import { ServerFunctionClient } from 'payload'
import RootProvider from './root-provider'
import { cookies } from 'next/headers';
import { getAllUsers, getSessionCookie } from '../api/UsersApi'
import { getAllApplications } from '../api/ApplicationApi'
import { getAllTeams } from '../api/TeamApi'

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
    <RootProvider
      applications={applications}
      teams={teams}
      users={users}
    >
      <RootLayout config={config} importMap={importMap} serverFunction={serverFunction as ServerFunctionClient}>
          {children}
      </RootLayout>
    </RootProvider>
  )
}
  


export default Layout
