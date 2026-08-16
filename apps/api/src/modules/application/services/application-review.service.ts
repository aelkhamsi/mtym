import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateApplicationReviewDto } from '../dto/update-application-review.dto';
import { CreateApplicationReviewEmailDto } from '../dto/create-application-review-email.dto';
import { ApplicationReview } from '../entities/application-review.entity';
import { Application } from '../entities/application.entity';

@Injectable()
export class ApplicationReviewService {
  constructor(
    @InjectRepository(ApplicationReview)
    private readonly applicationReviewRepository: Repository<ApplicationReview>
  ) {}

  create(application: Application) {
    return this.applicationReviewRepository.save(
      this.applicationReviewRepository.create({ application }),
    );
  }

  findOneByApplicationId(applicationId: number) {
    return this.applicationReviewRepository.findOne({
      where: { application: { id: applicationId } },
    });
  }

  async update(
    applicationId: number,
    updateApplicationReviewDto: UpdateApplicationReviewDto,
  ) {
    const review = await this.findOneByApplicationId(applicationId);
    if (!review) {
      throw new NotFoundException('Application review does not exist');
    }

    Object.assign(review, updateApplicationReviewDto);
    return this.applicationReviewRepository.save(review);
  }

  async storeReviewEmail(
    applicationId: number,
    dto: CreateApplicationReviewEmailDto,
  ) {
    const review = await this.findOneByApplicationId(applicationId);
    if (!review) {
      throw new NotFoundException('Application review does not exist');
    }

    review.emails.push({
      subject: dto.subject,
      content: dto.content,
      sentAt: new Date().toISOString(),
    });

    return this.applicationReviewRepository.save(review);
  }
}