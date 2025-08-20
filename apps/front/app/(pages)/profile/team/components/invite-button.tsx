import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  toast,
} from "@mdm/ui"
import { Button } from "@mdm/ui";
import { useState } from "react";
import { generateAccessCode } from "@/app/api/TeamAccessCodeApi";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";

export const InviteButton = () => {
  const userData = useAtomValue(userAtom)
  const [accessCode, setAccessCode] = useState<string>('');

  const onGenerateAccessCode = async () => {
    const teamId = userData?.team?.id;

    try {
      const result = await generateAccessCode(teamId) as any;
      if (result?.statusCode !== 200) {
        toast({
          title: 'This operation have failed',
          description: result?.message,
          variant: 'destructive',
        });  
      }

      const accessCode = result?.accessCode;
      setAccessCode(accessCode);
    } catch(e: any) {
      toast({
        title: 'This operation have failed',
        description: e.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='default'
        >
          Inviter des personnes
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Générer un code d&apos;accès</AlertDialogTitle>
          <AlertDialogDescription className="space-y-6">
            <p>Pour qu&apos;une personne puisse rejoindre l&apos;équipe, elle aura besoin d&apos;un code d&apos;accès utilisable dans le formulaire de candidature d&apos;équipe.</p>
            <p>Ce code est à usage unique. Vous devriez générer un nouveau code pour chaque membre de l&apos;équipe.</p>

            <div className="mt-6 flex space-x-4">
              <Button
                onClick={onGenerateAccessCode}
              >
                Générer un nouveau code d&apos;accès
              </Button>

              {accessCode && 
                <div className="bg-gray-100 rounded-md font-bold text-lg py-2 px-4">
                  {accessCode}
                </div>
              }
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setAccessCode('')}
          >
            Fermer
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
