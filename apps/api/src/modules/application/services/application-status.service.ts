import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplicationStatus } from '../entities/application-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../entities/application.entity';
import { UpdateApplicationStatusDto } from '../dto/update-application-status.dto';

@Injectable()
export class ApplicationStatusService {
  constructor(
    @InjectRepository(ApplicationStatus)
    private readonly applicationStatusRepository: Repository<ApplicationStatus>,
  ) {}

  async create(application: Application) {
    const applicationStatus = this.applicationStatusRepository.create({
      application: application,
    });

    return this.applicationStatusRepository.save(applicationStatus);
  }

  findAll() {
    return this.applicationStatusRepository.find();
  }

  findOneByApplicationId(applicationId: number) {
    return this.applicationStatusRepository
      .createQueryBuilder('status')
      .where('status.applicationId = :applicationId', { applicationId })
      .getOne();
  }

  update(id: number, updateApplicationStatusDto: UpdateApplicationStatusDto) {
    return this.applicationStatusRepository.update(
      { id },
      updateApplicationStatusDto,
    );
  }
}
