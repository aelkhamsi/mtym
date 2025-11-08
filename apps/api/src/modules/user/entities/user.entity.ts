import { Application } from 'src/modules/application/entities/application.entity';
import { ParticipantDetails } from 'src/modules/participant-details/entities/participant-details.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: '',
  })
  identifier: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  email: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  qualified: boolean;

  @Column({
    type: 'varchar',
    default: '',
  })
  verificationCode: string;

  @OneToOne(() => Application, (application) => application.user)
  @JoinColumn()
  application: Application;

  @OneToOne(() => ParticipantDetails, (participantDetails) => participantDetails.user)
  @JoinColumn()
  participantDetails: ParticipantDetails;

  @ManyToOne(() => Team, (team) => team.users)
  @JoinColumn()
  team: Team;

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
