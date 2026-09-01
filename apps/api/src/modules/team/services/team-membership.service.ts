import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  TeamMembership,
  TeamMembershipActorRole,
  TeammateSnapshot,
} from '../entities/team-membership.entity';
import { Team } from '../entities/team.entity';

export type MembershipActor = {
  id?: number;
  email?: string;
  role?: string;
};

export type MembershipUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const actorRole = (actor?: MembershipActor): TeamMembershipActorRole | null => {
  if (actor?.role === TeamMembershipActorRole.ADMIN) return TeamMembershipActorRole.ADMIN;
  if (actor?.role === TeamMembershipActorRole.USER) return TeamMembershipActorRole.USER;
  return null;
};

const toSnapshot = (user: MembershipUser): TeammateSnapshot => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
});

@Injectable()
export class TeamMembershipService {
  constructor(
    @InjectRepository(TeamMembership)
    private teamMembershipRepository: Repository<TeamMembership>,
  ) {}

  /**
   * A user can only ever have one open stint: some callers (an admin
   * re-assigning someone straight out of an INCOMPLETE team, `addUser` with
   * no prior `removeUser`) open a new stint without an explicit leave, so
   * this closes whatever stint was still open first rather than trusting
   * every call site to have done that itself.
   *
   * `team.users` is taken as the source of truth for who is on the team at
   * this moment (the caller has already added `user` to it), so the new
   * stint's teammates snapshot comes straight from there. The other
   * teammates' own open stints are then back-patched with this joiner, so
   * everyone's snapshot reflects the pairing from the moment it starts.
   */
  async recordJoin(user: MembershipUser, team: Team, actor?: MembershipActor) {
    await this.closeOpenMembership(user.id, actor);

    const teammates = (team.users ?? []).filter((member) => member.id !== user.id);

    const membership = this.teamMembershipRepository.create({
      userId: user.id,
      teamId: team.id,
      teamName: team.name,
      teamQuadrigram: team.quadrigram,
      joinedByRole: actorRole(actor),
      joinedByEmail: actor?.email ?? null,
      teammates: teammates.map(toSnapshot),
    });
    const saved = await this.teamMembershipRepository.save(membership);

    if (teammates.length) {
      const openTeammateStints = await this.teamMembershipRepository.find({
        where: { teamId: team.id, leftAt: IsNull() },
      });
      const joinerSnapshot = toSnapshot(user);
      await Promise.all(
        openTeammateStints
          .filter(
            (stint) =>
              stint.id !== saved.id &&
              !stint.teammates.some((mate) => mate.id === user.id),
          )
          .map((stint) => {
            stint.teammates = [...stint.teammates, joinerSnapshot];
            return this.teamMembershipRepository.save(stint);
          }),
      );
    }

    return saved;
  }

  /**
   * Closes the user's open stint, if any. A user with no open stint (already
   * removed, or never a member) is a silent no-op rather than an error:
   * callers remove-then-add without needing to know whether one exists.
   */
  recordLeave(userId: number, teamId: number, actor?: MembershipActor) {
    return this.closeOpenMembership(userId, actor, teamId);
  }

  private async closeOpenMembership(
    userId: number,
    actor?: MembershipActor,
    teamId?: number,
  ) {
    const openMembership = await this.teamMembershipRepository.findOne({
      where: { userId, teamId, leftAt: IsNull() },
      order: { joinedAt: 'DESC' },
    });
    if (!openMembership) return;

    openMembership.leftAt = new Date();
    openMembership.leftByRole = actorRole(actor);
    openMembership.leftByEmail = actor?.email ?? null;
    return this.teamMembershipRepository.save(openMembership);
  }

  getHistoryForUser(userId: number) {
    return this.teamMembershipRepository.find({
      where: { userId },
      order: { joinedAt: 'DESC' },
    });
  }
}
