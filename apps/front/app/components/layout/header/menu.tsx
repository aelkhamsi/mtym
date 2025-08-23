"use client"

import { forwardRef, useEffect, useState } from "react"
import Link from 'next/link'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@mdm/ui"
import { cn } from '@mdm/utils'
import { useMediaQuery } from "@mdm/hooks"

export const Menu = () => {
  const { isMobile, isTablet} = useMediaQuery();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(isMobile || isTablet ? false : true)
  }, [isMobile, isTablet])

  const template = (
    <NavigationMenu>
      <NavigationMenuList className={(isMobile || isTablet) ? 'flex flex-col space-y-4' : ''}>
        <NavigationMenuItem>
          <Link 
            className="text-sm font-medium mr-6 hover:cursor-pointer hover:underline"
            href="/past-edition"
            onClick={() => {setShowMenu(false)}}
          >
            Edition passée
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            className="text-sm font-medium mr-6 hover:cursor-pointer hover:underline"
            href="/selection"
            onClick={() => {setShowMenu(false)}}
          >
            Test de sélection
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm mr-6">Organizateurs & Partenaires</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2 p-2 md:w-[300px] md:grid-cols-2 lg:w-[400px]">
              <Link href="/organizing-team" onClick={() => {setShowMenu(false)}}>
                <ListItem title="Équipe organisatrice" />
              </Link>

              <Link href="/partners" onClick={() => {setShowMenu(false)}}>
                <ListItem title="Partenaires" />
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            className="text-sm font-medium mr-6 hover:cursor-pointer hover:underline" 
            href="/faq"
            onClick={() => {setShowMenu(false)}}
          >
            FAQ
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )

  return (
    <>
      {(isMobile || isTablet) && <HamburgerMenuIcon className="h-6 w-6 mr-4 mt-[.1rem] hover:cursor-pointer" onClick={() => {setShowMenu(!showMenu)}}/>}

      <div 
        className={(isMobile || isTablet) 
          ? `absolute min-h-screen w-full top-14 left-0 bg-white text-black p-4 ${!showMenu ? 'hidden' : ''} transition-all text-center`
          : ''
        }
      >
        {(isMobile || isTablet) && (
          <div className="flex justify-between hover:cursor-pointer">
            <div>{" "}</div>
            <Cross1Icon className="h-6 w-6 mr-4" onClick={() => {setShowMenu(false)}}/>
          </div>
        )}
        
        <div className="flex justify-center">
          {template}
        </div>
      </div>
    </>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Menu
