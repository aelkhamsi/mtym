import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DecisionEnum } from '../entities/team-review.entity';

export class CreateTeamReviewDto {
  @IsOptional()
  @IsString()
  reviewerId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  intermediateReportScore?: number;

  @IsOptional()
  @IsEnum(DecisionEnum)
  intermediateReportDecision?: DecisionEnum;

  @IsOptional()
  @IsString()
  comment?: string;
}