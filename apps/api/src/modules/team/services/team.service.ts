import {
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
import { UserService } from 'src/modules/user/services/user.service';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
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
    const team = await this.teamRepository.create(createTeamDto);
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

  findOneByName(name: string) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.leader', 'leader')
      .leftJoinAndSelect('team.users', 'user')
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .where('team.name = :name', { name })
      .getOne();
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

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update({ id }, updateTeamDto);
  }

  async delete(id: number) {
    const deleteTeamAccessCodes = await this.teamAccessCodeService.deleteByTeam(
      id,
    );
    console.log('deleteTeamAccessCodes', deleteTeamAccessCodes);
    return this.teamRepository.delete({ id });
  }
}
