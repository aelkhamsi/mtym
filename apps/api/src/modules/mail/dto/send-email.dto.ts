import { IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  content: string;
}
