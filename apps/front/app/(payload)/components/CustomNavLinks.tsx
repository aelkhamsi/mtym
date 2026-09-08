'use client'

import { NavGroup, Link, useAuth } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import type { User } from '../../../payload-types'

const links = [
  { label: 'Applications', href: '/admin/applications', hideFromJury: true },
  { label: 'Teams', href: '/admin/teams' },
  { label: 'Users', href: '/admin/users', hideFromJury: true }
]

const NavLink = ({
  label,
  href,
  // k,
}:{
  label: string,
  href: string,
  // k: string,
}) => {
  const pathname = usePathname()
  const active = pathname.includes(href)
  
  return (
    <Link 
      href={href}
      className="nav__link"
      id="nav-analytics"
    >
      {active && <div className='nav__link-indicator' />}
      <span className='nav__link-label'>{label}</span>
    </Link>
  )
}

export const CustomNavLinks = () => {
  const { user } = useAuth<User>()

  return (
    <NavGroup label={"Views"}>
      {links.filter((link) => user?.jury !== true || !link.hideFromJury).map((link, index) => <NavLink label={link.label} href={link.href} key={`link_${index}`}/>)}
    </NavGroup>
  )
}

export default CustomNavLinks;