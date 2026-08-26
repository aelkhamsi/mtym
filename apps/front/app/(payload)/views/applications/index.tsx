import React from 'react'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav, type StepNavItem } from '@payloadcms/ui'
import { AdminViewServerProps } from 'payload'
import { cookies } from 'next/headers'
import { getAllApplications } from '@/app/api/ApplicationApi'
import RootProvider from '@/app/(payload)/root-provider'
import ApplicationsClient from './index.client'

export const ApplicationsView = async ({
  initPageResult, params, searchParams
}: AdminViewServerProps) => {
  if (!initPageResult.req.user) return <p>You must be logged in to access this page.</p>

  const usersCollection = await initPageResult.req.payload.find({
    collection: 'users',
    pagination: false,
    sort: 'firstName',
  })
  const admins = usersCollection.docs.map((admin) => ({
    id: String(admin.id),
    label: [admin.firstName, admin.lastName].filter(Boolean).join(' ') || 'Unnamed admin',
  }))
  const applications = await getAllApplications((await cookies()).toString()) as any[]
  const steps: StepNavItem[] = [
    {
      url: '/admin/applications',
      label: 'Applications',
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
      <RootProvider applications={applications}>
        <ApplicationsClient
          admins={admins}
          currentAdminId={String(initPageResult.req.user.id)}
        />
      </RootProvider>
    </Gutter>
  </DefaultTemplate>
}

export default ApplicationsView;