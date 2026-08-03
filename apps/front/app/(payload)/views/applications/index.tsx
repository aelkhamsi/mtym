import React from 'react'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav, type StepNavItem } from '@payloadcms/ui'
import { AdminViewServerProps } from 'payload'
import ApplicationsClient from './index.client'

export const ApplicationsView = async ({
  initPageResult, params, searchParams
}: AdminViewServerProps) => {
  if (!initPageResult.req.user) return <p>You must be logged in to access this page.</p>

  const admins = await initPageResult.req.payload.find({
    collection: 'users',
    pagination: false,
    sort: 'email',
  })

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
      <ApplicationsClient
        admins={admins.docs.map((admin) => {
          const name = [admin.firstName, admin.lastName].filter(Boolean).join(' ')
          return { id: String(admin.id), label: name || 'Unnamed admin' }
        })}
        currentAdminId={String(initPageResult.req.user.id)}
      />
    </Gutter>
  </DefaultTemplate>
}

export default ApplicationsView;
