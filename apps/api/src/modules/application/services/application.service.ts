import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApplicationStatusService } from './application-status.service';
import { ApplicationReviewService } from './application-review.service';

@Injectable()
export class ApplicationService {
  constructor(
    private userService: UserService,
    private applicationStatusService: ApplicationStatusService,
    private applicationReviewService: ApplicationReviewService,
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
    await this.applicationReviewService.create(application);

    application.user = user;
    application.status = applicationStatus;
    return this.applicationRepository.save(application);
  }

  findAll() {
    return this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.status', 'status')
      .leftJoinAndSelect('application.review', 'review')
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

  delete(id: number) {
    return this.applicationRepository.delete({ id });
  }
}
