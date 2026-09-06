// team-review.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamReview } from '../entities/team-review.entity';
import { CreateTeamReviewDto } from '../dto/create-team-review.dto';
import { UpdateTeamReviewDto } from '../dto/update-team-review.dto';

@Injectable()
export class TeamReviewService {
  constructor(
    @InjectRepository(TeamReview)
    private readonly teamReviewRepository: Repository<TeamReview>,
  ) {}

  async create(dto: CreateTeamReviewDto): Promise<TeamReview> {
    const review = this.teamReviewRepository.create(dto);
    return this.teamReviewRepository.save(review);
  }

  async findAll(): Promise<TeamReview[]> {
    return this.teamReviewRepository.find();
  }

  async findOne(id: number): Promise<TeamReview> {
    const review = await this.teamReviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`TeamReview #${id} not found`);
    }
    return review;
  }

  async update(id: number, dto: UpdateTeamReviewDto): Promise<TeamReview> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return this.teamReviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const result = await await this.teamReviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TeamReview #${id} not found`);
    }
  }
}