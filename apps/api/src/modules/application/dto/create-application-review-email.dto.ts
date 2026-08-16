import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApplicationReviewEmailDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}