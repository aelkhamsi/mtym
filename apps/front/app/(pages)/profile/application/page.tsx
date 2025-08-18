
"use client"

import { Separator } from "@mdm/ui"
import { formatDate } from "@mdm/utils";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mdm/ui";
import { Badge } from "@mdm/ui";
import { Button } from "@mdm/ui";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/userAtom";
import { ProfileSkeleton } from "@mdm/ui";

const getBadgeClassname = (status: string) => {
  switch(status) {
    case 'DRAFT':
      return 'bg-gray-300 text-black';
    case 'PENDING':
      return 'bg-[#FFE380] text-black';
    case 'NOTIFIED':
      return 'bg-[#79E2F2] text-black';
    case 'UPDATED':
      return 'bg-[#B3D4FF] text-black';
    case 'VALIDATED':
      return 'bg-[#79F2C0] text-black';
    case 'ACCEPTED':
      return 'bg-[#006644] text-white';
    case 'REJECTED':
      return 'bg-[#BF2600] text-white';
    case 'WAITLIST':
      return 'bg-[#403294] text-white';
  }
}

export default function ApplicationPage() {
  const user = useAtomValue(userAtom)
  const [content, setContent] = useState<any>(undefined);
  const router = useRouter();
  
  useEffect(() => {
    const application = user?.application;
    const applicationStatus = application?.status?.status;

    if (!application) {
      setContent({
        title: "Vous n'avez pas soumis une candidature",
        subtitle: "Merci pour l'intérêt que vous portez à MMC! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités.",
        ctaLabel: "Créer votre candidature",
      })
    } else if (applicationStatus === 'DRAFT') {
      setContent({
        title: "Vous avez sauvegardé un brouillon de candidature. Elle n'est pas encore soumise.",
        subtitle: "Merci pour l'intérêt que vous portez à MMC! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités.",
        ctaLabel: "Continuer votre candidature",
      })
    } else {
      setContent({
        title: "Vous avez déjà soumis une candidature",
        subtitle: "Vous trouverez l'avancement de votre candidature ci-dessous. On vous notifiera des prochaines étapes par mail.",
        ctaLabel: "Mettre à jour votre candidature",
      })
    }
  }, [user])

  const applicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>
          {content?.title}
        </CardTitle>
        <CardDescription>
          {content?.subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {user?.application && 
          <>
            <div className="text-sm"><span className="font-bold">Date de soumission</span>: {formatDate(user?.application?.createdAt)}</div>
            <div className="text-sm"><span className="font-bold">Date de sauvegarde</span>: {formatDate(user?.application?.updatedAt)}</div>
            <div className="text-sm"><span className="font-bold">Status</span>: <Badge className={`px-4 ${getBadgeClassname(user?.application?.status?.status)}`}>{user?.application?.status?.status}</Badge></div>
          </>
        }
      </CardContent>

      {user?.application && user?.application?.status?.status !== 'DRAFT' &&
        <CardFooter>
          <Button
            onClick={() => router.push('/application')}
          >
            {content?.ctaLabel}
          </Button>
        </CardFooter> 
      }
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Candidature</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous trouverez le statut de votre candidature.
        </p>
      </div>

      <Separator />

      {!user
        ? <ProfileSkeleton />
        : applicationCard
      }
    </div>
  )
}
