import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { SerializedApplication } from '../entities/serialized-application.entity';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserService } from 'src/modules/user/services/user.service';
import { ApplicationStatusService } from '../services/application-status.service';
import { UpdateApplicationStatusDto } from '../dto/update-application-status.dto';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/guards/role.enum';

@Controller('mtym-api/applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly userService: UserService,
    private readonly applicationStatusService: ApplicationStatusService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('user/:id')
  @HttpCode(200)
  async findByUserId(@Param('id', ParseIntPipe) id: number) {
    const application = await this.applicationService.findOneByUserId(+id);
    if (!application) {
      throw new NotFoundException();
    }

    return new SerializedApplication(application);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(200)
  async findAll() {
    const applications = await this.applicationService.findAll();

    return {
      applications: applications
        .map((application) => ({
          ...application,
          user: new SerializedUser(application?.user),
        }))
        .map((application) => new SerializedApplication(application)),
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  @HttpCode(200)
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const application = await this.applicationService.findOneById(id);
    if (!application) {
      throw new NotFoundException();
    }

    return new SerializedApplication(application);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  @HttpCode(200)
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
    @Request() req,
  ) {
    const userId = req['user'].id;

    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    let application = user?.application;
    if (application) {
      // update
      await this.applicationService.update(
        application?.id,
        createApplicationDto,
      );

      const applicationStatus = application?.status;
      if (applicationStatus && applicationStatus.status === 'NOTIFIED') {
        this.applicationStatusService.update(applicationStatus?.id, {
          ...applicationStatus,
          status: 'UPDATED',
        });
      }
    } else {
      // create
      application = await this.applicationService.create(
        createApplicationDto,
        userId,
      );
    }

    return {
      id: application.id,
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Request() req,
  ) {
    const userId = req['user'].id;
    const application = await this.applicationService.findOneById(id);
    const user = application?.user;

    if (user && user?.id !== userId) {
      throw new ForbiddenException('This user can not update this application');
    }

    const update = await this.applicationService.update(
      id,
      updateApplicationDto,
    );

    const applicationStatus = application?.status;
    if (applicationStatus && applicationStatus.status === 'NOTIFIED') {
      this.applicationStatusService.update(applicationStatus?.id, {
        ...applicationStatus,
        status: 'UPDATED',
      });
    }

    return {
      id: id,
      update: update,
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put('status/:applicationId')
  @HttpCode(200)
  async updateStatus(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ) {
    const application = await this.applicationService.findOneById(
      applicationId,
    );
    if (!application) {
      throw new NotFoundException();
    }

    const update = await this.applicationStatusService.update(
      application.status?.id,
      updateApplicationStatusDto,
    );

    return {
      id: applicationId,
      update: update,
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.delete(id);
  }
}
