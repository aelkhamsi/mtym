import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from "@mdm/ui";
import TeamBanner from "./team-banner";
import TeamMembers from "./team-members";
import TeamMentor from "./team-mentor";
import QuitButton from "./quit-button";
import { InviteButton } from "./invite-button";

const TeamSection = ({
  user,
}:{
  user: any,
}) => {
  const isTeamLeader = user?.team?.leader?.id === user?.id 

  return (
    <Card>
      <CardHeader>
        <TeamBanner team={user?.team} />
      </CardHeader>

      <CardContent className="space-y-4 px-8">            
        <Separator />
        <TeamMembers userId={user?.id} team={user?.team} />

        <Separator />
        <TeamMentor team={user?.team} />
      </CardContent>

      <CardFooter className="flex space-x-4">
        {isTeamLeader && <InviteButton />}
        <QuitButton isTeamLeader={isTeamLeader} />
      </CardFooter>
    </Card>
  )
}

export default TeamSection
