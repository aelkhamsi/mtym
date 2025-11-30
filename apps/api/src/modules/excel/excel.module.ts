import { Module } from '@nestjs/common';
import { ExcelController } from './controllers/excel.controller';
import { ExcelService } from './services/excel.service';
import { ApplicationModule } from '../application/application.module';
import { ParticipantDetailsModule } from '../participant-details/participant-details.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ApplicationModule, ParticipantDetailsModule, UserModule],
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [],
})
export class ExcelModule {}
