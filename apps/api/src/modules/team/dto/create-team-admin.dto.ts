import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsPositive,
} from 'class-validator';
import { CreateTeamDto } from './create-team.dto';

/**
 * Admin-side creation. Unlike the participant flow, the caller is not a member
 * of the team being created: the members and the leader are picked explicitly,
 * so both are part of the payload. The name/slogan/quadrigram rules are
 * inherited so a team created from the admin obeys the same constraints as one
 * created by a participant.
 */
export class CreateTeamAdminDto extends CreateTeamDto {
  @IsArray()
  @ArrayMinSize(3, { message: 'A team must have at least 3 members' })
  @ArrayMaxSize(5, { message: 'A team can not have more than 5 members' })
  @ArrayUnique({ message: 'The same member can not be added twice' })
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  memberIds: number[];

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  leaderId: number;
}
