import '../(frontend)/globals.css'
import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import React from 'react'

import { importMap } from './admin/importMap'
import { ServerFunctionClient } from 'payload'

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction as ServerFunctionClient}>
    {children}
  </RootLayout>
)

export default Layout
