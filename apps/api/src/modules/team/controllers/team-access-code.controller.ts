import {
  Controller,
  Get,
  Body,
  Delete,
  Post,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { TeamAccessCodeService } from '../services/team-access-code.service';
import { CheckTeamAccessCodeDto } from '../dto/check-team-access-code.dto';

@Controller('mtym-api/teams-access-code')
export class TeamAccessCodeController {
  constructor(private readonly teamAccessCodeService: TeamAccessCodeService) {}

  @Get(':teamId')
  async create(@Param('teamId', ParseIntPipe) teamId: number) {
    const result = await this.teamAccessCodeService?.create(+teamId);

    return {
      accessCode: result?.accessCode,
      statusCode: 200,
    };
  }

  @Post(':teamId')
  async check(
    @Body() checkTeamAccessCodeDto: CheckTeamAccessCodeDto,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    const accessCode = await this.teamAccessCodeService.check(
      checkTeamAccessCodeDto?.accessCode,
      teamId,
    );

    if (!accessCode) {
      throw new NotFoundException('Access code not valid');
    }

    return {
      accessCode,
      statusCode: 200,
    };
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.teamAccessCodeService.deleteById(+id);
  }
}
