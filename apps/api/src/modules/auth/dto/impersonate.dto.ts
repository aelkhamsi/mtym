import { IsNotEmpty } from 'class-validator';

export class ImpersonateDto {
  @IsNotEmpty()
  userId: number;
}
