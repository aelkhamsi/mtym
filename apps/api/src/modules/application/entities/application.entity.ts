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
  emergencyContactFullName: string;

  @Column({ type: 'varchar', default: '' })
  emergencyContactPhoneNumber: string;

  @Column({ type: 'varchar', default: '' })
  emergencyContactRelationship: string;

  /* Education */
  @Column({ type: 'varchar', default: '' })
  educationLevel: string;

  @Column({ type: 'varchar', default: '' })
  universityType: string;

  @Column({ type: 'varchar', default: '' })
  universityName: string;

  @Column({ type: 'varchar', default: '' })
  educationField: string;

  /* Motivations */
  @Column({ type: 'text', nullable: true })
  motivations: string;

  @Column({ type: 'varchar', default: '' })
  hasPreviousMathMarocParticipations: string;

  @Column({ type: 'text', nullable: true })
  previousMathMarocParticipations: string;

  @Column({ type: 'varchar', default: '' })
  hasPreviousExperiences: string;

  @Column({ type: 'text', nullable: true })
  previousExperiences: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  /* Uploads */
  @Column({ type: 'varchar', nullable: true })
  fileCnieUrl: string;

  @Column({ type: 'varchar', nullable: true })
  fileSchoolCertificateUrl: string;

  @Column({ type: 'varchar', nullable: true })
  fileGradesUrl: string;

  @Column({ type: 'varchar', nullable: true })
  fileRegulationsUrl: string;

  /* createAt & updatedAt */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
