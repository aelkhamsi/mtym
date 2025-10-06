import {
  Controller,
  Get,
  Body,
  Delete,
  Post,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TeamAccessCodeService } from '../services/team-access-code.service';
import { CheckTeamAccessCodeDto } from '../dto/check-team-access-code.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/guards/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('mtym-api/teams-access-code')
export class TeamAccessCodeController {
  constructor(private readonly teamAccessCodeService: TeamAccessCodeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':teamId')
  async create(@Param('teamId', ParseIntPipe) teamId: number) {
    const result = await this.teamAccessCodeService?.create(+teamId);
    await this.teamAccessCodeService.deleteOldAccessCodes();

    return {
      accessCode: result?.accessCode,
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.teamAccessCodeService.deleteById(+id);
  }
}
