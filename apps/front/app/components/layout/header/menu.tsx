"use client"

import { useState } from "react"
import Link from 'next/link'
import { Cross1Icon, HamburgerMenuIcon } from "@mdm/ui"

const menuItems = [
  {label: 'Format du tournoi', href: 'tournament-format'},
  {label: 'Editions passées', href: 'past-edition'},
  {label: 'Organisateurs', href: 'organizing-team'},
  {label: 'Partenaires', href: 'partners'},
  {label: 'FAQ', href: 'faq'},
]

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const getListItem = (label: string, href: string, index: number) => (
    <li 
      className="hover:underline hover:cursor-pointer"
      key={index}
    >
      <Link href={href} onClick={() => {setShowMenu(false)}}>
        {label}
      </Link>
    </li>
  )

  const template = (
    <nav>
      <ul className="flex flex-col space-y-6 mt-4 text-base lg:flex-row lg:text-sm lg:space-y-0 lg:space-x-6 lg:mt-0 lg:mr-6 lg:items-center">
        {menuItems.map((menuItem, index) => 
          getListItem(menuItem.label, menuItem.href, index)
        )}
      </ul>
    </nav>
  )

  return (
    <>
      <HamburgerMenuIcon className="h-6 w-6 mr-4 mt-[.1rem] hover:cursor-pointer lg:hidden" onClick={() => {setShowMenu(!showMenu)}}/>

      <div className={`absolute min-h-screen w-full top-14 left-0 bg-white text-black p-4 text-center ${!showMenu ? 'hidden' : ''} lg:hidden`}>
        <Cross1Icon className="h-6 w-6 mr-4 hover:cursor-pointer" onClick={() => {setShowMenu(false)}}/>
        {template}
      </div>
      
      <div className="hidden lg:block lg:flex lg:justify-center">
        {template}
      </div>
    </>
  )
}

export default Menu
