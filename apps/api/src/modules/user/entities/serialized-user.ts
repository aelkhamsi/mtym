import { User } from './user.entity';
import { Exclude } from 'class-transformer';

export class SerializedUser extends User {
  constructor(partial: Partial<SerializedUser>) {
    super(partial);
  }

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
