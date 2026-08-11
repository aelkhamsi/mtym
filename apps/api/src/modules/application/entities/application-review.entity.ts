import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './application.entity';

export enum ReviewCheck {
  YES = 'YES',
  NO = 'NO',
  NOT_SURE = 'NOT_SURE',
}

export enum CityCheck {
  YES = 'YES',
  CHANGED = 'CHANGED',
  NOT_SURE = 'NOT_SURE',
}

@Entity({ name: 'applications_reviews' })
export class ApplicationReview {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Application, (application) => application.review, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  application: Application;

  @Column({ type: 'varchar', nullable: true })
  reviewerId: string | null;

  @Column({ type: 'enum', enum: ReviewCheck, nullable: true })
  identityCheck: ReviewCheck | null;

  @Column({ type: 'enum', enum: ReviewCheck, nullable: true })
  levelCheck: ReviewCheck | null;

  @Column({ type: 'enum', enum: CityCheck, nullable: true })
  cityCheck: CityCheck | null;

  @Column({ type: 'varchar', nullable: true })
  updatedCity: string | null;

  @Column({ type: 'enum', enum: ReviewCheck, nullable: true })
  pictureCheck: ReviewCheck | null;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @Column({ type: 'jsonb', default: [] })
  emails: { subject: string; content: string; sentAt: string }[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
