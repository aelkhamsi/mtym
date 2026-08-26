import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Team } from '../entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UserService } from 'src/modules/user/services/user.service';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { cleanString } from 'src/utils/string';
import { TeamAccessCodeService } from './team-access-code.service';

@Injectable()
export class TeamService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject(forwardRef(() => TeamAccessCodeService))
    private teamAccessCodeService: TeamAccessCodeService,
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
      (team) => cleanString(team?.name) == cleanName && team.id !== currentTeamId,
    );
    if (teamExists) {
      throw new ConflictException('Team with this name already exists');
    }
  }

  async addUser(id: number, userId: number) {
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
    return;
  }

  async removeUser(id: number, userId: number) {
    const team = (await this.findOneById(id)) as Team;
    if (!team) {
      throw new NotFoundException('The team does not exist');
    }
    team.users = team.users.filter((user) => user?.id != userId);
    await this.teamRepository.save(team);
    return;
  }

  async changeLeader(teamId: number, newLeaderId: number) {
    const team = (await this.findOneById(teamId)) as Team;
    if (!team) {
      throw new NotFoundException('The team does not exist');
    }

    const user = await this.userService.findOneById(newLeaderId);
    if (!user) {
      throw new NotFoundException('The chosen new leader does not exist');
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
}
