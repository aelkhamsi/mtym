import { Application } from './application.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Status =
  | 'DRAFT'
  | 'PENDING'
  | 'INFO_NEEDED'
  | 'NOTIFIED'
  | 'UPDATED'
  | 'VALIDATED'
  | 'REJECTED'
  | 'NOT_VALID'
  | 'NOT_SURE';

export type FileStatus = 'DRAFT' | 'PENDING' | 'VALID' | 'NOT_VALID';

@Entity({ name: 'applications_status' })
export class ApplicationStatus {
  constructor(partial: Partial<ApplicationStatus>) {
    Object.assign(this, partial);
  }

  /* Personal Informations */
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Application, (application) => application.status)
  @JoinColumn()
  application: Application;

  /* Global status */
  @Column({ type: 'varchar', default: 'DRAFT' })
  status: Status;

  /* Files status */
  @Column({ type: 'varchar', default: 'PENDING' })
  cnieStatus: FileStatus;

  @Column({ type: 'varchar', default: 'PENDING' })
  membersCnieStatus: FileStatus;

  @Column({ type: 'varchar', default: 'PENDING' })
  gradesStatus: FileStatus;

  @Column({ type: 'varchar', default: 'PENDING' })
  parentalAuthorizationStatus: FileStatus;

  /* createAt & updatedAt */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
