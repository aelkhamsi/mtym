import React from 'react'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav, type StepNavItem } from '@payloadcms/ui'
import { AdminViewServerProps } from 'payload'
import { cookies } from 'next/headers'
import { getAllUsers } from '@/app/api/UsersApi'
import RootProvider from '@/app/(payload)/root-provider'
import UsersClient from './index.client'

export const UsersView: React.FC<AdminViewServerProps> = async ({
  initPageResult, params, searchParams
}) => {
  if (!initPageResult.req.user) return <p>You must be logged in to access this page.</p>

  const users = await getAllUsers((await cookies()).toString()) as any[]
  const steps: StepNavItem[] = [
    {
      url: '/admin/users',
      label: 'Users',
    }
  ]

  return <DefaultTemplate
    visibleEntities={initPageResult.visibleEntities}
    i18n={initPageResult.req.i18n}
    payload={initPageResult.req.payload}
    locale={initPageResult.locale}
    params={params}
    permissions={initPageResult.permissions}
    user={initPageResult.req.user || undefined}
    searchParams={searchParams}
  >
    <SetStepNav nav={steps} />
    <Gutter>
      <RootProvider users={users}>
        <UsersClient />
      </RootProvider>
    </Gutter>
  </DefaultTemplate>
}

export default UsersView;