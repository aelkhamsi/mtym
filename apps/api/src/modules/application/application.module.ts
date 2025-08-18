import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationController } from './controllers/application.controller';
import { ApplicationService } from './services/application.service';
import { UserModule } from '../user/user.module';
import { ApplicationStatus } from './entities/application-status.entity';
import { ApplicationStatusService } from './services/application-status.service';
import { applicationCommands } from './commands';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Application, ApplicationStatus]),
  ],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    ApplicationStatusService,
    ...applicationCommands,
  ],
  exports: [
    ApplicationService,
    ApplicationStatusService,
    ...applicationCommands,
  ],
})
export class ApplicationModule {}
