'use client'

import { NavGroup, Link } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

const NavLink = ({
  label,
  href,
}:{
  label: string,
  href: string,
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
    <NavLink label='Applications' href='/admin/applications'/>
    <NavLink label='Teams' href='/admin/teams' />
  </NavGroup>
)

export default CustomNavLinks;