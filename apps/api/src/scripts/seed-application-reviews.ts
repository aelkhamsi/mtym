import 'reflect-metadata';
import dataSource from '../../db/typeorm.config';

async function main() {
  await dataSource.initialize();

  try {
    const reviews = await dataSource.query(`
      INSERT INTO "applications_reviews" ("applicationId")
      SELECT applications.id
      FROM "applications"
      LEFT JOIN "applications_reviews"
        ON "applications_reviews"."applicationId" = applications.id
      WHERE "applications_reviews".id IS NULL
      RETURNING id
    `);

    console.log(`Created ${reviews.length} application reviews.`);
  } finally {
    await dataSource.destroy();
  }
}

main();
