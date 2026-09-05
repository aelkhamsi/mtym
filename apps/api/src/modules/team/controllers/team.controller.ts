import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { CreateTeamAdminDto } from '../dto/create-team-admin.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { ChangeLeaderDto } from '../dto/change-leader.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { TeamReportService } from '../services/team-report.service';
import { UpdateIntermediateReportDto } from '../dto/update-intermediate-reports.dto';
import { GetReportUploadUrlDto } from '../dto/get-report-upload-url.dto';
import { UserGuard } from 'src/modules/auth/guards/user.guard';

@Controller('mtym-api/teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly teamReportService: TeamReportService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request: Request, @Body() createTeamDto: CreateTeamDto) {
    /* Name & quadrigram uniqueness is enforced by the service, so it holds for
     * every caller and not only for the ones going through this endpoint. */
    const userId = request['user'].id;
    const team = await this.teamService.create(createTeamDto, userId);

    return {
      ...team,
      leader: team?.leader ? new SerializedUser(team?.leader) : team?.leader,
      users: team?.users?.map((user) => new SerializedUser(user)),
    };
  }

  /* Admin-only: the team is created for other users, so it is guarded by the
   * payload session rather than the participant one. */
  @UseGuards(AdminGuard)
  @Post('admin')
  async createAsAdmin(
    @Req() request: Request,
    @Body() createTeamAdminDto: CreateTeamAdminDto,
  ) {
    const team = await this.teamService.createAsAdmin(
      createTeamAdminDto,
      request['user'],
    );

    return {
      ...team,
      leader: team?.leader ? new SerializedUser(team?.leader) : team?.leader,
      users: team?.users?.map((user) => new SerializedUser(user)),
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const teams = await this.teamService.findAll();

    return teams.map((team) => {
      return {
        ...team,
        leader: team?.leader
          ? new SerializedUser(team?.leader)
          : team?.leader,
        users: team?.users?.map((user) => new SerializedUser(user)),
      };
    });
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  async findOneById(@Param('id') id: string) {
    const team = await this.teamService.findOneById(+id);
    if (!team) {
      throw new NotFoundException();
    }

    return {
      ...team,
      leader: team?.leader ? new SerializedUser(team?.leader) : team?.leader,
      users: team?.users?.map((user) => new SerializedUser(user)),
    };
  }

  @UseGuards(AuthGuard)
  @Get('quadrigram/:quadrigram')
  async findOneByQuadrigram(@Param('quadrigram') quadrigram: string) {
    const team = await this.teamService.findOneByQuadrigram(quadrigram);
    if (team) return team;
    throw new NotFoundException();
  }

  @UseGuards(UserGuard)
  @Post(':id/intermediate-reports/:problemNumber/signed-url')
  getIntermediateReportUploadUrl(
    @Req() request: Request,
    @Param('id', ParseIntPipe) teamId: number,
    @Param('problemNumber', ParseIntPipe) problemNumber: number,
    @Body() body: GetReportUploadUrlDto,
  ) {
    return this.teamReportService.getIntermediateReportUploadUrl(
      teamId,
      problemNumber,
      body.size,
      body.checksum,
      request['user'].id,
    );
  }

  @UseGuards(UserGuard)
  @Put(':id/intermediate-reports/:problemNumber')
  updateIntermediateReport(
    @Req() request: Request,
    @Param('id', ParseIntPipe) teamId: number,
    @Param('problemNumber', ParseIntPipe) problemNumber: number,
    @Body() updateIntermediateReportDto: UpdateIntermediateReportDto,
  ) {
    return this.teamReportService.upsertIntermediateReport(
      teamId,
      problemNumber,
      updateIntermediateReportDto.fileUrl,
      request['user'].id,
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    const update = await this.teamService.update(+id, updateTeamDto);

    return {
      id: id,
      update: update,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
  @Put('join/:teamId')
  async addUser(@Req() request: Request, @Param('teamId') teamId: string) {
    const userId = request['user'].id;
    await this.teamService.addUser(+teamId, +userId, request['user']);

    return {
      id: teamId,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
  @Put('unjoin/:teamId')
  async removeUser(
    @Req() request: Request,
    @Param('teamId') teamId: string,
    @Body() removeUserDto: RemoveUserDto,
  ) {
    const userId = removeUserDto?.userId ?? request['user'].id;
    await this.teamService.removeUser(+teamId, +userId, request['user']);

    return {
      id: teamId,
      statusCode: 200,
    };
  }

  /* Admin-only: surfaces every stint a user has had across teams, so support
   * can see the full trail when someone has been moved more than once. */
  @UseGuards(AdminGuard)
  @Get('history/user/:userId')
  async getUserTeamHistory(@Param('userId') userId: string) {
    return this.teamService.getUserTeamHistory(+userId);
  }

  /* Admin-only: pulls the user out of their current team (if any) and flags
   * them as a free agent, so a validated applicant can be reassigned instead
   * of being stuck once their team is no longer INCOMPLETE. */
  @UseGuards(AdminGuard)
  @Put('free-agent/:userId')
  async markFreeAgent(
    @Req() request: Request,
    @Param('userId') userId: string,
  ) {
    const { leaderChanged, newLeaderId } = await this.teamService.markFreeAgent(
      +userId,
      request['user'],
    );

    return {
      id: userId,
      statusCode: 200,
      leaderChanged,
      newLeaderId,
    };
  }

  @UseGuards(AuthGuard)
  @Put('change-leader/:teamId')
  async changeLeader(
    @Param('teamId') teamId: string,
    @Body() changeLeaderDto: ChangeLeaderDto,
  ) {
    const newLeaderId = changeLeaderDto.newLeaderId;
    await this.teamService.changeLeader(+teamId, +newLeaderId);

    return {
      id: teamId,
      statusCode: 200,
    };
  }

  /* Admin-only: lets the teams admin view reassign a team's creator directly,
   * rather than only through the participant-facing endpoint above. */
  @UseGuards(AdminGuard)
  @Put('admin/change-leader/:teamId')
  async changeLeaderAsAdmin(
    @Param('teamId') teamId: string,
    @Body() changeLeaderDto: ChangeLeaderDto,
  ) {
    await this.teamService.changeLeader(+teamId, +changeLeaderDto.newLeaderId);

    return {
      id: teamId,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(+id);
  }

  /* Admin-only: recomputes every team's status from its members' application
   * statuses, the same logic the `update-team-statuses` CLI command runs. */
  @UseGuards(AdminGuard)
  @Post('update-statuses')
  async updateStatuses() {
    const updated = await this.teamService.updateAllStatuses();

    return {
      updated,
      statusCode: 200,
    };
  }
}
