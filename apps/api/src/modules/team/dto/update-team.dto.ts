import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateTeamDto } from './create-team.dto';
import { QualifCenter, TeamStatus } from '../entities/team.entity';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsEnum(TeamStatus)
  @IsOptional()
  status?: TeamStatus;

  @IsEnum(QualifCenter)
  @IsOptional()
  qualifCenter?: QualifCenter;
}
