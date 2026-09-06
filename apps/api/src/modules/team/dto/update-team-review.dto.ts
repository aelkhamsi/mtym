import { PartialType } from '@nestjs/mapped-types'; // or '@nestjs/swagger'
import { CreateTeamReviewDto } from './create-team-review.dto';

export class UpdateTeamReviewDto extends PartialType(CreateTeamReviewDto) {}