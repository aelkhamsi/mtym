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
import { CLOSE_APPLICATIONS } from "config";
import { Team, User } from "@mdm/types";

const TeamSection = ({
  user,
  team,
}:{
  user: User|null,
  team: Team,
}) => {
  const isTeamLeader = team?.leader?.id === user?.id 

  return (
    <Card>
      <CardHeader>
        <TeamBanner team={team} user={user} />
      </CardHeader>

      <CardContent className="space-y-4 px-8">            
        <Separator />
        <TeamMembers userId={user?.id} team={team} />

        <Separator />
        <TeamMentor team={team} />
      </CardContent>

      <CardFooter className="flex space-x-4">
        {isTeamLeader && !CLOSE_APPLICATIONS && <InviteButton />}
        <QuitButton isTeamLeader={isTeamLeader} />
      </CardFooter>
    </Card>
  )
}

export default TeamSection
