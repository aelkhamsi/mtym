import { Command, CommandRunner } from 'nest-commander';
import { ApplicationService } from '../services/application.service';
import { ApplicationStatusService } from '../services/application-status.service';
import { Application } from '../entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationStatus } from '../entities/application-status.entity';

@Command({
  name: 'seed-applications-status',
  arguments: '',
  options: {},
})
export class SeedApplicationsStatusCommand extends CommandRunner {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(ApplicationStatus)
    private applicationStatusRepository: Repository<ApplicationStatus>,
    private readonly applicationService: ApplicationService,
    private readonly applicationStatusService: ApplicationStatusService,
  ) {
    super();
  }

  async run(inputs: string[], options: Record<string, any>): Promise<void> {
    const applications = await this.applicationService.findAll();

    applications.forEach(async (application: Application) => {
      const applicationStatus = await this.applicationStatusService.create(
        application,
      );

      applicationStatus.application = application;
      await this.applicationStatusRepository.save(applicationStatus);

      application.status = applicationStatus;
      await this.applicationRepository.save(application);
    });

    return;
  }
}
