import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "@/store/adminState";
import { applicationsState } from "@/store/applicationsState";
import { usersState } from "@/store/usersState";

export function AdminNav() {
  const router = useRouter();
  const admin = useRecoilValue(adminState);
  const setAdmin = useSetRecoilState(adminState);
  const setUsers = useSetRecoilState(usersState);
  const setApplications = useSetRecoilState(applicationsState);

  const handleLogOut = useCallback(() => {
    localStorage.removeItem('access_token');
    setAdmin(undefined);
    setUsers(undefined);
    setApplications(undefined);

    router.push('/login');
    window.location.reload();
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-solid border-2 border-sky-300">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback className="text-base">{admin?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{admin?.username}</p>
          </div>
        </DropdownMenuLabel>
        
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