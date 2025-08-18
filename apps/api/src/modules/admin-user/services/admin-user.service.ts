import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bcrypt';
import { AdminUser } from '../entities/admin-user.entity';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
  ) {}

  create(createAdminUserDto: CreateAdminUserDto) {
    const user = this.adminUserRepository.create(createAdminUserDto);
    this.adminUserRepository.save(user);
    return user;
  }

  findAll() {
    return this.adminUserRepository.createQueryBuilder('user').getMany();
  }

  findOneById(id: number) {
    return this.adminUserRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  findOneByUsername(username: string) {
    return this.adminUserRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    const { password } = updateAdminUserDto;
    if (password) {
      updateAdminUserDto.password = hashPassword(updateAdminUserDto.password);
    }
    return this.adminUserRepository.update({ id }, updateAdminUserDto);
  }

  remove(id: number) {
    return this.adminUserRepository.delete({ id });
  }
}
