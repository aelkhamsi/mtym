import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApplicationStatus } from './application-status.entity';

@Entity({ name: 'applications' })
export class Application {
  constructor(partial: Partial<Application>) {
    Object.assign(this, partial);
  }

  /* Personal Informations */
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.application)
  @JoinColumn()
  user: User;

  @OneToOne(
    () => ApplicationStatus,
    (applicationStatus) => applicationStatus.application,
  )
  @JoinColumn()
  status: ApplicationStatus;

  @Column({ type: 'varchar', default: '' })
  firstName: string;

  @Column({ type: 'varchar', default: '' })
  lastName: string;

  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', default: '' })
  identityCardNumber: string;

  @Column({ type: 'varchar', default: '' })
  city: string;

  @Column({ type: 'varchar', default: '' })
  region: string;

  @Column({ type: 'varchar', default: '' })
  phoneNumber: string;

  @Column({ type: 'varchar', default: '' })
  allergyOrMedication: string;

  @Column({ type: 'varchar', default: '' })
  guardianFullName: string;

  @Column({ type: 'varchar', default: '' })
  guardianPhoneNumber: string;

  @Column({ type: 'varchar', default: '' })
  relationshipWithGuardian: string;

  /* Education */
  @Column({ type: 'varchar', default: '' })
  educationLevel: string;

  @Column({ type: 'varchar', default: '' })
  educationField: string;

  @Column({ type: 'varchar', default: '' })
  highschool: string;

  @Column({ type: 'varchar', default: '' })
  highschoolCity: string;

  @Column({ type: 'varchar', default: '' })
  highschoolRegion: string;
    
  @Column({ type: 'varchar', default: '' })
  isHighschoolFarFromHome: string;

  /* Motivations */
  @Column({ type: 'varchar', default: '' })
  hasPreviousExperiences: string;

  @Column({ type: 'text', nullable: true })
  previousExperiences: string;

  @Column({ type: 'varchar', default: '' })
  hasPreviousMTYMParticipations: string;

  @Column({ type: 'text', nullable: true })
  previousMTYMParticipations: string;

  @Column({ type: 'text', nullable: true })
  motivations: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  /* Uploads */

  @Column({ type: 'varchar', nullable: true })
  fileCnieUrl: string;

  @Column({ type: 'varchar', nullable: true })
  filePhotoUrl: string;

  @Column({ type: 'varchar', nullable: true })
  fileGradesUrl: string;

  /* createAt & updatedAt */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
