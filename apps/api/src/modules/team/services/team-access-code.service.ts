import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamAccessCode } from '../entities/team-access-code.entity';
import { v4 as uuidv4 } from 'uuid';
import { TeamService } from './team.service';

@Injectable()
export class TeamAccessCodeService {
  constructor(
    @InjectRepository(TeamAccessCode)
    private readonly teamAccessCodeRepository: Repository<TeamAccessCode>,
    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService,
  ) {}

  async create(teamId: number) {
    // generate access code
    const uuid = await uuidv4().slice(-6);
    const accessCode = await this.teamAccessCodeRepository.create({
      accessCode: uuid,
    });

    // link access code to team
    const team = await this.teamService.findOneById(teamId);
    if (!team) {
      throw new ForbiddenException("The team doesn't exist");
    }
    accessCode.team = team;

    this.teamAccessCodeRepository.save(accessCode);
    return accessCode;
  }

  async check(accessCode: string, teamId: number) {
    const team = await this.teamService.findOneById(teamId);
    if (!team) {
      throw new ForbiddenException("The team doesn't exist");
    }

    return this.teamAccessCodeRepository
      .createQueryBuilder('teamAccessCode')
      .andWhere('teamAccessCode.accessCode = :accessCode', { accessCode })
      .andWhere('teamAccessCode.teamId = :teamId', { teamId })
      .getOne();
  }

  async deleteById(id: number) {
    return this.teamAccessCodeRepository.delete({ id });
  }

  async deleteByTeam(teamId: number) {
    const team = await this.teamService.findOneById(teamId);
    if (!team) {
      throw new ForbiddenException("The team doesn't exist");
    }

    return this.teamAccessCodeRepository
      .createQueryBuilder('teamAccessCode')
      .leftJoin('teamAccessCode.team', 'team')
      .delete()
      .andWhere('team.id = :teamId', { teamId })
      .execute();
  }

  async deleteOldAccessCodes() {
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);

    return this.teamAccessCodeRepository.delete({
      createdAt: LessThan(dayAgo),
    });
  }
}
