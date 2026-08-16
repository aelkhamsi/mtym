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
  Req,
  Query,
} from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { SerializedApplication } from '../entities/serialized-application.entity';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { ApplicationStatusService } from '../services/application-status.service';
import { UpdateApplicationStatusDto } from '../dto/update-application-status.dto';
import { SerializedUser } from 'src/modules/user/entities/serialized-user';
import { Role } from 'src/modules/auth/strategies/role.enum';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('mtym-api/applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly userService: UserService,
    private readonly applicationStatusService: ApplicationStatusService,
  ) {}

  @UseGuards(AdminGuard)
  @Get('user/:id')
  @HttpCode(200)
  async findByUserId(@Param('id', ParseIntPipe) id: number) {
    const application = await this.applicationService.findOneByUserId(+id);
    if (!application) {
      throw new NotFoundException();
    }

    return new SerializedApplication(application);
  }

  @UseGuards(AdminGuard)
  @Get()
  @HttpCode(200)
  async findAll(@Query('filter') filter?: string) {
    const applications = await this.applicationService.findAll(filter);

    return applications
      .map((application) => ({
        ...application,
        user: new SerializedUser(application?.user),
      }))
      .map((application) => new SerializedApplication(application));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Query('filter') filter?: string,
  ) {
    const application = await this.applicationService.findOneById(id, filter);
    if (!application) {
      throw new NotFoundException();
    }

    if (
      req.user.role == Role.USER &&
      application.id !== req.user.applicationId
    ) {
      throw new ForbiddenException();
    }

    return new SerializedApplication(application);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

    return {
      id: id,
      update: update,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.delete(id);
  }
}
