import { IsString, IsNotEmpty } from 'class-validator';

export class SignupAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
