import { Command, CommandRunner } from 'nest-commander';
import { TeamService } from '../services/team.service';

@Command({
  name: 'update-team-statuses',
  arguments: '',
  options: {},
})
export class UpdateTeamStatusesCommand extends CommandRunner {
  constructor(private readonly teamService: TeamService) {
    super();
  }

  async run(): Promise<void> {
    const updated = await this.teamService.updateAllStatuses();
    for (const team of updated) {
      console.log(`Team ${team.id} (${team.name}): ${team.from} -> ${team.to}`);
    }
  }
}
