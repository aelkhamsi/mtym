import '../(frontend)/globals.css'
import './globals.css'
import "@mdm/ui/globals.css";
import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import { importMap } from './admin/importMap'
import { ServerFunctionClient } from 'payload'
import { pally, poppins } from '../lib/fonts';
import cx from "classnames";
import { Toaster } from "@mdm/ui";

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction as ServerFunctionClient}>
    <div className={`${cx(pally.variable, poppins.variable)} font-poppins`}>
      <>{children}</>
      <Toaster />
    </div>
  </RootLayout>
)

export default Layout
