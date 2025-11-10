"use client"

import type { ReactNode } from 'react'
import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { User } from '@mdm/types'
import { userAtom } from '@/app/store/userAtom'

type ProviderProps = {
  initialUser?: User,
  children: ReactNode,
};

function HydrateAtoms({ initialUser, children } : ProviderProps) {
  if (initialUser) useHydrateAtoms([[userAtom, initialUser]])
  return children;
}

export default function RootProvider({ initialUser, children }: ProviderProps) {
  return (
    <Provider>
      <HydrateAtoms 
        initialUser={initialUser}
      >
        {children}
      </HydrateAtoms>
    </Provider>
  );
}