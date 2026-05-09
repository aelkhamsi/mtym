import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity({ name: 'teams-access-code' })
export class TeamAccessCode {
  constructor(partial: Partial<TeamAccessCode>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  accessCode: string;

  @ManyToOne(() => Team)
  @JoinColumn()
  team: Team;

  /* createAt & updatedAt */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
