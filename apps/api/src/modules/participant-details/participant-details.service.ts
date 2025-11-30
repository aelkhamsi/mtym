import { Injectable } from '@nestjs/common';
import { CreateParticipantDetailsDto } from './dto/create-participant-details.dto';
import { UpdateParticipantDetailsDto } from './dto/update-participant-details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/services/user.service';
import { ParticipantDetails } from './entities/participant-details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantDetailsService {
  constructor(
    private userService: UserService,
    @InjectRepository(ParticipantDetails) private participantDetailsRepository: Repository<ParticipantDetails>,
  ) {}

  async create(createParticipantDetailsDto: CreateParticipantDetailsDto, userId: number) {
    const participantDetails = await this.participantDetailsRepository.create(createParticipantDetailsDto);
    await this.participantDetailsRepository.save(participantDetails);

    const user = await this.userService.findOneById(userId);
    await this.userService.update(user?.id, { participantDetails });

    participantDetails.user = user;
    return this.participantDetailsRepository.save(participantDetails);
  }

  findAll() {
    return this.participantDetailsRepository
      .createQueryBuilder('participant-details')
      .leftJoinAndSelect('participant-details.user', 'user')
      .leftJoinAndSelect('user.application', 'application')
      .getMany();
  }

  findOneById(id: number) {
    return this.participantDetailsRepository
      .createQueryBuilder('participant-details')
      .where('participant-details.id = :id', { id })
      .leftJoinAndSelect('participant-details.user', 'user')
      .getOne();
  }

  findOneByUserId(userId: number) {
    return this.participantDetailsRepository
      .createQueryBuilder('participant-details')
      .where('participant-details.userId = :userId', { userId })
      .getOne();
  }

  update(id: number, updateParticipantDetailsDto: UpdateParticipantDetailsDto) {
    return this.participantDetailsRepository.update({ id }, updateParticipantDetailsDto);
  }

  delete(id: number) {
    return this.participantDetailsRepository.delete({ id });
  }
}
