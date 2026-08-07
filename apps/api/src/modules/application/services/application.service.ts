import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
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

  findAll(filter?: string) {
    const query = this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.status', 'status')
      .leftJoinAndSelect('application.review', 'review')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('user.team', 'team');

    this.addValidFilter(query, filter);
    return query.getMany();
  }

  findOneById(id: number, filter?: string) {
    const query = this.applicationRepository
      .createQueryBuilder('application')
      .where('application.id = :id', { id })
      .leftJoinAndSelect('application.status', 'status')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoin('user.team', 'team');

    this.addValidFilter(query, filter);
    return query.getOne();
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

  private addValidFilter(
    query: SelectQueryBuilder<Application>,
    filter?: string,
  ) {
    if (filter !== 'valid') return;

    query.andWhere(`
      status.status NOT IN ('DRAFT', 'NOT_VALID')
      AND (
        status.status <> 'PENDING'
        OR (
          SELECT COUNT(*)
          FROM "users" member
          WHERE member."teamId" = team.id
        ) >= 3
      )
    `);
  }
}
