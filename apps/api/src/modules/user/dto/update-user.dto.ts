import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Application } from 'src/modules/application/entities/application.entity';
import { ParticipantDetails } from 'src/modules/participant-details/entities/participant-details.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  application?: Application;

  participantDetails?: ParticipantDetails
}
