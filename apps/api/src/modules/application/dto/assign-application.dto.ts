import { IsDefined, IsString, ValidateIf } from 'class-validator';

export class AssignApplicationDto {
  @IsDefined()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  assignedAdminId: string | null;
}
