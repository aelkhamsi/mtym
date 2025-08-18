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
import { ADMIN_ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('mtym-api/admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get('informations')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
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

  @Get()
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  async findAll() {
    const users = await this.adminUserService.findAll();
    return users.map((user) => new SerializedAdminUser(user));
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.adminUserService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return new SerializedAdminUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
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

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminUserService.remove(id);
  }
}
