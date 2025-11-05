import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

enum ParticipantDetailsStatus {
  NOT_STARTED = 'NOT_STARTED',
  DRAFTED = 'DRAFTED',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'participant-details' })
export class ParticipantDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.participantDetails)
  @JoinColumn()
  user: User;

  @Column({ default: ParticipantDetailsStatus.NOT_STARTED })
  status: ParticipantDetailsStatus;

  /* FORM FIELDS */

  @Column({ type: 'varchar', default: '' })
  gender: string;
  
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

  // Talent show
  @Column({ type: 'varchar', default: '' })
  haveTalent: string;

  @Column({ type: 'text', nullable: true })
  talentDescription: string;

  /* createAt & updatedAt */
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
  
}
