import React from 'react'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav, type StepNavItem } from '@payloadcms/ui'
import { AdminViewServerProps } from 'payload'
import { cookies } from 'next/headers'
import { getAllTeams } from '@/app/api/TeamApi'
import { getEligibleUsersForTeamCreation } from '@/app/api/UsersApi'
import RootProvider from '@/app/(payload)/root-provider'
import TeamsClient from './index.cilent'

export const TeamsView: React.FC<AdminViewServerProps> = async ({
  initPageResult, params, searchParams
}) => {
  if (!initPageResult.req.user) return <p>You must be logged in to access this page.</p>

  const cookie = (await cookies()).toString()
  const teams = await (getAllTeams(cookie) as Promise<any[]>)
  const usersCollection = await initPageResult.req.payload.find({
    collection: 'users',
    pagination: false,
    sort: 'firstName',
  })
  const admins = usersCollection.docs.map((admin) => ({
    id: String(admin.id),
    label: [admin.firstName, admin.lastName].filter(Boolean).join(' ') || 'Unnamed admin',
  }))
  const steps: StepNavItem[] = [
    {
      url: '/admin/teams',
      label: 'Teams',
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
      <RootProvider teams={teams}>
        <TeamsClient
          admins={admins}
          currentAdminId={String(initPageResult.req.user.id)}
        />
      </RootProvider>
    </Gutter>
  </DefaultTemplate>
}

export default TeamsView;
