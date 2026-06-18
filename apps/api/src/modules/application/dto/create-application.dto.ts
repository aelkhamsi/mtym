import { IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  /* Personal informations */
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  identityCardNumber: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  region: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  allergyOrMedication: string;

  @IsString()
  @IsOptional()
  guardianFullName: string;

  @IsString()
  @IsOptional()
  guardianPhoneNumber: string;

  @IsString()
  @IsOptional()
  relationshipWithGuardian: string;

  /* Education */
  @IsString()
  @IsOptional()
  educationLevel: string;

  @IsString()
  @IsOptional()
  educationField: string;

  @IsString()
  @IsOptional()
  highschool: string;

  @IsString()
  @IsOptional()
  highschoolCity: string;

  @IsString()
  @IsOptional()
  highschoolRegion: string;

  @IsString()
  @IsOptional()
  isHighschoolFarFromHome

  @IsString()
  @IsOptional()
  averageGrade: string;

  @IsString()
  @IsOptional()
  mathAverageGrade: string;

  @IsString()
  @IsOptional()
  ranking: string;

  @IsString()
  @IsOptional()
  mathRanking: string;

  @IsString()
  @IsOptional()
  numberOfStudentsInClass: string;

  /* Motivations */
  @IsString()
  @IsOptional()
  hasPreviousExperiences: string;
  
  @IsString()
  @IsOptional()
  previousExperiences: string;
  
  @IsString()
  @IsOptional()
  hasPreviousMTYMParticipations: string;
  
  @IsString()
  @IsOptional()
  previousMTYMParticipations: string;

  @IsString()
  @IsOptional()
  motivations: string;

  @IsString()
  @IsOptional()
  comments: string;

  /* Files */
  @IsString()
  @IsOptional()
  fileCnieUrl: string;

  @IsString()
  @IsOptional()
  fileMembersCnieUrl: string;

  @IsString()
  @IsOptional()
  filePhotoUrl: string;

  @IsString()
  @IsOptional()
  fileGradesUrl: string;

  @IsString()
  @IsOptional()
  fileSchoolCertificateUrl: string;
}
