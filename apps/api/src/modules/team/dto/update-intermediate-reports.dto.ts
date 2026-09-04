import { IsArray } from 'class-validator';

export class UpdateIntermediateReportsDto {
  @IsArray()
  reports: Array<{
    problemNumber: number;
    fileUrl: string;
  }>;
}
