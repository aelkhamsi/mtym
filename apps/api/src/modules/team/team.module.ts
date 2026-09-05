import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UserModule } from '../user/user.module';
import { TeamAccessCode } from './entities/team-access-code.entity';
import { TeamAccessCodeService } from './services/team-access-code.service';
import { TeamAccessCodeController } from './controllers/team-access-code.controller';
import { TeamMembership } from './entities/team-membership.entity';
import { TeamMembershipService } from './services/team-membership.service';
import { teamCommands } from './commands';
import { TeamReport } from './entities/team-report.entity';
import { TeamReportService } from './services/team-report.service';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    UserModule,
    MediaModule,
    TypeOrmModule.forFeature([
      Team,
      TeamAccessCode,
      TeamMembership,
      TeamReport,
    ]),
  ],
  controllers: [TeamController, TeamAccessCodeController],
  providers: [
    TeamService,
    TeamAccessCodeService,
    TeamMembershipService,
    TeamReportService,
    ...teamCommands,
  ],
})
export class TeamModule {}
