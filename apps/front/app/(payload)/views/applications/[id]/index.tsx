import React from 'react'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav, type StepNavItem } from '@payloadcms/ui'
import { AdminViewServerProps } from 'payload'
import ApplicationDetailsClient from './index.client'
import { getApplicationById } from '@/app/api/ApplicationApi'
import { cookies } from 'next/headers'
import RootProvider from '@/app/(payload)/root-provider'

export const ApplicationDetailsView: React.FC<AdminViewServerProps> = async ({
  initPageResult, params, searchParams
}) => {
  if (!initPageResult.req.user) return <p>You must be logged in to access this page.</p>
  
  const cookie = (await cookies()).toString()
  const applicationId = (await params)?.segments?.[1] ?? '0'
  const application = await (getApplicationById(+applicationId, cookie) as Promise<any[]>)
  const usersCollection = await initPageResult.req.payload.find({
    collection: 'users',
    pagination: false,
    sort: 'firstName',
  })
  const admins = usersCollection.docs.map((admin) => ({
    id: String(admin.id),
    label: [admin.firstName, admin.lastName].filter(Boolean).join(' ') || 'Unnamed admin',
  }))

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
    {/* <SetStepNav nav={steps} /> */}
    <Gutter>
      <RootProvider applications={[application]}>
        <ApplicationDetailsClient id={applicationId} admins={admins} />
      </RootProvider>
    </Gutter>
  </DefaultTemplate>
}

export default ApplicationDetailsView;