import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
