import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Put,
  Req,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { cleanString } from 'src/utils/string';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { ChangeLeaderDto } from '../dto/change-leader.dto';

@Controller('mtym-api/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

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
      team: {
        ...team,
        leader: team?.leader ? new SerializedUser(team?.leader) : team?.leader,
        users: team?.users?.map((user) => new SerializedUser(user)),
      },
      statusCode: 200,
    };
  }

  @Get()
  async findAll() {
    const teams = await this.teamService.findAll();

    return {
      teams: teams.map((team) => {
        return {
          ...team,
          leader: team?.leader
            ? new SerializedUser(team?.leader)
            : team?.leader,
          users: team?.users?.map((user) => new SerializedUser(user)),
        };
      }),
      statusCode: 200,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamService.findOneById(+id);
    if (!team) {
      throw new NotFoundException();
    }

    return {
      team: {
        ...team,
        leader: team?.leader ? new SerializedUser(team?.leader) : team?.leader,
        users: team?.users?.map((user) => new SerializedUser(user)),
      },
      statusCode: 200,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    const update = await this.teamService.update(+id, updateTeamDto);

    return {
      id: id,
      update: update,
      statusCode: 200,
    };
  }

  @Put('join/:teamId')
  async addUser(@Req() request: Request, @Param('teamId') teamId: string) {
    const userId = request['user'].id;
    await this.teamService.addUser(+teamId, +userId);

    return {
      id: teamId,
      statusCode: 200,
    };
  }

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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamService.delete(+id);
  }
}
