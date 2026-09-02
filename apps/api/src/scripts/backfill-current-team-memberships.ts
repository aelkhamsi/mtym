import 'reflect-metadata';
import dataSource from '../../db/typeorm.config';

/**
 * `team_memberships` only started recording from the moment the membership
 * feature shipped, so every user who was already on a team has no stint at
 * all and reads as having no history. This opens the missing stint for them.
 *
 * `joinedAt` is the one field that can not be recovered: nothing in the
 * schema recorded when a user actually joined. `GREATEST(team, user)` of the
 * two creation timestamps is the tightest defensible bound — a user can not
 * have joined before either the team or the account existed — and is used in
 * preference to NOW(), which would claim all 1807 users joined at backfill
 * time and make the column useless for ordering.
 *
 * The actor columns stay NULL rather than being invented: who added these
 * users was never recorded, and NULL already means "unknown" everywhere else
 * in this table.
 *
 * Idempotent: a user with an open stint is skipped, so this can be re-run,
 * and it will not duplicate stints the live feature has since written.
 */
async function main() {
  await dataSource.initialize();

  try {
    const inserted = await dataSource.query(`
      INSERT INTO "team_memberships" (
        "userId", "teamId", "teamName", "teamQuadrigram",
        "joinedAt", "leftAt", "joinedByRole", "joinedByEmail", "teammates"
      )
      SELECT
        member.id,
        team.id,
        team.name,
        team.quadrigram,
        GREATEST(team."createdAt", member."createdAt")::timestamptz,
        NULL,
        NULL,
        NULL,
        COALESCE(
          (
            SELECT jsonb_agg(
                     jsonb_build_object(
                       'id', teammate.id,
                       'firstName', teammate."firstName",
                       'lastName', teammate."lastName",
                       'email', teammate.email
                     )
                     ORDER BY teammate.id
                   )
            FROM "users" teammate
            WHERE teammate."teamId" = member."teamId"
              AND teammate.id <> member.id
          ),
          '[]'::jsonb
        )
      FROM "users" member
      JOIN "teams" team ON team.id = member."teamId"
      WHERE member."teamId" IS NOT NULL
        AND NOT EXISTS (
          SELECT 1
          FROM "team_memberships" existing
          WHERE existing."userId" = member.id
            AND existing."leftAt" IS NULL
        )
      RETURNING id
    `);

    console.log(`Opened ${inserted.length} membership stints.`);
  } finally {
    await dataSource.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
