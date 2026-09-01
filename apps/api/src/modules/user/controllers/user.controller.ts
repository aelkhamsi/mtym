import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  Request,
  Put,
  UseGuards,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SerializedUser } from '../entities/serialized-user';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { Role } from 'src/modules/auth/strategies/role.enum';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { UserGuard } from 'src/modules/auth/guards/user.guard';

@Controller('mtym-api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('me')
  @HttpCode(200)
  async findByToken(@Request() req) {
    return req.user;
  }

  /* Admin-only: backs the member picker in the admin "create team" dialog, so
   * the eligibility rule (validated application + INCOMPLETE team) lives here
   * instead of being re-derived from the full user list on the client. Must
   * stay above the ':id' route, or 'eligible-for-team' would be parsed as an id. */
  @UseGuards(AdminGuard)
  @Get('eligible-for-team')
  @HttpCode(200)
  async findEligibleForTeamCreation() {
    const users = await this.userService.findEligibleForTeamCreation();
    return users.map((user) => new SerializedUser(user));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(200)
  async findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    if (req.user.role === Role.USER && req.user.id !== id) {
      throw new ForbiddenException()
    }

    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return new SerializedUser(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new SerializedUser(user))
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req['user'].role === Role.USER && id !== req['user'].id) {
      throw new ForbiddenException();
    }

    return {
      update: this.userService.update(id, updateUserDto),
      statusCode: 200,
    };
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
