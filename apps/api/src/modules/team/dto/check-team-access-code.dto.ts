import { IsNotEmpty, IsString } from 'class-validator';

export class CheckTeamAccessCodeDto {
  @IsString()
  @IsNotEmpty()
  accessCode: string;
}
