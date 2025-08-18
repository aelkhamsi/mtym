import { Exclude } from 'class-transformer';
import { AdminUser } from './admin-user.entity';

export class SerializedAdminUser extends AdminUser {
  constructor(partial: Partial<SerializedAdminUser>) {
    super(partial);
  }

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
