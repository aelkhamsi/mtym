import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bcrypt';
import { TeamStatus } from 'src/modules/team/entities/team.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
    return user;
  }

  findAll() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
      relations: {
        application: {
          status: true,
        },
        team: {
          leader: true,
          users: true,
        },
        participantDetails: true,
      },
    });
  }

  /**
   * Candidates for an admin-created team: their application must be VALIDATED,
   * and they must either belong to a team that is still INCOMPLETE (so pulling
   * them into a new team does not disturb one that is already finalized) or be
   * a free agent (validated, but pulled out of their previous team on purpose
   * to be reassigned).
   */
  findEligibleForTeamCreation() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .leftJoinAndSelect('user.team', 'team')
      .leftJoinAndSelect('team.leader', 'leader')
      .leftJoinAndSelect('team.users', 'teamUser')
      .leftJoinAndSelect('user.participantDetails', 'participantDetails')
      .where('status.status = :status', { status: 'VALIDATED' })
      .andWhere(
        '(user.isFreeAgent = true OR team.status = :teamStatus)',
        { teamStatus: TeamStatus.INCOMPLETE },
      )
      .getMany();
  }

  setFreeAgent(id: number, isFreeAgent: boolean) {
    return this.userRepository.update({ id }, { isFreeAgent });
  }

  findOneById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        application: {
          status: true,
        },
        team: {
          leader: true,
          users: true,
          reports: true,
        },
        participantDetails: true,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        application: true,
        team: {
          leader: true,
          users: true,
        },
        participantDetails: true,
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = hashPassword(updateUserDto.password);
    }
    return this.userRepository.update({ id }, updateUserDto);
  }

  updateEmaiVerificationCode(id: number, verificationCode: string) {
    return this.userRepository.update({ id }, { verificationCode });
  }

  updateVerifiedStatus(id: number, verified: boolean) {
    return this.userRepository.update({ id }, { verified });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
