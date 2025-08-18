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
  guardianFullName: string;

  @IsString()
  @IsOptional()
  guardianPhoneNumber: string;

  @IsString()
  @IsOptional()
  relationshipWithGuardian: string;

  // Activity Choices
  @IsString()
  @IsOptional()
  activityChoices: string[];

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
  hasPreviouslyParticipated: string;

  @IsString()
  @IsOptional()
  previousCompetitions: string;

  @IsString()
  @IsOptional()
  videoTitle: string;

  @IsString()
  @IsOptional()
  videoLink: string;

  @IsString()
  @IsOptional()
  videoSubject: string;

  @IsString()
  @IsOptional()
  videoMotivations: string;

  @IsString()
  @IsOptional()
  videoRessources: string;

  @IsString()
  @IsOptional()
  standSubjectTitle: string;

  @IsString()
  @IsOptional()
  standSubjectDetails: string;

  @IsString()
  @IsOptional()
  standMembers: string[];

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
  fileGradesUrl: string;

  @IsString()
  @IsOptional()
  fileParentalAuthorizationUrl: string;
}
