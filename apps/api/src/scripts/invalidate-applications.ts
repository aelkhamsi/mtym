import 'reflect-metadata';
import dataSource from '../../db/typeorm.config';

async function main() {
  await dataSource.initialize();

  try {
    const [, updatedCount] = await dataSource.query(`
      UPDATE "applications_status" status
      SET
        status = 'NOT_VALID',
        "updatedAt" = NOW()
      FROM "applications" application
      LEFT JOIN "users" applicant
        ON applicant.id = application."userId"
      WHERE status.id = application."statusId"
        AND (
          status.status = 'PENDING'
          AND (
            SELECT COUNT(*)
            FROM "users" member
            WHERE member."teamId" = applicant."teamId"
          ) < 3
        )
      RETURNING application.id
    `);

    console.log(`Updated ${updatedCount} applications to NOT_VALID.`);
  } finally {
    await dataSource.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
