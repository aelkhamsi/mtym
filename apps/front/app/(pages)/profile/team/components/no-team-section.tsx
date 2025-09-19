import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mdm/ui";
import { useRouter } from "next/navigation";

const NoTeamSection = ({
  user,
}:{
  user: any
}) => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vous ne faites pas partie d&apos;une équipe!</CardTitle>
        <CardDescription>Votre candidature n&apos;est pas valide tant que vous n&apos;avez pas rejoint une équipe.</CardDescription>
      </CardHeader>

      <CardFooter>
        {(!user?.application || user?.application?.status?.status === 'DRAFT')
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
    </Card>
  )
}

export default NoTeamSection
