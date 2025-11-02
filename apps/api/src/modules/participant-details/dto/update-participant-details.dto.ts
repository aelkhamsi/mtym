import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDetailsDto } from './create-participant-details.dto';

export class UpdateParticipantDetailsDto extends PartialType(CreateParticipantDetailsDto) {}
