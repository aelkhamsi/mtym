import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'teams' })
export class Team {
  constructor(partial: Partial<Team>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  slogan: string;

  @Column({ type: 'varchar', default: '' })
  quadrigram: string;

  @Column({ type: 'varchar', default: '' })
  mentorFullname: string;

  @ManyToOne(() => User)
  @JoinColumn()
  leader: User;

  @OneToMany(() => User, (user) => user.team)
  @JoinColumn()
  users: User[];
}
