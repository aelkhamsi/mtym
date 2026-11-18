import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`partners_scope\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_scope_order_idx\` ON \`partners_scope\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`partners_scope_parent_idx\` ON \`partners_scope\` (\`parent_id\`);`)

  // Backfill: every existing partner starts as regional
  await db.run(sql`INSERT INTO \`partners_scope\` (\`order\`, \`parent_id\`, \`value\`)
    SELECT 1, \`id\`, 'regional' FROM \`partners\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`partners_scope\`;`)
}