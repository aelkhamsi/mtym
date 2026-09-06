import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

export enum DecisionEnum {
  PASS = 'PASS',
  FAIL = 'FAIL',
  NOT_SURE = 'NOT_SURE'
}

@Entity({ name: 'team_reviews' })
export class TeamReview {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Team, (team) => team.review, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  team: Team;

  @Column({ type: 'varchar', nullable: true })
  reviewerId: string | null;

  @Column({ type: 'int', nullable: true })
  intermediateReportScore1: number | null;

  @Column({ type: 'int', nullable: true })
  intermediateReportScore2: number | null;

  @Column({ type: 'int', nullable: true })
  intermediateReportScore3: number | null;

  @Column({ type: 'int', nullable: true })
  intermediateReportScore4: number | null;

  @Column({ type: 'int', nullable: true })
  aiSuspicionScore: number | null;

  @Column({ type: 'enum', enum: DecisionEnum, nullable: true })
  intermediateReportDecision: DecisionEnum | null;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
