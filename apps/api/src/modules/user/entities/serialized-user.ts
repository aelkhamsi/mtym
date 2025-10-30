import { User } from './user.entity';
import { Exclude } from 'class-transformer';

export class SerializedUser extends User {
  constructor(partial: Partial<SerializedUser>) {
    super(partial);
  }

  @Exclude()
  identifier: string;

  @Exclude()
  password: string;

  @Exclude()
  verificationCode: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
