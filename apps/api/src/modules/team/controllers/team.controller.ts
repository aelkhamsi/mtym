import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { cleanString } from 'src/utils/string';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { ChangeLeaderDto } from '../dto/change-leader.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('mtym-api/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request: Request, @Body() createTeamDto: CreateTeamDto) {
    const { name } = createTeamDto;
    const cleanName = cleanString(name);

    const teams = await this.teamService.findAll();
    const teamExists = teams?.find(
      (team) => cleanString(team?.name) == cleanName,
    );
    if (teamExists) {
      throw new UnauthorizedException('Team with this name already exists');
    }

    const userId = request['user'].id;
    const team = await this.teamService.create(createTeamDto, userId);

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
    await this.teamService.addUser(+teamId, +userId);

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
    await this.teamService.removeUser(+teamId, +userId);

    return {
      id: teamId,
      statusCode: 200,
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(+id);
  }
}
