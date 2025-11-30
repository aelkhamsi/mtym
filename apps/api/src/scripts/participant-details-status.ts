import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') });

async function main() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  })
  await dataSource.initialize();

  try {
    const result = await dataSource.query(`
      UPDATE \`participant-details\`
      SET status = 'DRAFTED';
    `);
    console.log('✅ Query executed successfully:', result);
  } catch (err) {
    console.error('❌ Query failed:', err);
  } finally {
    await dataSource.destroy();
  }
}

main();