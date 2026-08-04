import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CityCheck, ReviewCheck } from '../entities/application-review.entity';

export class UpdateApplicationReviewDto {
  @IsOptional()
  @IsString()
  reviewerId: string | null;

  @IsOptional()
  @IsEnum(ReviewCheck)
  identityCheck: ReviewCheck | null;

  @IsOptional()
  @IsEnum(ReviewCheck)
  levelCheck: ReviewCheck | null;

  @IsOptional()
  @IsEnum(CityCheck)
  cityCheck: CityCheck | null;

  @IsOptional()
  @IsString()
  updatedCity: string | null;

  @IsOptional()
  @IsEnum(ReviewCheck)
  pictureCheck: ReviewCheck | null;

  @IsOptional()
  @IsString()
  comment: string | null;
}
