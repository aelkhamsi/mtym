"use client"

import type { ReactNode } from 'react'
import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { applicationsAtom } from '@/app/store/admin/applicationsAtom'
import { teamsAtom } from '@/app/store/admin/teamsAtom'
import { usersAtom } from '@/app/store/admin/usersAtom'

type ProviderProps = {
  adminUser?: any,
  applications?: any[],
  participantDetails?: any[],
  teams?: any[],
  users?: any[],
  children: ReactNode,
};

function HydrateAtoms({ applications, teams, users, children } : ProviderProps) {
  useHydrateAtoms([
    [applicationsAtom, applications],
    [teamsAtom, teams],
    [usersAtom, users],
  ])
  return children;
}

export default function RootProvider({ applications, teams, users, children }: ProviderProps) {
  return (
    <Provider>
      <HydrateAtoms 
        applications={applications}
        teams={teams}
        users={users}
      >
        {children}
      </HydrateAtoms>
    </Provider>
  );
}