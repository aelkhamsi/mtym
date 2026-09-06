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
  intermediateReportScore1?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  intermediateReportScore2?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  intermediateReportScore3?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  intermediateReportScore4?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  aiSuspicionScore?: number;

  @IsOptional()
  @IsEnum(DecisionEnum)
  intermediateReportDecision?: DecisionEnum;

  @IsOptional()
  @IsString()
  comment?: string;
}