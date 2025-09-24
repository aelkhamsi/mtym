"use client"

import type { ReactNode } from 'react'
import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { userAtom } from '../store/userAtom';
import { User } from '@mdm/types';

type ProviderProps = {
  initialUser: User|null,
  children: ReactNode,
};

function HydrateAtoms({ initialUser, children } : ProviderProps) {
  useHydrateAtoms([[userAtom, initialUser]])
  return children;
}

export default function JotaiProvider({ initialUser, children }: ProviderProps) {
  return (
    <Provider>
      <HydrateAtoms initialUser={initialUser}>
        {children}
      </HydrateAtoms>
    </Provider>
  );
}