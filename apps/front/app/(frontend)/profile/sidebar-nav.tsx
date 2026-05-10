"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@mdm/utils"
import { buttonVariants } from "@mdm/ui"
import { userAtom } from "@/app/store/userAtom"
import { useAtomValue } from "jotai"

const getSidebarNavItems = (qualified: boolean|undefined) => ([
  {
    title: "Compte",
    href: "/profile/account",
  },
  {
    title: "Candidature",
    href: "/profile/application",
  },
  {
    title: "Équipe",
    href: "/profile/team",
  },
  ...(qualified 
    ? [{title: "Participation", href: "/profile/participant-details"}]
    : []
  )
])

export function SidebarNav({className, ...props}:{className?: string}) {
  const pathname = usePathname()
  const user = useAtomValue(userAtom)
  const hasValidApplication = user?.application && user?.application?.status?.status === 'PENDING'

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {getSidebarNavItems(user?.qualified)
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-between"
            )}
          >
            {item.title}
            {item.href === '/profile/application' && (hasValidApplication ? <span>✅</span> : <span>⚠️</span>)}
            {item.href === '/profile/participant-details' && (user?.participantDetails?.status === 'COMPLETE' ? <span>✅</span> : <span>⚠️</span>)}
          </Link>
        ))
      }
    </nav>
  )
}
