"use client"

import type { ReactNode } from 'react'
import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { adminUserAtom } from '@/store/adminUserAtom'
import { applicationsAtom } from '@/store/applicationsAtom'
import { teamsAtom } from '@/store/teamsAtom'
import { usersAtom } from '@/store/usersAtom'

type ProviderProps = {
  adminUser?: any,
  applications?: any[],
  teams?: any[],
  users?: any[],
  children: ReactNode,
};

function HydrateAtoms({ adminUser, applications, teams, users, children } : ProviderProps) {
  if (adminUser) useHydrateAtoms([[adminUserAtom, adminUser]])
  if (applications) useHydrateAtoms([[applicationsAtom, applications]])
  if (teams) useHydrateAtoms([[teamsAtom, teams]])
  if (users) useHydrateAtoms([[usersAtom, users]])
  return children;
}

export default function RootProvider({ adminUser, applications, teams, users, children }: ProviderProps) {
  return (
    <Provider>
      <HydrateAtoms 
        adminUser={adminUser}
        applications={applications}
        teams={teams}
        users={users}
      >
        {children}
      </HydrateAtoms>
    </Provider>
  );
}