import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateIntermediateReportDto {
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
