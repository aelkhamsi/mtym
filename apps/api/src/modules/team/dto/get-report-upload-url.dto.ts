import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetReportUploadUrlDto {
  @IsNumber()
  size: number;

  @IsString()
  @IsNotEmpty()
  checksum: string;
}
