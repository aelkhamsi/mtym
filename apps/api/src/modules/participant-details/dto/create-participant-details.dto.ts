import { IsOptional, IsString } from 'class-validator';

export class CreateParticipantDetailsDto {
  @IsString()
  @IsOptional()
  foodAllergy: string;

  @IsString()
  @IsOptional()
  nonFoodAllergy: string;

  @IsString()
  @IsOptional()
  allergyPrecaution: string;
}
