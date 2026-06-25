import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from "@mdm/ui";
import TeamBanner from "./team-banner";
import TeamMembers from "./team-members";
import QuitButton from "./quit-button";
import { InviteButton } from "./invite-button";
import { CLOSE_APPLICATIONS } from "config";
import { userAtom } from "@/app/store/userAtom";
import { useAtomValue } from "jotai";
import { teamAtom } from "@/app/store/teamAtom";

const TeamSection = () => {
  const user = useAtomValue(userAtom)
  const team = useAtomValue(teamAtom)
  const isTeamLeader = team?.leader?.id === user?.id 

  return (
    <Card>
      <CardHeader>
        <TeamBanner team={team} user={user} />
      </CardHeader>

      <CardContent className="space-y-4 px-8">            
        <Separator />
        <TeamMembers />
      </CardContent>

      <CardFooter className="flex space-x-4">
        {isTeamLeader && !CLOSE_APPLICATIONS && <InviteButton />}
        <QuitButton isTeamLeader={isTeamLeader} />
      </CardFooter>
    </Card>
  )
}

export default TeamSection
