import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

export enum TeamReportType {
  INTERMEDIATE = 'INTERMEDIATE',
  FINAL = 'FINAL',
}

@Entity({ name: 'team_reports' })
@Unique('UQ_team_reports_team_type_problem', [
  'team',
  'reportType',
  'problemNumber',
])
export class TeamReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.reports, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  team: Team;

  @Column({ type: 'enum', enum: TeamReportType })
  reportType: TeamReportType;

  @Column({ type: 'int' })
  problemNumber: number;

  @Column({ type: 'varchar' })
  fileUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
