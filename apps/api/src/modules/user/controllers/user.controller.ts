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
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/guards/role.enum';

@Controller('mtym-api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(200)
  async findByToken(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(200)
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new SerializedUser(user))
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
