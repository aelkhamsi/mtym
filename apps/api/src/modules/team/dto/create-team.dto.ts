import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

/**
 * The quadrigram is the team's identity code, so it only exists in one shape:
 * upper-cased and trimmed. Normalizing here means every consumer (create,
 * update, uniqueness lookups) compares the same value, whatever the client
 * happened to send.
 */
const normalizeQuadrigram = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CreateTeamDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  name: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  slogan?: string;

  @Transform(normalizeQuadrigram)
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{4}$/, {
    message: 'Un quadrigramme contient exactement 4 lettres (A–Z).',
  })
  @Matches(/^(?!(.)\1{3}$)/, {
    message:
      'Le quadrigramme doit être significatif (pas 4 lettres identiques)',
  })
  quadrigram: string;
}
