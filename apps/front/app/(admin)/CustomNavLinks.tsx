'use client'

import { usePathname } from 'next/navigation'

export const CustomNavLinks = () => {
  const pathname = usePathname()
  const links = [
    { href: '/admin/applications', label: 'Applications' },
    { href: '/admin/teams', label: 'Teams' },
    { href: '/admin/users', label: 'Users' },
  ]

  return (
    <div className="nav-group">
      <div className="nav-group__label">Competition</div>

      <ul className='list-none'>
        {links.map(({ href, label }) => (
          <li>
            <a
              key={href}
              href={href}
              className={`nav-group__link ${pathname === href ? 'nav-group__link--active' : ''}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}