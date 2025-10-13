
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
import { CLOSE_APPLICATIONS } from "config";
import { Team } from "@mdm/types";

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

const ApplicationSection = ({
  application,
  team,
}:{
  application?: any,
  team?: Team,
}) => {
  const [content, setContent] = useState<any>(undefined);
  const router = useRouter();
  
  useEffect(() => {
    const applicationStatus = application?.status?.status;
    const teamMembers = team?.users?.length ?? 0

    if (!application) {
      setContent({
        title: "Vous n'avez pas soumis une candidature",
        subtitle: CLOSE_APPLICATIONS
          ? "Merci pour l'intérêt que vous portez à MTYM! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
          : "On attend ta candidature avec impatience.",
        ctaLabel: "Créer votre candidature",
      })
    } else if (applicationStatus === 'DRAFT') {
      setContent({
        title: "Vous avez sauvegardé un brouillon de candidature. Elle n'est pas encore soumise!",
        subtitle: CLOSE_APPLICATIONS
          ? "Merci pour l'intérêt que vous portez à MTYM! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
          : "Terminez votre candidature pour qu’elle soit valide",
        ctaLabel: "Continuer votre candidature",
      })
    } else {
      setContent({
        title: "Vous avez soumis une candidature",
        subtitle: CLOSE_APPLICATIONS && (!team || teamMembers <= 3 || teamMembers >= 5)
          ? "Merci pour l'intérêt que vous portez à MMC! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
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
            <div className="text-sm"><span className="font-bold">Status</span>: <Badge className={`px-4 ${getBadgeClassname(application?.status?.status)}`}>{application?.status?.status}</Badge></div>
          </>
        }
      </CardContent>
      
      {(!CLOSE_APPLICATIONS) &&
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
