import { IsNumber } from 'class-validator';

export class ChangeLeaderDto {
  @IsNumber()
  newLeaderId: number;
}
