import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@mdm/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mdm/ui";
import { Button, Separator } from "@mdm/ui";
import { changeLeader, deleteTeam, removeUser } from "@/app/api/TeamApi";
import { toast } from "@mdm/ui";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";

const QuitButton = ({
  isTeamLeader
}:{
  isTeamLeader: boolean
}) => {
  const userData = useAtomValue(userAtom)
  const [newLeaderId, setNewLeaderId] = useState<number>()

  const onQuitTeam = async () => {
    try {
      if (isTeamLeader) {
        if (newLeaderId) {
          await changeLeader(userData?.team?.id, newLeaderId);
          await removeUser(userData?.team?.id);
        } else {
          await removeUser(userData?.team?.id);
          await deleteTeam(userData?.team?.id);
        }
      } else {
        await removeUser(userData?.team?.id);
      }

      window.location.reload();
    } catch(e) {
      toast({
        title: 'This operation have failed',
        description: 'There have a been a problem. Please try later',
        variant: 'destructive',
      });
    }
  }

  // console.log('userData', userData)

  const onTeamLeaderChange = (value: string) => {
    setNewLeaderId(+value)
  }

  useEffect(() => {
    console.log('newLeaderId', newLeaderId)
  }, [newLeaderId])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
        >
          Quitter l&apos;équipe
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir quitter cette équipe?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Vous devez postuler à nouveau pour une nouvelle équipe afin que votre candidature soit prise en compte. 
          </AlertDialogDescription>
        </AlertDialogHeader>        

        {isTeamLeader && userData?.team?.users.length > 1 &&
          <div>
            <Separator className="bg-black"/>

            <h1 className="my-4 text-sm">Veuillez désigner un nouveau leader de l&apos;équipe avant de confirmer</h1>

            <Select onValueChange={onTeamLeaderChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Choisir un team leader" />
              </SelectTrigger>

              <SelectContent>
                {userData?.team?.users
                .filter((member: any) => member?.id !== userData?.team?.leader?.id)
                .map((member: any, index: number) => 
                  <SelectItem value={member?.id} key={index}>
                    <div>{member?.firstName} {member?.lastName}</div>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        }
        

        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
          <AlertDialogAction
            onClick={onQuitTeam}
            disabled={isTeamLeader && userData?.team?.users.length > 1 && !newLeaderId}
          >
            Quitter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default QuitButton
