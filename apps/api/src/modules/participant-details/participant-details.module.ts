import { Module } from '@nestjs/common';
import { ParticipantDetailsService } from './participant-details.service';
import { ParticipantDetailsController } from './participant-details.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantDetails } from './entities/participant-details.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ParticipantDetails]),
  ],
  controllers: [ParticipantDetailsController],
  providers: [ParticipantDetailsService],
  exports: [ParticipantDetailsService]
})
export class ParticipantDetailsModule {}
