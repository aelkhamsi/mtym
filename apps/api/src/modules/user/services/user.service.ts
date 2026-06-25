import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bcrypt';

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
