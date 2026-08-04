import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationController } from './controllers/application.controller';
import { ApplicationService } from './services/application.service';
import { UserModule } from '../user/user.module';
import { ApplicationStatus } from './entities/application-status.entity';
import { ApplicationStatusService } from './services/application-status.service';
import { applicationCommands } from './commands';
import { ApplicationReview } from './entities/application-review.entity';
import { ApplicationReviewController } from './controllers/application-review.controller';
import { ApplicationReviewService } from './services/application-review.service';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Application, ApplicationStatus, ApplicationReview,]),
  ],
  controllers: [ApplicationController, ApplicationReviewController],
  providers: [
    ApplicationService,
    ApplicationStatusService,
    ApplicationReviewService,
    ...applicationCommands,
  ],
  exports: [
    ApplicationService,
    ApplicationStatusService,
    ...applicationCommands,
  ],
})
export class ApplicationModule {}
