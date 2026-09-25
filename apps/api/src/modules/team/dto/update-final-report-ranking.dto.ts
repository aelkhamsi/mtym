import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsInt, Max, Min } from 'class-validator';
import { MTYM_PROBLEM_COUNT } from '@mdm/shared';

export class UpdateFinalReportRankingDto {
  @IsArray()
  @ArrayMinSize(MTYM_PROBLEM_COUNT)
  @ArrayMaxSize(MTYM_PROBLEM_COUNT)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(MTYM_PROBLEM_COUNT, { each: true })
  ranking: number[];
}
