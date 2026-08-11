
"use client"

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
import { teamAtom } from "@/app/store/teamAtom";
import { applicationAtom } from "@/app/store/applicationAtom";
import { useAtomValue } from "jotai";
import { CLOSE_APPLICATIONS } from "config";

const getBadgeClassname = (status: string) => {
  switch(status) {
    case 'DRAFT':
      return 'bg-gray-300 text-black';
    case 'PENDING':
      return 'bg-[#FFE380] text-black';
    case 'INFO_NEEDED':
      return 'bg-[#EFFF99] text-black';
    case 'NOTIFIED':
      return 'bg-[#79E2F2] text-black';
    case 'UPDATED':
      return 'bg-[#DBABFF] text-black';
    case 'VALIDATED':
      return 'bg-[#41D997] text-black';
    case 'REJECTED':
      return 'bg-[#BF2600] text-white';
    case 'NOT_VALID':
      return 'bg-[#DE7190] text-black';
    case 'NOT_SURE':
      return 'bg-[#EAED9A] text-black';
  }
}

const ApplicationSection = () => {
  const application = useAtomValue(applicationAtom)
  const team = useAtomValue(teamAtom)
  const [content, setContent] = useState<any>(undefined);
  const router = useRouter();
  const isFormClosed = CLOSE_APPLICATIONS && application?.status?.status !== 'NOTIFIED'
  const VISIBLE_STATUSES = ['DRAFT', 'PENDING', 'NOTIFIED'];
  const displayedStatus = VISIBLE_STATUSES.includes(application?.status?.status) 
    ? application?.status?.status
    : 'PENDING';
  
  useEffect(() => {
    const applicationStatus = application?.status?.status;
    const teamMembers = team?.users?.length ?? 0

    if (!application) {
      setContent({
        title: "Vous n'avez pas soumis une candidature",
        subtitle: isFormClosed
          ? "Merci pour l'intérêt que vous portez à MTYM! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
          : "On attend ta candidature avec impatience.",
        ctaLabel: "Créer votre candidature",
      })
    } else if (applicationStatus === 'DRAFT') {
      setContent({
        title: "Vous avez sauvegardé un brouillon de candidature. Elle n'est pas encore soumise!",
        subtitle: isFormClosed
          ? "Merci pour l'intérêt que vous portez à MTYM! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
          : "Terminez votre candidature pour qu’elle soit valide",
        ctaLabel: "Continuer votre candidature",
      })
    } else {
      setContent({
        title: "Vous avez soumis une candidature",
        subtitle: isFormClosed && (!team || teamMembers <= 3 || teamMembers >= 5)
          ? "Merci pour l'intérêt que vous portez à MTYM! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
          : "Vous trouverez l'avancement de votre candidature ci-dessous. On vous notifiera des prochaines étapes par mail.",
        ctaLabel: "Mettre à jour votre candidature",
      })
    }
  }, [application, team])

  return (
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
        {application && 
          <>
            <div className="text-sm"><span className="font-bold">Date de soumission</span>: {formatDate(application?.createdAt)}</div>
            <div className="text-sm"><span className="font-bold">Date de sauvegarde</span>: {formatDate(application?.updatedAt)}</div>
            <div className="text-sm"><span className="font-bold">Status</span>: <Badge className={`px-4 ${getBadgeClassname(displayedStatus)}`}>{displayedStatus.split('_').join(' ')}</Badge></div>
          </>
        }
      </CardContent>
      
      {(!isFormClosed) &&
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
}

export default ApplicationSection
