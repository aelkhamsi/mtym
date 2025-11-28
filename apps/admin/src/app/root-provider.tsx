"use client"

import type { ReactNode } from 'react'
import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { adminUserAtom } from '@/store/adminUserAtom'
import { applicationsAtom } from '@/store/applicationsAtom'
import { teamsAtom } from '@/store/teamsAtom'
import { usersAtom } from '@/store/usersAtom'
import { participantDetailsAtom } from '@/store/participantDetailsAtom'

type ProviderProps = {
  adminUser?: any,
  applications?: any[],
  participantDetails?: any[],
  teams?: any[],
  users?: any[],
  children: ReactNode,
};

function HydrateAtoms({ adminUser, applications, participantDetails, teams, users, children } : ProviderProps) {
  useHydrateAtoms([
    [adminUserAtom, adminUser],
    [applicationsAtom, applications],
    [participantDetailsAtom, participantDetails],
    [teamsAtom, teams],
    [usersAtom, users],
  ])
  return children;
}

export default function RootProvider({ adminUser, applications, participantDetails, teams, users, children }: ProviderProps) {
  return (
    <Provider>
      <HydrateAtoms 
        adminUser={adminUser}
        applications={applications}
        participantDetails={participantDetails}
        teams={teams}
        users={users}
      >
        {children}
      </HydrateAtoms>
    </Provider>
  );
}