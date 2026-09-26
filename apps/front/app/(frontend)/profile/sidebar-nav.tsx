"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@mdm/utils"
import { buttonVariants } from "@mdm/ui"
import { userAtom } from "@/app/store/userAtom"
import { useAtomValue } from "jotai"
import { teamAtom } from "@/app/store/teamAtom"

const getSidebarNavItems = (teamStatus?: string) => ([
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
  ...(teamStatus === 'APPROVED' 
    ? [{title: "Tournoi régional", href: "/profile/regional-tournament"}]
    : []
  ),
])

export function SidebarNav({className, ...props}:{className?: string}) {
  const pathname = usePathname()
  const team = useAtomValue(teamAtom)

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {getSidebarNavItems(team?.status)
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
            {item.href === '/profile/application'}
          </Link>
        ))
      }
    </nav>
  )
}
