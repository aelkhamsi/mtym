'use client'

import { useAuth } from '@payloadcms/ui'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import type { User } from '../../../payload-types'

const allowedPages = [
  '/admin/teams',
  '/admin/login',
  '/admin/logout',
  '/admin/forgot',
  '/admin/reset',
  '/admin/verify',
  '/admin/unauthorized',
  '/admin/account',
]

export default function JuryPageAccess({ children }: { children?: ReactNode }) {
  const { user } = useAuth<User>()
  const pathname = usePathname()
  const router = useRouter()
  const isHidden = user?.jury === true && !allowedPages.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`),
  )

  useEffect(() => {
    if (isHidden) router.replace('/admin/teams')
  }, [isHidden, router])

  return isHidden ? null : children
}
