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

  @IsString()
  @IsOptional()
  illnessOrDisability: string;

  @IsString()
  @IsOptional()
  isOnMedication: string;

  @IsString()
  @IsOptional()
  medication: string;

  @IsString()
  @IsOptional()
  needAssistance: string;

  @IsString()
  @IsOptional()
  specialAccommodations: string;

  @IsString()
  @IsOptional()
  haveRoommatePreference: string;

  @IsString()
  @IsOptional()
  firstRoommateId: string;

  @IsString()
  @IsOptional()
  secondRoommateId: string;
}
