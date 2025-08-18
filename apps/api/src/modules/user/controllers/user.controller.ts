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
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SerializedUser } from '../entities/serialized-user';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ADMIN_ROLE, USER_ROLE } from 'src/constants';

@Controller('mtym-api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('informations')
  @HttpCode(200)
  async findByToken(@Request() req) {
    const id = req['user'].id;
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return {
      user: new SerializedUser(user),
      statusCode: 200,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return new SerializedUser(user);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  async findAll() {
    const users = await this.userService.findAll();

    return {
      users: users.map((user) => new SerializedUser(user)),
      statusCode: 200,
    };
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req['user'].role === USER_ROLE && id !== req['user'].id) {
      throw new ForbiddenException();
    }

    return {
      update: this.userService.update(id, updateUserDto),
      statusCode: 200,
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
