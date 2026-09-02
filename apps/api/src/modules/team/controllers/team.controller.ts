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

@Controller('mtym-api/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

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

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(+id);
  }
}
