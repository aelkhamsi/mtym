'use client'

import { useAuth } from '@payloadcms/ui'
import type { ReactNode } from 'react'

import type { User } from '../../../payload-types'

export default function HideFromJury({ children }: { children: ReactNode }) {
  const { user } = useAuth<User>()

  return user?.jury === true ? null : children
}
