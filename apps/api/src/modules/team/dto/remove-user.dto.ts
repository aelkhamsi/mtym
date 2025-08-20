import { IsNumber, IsOptional } from 'class-validator';

export class RemoveUserDto {
  @IsNumber()
  @IsOptional()
  userId: number;
}
