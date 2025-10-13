import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mdm/ui";
import { useRouter } from "next/navigation";
import { CLOSE_APPLICATIONS } from "config";
import { User } from "@mdm/types";

const NoTeamSection = ({
  user,
  application,
}:{
  user: User|null,
  application: any,
}) => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vous ne faites pas partie d&apos;une équipe!</CardTitle>
        <CardDescription>
          {CLOSE_APPLICATIONS
            ? "Merci pour l'intérêt que vous portez à MMC! Malheureusement les inscriptions sont désormais closes. Néanmoins, restez à l'écoute pour ne pas manquer de futures opportunités."
            : "Votre candidature n'est pas valide tant que vous n'avez pas rejoint une équipe."
          }
          </CardDescription>
      </CardHeader>

      {!CLOSE_APPLICATIONS && 
        <CardFooter>
          {(!application || application?.status?.status === 'DRAFT')
            ? <>
              <p className="text-sm">Avant que vous puissiez rejoindre une équipe, il faut que vous soumettiez votre candidature</p>
              <Button onClick={() => router.push('/application')}>
                Créer votre candidature
              </Button>
            </>
            : <Button onClick={() => router.push('/team')}>
              Rejoindre une équipe
            </Button>
          }
        </CardFooter>
      }
    </Card>
  )
}

export default NoTeamSection
