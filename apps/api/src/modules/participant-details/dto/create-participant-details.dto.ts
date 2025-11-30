import { IsOptional, IsString } from 'class-validator';

export class CreateParticipantDetailsDto {
  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  guardianFullName: string;

  @IsString()
  @IsOptional()
  guardianPhoneNumber: string;
  
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
  hasBeenHospitalized: string;

  @IsString()
  @IsOptional()
  hospitalizationReasons: string;

  @IsString()
  @IsOptional()
  haveRoommatePreference: string;

  @IsString()
  @IsOptional()
  firstRoommateId: string;

  @IsString()
  @IsOptional()
  secondRoommateId: string;

  @IsString()
  @IsOptional()
  needDepartureShuttle: string;

  @IsString()
  @IsOptional()
  departureCity: string;

  @IsString()
  @IsOptional()
  needArrivalShuttle: string;

  @IsString()
  @IsOptional()
  arrivalCity: string;

  @IsString()
  @IsOptional()
  cityOfResidence: string;

  // Talent show
  @IsString()
  @IsOptional()
  haveTalent: string;

  @IsString()
  @IsOptional()
  talentDescription: string;

  @IsString()
  @IsOptional()
  workshops: string;
}
