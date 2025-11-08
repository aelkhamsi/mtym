"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@mdm/ui";
import { Button } from "@mdm/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mdm/ui";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from 'jotai';
import { userAtom } from '@/app/store/userAtom';
import { logout } from "@/app/api/AuthApi";
import { User } from "@mdm/types";

export function UserNav({
  user,
}:{
  user: User,
}) {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const handleLogOut = useCallback(async () => {
    const result = await logout();
    setUser(null)
    router.push('/');
    window.location.reload();
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9 border-solid border-2 border-sky-300">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback className="text-base text-black">{user?.firstName?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push('/profile/application')}
            className="hover:cursor-pointer"
          >
            Candidature
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push('/profile/team')}
            className="hover:cursor-pointer"
          >
            Équipe
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {user?.qualified && 
            <DropdownMenuItem
              onClick={() => router.push('/profile/participant-details')}
              className="hover:cursor-pointer"
            >
              Participation
            </DropdownMenuItem>
          }
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogOut}
          className="bg-gray-100 hover:cursor-pointer"
        >
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}