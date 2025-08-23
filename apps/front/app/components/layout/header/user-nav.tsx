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

export function UserNav({
  firstName,
  lastName,
  email
}:{
  firstName: string,
  lastName: string,
  email: string,
}) {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const handleLogOut = useCallback(() => {
    localStorage.removeItem('access_token');
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setUser(undefined)

    router.push('/');
    window.location.reload();
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9 border-solid border-2 border-sky-300">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback className="text-base text-black">{firstName[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{firstName} {lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push('/profile/account')}
          >
            Profil
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogOut}
        >
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}