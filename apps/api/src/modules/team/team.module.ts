import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UserModule } from '../user/user.module';
import { TeamAccessCode } from './entities/team-access-code.entity';
import { TeamAccessCodeService } from './services/team-access-code.service';
import { TeamAccessCodeController } from './controllers/team-access-code.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Team, TeamAccessCode])],
  controllers: [TeamController, TeamAccessCodeController],
  providers: [TeamService, TeamAccessCodeService],
})
export class TeamModule {}
