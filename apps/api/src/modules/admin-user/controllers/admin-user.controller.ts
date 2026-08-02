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
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';

@Controller('mtym-api/admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Get()
  @HttpCode(200)
  async findAll() {
    const users = await this.adminUserService.findAll();
    return users.map((user) => new SerializedAdminUser(user));
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.adminUserService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return new SerializedAdminUser(user);
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminUserService.remove(id);
  }
}
