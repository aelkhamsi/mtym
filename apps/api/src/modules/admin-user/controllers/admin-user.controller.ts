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
} from '@nestjs/common';
import { AdminUserService } from '../services/admin-user.service';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';
import { SerializedAdminUser } from '../entities/serialized-admin-user';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/guards/role.enum';

@Controller('mtym-api/admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('informations')
  @HttpCode(200)
  async findByToken(@Request() req) {
    const id = req['user'].id;
    const user = await this.adminUserService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return {
      user: new SerializedAdminUser(user),
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(200)
  async findAll() {
    const users = await this.adminUserService.findAll();
    return users.map((user) => new SerializedAdminUser(user));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.adminUserService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return new SerializedAdminUser(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateAdminUserDto,
  ) {
    const update = await this.adminUserService.update(id, updateUserDto);

    return {
      update: update,
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminUserService.remove(id);
  }
}
