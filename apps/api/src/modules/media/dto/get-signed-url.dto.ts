import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetSignedURLDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsDefined()
  size: number;

  @IsString()
  @IsNotEmpty()
  checksum: string;
}
