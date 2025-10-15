"use client"

import type { ReactNode } from 'react'
import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { User } from '@mdm/types'
import { userAtom } from '@/app/store/userAtom'
import { applicationAtom } from '@/app/store/applicationAtom'
import { teamAtom } from '@/app/store/teamAtom'

type ProviderProps = {
  initialUser?: User,
  initialApplication?: any,
  initialTeam?: any,
  children: ReactNode,
};

function HydrateAtoms({ initialUser, initialApplication, initialTeam, children } : ProviderProps) {
  if (initialUser) useHydrateAtoms([[userAtom, initialUser]])
  if (initialApplication) useHydrateAtoms([[applicationAtom, initialApplication]])
  if (initialTeam) useHydrateAtoms([[teamAtom, initialTeam]])
  return children;
}

export default function RootProvider({ initialUser, initialApplication, initialTeam, children }: ProviderProps) {
  return (
    <Provider>
      <HydrateAtoms 
        initialUser={initialUser}
        initialApplication={initialApplication}
        initialTeam={initialTeam}
      >
        {children}
      </HydrateAtoms>
    </Provider>
  );
}