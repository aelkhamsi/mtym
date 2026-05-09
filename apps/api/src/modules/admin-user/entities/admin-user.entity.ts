import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'admin_users' })
export class AdminUser {
  constructor(partial: Partial<AdminUser>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: '',
  })
  username: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  password: string;

  /* createAt & updatedAt */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
