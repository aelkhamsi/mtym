'use client'

import { NavGroup, Link } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Applications', href: '/admin/applications' },
  { label: 'Teams', href: '/admin/teams' },
  { label: 'Users', href: '/admin/users' }
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

export const CustomNavLinks = () => (
  <NavGroup label={"Views"}>
    {links.map((link, index) => <NavLink label={link.label} href={link.href} key={`link_${index}`}/>)}
  </NavGroup>
)

export default CustomNavLinks;