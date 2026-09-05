import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from '../dto/create-team.dto';
import { CreateTeamAdminDto } from '../dto/create-team-admin.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Team, TeamStatus } from '../entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UserService } from 'src/modules/user/services/user.service';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { cleanString } from 'src/utils/string';
import { TeamAccessCodeService } from './team-access-code.service';
import {
  MembershipActor,
  TeamMembershipService,
} from './team-membership.service';
import { Status } from 'src/modules/application/entities/application-status.entity';

const DECLINED_APPLICATION_STATUSES: Status[] = ['NOT_VALID', 'REJECTED'];

@Injectable()
export class TeamService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject(forwardRef(() => TeamAccessCodeService))
    private teamAccessCodeService: TeamAccessCodeService,
    private readonly teamMembershipService: TeamMembershipService,
  ) {}

  async create(createTeamDto: CreateTeamDto, userId: number) {
    const { name, slogan, quadrigram } = createTeamDto;
    await this.assertNameIsAvailable(name);
    await this.assertQuadrigramIsAvailable(quadrigram);

    /* Only the three editable fields are copied over: the dto instance may
     * still carry anything else the client put in the body (id, leader, ...) */
    const team = this.teamRepository.create({ name, slogan, quadrigram });
    const leader = await this.userService.findOneById(userId);
    team.leader = new SerializedUser(leader);

    return this.teamRepository.save(team);
  }

  /**
   * Creates a team on behalf of participants: the admin is not a member, so the
   * members and the leader come from the payload instead of the session. The
   * team is saved in one go (members included) so a half-created team can not
   * be left behind if attaching the members fails.
   */
  async createAsAdmin(
    createTeamAdminDto: CreateTeamAdminDto,
    actor?: MembershipActor,
  ) {
    const { name, slogan, quadrigram, memberIds, leaderId } =
      createTeamAdminDto;

    if (!memberIds.includes(leaderId)) {
      throw new BadRequestException('The leader must be one of the members');
    }

    await this.assertNameIsAvailable(name);
    await this.assertQuadrigramIsAvailable(quadrigram);

    const members = await Promise.all(
      memberIds.map((memberId) => this.userService.findOneById(memberId)),
    );

    const missingIndex = members.findIndex((member) => !member);
    if (missingIndex !== -1) {
      throw new NotFoundException(
        `The user ${memberIds[missingIndex]} does not exist`,
      );
    }

    /* A user belongs to at most one team, so refuse rather than silently move
     * somebody out of the team they are already in. An INCOMPLETE team is not
     * finalized yet, so its members can still be reassigned. */
    const alreadyTaken = members.filter(
      (member) => member.team && member.team.status !== TeamStatus.INCOMPLETE,
    );
    if (alreadyTaken.length) {
      throw new ConflictException(
        `The user(s) ${alreadyTaken
          .map((member) => member.id)
          .join(', ')} already belong to a team`,
      );
    }

    const team = this.teamRepository.create({ name, slogan, quadrigram });
    team.leader = members.find((member) => member.id === leaderId);
    team.users = members;

    const savedTeam = await this.teamRepository.save(team);
    await Promise.all(
      members.map((member) =>
        Promise.all([
          this.teamMembershipService.recordJoin(member, savedTeam, actor),
          this.userService.setFreeAgent(member.id, false),
        ]),
      ),
    );

    return this.findOneById(savedTeam.id);
  }

  findAll() {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.leader', 'leader')
      .leftJoinAndSelect('team.users', 'user')
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .getMany();
  }

  findOneById(id: number) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.leader', 'leader')
      .leftJoinAndSelect('team.users', 'user')
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .where('team.id = :id', { id })
      .getOne();
  }

  /**
   * Compared case-insensitively: 'marp' and 'MARP' are the same quadrigram, so
   * a lookup must not report one as free while the other is taken.
   */
  findOneByQuadrigram(quadrigram: string) {
    return this.teamRepository
      .createQueryBuilder('team')
      .where('UPPER(team.quadrigram) = UPPER(:quadrigram)', {
        quadrigram: quadrigram?.trim() ?? '',
      })
      .getOne();
  }

  private async assertQuadrigramIsAvailable(
    quadrigram: string,
    currentTeamId?: number,
  ) {
    const team = await this.findOneByQuadrigram(quadrigram);
    if (team && team.id !== currentTeamId) {
      throw new ConflictException('Team with this quadrigram already exists');
    }
  }

  private async assertNameIsAvailable(name: string, currentTeamId?: number) {
    const cleanName = cleanString(name);
    const teams = await this.teamRepository.find();
    const teamExists = teams?.some(
      (team) =>
        cleanString(team?.name) == cleanName && team.id !== currentTeamId,
    );
    if (teamExists) {
      throw new ConflictException('Team with this name already exists');
    }
  }

  async addUser(id: number, userId: number, actor?: MembershipActor) {
    const user = await this.userService.findOneById(userId);
    const team = (await this.findOneById(id)) as Team;
    if (!user || !team) {
      throw new NotFoundException('The user or team does not exist');
    }
    if (team.users.length >= 5) {
      throw new NotFoundException('This team can not have more that 5 members');
    }

    team.users = [...team.users, user];
    await this.teamRepository.save(team);
    await Promise.all([
      this.teamMembershipService.recordJoin(user, team, actor),
      this.userService.setFreeAgent(user.id, false),
    ]);
    return;
  }

  async removeUser(id: number, userId: number, actor?: MembershipActor) {
    const team = (await this.findOneById(id)) as Team;
    if (!team) {
      throw new NotFoundException('The team does not exist');
    }
    team.users = team.users.filter((user) => user?.id != userId);
    await this.teamRepository.save(team);
    await this.teamMembershipService.recordLeave(userId, id, actor);
    return;
  }

  /**
   * Free agents are validated applicants pulled out of their team on purpose
   * so they can be picked up into a different one from the create-team
   * picker, which otherwise only offers members of an INCOMPLETE team. If the
   * freed user was the team's leader, leadership is handed to whoever is left
   * rather than leaving the team pointing at someone no longer on it.
   */
  async markFreeAgent(userId: number, actor?: MembershipActor) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('The user does not exist');
    }
    if (user.application?.status?.status !== 'VALIDATED') {
      throw new BadRequestException(
        'Only users with a validated application can become a free agent',
      );
    }

    let leaderChanged = false;
    let newLeaderId: number | null = null;

    if (user.team) {
      const teamId = user.team.id;
      const wasLeader = user.team.leader?.id === userId;
      await this.removeUser(teamId, userId, actor);

      if (wasLeader) {
        newLeaderId = await this.reassignLeader(teamId);
        leaderChanged = true;
      }
    }

    await this.userService.setFreeAgent(userId, true);
    return { leaderChanged, newLeaderId };
  }

  /**
   * Hands leadership to whoever is left on the team — there's no seniority
   * concept to prefer one remaining member over another — or clears it if
   * the team is now empty.
   */
  private async reassignLeader(teamId: number): Promise<number | null> {
    const team = (await this.findOneById(teamId)) as Team;
    const newLeader = team.users[0] ?? null;
    team.leader = newLeader;
    await this.teamRepository.save(team);
    return newLeader?.id ?? null;
  }

  getUserTeamHistory(userId: number) {
    return this.teamMembershipService.getHistoryForUser(userId);
  }

  async changeLeader(teamId: number, newLeaderId: number) {
    const team = (await this.findOneById(teamId)) as Team;
    if (!team) {
      throw new NotFoundException('The team does not exist');
    }

    const user = team.users?.find((member) => member.id === newLeaderId);
    if (!user) {
      throw new BadRequestException(
        'The chosen new leader must be a member of the team',
      );
    }

    team.leader = user;
    await this.teamRepository.save(team);
    return;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException('The team does not exist');
    }

    const { name, slogan, quadrigram, status } = updateTeamDto;
    if (name !== undefined) {
      await this.assertNameIsAvailable(name, id);
    }
    if (quadrigram !== undefined) {
      await this.assertQuadrigramIsAvailable(quadrigram, id);
    }

    const changes: QueryDeepPartialEntity<Team> = {};
    if (name !== undefined) changes.name = name;
    if (slogan !== undefined) changes.slogan = slogan;
    if (quadrigram !== undefined) changes.quadrigram = quadrigram;
    if (status !== undefined) changes.status = status;

    return this.teamRepository.update({ id }, changes);
  }

  async delete(id: number) {
    const deleteTeamAccessCodes = await this.teamAccessCodeService.deleteByTeam(
      id,
    );
    return this.teamRepository.delete({ id });
  }

  /**
   * Recomputes every team's status from its members' application statuses.
   * Members with no application (or no status yet) count as neither
   * validated nor declined, so a team can only land on APPROVED/INCOMPLETE
   * via a validated count and on DECLINED when every member is explicitly
   * NOT_VALID/REJECTED. Anything else (empty team, mixed pending members)
   * is left untouched rather than guessed at.
   */
  async updateAllStatuses() {
    const teams = await this.findAll();
    const updated: {
      id: number;
      name: string;
      from: TeamStatus;
      to: TeamStatus;
    }[] = [];

    for (const team of teams) {
      const nextStatus = this.resolveStatus(team);
      if (nextStatus && nextStatus !== team.status) {
        await this.teamRepository.update(team.id, { status: nextStatus });
        updated.push({
          id: team.id,
          name: team.name,
          from: team.status,
          to: nextStatus,
        });
      }
    }

    return updated;
  }

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
