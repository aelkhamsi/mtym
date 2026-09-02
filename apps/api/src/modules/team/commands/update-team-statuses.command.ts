import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team, TeamStatus } from '../entities/team.entity';
import { TeamService } from '../services/team.service';
import { Status } from 'src/modules/application/entities/application-status.entity';

const DECLINED_APPLICATION_STATUSES: Status[] = ['NOT_VALID', 'REJECTED'];

@Command({
  name: 'update-team-statuses',
  arguments: '',
  options: {},
})
export class UpdateTeamStatusesCommand extends CommandRunner {
  constructor(
    private readonly teamService: TeamService,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const teams = await this.teamService.findAll();

    for (const team of teams) {
      const nextStatus = this.resolveStatus(team);
      if (nextStatus && nextStatus !== team.status) {
        await this.teamRepository.update(team.id, { status: nextStatus });
        console.log(
          `Team ${team.id} (${team.name}): ${team.status} -> ${nextStatus}`,
        );
      }
    }
  }

  /**
   * Members with no application (or no status yet) count as neither
   * validated nor declined, so a team can only land on APPROVED/INCOMPLETE
   * via a validated count and on DECLINED when every member is explicitly
   * NOT_VALID/REJECTED. Anything else (empty team, mixed pending members)
   * is left untouched rather than guessed at.
   */
  private resolveStatus(team: Team): TeamStatus | null {
    const members = team.users ?? [];
    if (!members.length) {
      return null;
    }

    const validatedCount = members.filter(
      (user) => user.application?.status?.status === 'VALIDATED',
    ).length;

    if (validatedCount >= 3) {
      return TeamStatus.APPROVED;
    }

    if (validatedCount > 0) {
      return TeamStatus.INCOMPLETE;
    }

    const allDeclined = members.every((user) =>
      DECLINED_APPLICATION_STATUSES.includes(user.application?.status?.status),
    );

    return allDeclined ? TeamStatus.DECLINED : null;
  }
}
