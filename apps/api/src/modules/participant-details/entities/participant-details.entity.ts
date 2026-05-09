import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

enum ParticipantDetailsStatus {
  NOT_STARTED = 'NOT_STARTED',
  DRAFTED = 'DRAFTED',
  COMPLETE = 'COMPLETE',
}

@Entity({ name: 'participant-details' })
export class ParticipantDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.participantDetails)
  @JoinColumn()
  user: User;

  @Column({ default: ParticipantDetailsStatus.DRAFTED })
  status: ParticipantDetailsStatus;

  /* FORM FIELDS */

  @Column({ type: 'varchar', default: '' })
  gender: string;

  @Column({ type: 'varchar', default: '' })
  guardianFullName: string;

  @Column({ type: 'varchar', default: '' })
  guardianPhoneNumber: string;
  
  // Allergies
  @Column({ type: 'varchar', default: '[]' })
  foodAllergy: string;

  @Column({ type: 'varchar', default: '[]' })
  nonFoodAllergy: string;
  
  @Column({ type: 'text', nullable: true })
  allergyPrecaution: string

  // Illness & Disability
  @Column({ type: 'varchar', default: '[]' })
  illnessOrDisability: string;

  @Column({ type: 'varchar', default: '' })
  isOnMedication: string;

  @Column({ type: 'text', nullable: true })
  medication: string;

  @Column({ type: 'varchar', default: '' })
  needAssistance: string;

  @Column({ type: 'text', nullable: true })
  specialAccommodations: string;

  @Column({ type: 'varchar', default: '' })
  hasBeenHospitalized: string;

  @Column({ type: 'text', nullable: true })
  hospitalizationReasons: string;

  // Roommates
  @Column({ type: 'varchar', default: '' })
  haveRoommatePreference: string;

  @Column({ type: 'varchar', default: '' })
  firstRoommateId: string;

  @Column({ type: 'varchar', default: '' })
  secondRoommateId: string;

  // Transport
  @Column({ type: 'varchar', default: '' })
  needDepartureShuttle: string;

  @Column({ type: 'varchar', default: '' })
  departureCity: string;

  @Column({ type: 'varchar', default: '' })
  needArrivalShuttle: string;

  @Column({ type: 'varchar', default: '' })
  arrivalCity: string;

  @Column({ type: 'varchar', default: '' })
  cityOfResidence: string;

  // Activities & Workshops
  @Column({ type: 'varchar', default: '' })
  haveTalent: string;

  @Column({ type: 'text', nullable: true })
  talentDescription: string;

  @Column({ type: 'varchar', default: '[]' })
  workshops: string;

  /* Uploads */

  @Column({ type: 'varchar', nullable: true })
  filePhotoUrl: string;

  @Column({ type: 'varchar', nullable: true })
  fileParentalAuthorizationUrl: string;

  /* createAt & updatedAt */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}
