import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApplicationStatusService } from './application-status.service';
import { AssignApplicationDto } from '../dto/assign-application.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationService {
  constructor(
    private userService: UserService,
    private applicationStatusService: ApplicationStatusService,
    private configService: ConfigService,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, userId: number) {
    // create application
    const application = await this.applicationRepository.create(
      createApplicationDto,
    );
    await this.applicationRepository.save(application);

    // update user
    const user = await this.userService.findOneById(userId);
    await this.userService.update(user?.id, { application });

    // create application status
    const applicationStatus = await this.applicationStatusService.create(
      application,
    );

    application.user = user;
    application.status = applicationStatus;
    return this.applicationRepository.save(application);
  }

  findAll() {
    return this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.status', 'status')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('user.team', 'team')
      .getMany();
  }

  findOneById(id: number) {
    return this.applicationRepository
      .createQueryBuilder('application')
      .where('application.id = :id', { id })
      .leftJoinAndSelect('application.status', 'status')
      .leftJoinAndSelect('application.user', 'user')
      .getOne();
  }

  findOneByUserId(userId: number) {
    return this.applicationRepository
      .createQueryBuilder('application')
      .where('application.userId = :userId', { userId })
      .leftJoinAndSelect('application.status', 'status')
      .getOne();
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return this.applicationRepository.update({ id }, updateApplicationDto);
  }

  async assignAdmin(
    id: number,
    assignment: AssignApplicationDto,
    cookie: string,
  ) {
    if (assignment.assignedAdminId) {
      await this.validatePayloadAdmin(assignment.assignedAdminId, cookie);
    }

    const application = await this.applicationRepository.findOneBy({ id });
    if (!application) {
      throw new NotFoundException('Application does not exist');
    }

    application.assignedAdminId = assignment.assignedAdminId;

    return this.applicationRepository.save(application);
  }

  private async validatePayloadAdmin(id: string, cookie: string) {
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    if (!frontendUrl) {
      throw new BadRequestException('Payload URL is not configured');
    }

    let response: Response;
    try {
      response = await fetch(
        `${frontendUrl.replace(/\/$/, '')}/api/users/${encodeURIComponent(id)}`,
        { headers: { cookie } },
      );
    } catch {
      throw new BadRequestException('Could not verify assigned admin');
    }

    if (!response.ok) {
      throw new BadRequestException('Assigned admin does not exist');
    }

    const admin = await response.json();
    if (String(admin?.id) !== id) {
      throw new BadRequestException('Assigned admin is invalid');
    }
  }

  delete(id: number) {
    return this.applicationRepository.delete({ id });
  }
}
