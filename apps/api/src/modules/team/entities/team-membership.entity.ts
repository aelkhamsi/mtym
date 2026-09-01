import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TeamMembershipActorRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type TeammateSnapshot = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

/**
 * One row per membership stint. `userId`/`teamId` are plain columns rather
 * than relations on purpose: a team can be deleted later, and the history
 * must still read correctly, so `teamName`/`teamQuadrigram` are snapshotted
 * at write time instead of resolved through a live join.
 */
@Entity({ name: 'team_memberships' })
export class TeamMembership {
  constructor(partial: Partial<TeamMembership>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  teamId: number;

  @Column({ type: 'varchar' })
  teamName: string;

  @Column({ type: 'varchar' })
  teamQuadrigram: string;

  /* timestamptz, not the bare timestamp used elsewhere in this codebase:
   * that type has a known write-path timezone bug (see the
   * handle-timezones-created-updated-at migration), and getting "when" right
   * is the entire point of a history row. */
  @CreateDateColumn({ type: 'timestamptz' })
  joinedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  leftAt: Date | null;

  /* Join and leave are separate events on the same stint, each with their
   * own actor, so one "changedBy" pair would lose one side of the story. */
  @Column({
    type: 'enum',
    enum: TeamMembershipActorRole,
    nullable: true,
  })
  joinedByRole: TeamMembershipActorRole | null;

  /* A snapshot, not a FK: an admin actor's id lives in Payload's own
   * database, not in this one, so it can not be joined against here. */
  @Column({ type: 'varchar', nullable: true })
  joinedByEmail: string | null;

  @Column({
    type: 'enum',
    enum: TeamMembershipActorRole,
    nullable: true,
  })
  leftByRole: TeamMembershipActorRole | null;

  @Column({ type: 'varchar', nullable: true })
  leftByEmail: string | null;

  /* Snapshotted like teamName/teamQuadrigram above: teammates can be renamed
   * or removed later, and who this stint was actually spent with must still
   * read correctly, so it is captured as membership changes happen instead
   * of resolved live through a join at read time. */
  @Column({ type: 'jsonb', default: () => "'[]'" })
  teammates: TeammateSnapshot[];
}
